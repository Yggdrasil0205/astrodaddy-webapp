import React from 'react';
import { createBrowserRouter } from 'react-router';
import Home from './pages/Home';
import Angebote from './pages/Shop';
import AngebotDetail from './pages/ProductDetail';
import Astroversity from './pages/Astroversity';
import ReadingsWorkbooks from './pages/ReadingsWorkbooks';
import Login from './pages/Login';
import Community from './pages/Community';
import ForgotPassword from './pages/ForgotPassword';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import AGB from './pages/AGB';
import Widerruf from './pages/Widerruf';
import MemberDashboard from './pages/MemberDashboard';
import Checkout from './pages/Checkout';
import Links from './pages/Links';
import RobertLogin from './pages/RobertLogin';
import ResetPassword from './pages/ResetPassword';
import AuthConfirm from './pages/AuthConfirm';
import NotFound from './pages/NotFound';
import CheckoutSuccess from './pages/CheckoutSuccess';
import { ProtectedRoute } from './components/ProtectedRoute';
import Root from './Root';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    ErrorBoundary: NotFound,
    children: [
      { index: true, Component: Home },
      { path: 'angebote', Component: Angebote },
      { path: 'angebote/:id', Component: AngebotDetail },
      { path: 'readings-workbooks', Component: ReadingsWorkbooks },
      { path: 'astroversity', Component: Astroversity },
      { path: 'community', Component: Community },
      { path: 'login', Component: Login },
      { path: 'forgot-password', Component: ForgotPassword },
      { path: 'reset-password', Component: ResetPassword },
      { path: 'auth/confirm', Component: AuthConfirm },
      { path: 'checkout', Component: Checkout },
      { path: 'checkout/success', Component: CheckoutSuccess },
      { path: 'links', Component: Links },
      { path: 'robertlogin', Component: RobertLogin },
      { path: 'impressum', Component: Impressum },
      { path: 'datenschutz', Component: Datenschutz },
      { path: 'agb', Component: AGB },
      { path: 'widerruf', Component: Widerruf },
      {
        path: 'mitglieder',
        element: <ProtectedRoute><MemberDashboard /></ProtectedRoute>,
      },
      { path: '*', Component: NotFound },
    ],
  },
]);
