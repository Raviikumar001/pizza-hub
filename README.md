# Pizza Order Management System 🍕

A modern pizza order management system built with Next.js 14 and Clerk Authentication.

## Project Structure

```
pizza/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── pizza-orders/
│   │   │   └── page.tsx
│   │   | 
│   │   └── page.tsx
│   ├── components/
│   │   ├── Navigation.tsx
│   │   └── ProtectedRoute.tsx
│   └── middleware.ts
├── public/
│   └── assets/
├── .env
├── package.json
└── README.md
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

> ⚠️ **Important**: Never commit your `.env` file to version control. Make sure it's included in your `.gitignore`.

## Features

- 🔐 Authentication with Clerk
- 📊 Real-time order tracking
- 🛡️ Protected routes
- 💨 Built with Next.js 14
- 🎨 Styled with Tailwind CSS
- 🔄 Real-time updates
- 📱 Responsive design

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pizza.git
cd pizza
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your Clerk API keys

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Protected Routes

The following routes are protected and require authentication:
- `/dashboard/*`
- `/pizza-orders/*`

## Tech Stack

- **Framework**: Next.js 14
- **Authentication**: Clerk
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide Icons
- **State Management**: React Hooks

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Clerk Documentation](https://clerk.dev/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
