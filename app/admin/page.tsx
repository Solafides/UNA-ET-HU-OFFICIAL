'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Navigation from '../components/Navigation';

interface Post {
  id: string;
  title: string;
  category: string;
  author: string;
  authorId: string; // Added authorId
  date: string | null;
  status: string;
  likes: number;
  comments: number;
  featuredImage?: string | null;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'MEMBER' | 'GUEST';
  avatar: string | null;
  createdAt: string;
  _count: {
    blogPosts: number;
  };
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [activeTab, setActiveTab] = useState<'blog' | 'users'>('blog');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    status: 'DRAFT',
    featuredImage: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      if (activeTab === 'blog') {
        fetchPosts();
      } else if (activeTab === 'users' && (session.user as any).role === 'SUPER_ADMIN') {
        fetchUsers();
      }
    }
  }, [session, search, categoryFilter, statusFilter, activeTab]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (categoryFilter) params.append('category', categoryFilter);
      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`/api/posts?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data.items);
      } else {
        toast.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Error loading posts');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);

      const response = await fetch(`/api/users?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        toast.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Error loading users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      status: 'DRAFT',
      featuredImage: '',
    });
    setShowModal(true);
  };

  const handleEdit = (post: Post) => {
    fetch(`/api/posts/${post.id}`)
      .then((res) => res.json())
      .then((data) => {
        setEditingPost(post);
        setFormData({
          title: data.title,
          excerpt: data.excerpt || '',
          content: data.content,
          category: data.category,
          status: data.status,
          featuredImage: data.featuredImage || '',
        });
        setShowModal(true);
      });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    const loadingToast = toast.loading('Deleting post...');

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Post deleted successfully', { id: loadingToast });
        fetchPosts();
      } else {
        toast.error('Failed to delete post', { id: loadingToast });
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Error deleting post', { id: loadingToast });
    }
  };

  const handleToggleStatus = async (post: Post) => {
    const newStatus = post.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    const loadingToast = toast.loading(`Changing status to ${newStatus.toLowerCase()}...`);

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        toast.success(`Post ${newStatus.toLowerCase()} successfully`, { id: loadingToast });
        fetchPosts();
      } else {
        toast.error('Failed to update status', { id: loadingToast });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Error updating status', { id: loadingToast });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loadingToast = toast.loading(editingPost ? 'Updating post...' : 'Creating post...');

    try {
      const url = editingPost ? `/api/posts/${editingPost.id}` : '/api/posts';
      const method = editingPost ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(editingPost ? 'Post updated successfully!' : 'Post created successfully!', { id: loadingToast });
        setShowModal(false);
        fetchPosts();
        setFormData({
          title: '',
          excerpt: '',
          content: '',
          category: '',
          status: 'DRAFT',
          featuredImage: '',
        });
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to save post', { id: loadingToast });
      }
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Error saving post', { id: loadingToast });
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    const loadingToast = toast.loading('Deleting user...');
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('User deleted successfully', { id: loadingToast });
        fetchUsers();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to delete user', { id: loadingToast });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user', { id: loadingToast });
    }
  };

  const handleUpdateUserRole = async (id: string, newRole: string) => {
    if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;
    const loadingToast = toast.loading('Updating user role...');
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        toast.success('User role updated successfully', { id: loadingToast });
        fetchUsers();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to update user role', { id: loadingToast });
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Error updating user role', { id: loadingToast });
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f8] dark:bg-[#0f0f23] text-[#101018] dark:text-white transition-colors duration-200">
      <Navigation />

      <div className="flex flex-1 relative">
        {/* Mobile Header (Sidebar Toggle) - Repositioned below Nav */}
        <div className="md:hidden absolute top-0 left-0 right-0 z-30 bg-white dark:bg-[#1a1a2e] border-b border-[#dadae7] dark:border-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#5e5f8d] dark:text-gray-400">Dashboard Menu</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Sidebar */}
        <aside className={`absolute md:static inset-y-0 left-0 z-40 w-[280px] flex-col border-r border-[#dadae7] bg-white dark:bg-[#1a1a2e] dark:border-gray-800 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          } md:flex h-full`}>
          <div className="flex h-full flex-col justify-between p-6">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-1">
                <h1 className="text-[#101018] dark:text-white text-xl font-bold leading-normal tracking-tight">
                  UNA-ET-HU
                </h1>
                <p className="text-[#5e5f8d] dark:text-gray-400 text-xs font-medium uppercase tracking-wider">
                  Admin Dashboard
                </p>
              </div>
              <nav className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setActiveTab('blog');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left transition-colors ${activeTab === 'blog'
                    ? 'bg-primary/10 text-primary dark:text-blue-300'
                    : 'text-[#5e5f8d] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                >
                  <span className="material-symbols-outlined filled">article</span>
                  <span className="text-sm font-semibold leading-normal">Blog Posts</span>
                </button>
                {(session.user as any).role === 'SUPER_ADMIN' && (
                  <button
                    onClick={() => setActiveTab('users')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left transition-colors ${activeTab === 'users'
                      ? 'bg-primary/10 text-primary dark:text-blue-300'
                      : 'text-[#5e5f8d] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                  >
                    <span className="material-symbols-outlined filled">group</span>
                    <span className="text-sm font-semibold leading-normal">Manage Users</span>
                  </button>
                )}
              </nav>
            </div>
            <div className="flex flex-col gap-2 border-t border-[#dadae7] dark:border-gray-800 pt-6">
              <div className="flex items-center gap-3 px-4 py-3 mt-auto">
                <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                  {session.user?.image ? (
                    <img src={session.user.image} alt="Avatar" className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                      {(session.user?.name || 'A')[0].toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-1">
                  <p className="text-[#101018] dark:text-white text-sm font-semibold">
                    {session.user?.name || 'Admin User'}
                  </p>
                  <p className="text-[#5e5f8d] dark:text-gray-400 text-xs">
                    {session.user?.email || 'admin@una.org'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                className="w-full mt-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-16 md:pt-8 bg-[#f5f5f8] dark:bg-[#0f0f23]">
          <div className="mx-auto max-w-[1200px] flex flex-col gap-6">
            {activeTab === 'blog' ? (
              <>
                <header className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-[#101018] dark:text-white text-3xl font-bold tracking-tight">
                      Blog Management
                    </h2>
                    <p className="text-[#5e5f8d] dark:text-gray-400 mt-1 text-sm">
                      Create, edit, and manage your organization&apos;s blog posts.
                    </p>
                  </div>
                  <button
                    onClick={handleCreate}
                    className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                  >
                    <span className="material-symbols-outlined mr-2 text-[20px]">add</span>
                    Add New Post
                  </button>
                </header>

                {/* Filters & Search Toolbar */}
                <div className="flex flex-wrap items-center gap-4 rounded-xl border border-[#dadae7] dark:border-gray-700 bg-white dark:bg-[#1a1a2e] p-4 shadow-sm">
                  <div className="relative flex-1 min-w-[240px]">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5e5f8d] dark:text-gray-400">
                      <span className="material-symbols-outlined text-[20px]">search</span>
                    </span>
                    <input
                      type="text"
                      placeholder="Search posts..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full h-10 rounded-lg border border-[#dadae7] dark:border-gray-700 bg-[#f5f5f8] dark:bg-black/20 py-2 pl-10 pr-4 text-sm text-[#101018] dark:text-white placeholder:text-[#5e5f8d] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="relative min-w-[180px]">
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="h-10 w-full appearance-none rounded-lg border border-[#dadae7] dark:border-gray-700 bg-[#f5f5f8] dark:bg-black/20 px-4 py-2 pr-10 text-sm text-[#101018] dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                    >
                      <option value="">All Categories</option>
                      <option value="Diplomacy">Diplomacy</option>
                      <option value="SDG">SDG Goals</option>
                      <option value="Youth & Education">Youth & Education</option>
                      <option value="Climate Action">Climate Action</option>
                    </select>
                  </div>
                  <div className="relative min-w-[140px]">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="h-10 w-full appearance-none rounded-lg border border-[#dadae7] dark:border-gray-700 bg-[#f5f5f8] dark:bg-black/20 px-4 py-2 pr-10 text-sm text-[#101018] dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                    >
                      <option value="">Status: All</option>
                      <option value="PUBLISHED">Published</option>
                      <option value="DRAFT">Draft</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </div>
                </div>

                {/* Data Table */}
                <div className="rounded-xl border border-[#dadae7] dark:border-gray-700 bg-white dark:bg-[#1a1a2e] shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[#f5f5f8] dark:bg-white/5 text-[#5e5f8d] dark:text-gray-400 border-b border-[#dadae7] dark:border-gray-700">
                        <tr>
                          <th className="whitespace-nowrap px-6 py-4 font-semibold w-[40%]">Post Info</th>
                          <th className="whitespace-nowrap px-6 py-4 font-semibold w-[15%]">Author</th>
                          <th className="whitespace-nowrap px-6 py-4 font-semibold w-[15%]">Date Published</th>
                          <th className="whitespace-nowrap px-6 py-4 font-semibold w-[10%]">Status</th>
                          <th className="whitespace-nowrap px-6 py-4 font-semibold w-[10%]">Engagement</th>
                          <th className="whitespace-nowrap px-6 py-4 font-semibold w-[10%] text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#dadae7] dark:divide-gray-700">
                        {posts.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-6 py-8 text-center text-[#5e5f8d] dark:text-gray-400">
                              No posts found
                            </td>
                          </tr>
                        ) : (
                          posts.map((post) => (
                            <tr
                              key={post.id}
                              className="group hover:bg-[#f8f9fa] dark:hover:bg-white/5 transition-colors"
                            >
                              <td className="px-6 py-4">
                                <div className="flex gap-4 items-center">
                                  {post.featuredImage && (
                                    <div className="h-12 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
                                      <img
                                        src={post.featuredImage}
                                        alt={post.title}
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                  )}
                                  <div className="flex flex-col gap-0.5">
                                    <span className="font-semibold text-[#101018] dark:text-white line-clamp-1">
                                      {post.title}
                                    </span>
                                    <span className="text-xs text-[#5e5f8d] dark:text-gray-400">
                                      Category: {post.category}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-[#5e5f8d] dark:text-gray-300">{post.author}</td>
                              <td className="px-6 py-4 text-[#5e5f8d] dark:text-gray-300">
                                {post.date || 'Not published'}
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${post.status === 'PUBLISHED'
                                    ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800'
                                    : post.status === 'DRAFT'
                                      ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
                                      : 'bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800'
                                    }`}
                                >
                                  {post.status}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-4 text-[#5e5f8d] dark:text-gray-400 text-xs font-medium">
                                  <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">favorite</span>
                                    <span>{post.likes}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
                                    <span>{post.comments}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                {((session.user as any).role === 'SUPER_ADMIN' || (session.user as any).id === post.authorId) && (
                                  <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                    <button
                                      onClick={() => handleEdit(post)}
                                      className="h-8 w-8 inline-flex items-center justify-center rounded hover:bg-[#f5f5f8] dark:hover:bg-white/10 text-[#5e5f8d] dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors"
                                      title="Edit"
                                    >
                                      <span className="material-symbols-outlined text-[18px]">edit</span>
                                    </button>
                                    <button
                                      onClick={() => handleToggleStatus(post)}
                                      className="h-8 w-8 inline-flex items-center justify-center rounded hover:bg-[#f5f5f8] dark:hover:bg-white/10 text-[#5e5f8d] dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors"
                                      title="Toggle Status"
                                    >
                                      <span className="material-symbols-outlined text-[18px]">
                                        {post.status === 'PUBLISHED' ? 'visibility' : 'visibility_off'}
                                      </span>
                                    </button>
                                    <button
                                      onClick={() => handleDelete(post.id)}
                                      className="h-8 w-8 inline-flex items-center justify-center rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-[#5e5f8d] dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                      title="Delete"
                                    >
                                      <span className="material-symbols-outlined text-[18px]">delete</span>
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <>
                <header className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-[#101018] dark:text-white text-3xl font-bold tracking-tight">
                      User Management
                    </h2>
                    <p className="text-[#5e5f8d] dark:text-gray-400 mt-1 text-sm">
                      Manage users, admins, and their roles.
                    </p>
                  </div>
                </header>

                {/* Filters & Search Toolbar */}
                <div className="flex flex-wrap items-center gap-4 rounded-xl border border-[#dadae7] dark:border-gray-700 bg-white dark:bg-[#1a1a2e] p-4 shadow-sm">
                  <div className="relative flex-1 min-w-[240px]">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5e5f8d] dark:text-gray-400">
                      <span className="material-symbols-outlined text-[20px]">search</span>
                    </span>
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full h-10 rounded-lg border border-[#dadae7] dark:border-gray-700 bg-[#f5f5f8] dark:bg-black/20 py-2 pl-10 pr-4 text-sm text-[#101018] dark:text-white placeholder:text-[#5e5f8d] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Data Table */}
                <div className="rounded-xl border border-[#dadae7] dark:border-gray-700 bg-white dark:bg-[#1a1a2e] shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[#f5f5f8] dark:bg-white/5 text-[#5e5f8d] dark:text-gray-400 border-b border-[#dadae7] dark:border-gray-700">
                        <tr>
                          <th className="whitespace-nowrap px-6 py-4 font-semibold w-[40%]">User</th>
                          <th className="whitespace-nowrap px-6 py-4 font-semibold w-[20%]">Email</th>
                          <th className="whitespace-nowrap px-6 py-4 font-semibold w-[15%]">Role</th>
                          <th className="whitespace-nowrap px-6 py-4 font-semibold w-[10%]">Posts</th>
                          <th className="whitespace-nowrap px-6 py-4 font-semibold w-[15%] text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#dadae7] dark:divide-gray-700">
                        {users.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-6 py-8 text-center text-[#5e5f8d] dark:text-gray-400">
                              No users found
                            </td>
                          </tr>
                        ) : (
                          users.map((user) => (
                            <tr
                              key={user.id}
                              className="group hover:bg-[#f8f9fa] dark:hover:bg-white/5 transition-colors"
                            >
                              <td className="px-6 py-4">
                                <div className="flex gap-4 items-center">
                                  <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                                    {user.avatar ? (
                                      <img src={user.avatar} alt={user.fullName} className="h-full w-full object-cover" />
                                    ) : (
                                      <div className="h-full w-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                                        {user.fullName[0].toUpperCase()}
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex flex-col gap-0.5">
                                    <span className="font-semibold text-[#101018] dark:text-white line-clamp-1">
                                      {user.fullName}
                                    </span>
                                    <span className="text-xs text-[#5e5f8d] dark:text-gray-400">
                                      Joined: {new Date(user.createdAt).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-[#5e5f8d] dark:text-gray-300">{user.email}</td>
                              <td className="px-6 py-4">
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${user.role === 'SUPER_ADMIN'
                                    ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800'
                                    : user.role === 'ADMIN'
                                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                                      : 'bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800'
                                    }`}
                                >
                                  {user.role}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-[#5e5f8d] dark:text-gray-300">
                                {user._count.blogPosts}
                              </td>
                              <td className="px-6 py-4 text-right">
                                {user.role !== 'SUPER_ADMIN' && user.id !== (session.user as any).id && (
                                  <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                    <button
                                      onClick={() => handleUpdateUserRole(user.id, user.role === 'ADMIN' ? 'MEMBER' : 'ADMIN')}
                                      className="h-8 px-2 inline-flex items-center justify-center rounded hover:bg-[#f5f5f8] dark:hover:bg-white/10 text-[#5e5f8d] dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors text-xs font-medium border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                                      title={user.role === 'ADMIN' ? 'Demote to Member' : 'Promote to Admin'}
                                    >
                                      {user.role === 'ADMIN' ? 'Demote' : 'Promote'}
                                    </button>
                                    <button
                                      onClick={() => handleDeleteUser(user.id)}
                                      className="h-8 w-8 inline-flex items-center justify-center rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-[#5e5f8d] dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                      title="Delete User"
                                    >
                                      <span className="material-symbols-outlined text-[18px]">delete</span>
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Modal for Create/Edit */}
      {
        showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-[#1a1a2e] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-[#101018] dark:text-white">
                  {editingPost ? 'Edit Post' : 'Create New Post'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-[#5e5f8d] dark:text-gray-400 hover:text-[#101018] dark:hover:text-white"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#101018] dark:text-white">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-lg border border-[#dadae7] dark:border-gray-700 bg-[#f5f5f8] dark:bg-black/20 px-4 py-2 text-sm text-[#101018] dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#101018] dark:text-white">
                    Excerpt
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={2}
                    className="w-full rounded-lg border border-[#dadae7] dark:border-gray-700 bg-[#f5f5f8] dark:bg-black/20 px-4 py-2 text-sm text-[#101018] dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#101018] dark:text-white">
                    Content *
                  </label>
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={10}
                    className="w-full rounded-lg border border-[#dadae7] dark:border-gray-700 bg-[#f5f5f8] dark:bg-black/20 px-4 py-2 text-sm text-[#101018] dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[#101018] dark:text-white">
                      Category *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-lg border border-[#dadae7] dark:border-gray-700 bg-[#f5f5f8] dark:bg-black/20 px-4 py-2 text-sm text-[#101018] dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="">Select category</option>
                      <option value="Diplomacy">Diplomacy</option>
                      <option value="SDG">SDG Goals</option>
                      <option value="Youth & Education">Youth & Education</option>
                      <option value="Climate Action">Climate Action</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[#101018] dark:text-white">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full rounded-lg border border-[#dadae7] dark:border-gray-700 bg-[#f5f5f8] dark:bg-black/20 px-4 py-2 text-sm text-[#101018] dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="DRAFT">Draft</option>
                      <option value="PUBLISHED">Published</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#101018] dark:text-white">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                    className="w-full rounded-lg border border-[#dadae7] dark:border-gray-700 bg-[#f5f5f8] dark:bg-black/20 px-4 py-2 text-sm text-[#101018] dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm font-semibold text-[#5e5f8d] dark:text-gray-400 hover:bg-[#f0f0f5] dark:hover:bg-white/5 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
                  >
                    {editingPost ? 'Update Post' : 'Create Post'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </div >
  );
}


