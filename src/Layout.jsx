import React from 'react';
import TopBar from './components/navigation/TopBar';
import NavBar from './components/navigation/NavBar';
import Footer from './components/navigation/Footer';
import MobileHeader from './components/mobile/MobileHeader';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background flex flex-col" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <div className="md:hidden">
        <MobileHeader />
      </div>
      <div className="hidden md:block sticky top-0 z-50" style={{ top: 'env(safe-area-inset-top)' }}>
        <TopBar />
        <NavBar />
      </div>
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}