import { CssBaseline, ThemeProvider, CircularProgress, Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme/theme';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminLayout from './layout/AdminLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UserListPage from './pages/users/UserListPage';
import UserDetailPage from './pages/users/UserDetailPage';
import DonationListPage from './pages/donations/DonationListPage';
import DonationDetailPage from './pages/donations/DonationDetailPage';
import QueryListPage from './pages/queries/QueryListPage';
import QueryDetailPage from './pages/queries/QueryDetailPage';
import CategoryPage from './pages/CategoryPage';
import CmsResourcePage from './pages/CmsResourcePage';
import { ContactSettingsPage, GeneralSettingsPage } from './pages/settings/SettingsPages';
import { MissionSettingsPage, AboutSettingsPage } from './pages/settings/ContentEditorPages';
import TeamManagePage from './pages/settings/TeamManagePage';
import ContentPagesList from './pages/settings/ContentPagesList';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center"><CircularProgress /></Box>;
  if (!user) return <Navigate to="/login" replace />;
  return <AdminLayout>{children}</AdminLayout>;
}

function GuestRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center"><CircularProgress /></Box>;
  if (user) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />

            <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

            <Route path="/users" element={<ProtectedRoute><UserListPage /></ProtectedRoute>} />
            <Route path="/users/:id" element={<ProtectedRoute><UserDetailPage /></ProtectedRoute>} />

            <Route path="/donations" element={<ProtectedRoute><DonationListPage /></ProtectedRoute>} />
            <Route path="/donations/:id" element={<ProtectedRoute><DonationDetailPage /></ProtectedRoute>} />

            <Route path="/queries" element={<ProtectedRoute><QueryListPage /></ProtectedRoute>} />
            <Route path="/queries/:id" element={<ProtectedRoute><QueryDetailPage /></ProtectedRoute>} />

            <Route path="/categories" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />

            <Route path="/gallery" element={<ProtectedRoute><CmsResourcePage resourceKey="gallery" basePath="/gallery" /></ProtectedRoute>} />
            <Route path="/gallery/:id" element={<ProtectedRoute><CmsResourcePage resourceKey="gallery" basePath="/gallery" /></ProtectedRoute>} />
            <Route path="/events" element={<ProtectedRoute><CmsResourcePage resourceKey="events" basePath="/events" /></ProtectedRoute>} />
            <Route path="/events/:id" element={<ProtectedRoute><CmsResourcePage resourceKey="events" basePath="/events" /></ProtectedRoute>} />
            <Route path="/blogs" element={<ProtectedRoute><CmsResourcePage resourceKey="blogs" basePath="/blogs" /></ProtectedRoute>} />
            <Route path="/blogs/:id" element={<ProtectedRoute><CmsResourcePage resourceKey="blogs" basePath="/blogs" /></ProtectedRoute>} />
            <Route path="/stories" element={<ProtectedRoute><CmsResourcePage resourceKey="stories" basePath="/stories" /></ProtectedRoute>} />
            <Route path="/stories/:id" element={<ProtectedRoute><CmsResourcePage resourceKey="stories" basePath="/stories" /></ProtectedRoute>} />
            <Route path="/faqs" element={<ProtectedRoute><CmsResourcePage resourceKey="faqs" basePath="/faqs" /></ProtectedRoute>} />
            <Route path="/faqs/:id" element={<ProtectedRoute><CmsResourcePage resourceKey="faqs" basePath="/faqs" /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><CmsResourcePage resourceKey="notifications" basePath="/notifications" /></ProtectedRoute>} />
            <Route path="/notifications/:id" element={<ProtectedRoute><CmsResourcePage resourceKey="notifications" basePath="/notifications" /></ProtectedRoute>} />
            <Route path="/notices" element={<ProtectedRoute><CmsResourcePage resourceKey="notices" basePath="/notices" /></ProtectedRoute>} />
            <Route path="/notices/:id" element={<ProtectedRoute><CmsResourcePage resourceKey="notices" basePath="/notices" /></ProtectedRoute>} />
            <Route path="/voices" element={<ProtectedRoute><CmsResourcePage resourceKey="voices" basePath="/voices" /></ProtectedRoute>} />
            <Route path="/voices/:id" element={<ProtectedRoute><CmsResourcePage resourceKey="voices" basePath="/voices" /></ProtectedRoute>} />

            <Route path="/settings/contact" element={<ProtectedRoute><ContactSettingsPage /></ProtectedRoute>} />
            <Route path="/settings/mission" element={<ProtectedRoute><MissionSettingsPage /></ProtectedRoute>} />
            <Route path="/settings/about" element={<ProtectedRoute><AboutSettingsPage /></ProtectedRoute>} />
            <Route path="/settings/team" element={<ProtectedRoute><TeamManagePage /></ProtectedRoute>} />
            <Route path="/settings/general" element={<ProtectedRoute><GeneralSettingsPage /></ProtectedRoute>} />
            <Route path="/settings/content" element={<ProtectedRoute><ContentPagesList /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
