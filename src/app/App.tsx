import { RouterProvider } from 'react-router';
import { router } from './routes';
import { PasswordProtection } from './components/PasswordProtection';

export default function App() {
  return (
    <PasswordProtection>
      <RouterProvider router={router} />
    </PasswordProtection>
  );
}