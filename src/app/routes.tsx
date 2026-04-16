import React from 'react';
import { createBrowserRouter } from 'react-router';
import Home from './pages/Home';
import Angebote from './pages/Shop';
import AngebotDetail from './pages/ProductDetail';
import Ausbildung from './pages/Webinar';
import Login from './pages/Login';
import Community from './pages/Community';
import ForgotPassword from './pages/ForgotPassword';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import MemberDashboard from './pages/MemberDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import Root from './Root';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'angebote', Component: Angebote },
      { path: 'angebote/:id', Component: AngebotDetail },
      { path: 'ausbildung', Component: Ausbildung },
      { path: 'community', Component: Community },
      { path: 'login', Component: Login },
      { path: 'forgot-password', Component: ForgotPassword },
      { path: 'impressum', Component: Impressum },
      { path: 'datenschutz', Component: Datenschutz },
      {
        path: 'mitglieder',
        element: <ProtectedRoute><MemberDashboard /></ProtectedRoute>,
      },
    ],
  },
]);
