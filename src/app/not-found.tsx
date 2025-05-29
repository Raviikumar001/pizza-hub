import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Not Found',
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="text-lg mb-6">Could not find the requested resource.</p>
      <Link
        href="/"
        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        Return Home
      </Link>
    </div>
  )
}
