import React from 'react';
import TopBar from './components/navigation/TopBar';
import NavBar from './components/navigation/NavBar';
import Footer from './components/navigation/Footer';
import BottomTabNav from './components/mobile/BottomTabNav';
import MobileHeader from './components/mobile/MobileHeader';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background flex flex-col" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <MobileHeader />
      <div className="sticky top-0 z-50 md:top-0" style={{ top: 'env(safe-area-inset-top)' }}>
        <TopBar />
        <NavBar />
      </div>
      <main className="flex-1 md:mb-0 mb-16">
        {children}
      </main>
      <Footer />
      <BottomTabNav />
    </div>
  );
}