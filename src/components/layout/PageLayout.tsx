
import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
