import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { NavigationProvider } from '@/contexts/NavigationContext'
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider } from '@/lib/AuthContext';
import PageTransition from './components/PageTransition';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from '@/contexts/CartContext';
import CartToast from './components/cart/CartToast';
import UnifiedHeader from './components/navigation/UnifiedHeader';

// ── Mushroom Coffee Pages ──
import Home from './pages/Home';
import MushroomShop from './pages/MushroomShop';
import MushroomBundle from './pages/MushroomBundle';
import BlendDetail from './pages/BlendDetail';
import BlendsCollection from './pages/BlendsCollection';
import HowItWorks from './pages/HowItWorks';
import MushroomFAQ from './pages/MushroomFAQ';
import Reviews from './pages/Reviews';
import Journal from './pages/Journal';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import OrderConfirmation from './pages/OrderConfirmation';
import Subscription from './pages/Subscription';
import About from './pages/About';
import Contact from './pages/Contact';

const mainPageKey = 'Home';
const MainPage = Home;

const LayoutWrapper = ({ children, currentPageName }) => {
  // Layout is imported from pages.config in the original app structure
  // For now, just wrap with PageTransition
  return <PageTransition>{children}</PageTransition>;
};

const AuthenticatedApp = () => {
  const location = useLocation();
  return (
    <>
      <UnifiedHeader />
      <AnimatePresence mode="wait">
        <ScrollToTop key={location.pathname} />
        <Routes location={location} key={location.pathname}>

        {/* ── HOME ── */}
        <Route path="/" element={
          <LayoutWrapper currentPageName={mainPageKey}>
            <MainPage />
          </LayoutWrapper>
        } />

        {/* ── MUSHROOM COFFEE STORE ── */}
        <Route path="/shop" element={<LayoutWrapper currentPageName="MushroomShop"><MushroomShop /></LayoutWrapper>} />
        <Route path="/blends" element={<LayoutWrapper currentPageName="BlendsCollection"><BlendsCollection /></LayoutWrapper>} />
        <Route path="/blends/:slug" element={<LayoutWrapper currentPageName="BlendDetail"><BlendDetail /></LayoutWrapper>} />
        <Route path="/products/:slug" element={<LayoutWrapper currentPageName="BlendDetail"><BlendDetail /></LayoutWrapper>} />
        <Route path="/bundle" element={<LayoutWrapper currentPageName="MushroomBundle"><MushroomBundle /></LayoutWrapper>} />
        <Route path="/how-it-works" element={<LayoutWrapper currentPageName="HowItWorks"><HowItWorks /></LayoutWrapper>} />
        <Route path="/faq" element={<LayoutWrapper currentPageName="MushroomFAQ"><MushroomFAQ /></LayoutWrapper>} />
        <Route path="/Reviews" element={<LayoutWrapper currentPageName="Reviews"><Reviews /></LayoutWrapper>} />
        <Route path="/Journal" element={<LayoutWrapper currentPageName="Journal"><Journal /></LayoutWrapper>} />
        <Route path="/Profile" element={<LayoutWrapper currentPageName="Profile"><Profile /></LayoutWrapper>} />
        {/* /cart and /order-confirmation redirect externally — no layout wrapper needed */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/checkout" element={<Cart />} />
        <Route path="/OrderConfirmation" element={<OrderConfirmation />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/subscription" element={<LayoutWrapper currentPageName="Subscription"><Subscription /></LayoutWrapper>} />
        <Route path="/about" element={<LayoutWrapper currentPageName="About"><About /></LayoutWrapper>} />
        <Route path="/contact" element={<LayoutWrapper currentPageName="Contact"><Contact /></LayoutWrapper>} />
        <Route path="/mission" element={<Navigate to="/about" replace />} />

        {/* ── LEGACY REDIRECTS (all old routes → mushroom coffee pages) ── */}
        <Route path="/Shop" element={<Navigate to="/shop" replace />} />
        <Route path="/BestSellers" element={<Navigate to="/shop" replace />} />
        <Route path="/Collections" element={<Navigate to="/blends" replace />} />
        <Route path="/Bundles" element={<Navigate to="/bundle" replace />} />
        <Route path="/CoffeeBundles" element={<Navigate to="/bundle" replace />} />
        <Route path="/collections/coffee-bundles" element={<Navigate to="/bundle" replace />} />
        <Route path="/TheTorchBox" element={<Navigate to="/subscription" replace />} />
        <Route path="/Subscription" element={<Navigate to="/subscription" replace />} />
        <Route path="/Mission" element={<Navigate to="/about" replace />} />
        <Route path="/Contact" element={<Navigate to="/contact" replace />} />
        <Route path="/landing" element={<Navigate to="/" replace />} />











        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </AnimatePresence>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <CartProvider>
          <Router>
            <NavigationProvider>
              <AuthenticatedApp />
              <CartToast />
            </NavigationProvider>
          </Router>
          <Toaster />
        </CartProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App