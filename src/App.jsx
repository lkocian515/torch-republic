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

import Bundles from './pages/Bundles';
import Cart from './pages/Cart';
import OrderConfirmation from './pages/OrderConfirmation';
import AdamsBlend from './pages/AdamsBlend';
import RooseveltBlend from './pages/RooseveltBlend';
import CoffeeCollection from './pages/CoffeeCollection';
import WashingtonBlend from './pages/WashingtonBlend';
import LincolnBlend from './pages/LincolnBlend';
import JeffersonBlend from './pages/JeffersonBlend';
import FranklinBlend from './pages/FranklinBlend';
import Journal from './pages/Journal';
import OnSale from './pages/OnSale';
import Profile from './pages/Profile';
import LadyLibertyBlend from './pages/LadyLibertyBlend';
import EaglesFlightBlend from './pages/EaglesFlightBlend';
import UncleSamsBoldBrew from './pages/UncleSamsBoldBrew';
import LibertyTorchBlend from './pages/LibertyTorchBlend';
import RosiesGrind from './pages/RosiesGrind';
import OldGloryHouseBlend from './pages/OldGloryHouseBlend';
import Shop from './pages/Shop';
import TheTorchBox from './pages/TheTorchBox';
import LibertyIcons from './pages/LibertyIcons';
import CommandersSeries from './pages/CommandersSeries';
import WomenOfTheRepublic from './pages/WomenOfTheRepublic';

