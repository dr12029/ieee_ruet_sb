'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [status, router, pathname]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-gray-100 pt-16">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin/dashboard" className={`block p-2 rounded hover:bg-gray-700 ${pathname === '/admin/dashboard' ? 'bg-gray-700' : ''}`}>
            Dashboard
          </Link>
          <Link href="/admin/events" className={`block p-2 rounded hover:bg-gray-700 ${pathname.startsWith('/admin/events') ? 'bg-gray-700' : ''}`}>
            Events
          </Link>
          {/* Add more links here */}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
