import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    const { slug } = await params;

    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            fullName: true,
            avatar: true,
          },
        },
        likes: true,
        comments: {
          where: { parentId: null }, // Fetch top-level comments
          orderBy: { createdAt: 'desc' },
          include: {
            author: { select: { id: true, fullName: true, avatar: true } },
            likes: true,
            replies: {
              include: {
                author: { select: { id: true, fullName: true, avatar: true } },
                likes: true,
              },
              orderBy: { createdAt: 'asc' },
            },
          },
        },
      },
    });

    if (!post || post.status !== 'PUBLISHED') {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const userId = (session?.user as any)?.id;
    const likedByUser = userId
      ? post.likes.some((like) => like.userId === userId)
      : false;

    return NextResponse.json({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      featuredImage: post.featuredImage,
      status: post.status,
      publishedAt: post.publishedAt,
      createdAt: post.createdAt,
      author: {
        id: post.author.id,
        name: post.author.fullName,
        avatar: post.author.avatar,
      },
      likesCount: post.likes.length,
      likedByUser,
      comments: post.comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        author: {
          id: comment.author.id,
          name: comment.author.fullName,
          avatar: comment.author.avatar,
        },
        likesCount: comment.likes.length,
        likedByUser: userId
          ? comment.likes.some((like) => like.userId === userId)
          : false,
        replies: comment.replies.map((reply) => ({
          id: reply.id,
          content: reply.content,
          createdAt: reply.createdAt,
          author: {
            id: reply.author.id,
            name: reply.author.fullName,
            avatar: reply.author.avatar,
          },
          likesCount: reply.likes.length,
          likedByUser: userId
            ? reply.likes.some((like) => like.userId === userId)
            : false,
        })),
      })),
    });
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 },
    );
  }
}

