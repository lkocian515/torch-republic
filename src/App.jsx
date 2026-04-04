import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { pagesConfig } from './pages.config'
import { NavigationProvider } from '@/contexts/NavigationContext'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import PageTransition from './components/PageTransition';
import ScrollToTop from './components/ScrollToTop';


import Reviews from './pages/Reviews';
import OnSale from './pages/OnSale';
import Profile from './pages/Profile';
import Shop from './pages/Shop';

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
      <Route path="/Shop" element={<LayoutWrapper currentPageName="Shop"><Shop /></LayoutWrapper>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </AnimatePresence>
  );
};


function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <NavigationProvider>
          <Router>
          <AuthenticatedApp />
          </Router>
        </NavigationProvider>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App