import WashingtonQR from './pages/qr/WashingtonQR';
import JeffersonQR from './pages/qr/JeffersonQR';
import AdamsQR from './pages/qr/AdamsQR';
import FranklinQR from './pages/qr/FranklinQR';
import LincolnQR from './pages/qr/LincolnQR';
import RooseveltQR from './pages/qr/RooseveltQR';
import LibertyTorchQR from './pages/qr/LibertyTorchQR';
import LadyLibertyQR from './pages/qr/LadyLibertyQR';
import OldGloryQR from './pages/qr/OldGloryQR';
import UncleSamQR from './pages/qr/UncleSamQR';
import RosiesQR from './pages/qr/RosiesQR';
import EaglesFlightQR from './pages/qr/EaglesFlightQR';
import LandingPage from './pages/LandingPage';
import AbigailAdamsBlend from './pages/AbigailAdamsBlend';
import HarrietTubmanBlend from './pages/HarrietTubmanBlend';
import WashingtonPodsProduct from './pages/WashingtonPodsProduct';
import MugsTumblers from './pages/MugsTumblers';
import CoffeeBundles from './pages/CoffeeBundles';

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
      <Route path="/TheTorchBox" element={<LayoutWrapper currentPageName="TheTorchBox"><TheTorchBox /></LayoutWrapper>} />
      <Route path="/Journal" element={<LayoutWrapper currentPageName="Journal"><Journal /></LayoutWrapper>} />
      <Route path="/WashingtonBlend" element={<LayoutWrapper currentPageName="WashingtonBlend"><WashingtonBlend /></LayoutWrapper>} />
      <Route path="/products/washington-blend" element={<LayoutWrapper currentPageName="WashingtonBlend"><WashingtonBlend /></LayoutWrapper>} />
      <Route path="/JeffersonBlend" element={<LayoutWrapper currentPageName="JeffersonBlend"><JeffersonBlend /></LayoutWrapper>} />
      <Route path="/FranklinBlend" element={<LayoutWrapper currentPageName="FranklinBlend"><FranklinBlend /></LayoutWrapper>} />
      <Route path="/products/franklin-blend" element={<LayoutWrapper currentPageName="FranklinBlend"><FranklinBlend /></LayoutWrapper>} />
      <Route path="/LincolnBlend" element={<LayoutWrapper currentPageName="LincolnBlend"><LincolnBlend /></LayoutWrapper>} />
      <Route path="/AdamsBlend" element={<LayoutWrapper currentPageName="AdamsBlend"><AdamsBlend /></LayoutWrapper>} />
      <Route path="/RooseveltBlend" element={<LayoutWrapper currentPageName="RooseveltBlend"><RooseveltBlend /></LayoutWrapper>} />
      <Route path="/CoffeeCollection" element={<LayoutWrapper currentPageName="CoffeeCollection"><CoffeeCollection /></LayoutWrapper>} />
      <Route path="/Cart" element={<LayoutWrapper currentPageName="Cart"><Cart /></LayoutWrapper>} />
      <Route path="/Bundles" element={<LayoutWrapper currentPageName="Bundles"><Bundles /></LayoutWrapper>} />
      <Route path="/OrderConfirmation" element={<LayoutWrapper currentPageName="OrderConfirmation"><OrderConfirmation /></LayoutWrapper>} />
      <Route path="/LadyLibertyBlend" element={<LayoutWrapper currentPageName="LadyLibertyBlend"><LadyLibertyBlend /></LayoutWrapper>} />
      <Route path="/EaglesFlightBlend" element={<LayoutWrapper currentPageName="EaglesFlightBlend"><EaglesFlightBlend /></LayoutWrapper>} />
      <Route path="/UncleSamsBoldBrew" element={<LayoutWrapper currentPageName="UncleSamsBoldBrew"><UncleSamsBoldBrew /></LayoutWrapper>} />
      <Route path="/LibertyTorchBlend" element={<LayoutWrapper currentPageName="LibertyTorchBlend"><LibertyTorchBlend /></LayoutWrapper>} />
      <Route path="/RosiesGrind" element={<LayoutWrapper currentPageName="RosiesGrind"><RosiesGrind /></LayoutWrapper>} />
      <Route path="/OldGloryHouseBlend" element={<LayoutWrapper currentPageName="OldGloryHouseBlend"><OldGloryHouseBlend /></LayoutWrapper>} />
      <Route path="/LibertyIcons" element={<LayoutWrapper currentPageName="LibertyIcons"><LibertyIcons /></LayoutWrapper>} />
      <Route path="/CommandersSeries" element={<LayoutWrapper currentPageName="CommandersSeries"><CommandersSeries /></LayoutWrapper>} />
      <Route path="/WomenOfTheRepublic" element={<LayoutWrapper currentPageName="WomenOfTheRepublic"><WomenOfTheRepublic /></LayoutWrapper>} />

      <Route path="/qr/washington" element={<LayoutWrapper currentPageName="WashingtonQR"><WashingtonQR /></LayoutWrapper>} />
      <Route path="/qr/jefferson" element={<LayoutWrapper currentPageName="JeffersonQR"><JeffersonQR /></LayoutWrapper>} />
      <Route path="/qr/adams" element={<LayoutWrapper currentPageName="AdamsQR"><AdamsQR /></LayoutWrapper>} />
      <Route path="/qr/franklin" element={<LayoutWrapper currentPageName="FranklinQR"><FranklinQR /></LayoutWrapper>} />
      <Route path="/qr/lincoln" element={<LayoutWrapper currentPageName="LincolnQR"><LincolnQR /></LayoutWrapper>} />
      <Route path="/qr/roosevelt" element={<LayoutWrapper currentPageName="RooseveltQR"><RooseveltQR /></LayoutWrapper>} />
      <Route path="/qr/liberty-torch" element={<LayoutWrapper currentPageName="LibertyTorchQR"><LibertyTorchQR /></LayoutWrapper>} />
      <Route path="/qr/lady-liberty" element={<LayoutWrapper currentPageName="LadyLibertyQR"><LadyLibertyQR /></LayoutWrapper>} />
      <Route path="/qr/old-glory" element={<LayoutWrapper currentPageName="OldGloryQR"><OldGloryQR /></LayoutWrapper>} />
      <Route path="/qr/uncle-sam" element={<LayoutWrapper currentPageName="UncleSamQR"><UncleSamQR /></LayoutWrapper>} />
      <Route path="/qr/rosies" element={<LayoutWrapper currentPageName="RosiesQR"><RosiesQR /></LayoutWrapper>} />
      <Route path="/qr/eagles-flight" element={<LayoutWrapper currentPageName="EaglesFlightQR"><EaglesFlightQR /></LayoutWrapper>} />

      <Route path="/landing" element={<LayoutWrapper currentPageName="LandingPage"><LandingPage /></LayoutWrapper>} />
      <Route path="/AbigailAdamsBlend" element={<LayoutWrapper currentPageName="AbigailAdamsBlend"><AbigailAdamsBlend /></LayoutWrapper>} />
      <Route path="/HarrietTubmanBlend" element={<LayoutWrapper currentPageName="HarrietTubmanBlend"><HarrietTubmanBlend /></LayoutWrapper>} />
      <Route path="/washington-pods" element={<LayoutWrapper currentPageName="WashingtonPodsProduct"><WashingtonPodsProduct /></LayoutWrapper>} />
      <Route path="/mugs-tumblers" element={<LayoutWrapper currentPageName="MugsTumblers"><MugsTumblers /></LayoutWrapper>} />
      <Route path="/collections/coffee-bundles" element={<LayoutWrapper currentPageName="CoffeeBundles"><CoffeeBundles /></LayoutWrapper>} />

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