import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/register">Register</Link>
      <Link href="/login">login</Link>
      <Link href="/feedback">Feedback</Link>
      <Link href="/admin">Admin Dashboard</Link>
    </nav>
  );
}