import React from 'react';
import TopBar from './components/navigation/TopBar';
import NavBar from './components/navigation/NavBar';
import Footer from './components/navigation/Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      <NavBar />
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}