import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { NavigationProvider } from '@/contexts/NavigationContext'
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider } from '@/lib/AuthContext';
import React, { Suspense, lazy, useEffect } from 'react';
import PageTransition from './components/PageTransition';
import ScrollToTop from './components/ScrollToTop';
import PullToRefresh from './components/mobile/PullToRefresh';
import { CartProvider } from '@/contexts/CartContext';
import UnifiedHeader from './components/navigation/UnifiedHeader';
import Footer from './components/navigation/Footer';
// Spin wheel disabled — promotion stack cleanup per profit-first audit.
// Re-enable only after discount codes, prize logic, and stacking rules are verified.
// import SpinWheelPopup from './components/spinwheel/SpinWheelPopup';
import CommerceNotice from './components/commerce/CommerceNotice';
import AddToCartConfirmation from './components/cart/AddToCartConfirmation';
import BottomTabs from './components/mobile/BottomTabs';
import AdminGuard from './components/seo/AdminGuard';
import ProtectedRoute from '@/components/ProtectedRoute';
import ErrorBoundary from '@/components/ErrorBoundary';
import NoIndex from './components/seo/NoIndex';
import GoneRedirect from './components/seo/GoneRedirect';
import RouteSeoManager from './components/seo/RouteSeoManager';
import useAnalytics from './hooks/useAnalytics';
import TechLayer from './components/motion/TechLayer';

// ── Mushroom Coffee Pages (Lazy Loaded) ──
const Home = lazy(() => import('./pages/Home'));
const MushroomShop = lazy(() => import('./pages/MushroomShop'));

