
import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className={`flex-1 w-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
