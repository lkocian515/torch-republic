import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { pagesConfig } from './pages.config'
import { NavigationProvider } from '@/contexts/NavigationContext'
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import PageTransition from './components/PageTransition';
import ScrollToTop from './components/ScrollToTop';

// ── Mushroom Coffee Pages ──
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

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = Pages[mainPageKey];

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}><PageTransition>{children}</PageTransition></Layout>
  : <PageTransition>{children}</PageTransition>;

const AuthenticatedApp = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <ScrollToTop />
      <Routes location={location} key={location.pathname}>

        {/* ── HOME ── */}
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

        {/* ── MUSHROOM COFFEE STORE ── */}
        <Route path="/shop" element={<LayoutWrapper currentPageName="MushroomShop"><MushroomShop /></LayoutWrapper>} />
        <Route path="/blends" element={<LayoutWrapper currentPageName="BlendsCollection"><BlendsCollection /></LayoutWrapper>} />
        <Route path="/blends/:slug" element={<LayoutWrapper currentPageName="BlendDetail"><BlendDetail /></LayoutWrapper>} />
        <Route path="/bundle" element={<LayoutWrapper currentPageName="MushroomBundle"><MushroomBundle /></LayoutWrapper>} />
        <Route path="/how-it-works" element={<LayoutWrapper currentPageName="HowItWorks"><HowItWorks /></LayoutWrapper>} />
        <Route path="/faq" element={<LayoutWrapper currentPageName="MushroomFAQ"><MushroomFAQ /></LayoutWrapper>} />
        <Route path="/Reviews" element={<LayoutWrapper currentPageName="Reviews"><Reviews /></LayoutWrapper>} />
        <Route path="/Journal" element={<LayoutWrapper currentPageName="Journal"><Journal /></LayoutWrapper>} />
        <Route path="/Profile" element={<LayoutWrapper currentPageName="Profile"><Profile /></LayoutWrapper>} />
        <Route path="/Cart" element={<LayoutWrapper currentPageName="Cart"><Cart /></LayoutWrapper>} />
        <Route path="/OrderConfirmation" element={<LayoutWrapper currentPageName="OrderConfirmation"><OrderConfirmation /></LayoutWrapper>} />

        {/* ── LEGACY REDIRECTS (all old routes → /shop or /blends) ── */}
        <Route path="/Shop" element={<Navigate to="/shop" replace />} />
        <Route path="/Bundles" element={<Navigate to="/bundle" replace />} />
        <Route path="/CoffeeBundles" element={<Navigate to="/bundle" replace />} />
        <Route path="/collections/coffee-bundles" element={<Navigate to="/bundle" replace />} />
        <Route path="/TheTorchBox" element={<Navigate to="/shop" replace />} />
        <Route path="/CoffeeCollection" element={<Navigate to="/blends" replace />} />
        <Route path="/Apparel" element={<Navigate to="/shop" replace />} />
        <Route path="/bobbleheads" element={<Navigate to="/shop" replace />} />
        <Route path="/mugs-tumblers" element={<Navigate to="/shop" replace />} />
        <Route path="/LibertyIcons" element={<Navigate to="/blends" replace />} />
        <Route path="/CommandersSeries" element={<Navigate to="/blends" replace />} />
        <Route path="/WomenOfTheRepublic" element={<Navigate to="/blends" replace />} />
        <Route path="/OnSale" element={<Navigate to="/shop" replace />} />
        <Route path="/landing" element={<Navigate to="/" replace />} />

        {/* Old founder blend product routes */}
        <Route path="/WashingtonBlend" element={<Navigate to="/blends" replace />} />
        <Route path="/products/washington-blend" element={<Navigate to="/blends" replace />} />
        <Route path="/JeffersonBlend" element={<Navigate to="/blends" replace />} />
        <Route path="/products/jefferson-blend" element={<Navigate to="/blends" replace />} />
        <Route path="/FranklinBlend" element={<Navigate to="/blends" replace />} />
        <Route path="/products/franklin-blend" element={<Navigate to="/blends" replace />} />
        <Route path="/LincolnBlend" element={<Navigate to="/blends" replace />} />
        <Route path="/products/lincoln-blend" element={<Navigate to="/blends" replace />} />
        <Route path="/AdamsBlend" element={<Navigate to="/blends" replace />} />
        <Route path="/products/adams-blend" element={<Navigate to="/blends" replace />} />
        <Route path="/RooseveltBlend" element={<Navigate to="/blends" replace />} />
        <Route path="/products/roosevelt-blend" element={<Navigate to="/blends" replace />} />
        <Route path="/LadyLibertyBlend" element={<Navigate to="/blends" replace />} />
        <Route path="/EaglesFlightBlend" element={<Navigate to="/blends" replace />} />
        <Route path="/products/eagles-flight-blend" element={<Navigate to="/blends" replace />} />
        <Route path="/UncleSamsBoldBrew" element={<Navigate to="/blends" replace />} />
        <Route path="/products/uncle-sams-bold-brew" element={<Navigate to="/blends" replace />} />
        <Route path="/LibertyTorchBlend" element={<Navigate to="/blends" replace />} />
        <Route path="/products/liberty-torch-blend" element={<Navigate to="/blends" replace />} />
        <Route path="/RosiesGrind" element={<Navigate to="/blends" replace />} />
        <Route path="/products/rosies-grind" element={<Navigate to="/blends" replace />} />
        <Route path="/OldGloryHouseBlend" element={<Navigate to="/blends" replace />} />
        <Route path="/products/old-glory-house-blend" element={<Navigate to="/blends" replace />} />
        <Route path="/AbigailAdamsBlend" element={<Navigate to="/blends" replace />} />
        <Route path="/HarrietTubmanBlend" element={<Navigate to="/blends" replace />} />
        <Route path="/washington-pods" element={<Navigate to="/shop" replace />} />
        <Route path="/products/washington-pods" element={<Navigate to="/shop" replace />} />

        {/* Old QR pages */}
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

        {/* Old blog */}
        <Route path="/george-washington-coffee-history" element={<Navigate to="/Journal" replace />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <NavigationProvider>
            <AuthenticatedApp />
          </NavigationProvider>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App