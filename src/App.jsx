import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import PageTransition from './components/PageTransition';
import ShopifyPassthrough from './components/ShopifyPassthrough';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './lib/CartContext';

import Reviews from './pages/Reviews';
import OnSale from './pages/OnSale';
import Profile from './pages/Profile';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = Pages[mainPageKey];

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}><PageTransition>{children}</PageTransition></Layout>
  : <PageTransition>{children}</PageTransition>;

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <ScrollToTop />
      <Routes location={location} key={location.pathname}>
        {/* Shopify Commerce Routes - Pass Through */}
        <Route path="/cart" element={<ShopifyPassthrough />} />
        <Route path="/cart/*" element={<ShopifyPassthrough />} />
        <Route path="/checkout" element={<ShopifyPassthrough />} />
        <Route path="/checkout/*" element={<ShopifyPassthrough />} />
        <Route path="/products/:handle" element={<ShopifyPassthrough />} />
        <Route path="/products" element={<ShopifyPassthrough />} />
        <Route path="/collections/*" element={<ShopifyPassthrough />} />
        <Route path="/blogs/*" element={<ShopifyPassthrough />} />
        <Route path="/a/p/products/*" element={<ShopifyPassthrough />} />
        
        {/* Base44 App Routes */}
        <Route path="/" element={
        <LayoutWrapper currentPageName={mainPageKey}>
          <MainPage />
        </LayoutWrapper>
      } />
      {Object.entries(Pages).map(([path, Page]) => (
        <Route
          key={path}
          path={`/${path}`}
          element={
            <LayoutWrapper currentPageName={path}>
              <Page />
            </LayoutWrapper>
          }
        />
      ))}
      <Route path="/Reviews" element={<LayoutWrapper currentPageName="Reviews"><Reviews /></LayoutWrapper>} />
      <Route path="/OnSale" element={<LayoutWrapper currentPageName="OnSale"><OnSale /></LayoutWrapper>} />
      <Route path="/Profile" element={<LayoutWrapper currentPageName="Profile"><Profile /></LayoutWrapper>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </AnimatePresence>
  );
};


function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <CartProvider>
          <Router>
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </CartProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App