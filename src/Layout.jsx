import React from 'react';
import TopBar from './components/navigation/TopBar';
import NavBar from './components/navigation/NavBar';
import Footer from './components/navigation/Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="sticky top-0 z-50">
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