import Navbar from './components/Navbar';
import './globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className='p-6'>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
