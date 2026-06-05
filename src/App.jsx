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

        {/* Old founder/patriotic blend product routes — all redirect to mushroom coffee */}
        <Route path="/WashingtonBlend" element={<Navigate to="/blends" replace />} />
        <Route path="/JeffersonBlend" element={<Navigate to="/blends" replace />} />
        <Route path="/FranklinBlend" element={<Navigate to="/blends" replace />} />
        <Route path="/LincolnBlend" element={<Navigate to="/blends" replace />} />
        <Route path="/AdamsBlend" element={<Navigate to="/blends" replace />} />
        <Route path="/RooseveltBlend" element={<Navigate to="/blends" replace />} />
        <Route path="/LadyLibertyBlend" element={<Navigate to="/blends" replace />} />
        <Route path="/EaglesFlightBlend" element={<Navigate to="/blends" replace />} />
        <Route path="/UncleSamsBoldBrew" element={<Navigate to="/blends" replace />} />
        <Route path="/LibertyTorchBlend" element={<Navigate to="/blends" replace />} />
        <Route path="/RosiesGrind" element={<Navigate to="/blends" replace />} />
        <Route path="/OldGloryHouseBlend" element={<Navigate to="/blends" replace />} />
        <Route path="/AbigailAdamsBlend" element={<Navigate to="/blends" replace />} />
        <Route path="/HarrietTubmanBlend" element={<Navigate to="/blends" replace />} />
        <Route path="/washington-pods" element={<Navigate to="/shop" replace />} />

        {/* Old product URL patterns — redirect to mushroom coffee */}
        <Route path="/products/washington-blend" element={<Navigate to="/blends" replace />} />
        <Route path="/products/jefferson-blend" element={<Navigate to="/blends" replace />} />
        <Route path="/products/franklin-blend" element={<Navigate to="/blends" replace />} />
        <Route path="/products/lincoln-blend" element={<Navigate to="/blends" replace />} />
        <Route path="/products/adams-blend" element={<Navigate to="/blends" replace />} />
        <Route path="/products/roosevelt-blend" element={<Navigate to="/blends" replace />} />
        <Route path="/products/eagles-flight-blend" element={<Navigate to="/blends" replace />} />
        <Route path="/products/uncle-sams-bold-brew" element={<Navigate to="/blends" replace />} />
        <Route path="/products/liberty-torch-blend" element={<Navigate to="/blends" replace />} />
        <Route path="/products/rosies-grind" element={<Navigate to="/blends" replace />} />
        <Route path="/products/old-glory-house-blend" element={<Navigate to="/blends" replace />} />
        <Route path="/products/washington-pods" element={<Navigate to="/shop" replace />} />

        {/* Old QR pages — all redirect to mushroom coffee blends */}
        <Route path="/qr/washington" element={<Navigate to="/blends" replace />} />
        <Route path="/qr/jefferson" element={<Navigate to="/blends" replace />} />
        <Route path="/qr/adams" element={<Navigate to="/blends" replace />} />
        <Route path="/qr/franklin" element={<Navigate to="/blends" replace />} />
        <Route path="/qr/lincoln" element={<Navigate to="/blends" replace />} />
        <Route path="/qr/roosevelt" element={<Navigate to="/blends" replace />} />
        <Route path="/qr/liberty-torch" element={<Navigate to="/blends" replace />} />
        <Route path="/qr/lady-liberty" element={<Navigate to="/blends" replace />} />
        <Route path="/qr/old-glory" element={<Navigate to="/blends" replace />} />
        <Route path="/qr/uncle-sam" element={<Navigate to="/blends" replace />} />
        <Route path="/qr/rosies" element={<Navigate to="/blends" replace />} />
        <Route path="/qr/eagles-flight" element={<Navigate to="/blends" replace />} />

        {/* Old apparel/collectible pages — all redirect to mushroom coffee shop */}
        <Route path="/Bobbleheads" element={<Navigate to="/shop" replace />} />
        <Route path="/MugsTumblers" element={<Navigate to="/shop" replace />} />
        <Route path="/Apparel" element={<Navigate to="/shop" replace />} />
        <Route path="/OutfitBuilder" element={<Navigate to="/shop" replace />} />
        <Route path="/Patriots" element={<Navigate to="/shop" replace />} />
        <Route path="/Visionaries" element={<Navigate to="/shop" replace />} />
        <Route path="/StyleAdvisor" element={<Navigate to="/shop" replace />} />
        <Route path="/OnSale" element={<Navigate to="/shop" replace />} />
        <Route path="/WomenOfTheRepublic" element={<Navigate to="/shop" replace />} />

        {/* Old blog */}
        <Route path="/george-washington-coffee-history" element={<Navigate to="/Journal" replace />} />

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