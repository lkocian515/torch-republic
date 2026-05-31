import React from 'react';
import Footer from './components/navigation/Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background flex flex-col" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}