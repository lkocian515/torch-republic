import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { NavigationProvider } from '@/contexts/NavigationContext'
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider } from '@/lib/AuthContext';
import React, { Suspense, lazy } from 'react';
import PageTransition from './components/PageTransition';
import ScrollToTop from './components/ScrollToTop';
import PullToRefresh from './components/mobile/PullToRefresh';
import { CartProvider } from '@/contexts/CartContext';
import CartToast from './components/cart/CartToast';
import UnifiedHeader from './components/navigation/UnifiedHeader';
import Footer from './components/navigation/Footer';
import EmailCapturePopup from './components/mushroom/EmailCapturePopup';
import ExitIntentPopup from './components/home/ExitIntentPopup';
import ReviewPopup from './components/mushroom/ReviewPopup';
import BottomTabs from './components/mobile/BottomTabs';

// ── Mushroom Coffee Pages (Lazy Loaded) ──
const Home = lazy(() => import('./pages/Home'));
const MushroomShop = lazy(() => import('./pages/MushroomShop'));
const ClassicCoffeeCollection = lazy(() => import('./pages/ClassicCoffeeCollection'));
const MushroomCoffeeCollection = lazy(() => import('./pages/MushroomCoffeeCollection'));
const MatchaCollection = lazy(() => import('./pages/MatchaCollection'));
const MushroomBundle = lazy(() => import('./pages/MushroomBundle'));
const BlendDetail = lazy(() => import('./pages/BlendDetail'));
const BlendsCollection = lazy(() => import('./pages/BlendsCollection'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Journal = lazy(() => import('./pages/Journal'));
const Profile = lazy(() => import('./pages/Profile'));
const LoyaltyPortal = lazy(() => import('./pages/LoyaltyPortal'));
const TorchbearersRewards = lazy(() => import('./pages/TorchbearersRewards'));
const Cart = lazy(() => import('./pages/Cart'));
const CartRedirect = lazy(() => import('./components/cart/CartRedirect'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
const Subscription = lazy(() => import('./pages/Subscription'));
const OurMission = lazy(() => import('./pages/OurMission'));
const Contact = lazy(() => import('./pages/Contact'));
const Torchbearer = lazy(() => import('./pages/Torchbearer'));
const TrafficReport = lazy(() => import('./pages/TrafficReport'));
const CoffeeRecipes = lazy(() => import('./pages/CoffeeRecipes'));
const FAQ = lazy(() => import('./pages/FAQ'));
const ShippingPolicy = lazy(() => import('./pages/ShippingPolicy'));
const ReturnPolicy = lazy(() => import('./pages/ReturnPolicy'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const MushroomCoffeeBenefits = lazy(() => import('./pages/MushroomCoffeeBenefits'));
const LionsManeCoffee = lazy(() => import('./pages/LionsManeCoffee'));
const InstantCoffeeForEnergy = lazy(() => import('./pages/InstantCoffeeForEnergy'));
const LionsManeMushroomCoffee = lazy(() => import('./pages/blog/LionsManeMushroomCoffee'));
const ChagaMushroomCoffee = lazy(() => import('./pages/blog/ChagaMushroomCoffee'));
const InstantCeremonialMatcha = lazy(() => import('./pages/blog/InstantCeremonialMatcha'));
const MushroomCoffeeBenefitsGuide = lazy(() => import('./pages/blog/MushroomCoffeeBenefitsGuide'));
const BestInstantCoffee = lazy(() => import('./pages/blog/BestInstantCoffee'));
const MatchaBenefitsGuide = lazy(() => import('./pages/blog/MatchaBenefitsGuide'));
const CoffeeAndFocusGuide = lazy(() => import('./pages/blog/CoffeeAndFocusGuide'));
const MorningRitualGuide = lazy(() => import('./pages/blog/MorningRitualGuide'));
const AdaptogensGuide = lazy(() => import('./pages/blog/AdaptogensGuide'));
const HistoryOfMushroomCoffee = lazy(() => import('./pages/blog/HistoryOfMushroomCoffee'));
const LocalSEO = lazy(() => import('./pages/LocalSEO'));
const HistoryOfMatcha = lazy(() => import('./pages/blog/HistoryOfMatcha'));
const ScienceOfLionsMane = lazy(() => import('./pages/blog/ScienceOfLionsMane'));
const ChagaMushroomAntioxidantKing = lazy(() => import('./pages/blog/ChagaMushroomAntioxidantKing'));
const ResearchHub = lazy(() => import('./pages/ResearchHub'));
const BlendQuiz = lazy(() => import('./pages/BlendQuiz'));
const Ingredients = lazy(() => import('./pages/Ingredients'));
const WhyMushroomCoffee = lazy(() => import('./pages/WhyMushroomCoffee'));
const WhyMatcha = lazy(() => import('./pages/WhyMatcha'));
const CustomerSpotlight = lazy(() => import('./pages/CustomerSpotlight'));
const CustomerPortal = lazy(() => import('./pages/CustomerPortal'));
const Gifts = lazy(() => import('./pages/Gifts'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const BuildYourRitual = lazy(() => import('./pages/BuildYourRitual'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const EmailCampaignDashboard = lazy(() => import('./pages/EmailCampaignDashboard'));
const AdminShopify = lazy(() => import('./pages/AdminShopify'));
const KeywordAnalysis = lazy(() => import('./pages/KeywordAnalysis.jsx'));

// ── Torch Command ──
const TorchCommandHome = lazy(() => import('./pages/command/TorchCommandHome.jsx'));
const CognitiveQuiz = lazy(() => import('./pages/command/CognitiveQuiz.jsx'));
const FlowTimer = lazy(() => import('./pages/command/FlowTimer.jsx'));
const ProtocolsDirectory = lazy(() => import('./pages/command/ProtocolsDirectory.jsx'));
const ProtocolDetail = lazy(() => import('./pages/command/ProtocolDetail.jsx'));
const AdminCommand = lazy(() => import('./pages/command/AdminCommand.jsx'));
const AdminBlogEditor = lazy(() => import('./pages/AdminBlogEditor.jsx'));
const MushroomCoffeeVsRegularCoffee = lazy(() => import('./pages/blog/MushroomCoffeeVsRegularCoffee.jsx'));
const CeremonialMatchaVsCulinary = lazy(() => import('./pages/blog/CeremonialMatchaVsCulinary.jsx'));
const PremiumInstantCoffeeDifference = lazy(() => import('./pages/blog/PremiumInstantCoffeeDifference.jsx'));

const mainPageKey = 'Home';

// Loading fallback component
const PageLoader = () => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    className="min-h-screen flex items-center justify-center"
    style={{ background: '#080808' }}
  >
    <div className="text-center">
      <div className="w-10 h-10 border-2 border-rose-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: '#E6B7AD' }}>Loading...</p>
    </div>
  </motion.div>
);

const LayoutWrapper = ({ children, currentPageName, queryClient }) => {
  // Wrap main pages with PullToRefresh for native-like experience
  const handleRefresh = async () => {
    // Invalidate all queries to refresh data
    if (queryClient) {
      await queryClient.invalidateQueries();
    }
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <PageTransition>{children}</PageTransition>
    </PullToRefresh>
  );
};

const AuthenticatedApp = ({ queryClient }) => {
  const location = useLocation();
  return (
    <>
      <UnifiedHeader />
      <AnimatePresence mode="wait">
        <ScrollToTop key={location.pathname} />
        <Routes location={location} key={location.pathname}>

        {/* ── AUTH ── */}
        <Route path="/login" element={<Suspense fallback={<PageLoader />}><Login /></Suspense>} />
        <Route path="/register" element={<Suspense fallback={<PageLoader />}><Register /></Suspense>} />
        <Route path="/forgot-password" element={<Suspense fallback={<PageLoader />}><ForgotPassword /></Suspense>} />
        <Route path="/reset-password" element={<Suspense fallback={<PageLoader />}><ResetPassword /></Suspense>} />

        {/* ── HOME ── */}
        <Route path="/" element={
          <Suspense fallback={<PageLoader />}>
            <LayoutWrapper currentPageName={mainPageKey} queryClient={queryClient}>
              <Home />
            </LayoutWrapper>
          </Suspense>
        } />

        {/* ── CART REDIRECT PROTECTION — catches /cart/:variant and redirects to Shopify ── */}
        <Route path="/cart/:cartPermalink" element={
          <Suspense fallback={<PageLoader />}>
            <CartRedirect />
          </Suspense>
        } />

        {/* ── MUSHROOM COFFEE STORE ── */}
        <Route path="/shop" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="MushroomShop" queryClient={queryClient}><MushroomShop /></LayoutWrapper></Suspense>} />
        {/* SEO Category Pages */}
        <Route path="/shop/instant-mushroom-coffee" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="MushroomCoffeeCollection" queryClient={queryClient}><MushroomCoffeeCollection /></LayoutWrapper></Suspense>} />
        <Route path="/shop/instant-coffee" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="ClassicCoffeeCollection" queryClient={queryClient}><ClassicCoffeeCollection /></LayoutWrapper></Suspense>} />
        <Route path="/shop/matcha" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="MatchaCollection" queryClient={queryClient}><MatchaCollection /></LayoutWrapper></Suspense>} />
        {/* Legacy routes for backward compatibility */}
        <Route path="/classic-coffee" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="ClassicCoffeeCollection" queryClient={queryClient}><ClassicCoffeeCollection /></LayoutWrapper></Suspense>} />
        <Route path="/mushroom-coffee" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="MushroomCoffeeCollection" queryClient={queryClient}><MushroomCoffeeCollection /></LayoutWrapper></Suspense>} />
        <Route path="/matcha" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="MatchaCollection" queryClient={queryClient}><MatchaCollection /></LayoutWrapper></Suspense>} />
        <Route path="/blends" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="BlendsCollection" queryClient={queryClient}><BlendsCollection /></LayoutWrapper></Suspense>} />
        <Route path="/blends/:slug" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="BlendDetail" queryClient={queryClient}><BlendDetail /></LayoutWrapper></Suspense>} />
        <Route path="/products/:slug" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="BlendDetail" queryClient={queryClient}><BlendDetail /></LayoutWrapper></Suspense>} />
        <Route path="/bundle" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="MushroomBundle" queryClient={queryClient}><MushroomBundle /></LayoutWrapper></Suspense>} />
        <Route path="/how-it-works" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="HowItWorks" queryClient={queryClient}><HowItWorks /></LayoutWrapper></Suspense>} />
        <Route path="/reviews" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="Reviews" queryClient={queryClient}><Reviews /></LayoutWrapper></Suspense>} />
        <Route path="/profile" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="Profile" queryClient={queryClient}><Profile /></LayoutWrapper></Suspense>} />
        <Route path="/loyalty" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="LoyaltyPortal" queryClient={queryClient}><LoyaltyPortal /></LayoutWrapper></Suspense>} />
        <Route path="/torchbearers-rewards" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="TorchbearersRewards" queryClient={queryClient}><TorchbearersRewards /></LayoutWrapper></Suspense>} />
        <Route path="/cart" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="Cart" queryClient={queryClient}><Cart /></LayoutWrapper></Suspense>} />
        <Route path="/checkout" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="Cart" queryClient={queryClient}><Cart /></LayoutWrapper></Suspense>} />
        <Route path="/order-confirmation" element={<Suspense fallback={<PageLoader />}><OrderConfirmation /></Suspense>} />
        <Route path="/subscription" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="Subscription" queryClient={queryClient}><Subscription /></LayoutWrapper></Suspense>} />
        <Route path="/mission" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="OurMission" queryClient={queryClient}><OurMission /></LayoutWrapper></Suspense>} />
        <Route path="/contact" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="Contact" queryClient={queryClient}><Contact /></LayoutWrapper></Suspense>} />
        <Route path="/torchbearer" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="Torchbearer" queryClient={queryClient}><Torchbearer /></LayoutWrapper></Suspense>} />
        <Route path="/about" element={<Navigate to="/mission" replace />} />
        <Route path="/faq" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="FAQ" queryClient={queryClient}><FAQ /></LayoutWrapper></Suspense>} />
        
        {/* ── ADMIN / INTERNAL PAGES — ALL REDIRECT TO HOMEPAGE (NO PUBLIC ACCESS) ── */}
        <Route path="/traffic-report" element={<Navigate to="/" replace />} />
        <Route path="/TrafficReport" element={<Navigate to="/" replace />} />
        <Route path="/email-campaign" element={<Navigate to="/" replace />} />
        <Route path="/email-campaign-dashboard" element={<Navigate to="/" replace />} />
        <Route path="/admin/shopify" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="AdminShopify" queryClient={queryClient}><AdminShopify /></LayoutWrapper></Suspense>} />
        <Route path="/admin/keywords" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="KeywordAnalysis" queryClient={queryClient}><KeywordAnalysis /></LayoutWrapper></Suspense>} />
        <Route path="/admin/blog" element={<Navigate to="/" replace />} />
        <Route path="/admin/blog/:slug" element={<Navigate to="/" replace />} />
        <Route path="/Admin" element={<Navigate to="/" replace />} />
        <Route path="/Dashboard" element={<Navigate to="/" replace />} />
        <Route path="/SEO" element={<Navigate to="/" replace />} />
        <Route path="/seo" element={<Navigate to="/" replace />} />
        <Route path="/SearchQueryAnalysis" element={<Navigate to="/" replace />} />
        <Route path="/search-query-analysis" element={<Navigate to="/" replace />} />
        <Route path="/local" element={<Navigate to="/" replace />} />
        <Route path="/LocalSEO" element={<Navigate to="/" replace />} />
        <Route path="/AdminShopify" element={<Navigate to="/admin/shopify" replace />} />
        <Route path="/KeywordAnalysis" element={<Navigate to="/admin/keywords" replace />} />
        <Route path="/BlendDetail" element={<Navigate to="/shop" replace />} />
        <Route path="/blenddetail" element={<Navigate to="/shop" replace />} />
        <Route path="/MushroomShop" element={<Navigate to="/shop" replace />} />
        <Route path="/mushroomshop" element={<Navigate to="/shop" replace />} />
        <Route path="/BuildYourRitual" element={<Navigate to="/build-your-ritual" replace />} />
        <Route path="/emailcampaigndashboard" element={<Navigate to="/" replace />} />
        <Route path="/EmailCampaignDashboard" element={<Navigate to="/" replace />} />
        <Route path="/CustomerPortal" element={<Navigate to="/" replace />} />
        <Route path="/customerportal" element={<Navigate to="/" replace />} />
        <Route path="/portal" element={<Navigate to="/" replace />} />
        <Route path="/Portal" element={<Navigate to="/" replace />} />
        <Route path="/LoyaltyPortal" element={<Navigate to="/" replace />} />
        <Route path="/loyaltyportal" element={<Navigate to="/" replace />} />
        <Route path="/Profile" element={<Navigate to="/profile" replace />} />
        <Route path="/Subscription" element={<Navigate to="/subscription" replace />} />
        <Route path="/Loyalty" element={<Navigate to="/loyalty" replace />} />

        <Route path="/recipes" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="CoffeeRecipes" queryClient={queryClient}><CoffeeRecipes /></LayoutWrapper></Suspense>} />
        <Route path="/research" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="ResearchHub" queryClient={queryClient}><ResearchHub /></LayoutWrapper></Suspense>} />
        <Route path="/quiz" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="BlendQuiz" queryClient={queryClient}><BlendQuiz /></LayoutWrapper></Suspense>} />
        <Route path="/spotlight" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="CustomerSpotlight" queryClient={queryClient}><CustomerSpotlight /></LayoutWrapper></Suspense>} />
        <Route path="/portal" element={<Navigate to="/" replace />} />
        <Route path="/gifts" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="Gifts" queryClient={queryClient}><Gifts /></LayoutWrapper></Suspense>} />
        <Route path="/journal" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="Journal" queryClient={queryClient}><Journal /></LayoutWrapper></Suspense>} />
        <Route path="/journal/:slug" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="BlogPost" queryClient={queryClient}><BlogPost /></LayoutWrapper></Suspense>} />
        <Route path="/build-your-ritual" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="BuildYourRitual" queryClient={queryClient}><BuildYourRitual /></LayoutWrapper></Suspense>} />
        <Route path="/shipping-policy" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="ShippingPolicy" queryClient={queryClient}><ShippingPolicy /></LayoutWrapper></Suspense>} />
        <Route path="/return-policy" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="ReturnPolicy" queryClient={queryClient}><ReturnPolicy /></LayoutWrapper></Suspense>} />
        <Route path="/privacy-policy" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="PrivacyPolicy" queryClient={queryClient}><PrivacyPolicy /></LayoutWrapper></Suspense>} />
        <Route path="/terms-of-service" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="TermsOfService" queryClient={queryClient}><TermsOfService /></LayoutWrapper></Suspense>} />

        {/* ── SEO CONTENT PAGES ── */}
        <Route path="/mushroom-coffee-benefits" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="MushroomCoffeeBenefits" queryClient={queryClient}><MushroomCoffeeBenefits /></LayoutWrapper></Suspense>} />
        <Route path="/lions-mane-coffee" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="LionsManeCoffee" queryClient={queryClient}><LionsManeCoffee /></LayoutWrapper></Suspense>} />
        <Route path="/instant-coffee-for-energy" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="InstantCoffeeForEnergy" queryClient={queryClient}><InstantCoffeeForEnergy /></LayoutWrapper></Suspense>} />
        <Route path="/local" element={<Navigate to="/" replace />} />
        <Route path="/ingredients" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="Ingredients" queryClient={queryClient}><Ingredients /></LayoutWrapper></Suspense>} />
        <Route path="/why-mushroom-coffee" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="WhyMushroomCoffee" queryClient={queryClient}><WhyMushroomCoffee /></LayoutWrapper></Suspense>} />
        <Route path="/why-matcha" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="WhyMatcha" queryClient={queryClient}><WhyMatcha /></LayoutWrapper></Suspense>} />

        {/* ── BLOG POSTS ── */}
        <Route path="/journal/lions-mane-mushroom-coffee" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="LionsManeMushroomCoffee" queryClient={queryClient}><LionsManeMushroomCoffee /></LayoutWrapper></Suspense>} />
        <Route path="/journal/chaga-mushroom-coffee" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="ChagaMushroomCoffee" queryClient={queryClient}><ChagaMushroomCoffee /></LayoutWrapper></Suspense>} />
        <Route path="/journal/instant-ceremonial-matcha" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="InstantCeremonialMatcha" queryClient={queryClient}><InstantCeremonialMatcha /></LayoutWrapper></Suspense>} />
        <Route path="/journal/mushroom-coffee-benefits" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="MushroomCoffeeBenefitsGuide" queryClient={queryClient}><MushroomCoffeeBenefitsGuide /></LayoutWrapper></Suspense>} />
        <Route path="/journal/best-instant-coffee" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="BestInstantCoffee" queryClient={queryClient}><BestInstantCoffee /></LayoutWrapper></Suspense>} />
        <Route path="/journal/matcha-benefits" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="MatchaBenefitsGuide" queryClient={queryClient}><MatchaBenefitsGuide /></LayoutWrapper></Suspense>} />
        <Route path="/journal/coffee-and-focus" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="CoffeeAndFocusGuide" queryClient={queryClient}><CoffeeAndFocusGuide /></LayoutWrapper></Suspense>} />
        <Route path="/journal/morning-ritual-for-focus" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="MorningRitualGuide" queryClient={queryClient}><MorningRitualGuide /></LayoutWrapper></Suspense>} />
        <Route path="/journal/adaptogens-guide" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="AdaptogensGuide" queryClient={queryClient}><AdaptogensGuide /></LayoutWrapper></Suspense>} />
        <Route path="/journal/history-of-mushroom-coffee" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="HistoryOfMushroomCoffee" queryClient={queryClient}><HistoryOfMushroomCoffee /></LayoutWrapper></Suspense>} />
        <Route path="/journal/history-of-matcha" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="HistoryOfMatcha" queryClient={queryClient}><HistoryOfMatcha /></LayoutWrapper></Suspense>} />
        <Route path="/journal/history-of-matcha" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="HistoryOfMatcha" queryClient={queryClient}><HistoryOfMatcha /></LayoutWrapper></Suspense>} />
        <Route path="/journal/science-of-lions-mane" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="ScienceOfLionsMane" queryClient={queryClient}><ScienceOfLionsMane /></LayoutWrapper></Suspense>} />
        <Route path="/journal/chaga-mushroom-antioxidant-king" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="ChagaMushroomAntioxidantKing" queryClient={queryClient}><ChagaMushroomAntioxidantKing /></LayoutWrapper></Suspense>} />
        <Route path="/journal/mushroom-coffee-vs-regular-coffee" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="MushroomCoffeeVsRegularCoffee" queryClient={queryClient}><MushroomCoffeeVsRegularCoffee /></LayoutWrapper></Suspense>} />
        <Route path="/journal/ceremonial-matcha-vs-culinary" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="CeremonialMatchaVsCulinary" queryClient={queryClient}><CeremonialMatchaVsCulinary /></LayoutWrapper></Suspense>} />
        <Route path="/journal/what-makes-premium-instant-coffee-different" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="PremiumInstantCoffeeDifference" queryClient={queryClient}><PremiumInstantCoffeeDifference /></LayoutWrapper></Suspense>} />

        {/* ── LEGACY REDIRECTS — old brand pages → current wellness brand ── */}
        {/* Coffee pods, patriotic apparel, collectibles, historical figure blends all → /shop */}
        <Route path="/coffee-pods" element={<Navigate to="/shop" replace />} />
        <Route path="/pods" element={<Navigate to="/shop" replace />} />
        <Route path="/pod" element={<Navigate to="/shop" replace />} />
        <Route path="/founders-series" element={<Navigate to="/shop" replace />} />
        <Route path="/founders" element={<Navigate to="/shop" replace />} />
        <Route path="/libertees" element={<Navigate to="/shop" replace />} />
        <Route path="/apparel" element={<Navigate to="/shop" replace />} />
        <Route path="/collectibles" element={<Navigate to="/shop" replace />} />
        <Route path="/patriotic" element={<Navigate to="/shop" replace />} />
        <Route path="/patriotic-coffee" element={<Navigate to="/shop" replace />} />
        <Route path="/lincoln" element={<Navigate to="/shop" replace />} />
        <Route path="/washington" element={<Navigate to="/shop" replace />} />
        <Route path="/jefferson" element={<Navigate to="/shop" replace />} />
        <Route path="/reagan" element={<Navigate to="/shop" replace />} />
        <Route path="/historical" element={<Navigate to="/shop" replace />} />
        <Route path="/liberty" element={<Navigate to="/shop" replace />} />
        <Route path="/freedom" element={<Navigate to="/shop" replace />} />
        <Route path="/american-heroes" element={<Navigate to="/shop" replace />} />
        <Route path="/christ-is-king" element={<Navigate to="/shop" replace />} />
        <Route path="/god-family-country" element={<Navigate to="/shop" replace />} />
        <Route path="/faith-over-fear" element={<Navigate to="/shop" replace />} />
        <Route path="/we-the-people" element={<Navigate to="/shop" replace />} />
        <Route path="/freedom-isnt-free" element={<Navigate to="/shop" replace />} />
        <Route path="/t-shirts" element={<Navigate to="/shop" replace />} />
        <Route path="/hoodies" element={<Navigate to="/shop" replace />} />
        <Route path="/hats" element={<Navigate to="/shop" replace />} />
        <Route path="/mugs" element={<Navigate to="/shop" replace />} />
        <Route path="/stickers" element={<Navigate to="/shop" replace />} />
        <Route path="/flags" element={<Navigate to="/shop" replace />} />
        <Route path="/bobbleheads" element={<Navigate to="/shop" replace />} />

        {/* ── TORCH COMMAND (INTERNAL) — ALL REDIRECT TO HOMEPAGE ── */}
        <Route path="/command" element={<Navigate to="/" replace />} />
        <Route path="/command/*" element={<Navigate to="/" replace />} />
        <Route path="/command/quiz" element={<Navigate to="/" replace />} />
        <Route path="/command/timer" element={<Navigate to="/" replace />} />
        <Route path="/command/protocols" element={<Navigate to="/" replace />} />
        <Route path="/command/protocols/:slug" element={<Navigate to="/" replace />} />
        <Route path="/command/admin" element={<Navigate to="/" replace />} />
        <Route path="/TorchCommandHome" element={<Navigate to="/" replace />} />
        <Route path="/CognitiveQuiz" element={<Navigate to="/" replace />} />
        <Route path="/FlowTimer" element={<Navigate to="/" replace />} />
        <Route path="/ProtocolsDirectory" element={<Navigate to="/" replace />} />
        <Route path="/ProtocolDetail" element={<Navigate to="/" replace />} />
        <Route path="/AdminCommand" element={<Navigate to="/" replace />} />
        <Route path="/AdminBlogEditor" element={<Navigate to="/" replace />} />

        <Route path="*" element={<Suspense fallback={<PageLoader />}><PageNotFound /></Suspense>} />
      </Routes>
      <BottomTabs />
      </AnimatePresence>
      <Footer />
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
              <AuthenticatedApp queryClient={queryClientInstance} />
              <CartToast />
              <ReviewPopup />
              <EmailCapturePopup />
              <ExitIntentPopup />
            </NavigationProvider>
          </Router>
          <Toaster />
        </CartProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App