const MushroomBundle = lazy(() => import('./pages/MushroomBundle'));
const BlendDetail = lazy(() => import('./pages/BlendDetail'));
const RitualProductPage = lazy(() => import('./pages/RitualProductPage.jsx'));
const BlendsCollection = lazy(() => import('./pages/BlendsCollection'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Journal = lazy(() => import('./pages/Journal'));
const Profile = lazy(() => import('./pages/Profile'));
const LoyaltyPortal = lazy(() => import('./pages/LoyaltyPortal'));
const OrderStatusAssistant = lazy(() => import('./pages/OrderStatusAssistant.jsx'));
const TorchbearersRewards = lazy(() => import('./pages/TorchbearersRewards'));
const Cart = lazy(() => import('./pages/Cart'));
const CartRedirect = lazy(() => import('./components/cart/CartRedirect'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
const Restocking = lazy(() => import('./pages/Restocking'));
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
const BlendAdvisor = lazy(() => import('./pages/BlendAdvisor'));
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
const TrafficGrowthCenter = lazy(() => import('./pages/TrafficGrowthCenter.jsx'));
const JournalHub = lazy(() => import('./pages/JournalHub.jsx'));
const MushroomCoffeeVsRegularCoffee = lazy(() => import('./pages/blog/MushroomCoffeeVsRegularCoffee.jsx'));
const CoffeePodsPlasticWasteMicroplastics = lazy(() => import('./pages/blog/CoffeePodsPlasticWasteMicroplastics.jsx'));
const CeremonialMatchaVsCulinary = lazy(() => import('./pages/blog/CeremonialMatchaVsCulinary.jsx'));
const PremiumInstantCoffeeDifference = lazy(() => import('./pages/blog/PremiumInstantCoffeeDifference.jsx'));
const FAQIndex = lazy(() => import('./pages/FAQIndex.jsx'));
const FAQPage = lazy(() => import('./pages/FAQPage.jsx'));
const IngredientPage = lazy(() => import('./pages/IngredientPage.jsx'));
const ComparisonPage = lazy(() => import('./pages/ComparisonPage.jsx'));
const AuthorPage = lazy(() => import('./pages/AuthorPage.jsx'));
const LionsManeMushroomCoffeePage = lazy(() => import('./pages/seo/LionsManeMushroomCoffeePage.jsx'));
const ChagaMushroomCoffeePage = lazy(() => import('./pages/seo/ChagaMushroomCoffeePage.jsx'));
const ReishiMushroomCoffeePage = lazy(() => import('./pages/seo/ReishiMushroomCoffeePage.jsx'));
const CeremonialMatchaPage = lazy(() => import('./pages/seo/CeremonialMatchaPage.jsx'));
const FreezeDriedInstantCoffeePage = lazy(() => import('./pages/seo/FreezeDriedInstantCoffeePage.jsx'));
const ComparisonCenter = lazy(() => import('./pages/ComparisonCenter.jsx'));
const RyzeVsTorchRepublic = lazy(() => import('./pages/compare/RyzeVsTorchRepublic.jsx'));
const FourSigmaticVsTorchRepublic = lazy(() => import('./pages/compare/FourSigmaticVsTorchRepublic.jsx'));
const MudwtrVsTorchRepublic = lazy(() => import('./pages/compare/MudwtrVsTorchRepublic.jsx'));
const EverydayDoseVsTorchRepublic = lazy(() => import('./pages/compare/EverydayDoseVsTorchRepublic.jsx'));
const FounderStory = lazy(() => import('./pages/FounderStory.jsx'));
const MorningRitualCollection = lazy(() => import('./pages/MorningRitualCollection.jsx'));
const FocusCoffeeCollection = lazy(() => import('./pages/FocusCoffeeCollection.jsx'));
const TravelCoffeeCollection = lazy(() => import('./pages/TravelCoffeeCollection.jsx'));

// ── SEO Keyword Landing Pages ──
const CoffeePodAlternatives = lazy(() => import('./pages/seo/CoffeePodAlternatives.jsx'));
const CoffeeWithoutMachine = lazy(() => import('./pages/seo/CoffeeWithoutMachine.jsx'));
const CampingCoffee = lazy(() => import('./pages/seo/CampingCoffee.jsx'));
const HealthyCoffeeAlternatives = lazy(() => import('./pages/seo/HealthyCoffeeAlternatives.jsx'));
const CoffeeRituals = lazy(() => import('./pages/seo/CoffeeRituals.jsx'));
const MatchaVsCoffee = lazy(() => import('./pages/seo/MatchaVsCoffee.jsx'));
const PapuaNewGuineaCoffee = lazy(() => import('./pages/seo/PapuaNewGuineaCoffee.jsx'));
const MushroomCoffeeVsCoffeePods = lazy(() => import('./pages/compare/MushroomCoffeeVsCoffeePods.jsx'));
const InstantCoffeeVsKCups = lazy(() => import('./pages/compare/InstantCoffeeVsKCups.jsx'));
const SwitchFromPods = lazy(() => import('./pages/SwitchFromPods.jsx'));
const PortfolioCaseStudy = lazy(() => import('./pages/PortfolioCaseStudy.jsx'));
const LukesLightCaseStudy = lazy(() => import('./pages/LukesLightCaseStudy.jsx'));
const PortfolioHome = lazy(() => import('./pages/PortfolioHome.jsx'));
const SpecialEditions = lazy(() => import('./pages/SpecialEditions'));
const SpecialEditionCollection = lazy(() => import('./pages/SpecialEditionCollection'));
const SpecialEditionProduct = lazy(() => import('./pages/SpecialEditionProduct'));
const AdminSpecialEditions = lazy(() => import('./pages/AdminSpecialEditions'));

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

// Preserve slug on case-insensitive /Journal/:slug → /journal/:slug (was dropping the slug to /journal)
const JournalSlugRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/journal/${slug}`} replace />;
};

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
  // SPA analytics — fires exactly one page_view per route change
  useAnalytics();
  // Standalone portfolio route renders without storefront chrome (header/footer/tabs)
  // Domain-aware routing: lisakocian.com serves the portfolio directly (no storefront chrome).
  // torchrepublic.com (and all other hosts) serve the storefront. /portfolio path still works on any host.
  const isPortfolioDomain = typeof window !== 'undefined' && /lisakocian\.com$/.test(window.location.hostname);
  const isStandalonePortfolio = isPortfolioDomain || location.pathname.startsWith('/portfolio');
  return (
    <div className="flex flex-col min-h-screen">
      {!isStandalonePortfolio && <UnifiedHeader />}
      <div className="flex-1 flex flex-col">
      <ErrorBoundary resetKey={location.pathname}>
      <ScrollToTop />
      <AnimatePresence>
      <Routes location={location} key={location.pathname}>


        {/* ── PORTFOLIO DOMAIN: lisakocian.com serves the portfolio at root ── */}
        {isPortfolioDomain && (
          <>
          <Route path="/" element={<Suspense fallback={<PageLoader />}><PortfolioHome /></Suspense>} />
          <Route path="/case-study" element={<Suspense fallback={<PageLoader />}><PortfolioCaseStudy /></Suspense>} />
          <Route path="/case-study/lukes-light" element={<Suspense fallback={<PageLoader />}><LukesLightCaseStudy /></Suspense>} />
          <Route path="/*" element={<Navigate to="/" replace />} />
          </>
        )}

        {/* ── STOREFRONT DOMAIN: torchrepublic.com and all other routes ── */}
        {!isPortfolioDomain && (
        <>
        {/* ── AUTH — noindex: login/account pages must not appear in search ── */}
        <Route path="/login" element={<Suspense fallback={<PageLoader />}><NoIndex /><Login /></Suspense>} />
        <Route path="/register" element={<Suspense fallback={<PageLoader />}><NoIndex /><Register /></Suspense>} />
        <Route path="/forgot-password" element={<Suspense fallback={<PageLoader />}><NoIndex /><ForgotPassword /></Suspense>} />
        <Route path="/reset-password" element={<Suspense fallback={<PageLoader />}><NoIndex /><ResetPassword /></Suspense>} />

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
        <Route path="/shop/instant-mushroom-coffee" element={<Navigate to="/products/instant-mushroom-coffee" replace />} />
        <Route path="/shop/instant-coffee" element={<Navigate to="/products/instant-classic-coffee" replace />} />
        <Route path="/shop/matcha" element={<Navigate to="/shop" replace />} />
        {/* Legacy routes for backward compatibility */}
        <Route path="/classic-coffee" element={<Navigate to="/products/instant-classic-coffee" replace />} />
        <Route path="/mushroom-coffee" element={<Navigate to="/products/instant-mushroom-coffee" replace />} />
        <Route path="/matcha" element={<Navigate to="/shop" replace />} />
        <Route path="/blends" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="BlendsCollection" queryClient={queryClient}><BlendsCollection /></LayoutWrapper></Suspense>} />
        <Route path="/blends/:slug" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="BlendDetail" queryClient={queryClient}><BlendDetail /></LayoutWrapper></Suspense>} />
        <Route path="/products/ceremonial-matcha" element={<Navigate to="/shop" replace />} />
        <Route path="/products/the-alchemist" element={<Navigate to="/shop" replace />} />
        <Route path="/products/the-alchemist-matcha" element={<Navigate to="/shop" replace />} />
        <Route path="/products/the-alchemist-matcha-blend" element={<Navigate to="/shop" replace />} />
        <Route path="/products/the-monk" element={<Navigate to="/shop" replace />} />
        <Route path="/products/the-monk-matcha" element={<Navigate to="/shop" replace />} />
        <Route path="/products/the-monk-matcha-blend" element={<Navigate to="/shop" replace />} />
        <Route path="/products/the-ascendant" element={<Navigate to="/shop" replace />} />
        <Route path="/products/:slug" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="RitualProductPage" queryClient={queryClient}><RitualProductPage /></LayoutWrapper></Suspense>} />

        {/* ── SPECIAL EDITIONS ── */}
        <Route path="/special-editions" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="SpecialEditions" queryClient={queryClient}><SpecialEditions /></LayoutWrapper></Suspense>} />
        <Route path="/special-editions/collections/:collectionSlug" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="SpecialEditionCollection" queryClient={queryClient}><SpecialEditionCollection /></LayoutWrapper></Suspense>} />
        <Route path="/special-editions/halloween" element={<Navigate to="/special-editions/collections/halloween" replace />} />
        <Route path="/special-editions/:slug" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="SpecialEditionProduct" queryClient={queryClient}><SpecialEditionProduct /></LayoutWrapper></Suspense>} />
        {/* Legacy whole-bean URL → format-neutral page, keeping the intended selection */}
        <Route path="/products/pumpkin-spice-whole-bean-coffee" element={<Navigate to="/special-editions/pumpkin-spice?format=whole-bean" replace />} />
        <Route path="/bundle" element={<Navigate to="/build-your-ritual" replace />} />
        <Route path="/how-it-works" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="HowItWorks" queryClient={queryClient}><HowItWorks /></LayoutWrapper></Suspense>} />
        <Route path="/reviews" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="Reviews" queryClient={queryClient}><Reviews /></LayoutWrapper></Suspense>} />
        <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
          <Route path="/profile" element={<Suspense fallback={<PageLoader />}><NoIndex /><LayoutWrapper currentPageName="Profile" queryClient={queryClient}><Profile /></LayoutWrapper></Suspense>} />
          <Route path="/loyalty" element={<Suspense fallback={<PageLoader />}><NoIndex /><LayoutWrapper currentPageName="LoyaltyPortal" queryClient={queryClient}><LoyaltyPortal /></LayoutWrapper></Suspense>} />
          <Route path="/order-status" element={<Suspense fallback={<PageLoader />}><NoIndex /><LayoutWrapper currentPageName="OrderStatusAssistant" queryClient={queryClient}><OrderStatusAssistant /></LayoutWrapper></Suspense>} />
        </Route>
        <Route path="/torchbearers-rewards" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="TorchbearersRewards" queryClient={queryClient}><TorchbearersRewards /></LayoutWrapper></Suspense>} />
        <Route path="/cart" element={<Suspense fallback={<PageLoader />}><NoIndex /><LayoutWrapper currentPageName="Cart" queryClient={queryClient}><Cart /></LayoutWrapper></Suspense>} />
        <Route path="/checkout" element={<Suspense fallback={<PageLoader />}><NoIndex /><LayoutWrapper currentPageName="Cart" queryClient={queryClient}><Cart /></LayoutWrapper></Suspense>} />
        <Route path="/order-confirmation" element={<Suspense fallback={<PageLoader />}><NoIndex /><LayoutWrapper currentPageName="OrderConfirmation" queryClient={queryClient}><OrderConfirmation /></LayoutWrapper></Suspense>} />
        <Route path="/restocking" element={<Suspense fallback={<PageLoader />}><NoIndex /><LayoutWrapper currentPageName="Restocking" queryClient={queryClient}><Restocking /></LayoutWrapper></Suspense>} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/our-story" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="OurMission" queryClient={queryClient}><OurMission /></LayoutWrapper></Suspense>} />
        <Route path="/mission" element={<Navigate to="/our-story" replace />} />
        <Route path="/contact" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="Contact" queryClient={queryClient}><Contact /></LayoutWrapper></Suspense>} />
        <Route path="/torchbearer" element={<Navigate to="/products/instant-classic-coffee" replace />} />
        <Route path="/about" element={<Navigate to="/our-story" replace />} />
        
        {/* ── ADMIN / INTERNAL PAGES — ALL REDIRECT TO HOMEPAGE (NO PUBLIC ACCESS) ── */}
        <Route path="/traffic-report" element={<Navigate to="/" replace />} />
        <Route path="/TrafficReport" element={<Navigate to="/" replace />} />
        <Route path="/email-campaign" element={<Suspense fallback={<PageLoader />}><NoIndex /><AdminGuard><LayoutWrapper currentPageName="EmailCampaignDashboard" queryClient={queryClient}><EmailCampaignDashboard /></LayoutWrapper></AdminGuard></Suspense>} />
        <Route path="/email-campaign-dashboard" element={<Navigate to="/email-campaign" replace />} />
        <Route path="/admin" element={<Navigate to="/admin/shopify" replace />} />
        <Route path="/admin/shopify" element={<Suspense fallback={<PageLoader />}><NoIndex /><AdminGuard><LayoutWrapper currentPageName="AdminShopify" queryClient={queryClient}><AdminShopify /></LayoutWrapper></AdminGuard></Suspense>} />
        <Route path="/admin/keywords" element={<Suspense fallback={<PageLoader />}><NoIndex /><AdminGuard><LayoutWrapper currentPageName="KeywordAnalysis" queryClient={queryClient}><KeywordAnalysis /></LayoutWrapper></AdminGuard></Suspense>} />
        <Route path="/admin/traffic" element={<Suspense fallback={<PageLoader />}><NoIndex /><AdminGuard><TrafficGrowthCenter /></AdminGuard></Suspense>} />
        <Route path="/admin/blog" element={<Suspense fallback={<PageLoader />}><NoIndex /><AdminGuard><AdminBlogEditor /></AdminGuard></Suspense>} />
        <Route path="/admin/special-editions" element={<Suspense fallback={<PageLoader />}><NoIndex /><AdminGuard><LayoutWrapper currentPageName="AdminSpecialEditions" queryClient={queryClient}><AdminSpecialEditions /></LayoutWrapper></AdminGuard></Suspense>} />
        <Route path="/admin/blog/:slug" element={<Suspense fallback={<PageLoader />}><NoIndex /><AdminGuard><AdminBlogEditor /></AdminGuard></Suspense>} />
        <Route path="/Admin" element={<Navigate to="/admin/shopify" replace />} />
        <Route path="/Dashboard" element={<Navigate to="/admin/shopify" replace />} />
        <Route path="/SEO" element={<Navigate to="/" replace />} />
        <Route path="/seo" element={<Navigate to="/" replace />} />
        <Route path="/SearchQueryAnalysis" element={<Navigate to="/" replace />} />
        <Route path="/search-query-analysis" element={<Navigate to="/" replace />} />
        <Route path="/LocalSEO" element={<Navigate to="/" replace />} />
        <Route path="/AdminShopify" element={<Navigate to="/admin/shopify" replace />} />
        <Route path="/ProductSync" element={<Navigate to="/admin/shopify" replace />} />
        <Route path="/product-sync" element={<Navigate to="/admin/shopify" replace />} />
        <Route path="/products" element={<Navigate to="/shop" replace />} />
        <Route path="/KeywordAnalysis" element={<Navigate to="/admin/keywords" replace />} />
        <Route path="/BlendDetail" element={<Navigate to="/shop" replace />} />
        <Route path="/blenddetail" element={<Navigate to="/shop" replace />} />
        <Route path="/MushroomShop" element={<Navigate to="/shop" replace />} />
        <Route path="/mushroomshop" element={<Navigate to="/shop" replace />} />
        <Route path="/BuildYourRitual" element={<Navigate to="/build-your-ritual" replace />} />
        <Route path="/emailcampaigndashboard" element={<Navigate to="/email-campaign" replace />} />
        <Route path="/EmailCampaignDashboard" element={<Navigate to="/email-campaign" replace />} />
        <Route path="/CustomerPortal" element={<Navigate to="/" replace />} />
        <Route path="/customerportal" element={<Navigate to="/" replace />} />
        <Route path="/portal" element={<Navigate to="/" replace />} />
        <Route path="/Portal" element={<Navigate to="/" replace />} />
        <Route path="/LoyaltyPortal" element={<Navigate to="/" replace />} />
        <Route path="/loyaltyportal" element={<Navigate to="/" replace />} />
        <Route path="/Profile" element={<Navigate to="/profile" replace />} />
        <Route path="/Subscription" element={<Navigate to="/subscription" replace />} />
        <Route path="/Loyalty" element={<Navigate to="/loyalty" replace />} />
        <Route path="/Apparel" element={<GoneRedirect />} />
        <Route path="/Shop" element={<Navigate to="/shop" replace />} />
        <Route path="/rewards" element={<Navigate to="/torchbearers-rewards" replace />} />
        <Route path="/loyalty-program" element={<Navigate to="/torchbearers-rewards" replace />} />
        <Route path="/account" element={<Navigate to="/profile" replace />} />
        <Route path="/account/login" element={<Navigate to="/login" replace />} />
        <Route path="/account/register" element={<Navigate to="/register" replace />} />
        <Route path="/account/orders" element={<Navigate to="/profile" replace />} />
        <Route path="/our-mission" element={<Navigate to="/our-story" replace />} />
        <Route path="/about-us" element={<Navigate to="/our-story" replace />} />
        <Route path="/blogs/news" element={<Navigate to="/journal" replace />} />
        <Route path="/blogs/news/:slug" element={<Navigate to="/journal" replace />} />
        <Route path="/blog" element={<Navigate to="/journal" replace />} />
        <Route path="/pages/about-us" element={<Navigate to="/our-story" replace />} />
        <Route path="/pages/about" element={<Navigate to="/our-story" replace />} />
        <Route path="/pages/contact" element={<Navigate to="/contact" replace />} />
        <Route path="/pages/faq" element={<Navigate to="/faq" replace />} />
        <Route path="/pages/shipping" element={<Navigate to="/shipping-policy" replace />} />
        <Route path="/pages/returns" element={<Navigate to="/return-policy" replace />} />
        <Route path="/pages/privacy" element={<Navigate to="/privacy-policy" replace />} />
        <Route path="/pages/terms" element={<Navigate to="/terms-of-service" replace />} />

        {/* ── DUPLICATE CONTENT → CANONICAL (301) ── */}
        {/* Old /seo/ PascalCase landing pages → clean lowercase canonicals */}
        <Route path="/seo/CoffeePodAlternatives" element={<Navigate to="/coffee-pod-alternatives" replace />} />
        <Route path="/seo/PapuaNewGuineaCoffee" element={<Navigate to="/papua-new-guinea-coffee" replace />} />
        {/* Old /knowledge/ pages → canonical SEO landing pages */}
        <Route path="/knowledge/PapuaNewGuineaCoffee" element={<Navigate to="/papua-new-guinea-coffee" replace />} />
        <Route path="/knowledge/BestCoffeeWithoutCoffeeMaker" element={<Navigate to="/coffee-without-a-machine" replace />} />
        <Route path="/knowledge/CoffeePodsVsInstantCoffee" element={<Navigate to="/compare/instant-coffee-vs-k-cups" replace />} />
        {/* Old /blog/ PascalCase articles → canonical /journal/ slug */}
        <Route path="/blog/ChagaMushroomCoffee" element={<Navigate to="/journal/chaga-mushroom-coffee" replace />} />
        <Route path="/blog/LionsManeMushroomCoffee" element={<Navigate to="/journal/lions-mane-mushroom-coffee" replace />} />
        <Route path="/blog/BestInstantCoffee" element={<Navigate to="/journal/best-instant-coffee" replace />} />
        <Route path="/blog/MatchaBenefits" element={<Navigate to="/journal/matcha-benefits" replace />} />

        <Route path="/recipes" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="CoffeeRecipes" queryClient={queryClient}><CoffeeRecipes /></LayoutWrapper></Suspense>} />
        <Route path="/research" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="ResearchHub" queryClient={queryClient}><ResearchHub /></LayoutWrapper></Suspense>} />
        <Route path="/quiz" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="BlendQuiz" queryClient={queryClient}><BlendQuiz /></LayoutWrapper></Suspense>} />
        <Route path="/blend-advisor" element={<Suspense fallback={<PageLoader />}><NoIndex /><LayoutWrapper currentPageName="BlendAdvisor" queryClient={queryClient}><BlendAdvisor /></LayoutWrapper></Suspense>} />
        <Route path="/customer-spotlight" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="CustomerSpotlight" queryClient={queryClient}><CustomerSpotlight /></LayoutWrapper></Suspense>} />
        <Route path="/spotlight" element={<Navigate to="/customer-spotlight" replace />} />
        <Route path="/gifts" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="Gifts" queryClient={queryClient}><Gifts /></LayoutWrapper></Suspense>} />
        <Route path="/journal" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="Journal" queryClient={queryClient}><JournalHub /></LayoutWrapper></Suspense>} />
        <Route path="/journal/:slug" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="BlogPost" queryClient={queryClient}><BlogPost /></LayoutWrapper></Suspense>} />
        <Route path="/build-your-ritual" element={<Navigate to="/shop" replace />} />
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
        <Route path="/why-matcha" element={<Navigate to="/journal" replace />} />

        {/* ── PAID-AD LANDING PAGE ── */}
        <Route path="/switch-from-pods" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="SwitchFromPods" queryClient={queryClient}><SwitchFromPods /></LayoutWrapper></Suspense>} />

        {/* ── STANDALONE PROFESSIONAL PORTFOLIO (no storefront chrome) ── */}
        <Route path="/portfolio" element={<Suspense fallback={<PageLoader />}><PortfolioHome /></Suspense>} />
        <Route path="/portfolio/case-study" element={<Suspense fallback={<PageLoader />}><PortfolioCaseStudy /></Suspense>} />
        <Route path="/portfolio/case-study/lukes-light" element={<Suspense fallback={<PageLoader />}><LukesLightCaseStudy /></Suspense>} />
        {/* Legacy portfolio URL → canonical case-study route */}
        <Route path="/portfolio/torch-republic-ecommerce-build" element={<Navigate to="/portfolio/case-study" replace />} />

        {/* ── SEO KEYWORD LANDING PAGES ── */}
        <Route path="/coffee-pod-alternatives" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="CoffeePodAlternatives" queryClient={queryClient}><CoffeePodAlternatives /></LayoutWrapper></Suspense>} />
        <Route path="/coffee-without-a-machine" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="CoffeeWithoutMachine" queryClient={queryClient}><CoffeeWithoutMachine /></LayoutWrapper></Suspense>} />
        <Route path="/camping-coffee" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="CampingCoffee" queryClient={queryClient}><CampingCoffee /></LayoutWrapper></Suspense>} />
        <Route path="/healthy-coffee-alternatives" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="HealthyCoffeeAlternatives" queryClient={queryClient}><HealthyCoffeeAlternatives /></LayoutWrapper></Suspense>} />
        <Route path="/coffee-rituals" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="CoffeeRituals" queryClient={queryClient}><CoffeeRituals /></LayoutWrapper></Suspense>} />
        <Route path="/matcha-vs-coffee" element={<Navigate to="/journal" replace />} />
        <Route path="/papua-new-guinea-coffee" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="PapuaNewGuineaCoffee" queryClient={queryClient}><PapuaNewGuineaCoffee /></LayoutWrapper></Suspense>} />

        {/* ── BLOG POSTS ── */}
        <Route path="/journal/lions-mane-mushroom-coffee" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="LionsManeMushroomCoffee" queryClient={queryClient}><LionsManeMushroomCoffee /></LayoutWrapper></Suspense>} />
        <Route path="/journal/chaga-mushroom-coffee" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="ChagaMushroomCoffee" queryClient={queryClient}><ChagaMushroomCoffee /></LayoutWrapper></Suspense>} />
        <Route path="/journal/instant-ceremonial-matcha" element={<Navigate to="/journal" replace />} />
        <Route path="/journal/mushroom-coffee-benefits" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="MushroomCoffeeBenefitsGuide" queryClient={queryClient}><MushroomCoffeeBenefitsGuide /></LayoutWrapper></Suspense>} />
        <Route path="/journal/best-instant-coffee" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="BestInstantCoffee" queryClient={queryClient}><BestInstantCoffee /></LayoutWrapper></Suspense>} />
        <Route path="/journal/matcha-benefits" element={<Navigate to="/journal" replace />} />
        <Route path="/journal/coffee-and-focus" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="CoffeeAndFocusGuide" queryClient={queryClient}><CoffeeAndFocusGuide /></LayoutWrapper></Suspense>} />
        <Route path="/journal/morning-ritual-for-focus" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="MorningRitualGuide" queryClient={queryClient}><MorningRitualGuide /></LayoutWrapper></Suspense>} />
        <Route path="/journal/adaptogens-guide" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="AdaptogensGuide" queryClient={queryClient}><AdaptogensGuide /></LayoutWrapper></Suspense>} />
        <Route path="/journal/history-of-mushroom-coffee" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="HistoryOfMushroomCoffee" queryClient={queryClient}><HistoryOfMushroomCoffee /></LayoutWrapper></Suspense>} />
        <Route path="/journal/history-of-matcha" element={<Navigate to="/journal" replace />} />
        <Route path="/journal/science-of-lions-mane" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="ScienceOfLionsMane" queryClient={queryClient}><ScienceOfLionsMane /></LayoutWrapper></Suspense>} />
        <Route path="/journal/chaga-mushroom-antioxidant-king" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="ChagaMushroomAntioxidantKing" queryClient={queryClient}><ChagaMushroomAntioxidantKing /></LayoutWrapper></Suspense>} />
        {/* mushroom-coffee-vs-regular-coffee now served from DB via /journal/:slug */}
        <Route path="/journal/coffee-pods-plastic-waste-microplastics" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="CoffeePodsPlasticWasteMicroplastics" queryClient={queryClient}><CoffeePodsPlasticWasteMicroplastics /></LayoutWrapper></Suspense>} />
        {/* /Journal (uppercase) → /journal (lowercase) — single canonical Journal URL */}
        <Route path="/Journal" element={<Navigate to="/journal" replace />} />
        <Route path="/Journal/:slug" element={<JournalSlugRedirect />} />
        <Route path="/journal/ceremonial-matcha-vs-culinary" element={<Navigate to="/journal" replace />} />
        <Route path="/journal/what-makes-premium-instant-coffee-different" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="PremiumInstantCoffeeDifference" queryClient={queryClient}><PremiumInstantCoffeeDifference /></LayoutWrapper></Suspense>} />

        {/* ── FAQ LIBRARY ── */}
        <Route path="/faq" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="FAQIndex" queryClient={queryClient}><FAQIndex /></LayoutWrapper></Suspense>} />
        <Route path="/faq/:slug" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="FAQPage" queryClient={queryClient}><FAQPage /></LayoutWrapper></Suspense>} />

        {/* ── INGREDIENT EDUCATIONAL PAGES (SEO) ── */}
        <Route path="/ingredients/lions-mane-mushroom-coffee" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="LionsManeMushroomCoffeePage" queryClient={queryClient}><LionsManeMushroomCoffeePage /></LayoutWrapper></Suspense>} />
        <Route path="/ingredients/chaga-mushroom-coffee" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="ChagaMushroomCoffeePage" queryClient={queryClient}><ChagaMushroomCoffeePage /></LayoutWrapper></Suspense>} />
        <Route path="/ingredients/reishi-mushroom-coffee" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="ReishiMushroomCoffeePage" queryClient={queryClient}><ReishiMushroomCoffeePage /></LayoutWrapper></Suspense>} />
        <Route path="/ingredients/ceremonial-matcha" element={<Navigate to="/ingredients" replace />} />
        <Route path="/ingredients/freeze-dried-instant-coffee" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="FreezeDriedInstantCoffeePage" queryClient={queryClient}><FreezeDriedInstantCoffeePage /></LayoutWrapper></Suspense>} />
        {/* ── INGREDIENT DEEP DIVES ── */}
        <Route path="/ingredients/:slug" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="IngredientPage" queryClient={queryClient}><IngredientPage /></LayoutWrapper></Suspense>} />

        {/* ── COMPARISON CENTER ── */}
        <Route path="/compare" element={<Navigate to="/shop" replace />} />
        {/* Dedicated rich competitor pages */}
        <Route path="/compare/ryze-vs-torch-republic" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="RyzeVsTorchRepublic" queryClient={queryClient}><RyzeVsTorchRepublic /></LayoutWrapper></Suspense>} />
        <Route path="/compare/four-sigmatic-vs-torch-republic" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="FourSigmaticVsTorchRepublic" queryClient={queryClient}><FourSigmaticVsTorchRepublic /></LayoutWrapper></Suspense>} />
        <Route path="/compare/mudwtr-vs-torch-republic" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="MudwtrVsTorchRepublic" queryClient={queryClient}><MudwtrVsTorchRepublic /></LayoutWrapper></Suspense>} />
        <Route path="/compare/everyday-dose-vs-torch-republic" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="EverydayDoseVsTorchRepublic" queryClient={queryClient}><EverydayDoseVsTorchRepublic /></LayoutWrapper></Suspense>} />
        <Route path="/compare/mushroom-coffee-vs-coffee-pods" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="MushroomCoffeeVsCoffeePods" queryClient={queryClient}><MushroomCoffeeVsCoffeePods /></LayoutWrapper></Suspense>} />
        <Route path="/compare/instant-coffee-vs-k-cups" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="InstantCoffeeVsKCups" queryClient={queryClient}><InstantCoffeeVsKCups /></LayoutWrapper></Suspense>} />
        {/* ── DUPLICATE /compare/ PascalCase URLs → canonical lowercase (301) ── */}
        <Route path="/compare/RyzeVsTorchRepublic" element={<Navigate to="/compare/ryze-vs-torch-republic" replace />} />
        <Route path="/compare/FourSigmaticVsTorchRepublic" element={<Navigate to="/compare/four-sigmatic-vs-torch-republic" replace />} />
        <Route path="/compare/MudwtrVsTorchRepublic" element={<Navigate to="/compare/mudwtr-vs-torch-republic" replace />} />
        <Route path="/compare/MudWtrVsTorchRepublic" element={<Navigate to="/compare/mudwtr-vs-torch-republic" replace />} />
        <Route path="/compare/EverydayDoseVsTorchRepublic" element={<Navigate to="/compare/everyday-dose-vs-torch-republic" replace />} />
        <Route path="/compare/MushroomCoffeeVsCoffeePods" element={<Navigate to="/compare/mushroom-coffee-vs-coffee-pods" replace />} />
        <Route path="/compare/InstantCoffeeVsKCups" element={<Navigate to="/compare/instant-coffee-vs-k-cups" replace />} />
        {/* Fallback generic comparison page for remaining slugs */}
        <Route path="/compare/:slug" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="ComparisonPage" queryClient={queryClient}><ComparisonPage /></LayoutWrapper></Suspense>} />

        {/* ── AUTHOR / TEAM PAGE (E-E-A-T) ── */}
        <Route path="/about/torch-republic-team" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="AuthorPage" queryClient={queryClient}><AuthorPage /></LayoutWrapper></Suspense>} />

        {/* ── FOUNDER STORY ── */}
        <Route path="/founder-story" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="FounderStory" queryClient={queryClient}><FounderStory /></LayoutWrapper></Suspense>} />
        <Route path="/why-i-walked-away-from-coffee-pods" element={<Navigate to="/founder-story" replace />} />

        {/* ── KEYWORD COLLECTION PAGES ── */}
        <Route path="/shop/morning-ritual" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="MorningRitualCollection" queryClient={queryClient}><MorningRitualCollection /></LayoutWrapper></Suspense>} />
        <Route path="/shop/focus-coffee" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="FocusCoffeeCollection" queryClient={queryClient}><FocusCoffeeCollection /></LayoutWrapper></Suspense>} />
        <Route path="/shop/travel-coffee" element={<Suspense fallback={<PageLoader />}><LayoutWrapper currentPageName="TravelCoffeeCollection" queryClient={queryClient}><TravelCoffeeCollection /></LayoutWrapper></Suspense>} />

        {/* ── LEGACY REDIRECTS (301) — coffee/matcha adjacent old URLs → relevant current pages ── */}
        {/* Coffee pods had SEO value — send to instant coffee collection */}
        {/* ── RETIRED BLENDS → CLOSEST ACTIVE PRODUCT (301) ── */}
        {/* Mushroom blends that are no longer sold → the one mushroom coffee we carry */}
        <Route path="/products/glowmind-clarity" element={<Navigate to="/products/instant-mushroom-coffee" replace />} />
        <Route path="/products/glowmind-clarity-blend" element={<Navigate to="/products/instant-mushroom-coffee" replace />} />
        <Route path="/products/glowmind-clarity-instant-mushroom-coffee" element={<Navigate to="/products/instant-mushroom-coffee" replace />} />
        <Route path="/products/suncap-rise" element={<Navigate to="/products/instant-mushroom-coffee" replace />} />
        <Route path="/products/suncap-rise-instant-mushroom-coffee" element={<Navigate to="/products/instant-mushroom-coffee" replace />} />
        <Route path="/products/mooncap-restore" element={<Navigate to="/products/instant-mushroom-coffee" replace />} />
        <Route path="/products/dreamcap-blend" element={<Navigate to="/products/instant-mushroom-coffee" replace />} />
        <Route path="/products/mystic-bloom-blend" element={<Navigate to="/products/instant-mushroom-coffee" replace />} />
        <Route path="/products/the-oracle-blend" element={<Navigate to="/products/instant-mushroom-coffee" replace />} />
        {/* Retired classic-roast names → Instant Classic Coffee */}
        <Route path="/products/torchbearer" element={<Navigate to="/products/instant-classic-coffee" replace />} />
        <Route path="/products/ember-rise" element={<Navigate to="/products/instant-classic-coffee" replace />} />
        <Route path="/products/midnight-watch" element={<Navigate to="/products/instant-classic-coffee" replace />} />
        {/* Retired matcha line → the shop (matcha is no longer sold) */}
        <Route path="/products/the-monk-matcha-blend" element={<Navigate to="/shop" replace />} />
        <Route path="/products/the-ascendant-matcha-blend" element={<Navigate to="/shop" replace />} />
        <Route path="/products/the-alchemist-matcha-blend" element={<Navigate to="/shop" replace />} />
        <Route path="/blends/glowmind-clarity" element={<Navigate to="/products/instant-mushroom-coffee" replace />} />
        <Route path="/blends/suncap-rise" element={<Navigate to="/products/instant-mushroom-coffee" replace />} />
        <Route path="/blends/mooncap-restore" element={<Navigate to="/products/instant-mushroom-coffee" replace />} />
        <Route path="/blends/the-monk" element={<Navigate to="/shop" replace />} />
        <Route path="/coffee-pods" element={<Navigate to="/shop/instant-coffee" replace />} />
        <Route path="/pods" element={<Navigate to="/shop/instant-coffee" replace />} />
        <Route path="/pod" element={<Navigate to="/shop/instant-coffee" replace />} />
        {/* Patriotic coffee blends → mushroom coffee collection (closest product match) */}
        <Route path="/patriotic-coffee" element={<Navigate to="/shop/instant-mushroom-coffee" replace />} />
        {/* Founders series had some SEO equity → mushroom coffee (brand story angle) */}
        <Route path="/founders-series" element={<Navigate to="/shop/instant-mushroom-coffee" replace />} />
        <Route path="/founders" element={<Navigate to="/shop/instant-mushroom-coffee" replace />} />

        {/* ── 410 GONE — discontinued apparel, jewelry, collectibles ── */}
        {/* These pages no longer exist; 410 tells Google to drop them from index cleanly */}
        <Route path="/libertees" element={<GoneRedirect />} />
        <Route path="/apparel" element={<GoneRedirect />} />
        <Route path="/collectibles" element={<GoneRedirect />} />
        <Route path="/patriotic" element={<GoneRedirect />} />
        <Route path="/lincoln" element={<GoneRedirect />} />
        <Route path="/washington" element={<GoneRedirect />} />
        <Route path="/jefferson" element={<GoneRedirect />} />
        <Route path="/reagan" element={<GoneRedirect />} />
        <Route path="/historical" element={<GoneRedirect />} />
        <Route path="/liberty" element={<GoneRedirect />} />
        <Route path="/freedom" element={<GoneRedirect />} />
        <Route path="/american-heroes" element={<GoneRedirect />} />
        <Route path="/christ-is-king" element={<GoneRedirect />} />
        <Route path="/god-family-country" element={<GoneRedirect />} />
        <Route path="/faith-over-fear" element={<GoneRedirect />} />
        <Route path="/we-the-people" element={<GoneRedirect />} />
        <Route path="/freedom-isnt-free" element={<GoneRedirect />} />
        <Route path="/t-shirts" element={<GoneRedirect />} />
        <Route path="/hoodies" element={<GoneRedirect />} />
        <Route path="/hats" element={<GoneRedirect />} />
        <Route path="/mugs" element={<GoneRedirect />} />
        <Route path="/stickers" element={<GoneRedirect />} />
        <Route path="/flags" element={<GoneRedirect />} />
        <Route path="/bobbleheads" element={<GoneRedirect />} />
        {/* Jewelry — explicitly discontinued category */}
        <Route path="/jewelry" element={<GoneRedirect />} />
        <Route path="/necklaces" element={<GoneRedirect />} />
        <Route path="/bracelets" element={<GoneRedirect />} />
        <Route path="/rings" element={<GoneRedirect />} />
        <Route path="/collections/jewelry" element={<GoneRedirect />} />
        <Route path="/collections/jewelry-all" element={<GoneRedirect />} />
        <Route path="/collections/apparel" element={<GoneRedirect />} />
        <Route path="/collections/t-shirts" element={<GoneRedirect />} />
        <Route path="/collections/hoodies-sweatshirts" element={<GoneRedirect />} />
        <Route path="/collections/hats" element={<GoneRedirect />} />
        <Route path="/collections/tanks" element={<GoneRedirect />} />
        <Route path="/collections/magnets" element={<GoneRedirect />} />
        <Route path="/collections/stickers" element={<GoneRedirect />} />
        <Route path="/collections/flags" element={<GoneRedirect />} />
        <Route path="/collections/bobbleheads" element={<GoneRedirect />} />
        <Route path="/collections/hollywood-bobbles" element={<GoneRedirect />} />
        <Route path="/collections/candles" element={<GoneRedirect />} />
        <Route path="/collections/home-decor" element={<GoneRedirect />} />
        <Route path="/collections/men" element={<GoneRedirect />} />
        <Route path="/collections/women" element={<GoneRedirect />} />
        {/* Catch-all for any remaining /collections/* routes not individually mapped */}
        <Route path="/collections/:handle" element={<Navigate to="/shop" replace />} />

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
        </>
        )}
      </Routes>
      </AnimatePresence>
      </ErrorBoundary>
      {!isStandalonePortfolio && <RouteSeoManager />}
      {!isStandalonePortfolio && <BottomTabs />}
      </div>
      {!isStandalonePortfolio && <Footer />}
    </div>
  );
};

function App() {
  // Sync Tailwind dark class with OS-level prefers-color-scheme
  useEffect(() => {
    const root = document.documentElement;
    const apply = (dark) => {
      if (dark) root.classList.add('dark');
      else root.classList.remove('dark');
    };
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    apply(mq.matches);
    const handler = (e) => apply(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <CartProvider>
          <Router>
            <NavigationProvider>
              <AuthenticatedApp queryClient={queryClientInstance} />
              <TechLayer />
              <CommerceNotice />
              <AddToCartConfirmation />
            </NavigationProvider>
          </Router>
          <Toaster />
        </CartProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App