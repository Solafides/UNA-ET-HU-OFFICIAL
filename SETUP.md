# Setup Instructions

## Step 1: Install Dependencies

Navigate to the website directory and install all dependencies:

```bash
cd website
npm install
```

## Step 2: Set Up Environment Variables

Create a `.env` file in the `website` directory with the following content:

```env
# Database Connection
# For local PostgreSQL (adjust username, password, and database name)
DATABASE_URL="postgresql://postgres:password@localhost:5432/una_et_hu?schema=public"

# For production, use a connection string from your PostgreSQL provider
# Example: DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# NextAuth Configuration (generate a random secret)
# You can generate one at: https://generate-secret.vercel.app/32
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-replace-with-random-string"

# App Environment
NODE_ENV="development"
```

### Option 1: Using Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a database:
   ```sql
   CREATE DATABASE una_et_hu;
   ```
3. Update `DATABASE_URL` in `.env` with your PostgreSQL credentials

### Option 2: Using a Cloud Database (Recommended for Quick Start)

1. Sign up for a free PostgreSQL database at:
   - [Supabase](https://supabase.com) (Free tier available)
   - [Neon](https://neon.tech) (Free tier available)
   - [Railway](https://railway.app) (Free tier available)
2. Copy the connection string and paste it as `DATABASE_URL` in `.env`

## Step 3: Generate Prisma Client

After setting up your database, generate the Prisma client:

```bash
npx prisma generate
```

## Step 4: Push Database Schema

Push the database schema to create all tables:

```bash
npx prisma db push
```

Alternatively, if you want to use migrations:

```bash
npx prisma migrate dev --name init
```

## Step 5: Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The website will be available at: **http://localhost:3000**

## Step 6: (Optional) Seed the Database

If you want to add some initial data, you can create a seed script later.

## Troubleshooting

### If you get "Cannot find module '@prisma/client'"
Run:
```bash
npx prisma generate
```

### If you get database connection errors
1. Check your `DATABASE_URL` in `.env`
2. Make sure PostgreSQL is running (if using local)
3. Check your firewall settings
4. Verify your database credentials

### If Tailwind CSS is not working
The project uses Tailwind CSS v4. Make sure all dependencies are installed:
```bash
npm install
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Database Management

- `npx prisma studio` - Open Prisma Studio (visual database browser) at http://localhost:5555
- `npx prisma generate` - Generate Prisma Client after schema changes
- `npx prisma db push` - Push schema changes to database
- `npx prisma migrate dev` - Create and apply migrations