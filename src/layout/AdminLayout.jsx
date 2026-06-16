import { useState } from 'react';
import {
  Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Toolbar, Typography, AppBar, IconButton, Avatar, Divider, Collapse, useTheme, useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { MENU, SIDEBAR_WIDTH } from '../config/menu';
import { useAuth } from '../context/AuthContext';

function SidebarContent({ onNavigate }) {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState({ Settings: true });

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const toggleGroup = (label) => setOpenGroups((p) => ({ ...p, [label]: !p[label] }));

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#0A4D30', color: '#fff' }}>
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <VolunteerActivismIcon />
        </Box>
        <Box>
          <Typography fontWeight={800} lineHeight={1.1}>HopeConnect</Typography>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>Admin Panel</Typography>
        </Box>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
      <List sx={{ flexGrow: 1, px: 1.5, py: 2, overflow: 'auto' }}>
        {MENU.map((item, idx) => {
          if (item.type === 'divider') return <Divider key={idx} sx={{ my: 1.5, borderColor: 'rgba(255,255,255,0.1)' }} />;
          if (item.children) {
            const open = openGroups[item.label];
            const groupActive = item.children.some((c) => isActive(c.path));
            return (
              <Box key={item.label}>
                <ListItemButton onClick={() => toggleGroup(item.label)} sx={{ borderRadius: 2, mb: 0.5, bgcolor: groupActive ? 'rgba(255,255,255,0.1)' : 'transparent' }}>
                  <ListItemIcon sx={{ color: '#FBBF24', minWidth: 40 }}><item.icon fontSize="small" /></ListItemIcon>
                  <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 700, fontSize: '0.875rem' }} />
                  {open ? <ExpandLess sx={{ opacity: 0.7 }} /> : <ExpandMore sx={{ opacity: 0.7 }} />}
                </ListItemButton>
                <Collapse in={open}>
                  {item.children.map((child) => (
                    <ListItemButton
                      key={child.path}
                      component={RouterLink}
                      to={child.path}
                      selected={isActive(child.path)}
                      onClick={onNavigate}
                      sx={{
                        borderRadius: 2, mb: 0.25, pl: 4,
                        '&.Mui-selected': { bgcolor: 'rgba(255,255,255,0.15)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } },
                      }}
                    >
                      <ListItemIcon sx={{ color: 'rgba(255,255,255,0.7)', minWidth: 36 }}><child.icon sx={{ fontSize: 18 }} /></ListItemIcon>
                      <ListItemText primary={child.label} primaryTypographyProps={{ fontSize: '0.8rem', fontWeight: 600 }} />
                    </ListItemButton>
                  ))}
                </Collapse>
              </Box>
            );
          }
          const Icon = item.icon;
          return (
            <ListItemButton
              key={item.path}
              component={RouterLink}
              to={item.path}
              selected={isActive(item.path)}
              onClick={onNavigate}
              sx={{
                borderRadius: 2, mb: 0.5,
                '&.Mui-selected': { bgcolor: 'rgba(255,255,255,0.15)', borderLeft: '3px solid #FBBF24' },
              }}
            >
              <ListItemIcon sx={{ color: isActive(item.path) ? '#FBBF24' : 'rgba(255,255,255,0.8)', minWidth: 40 }}>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600, fontSize: '0.875rem' }} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const drawer = <SidebarContent onNavigate={() => setMobileOpen(false)} />;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: '#fff', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider', width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` }, ml: { md: `${SIDEBAR_WIDTH}px` } }}>
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" onClick={() => setMobileOpen(true)} sx={{ mr: 1 }}><MenuIcon /></IconButton>
          )}
          <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
            Welcome back, <strong>{user?.name}</strong>
          </Typography>
          <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: 14, mr: 1 }}>{user?.name?.charAt(0)}</Avatar>
          <IconButton onClick={handleLogout} title="Logout"><LogoutIcon /></IconButton>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: SIDEBAR_WIDTH }, flexShrink: { md: 0 } }}>
        {isMobile ? (
          <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} ModalProps={{ keepMounted: true }}
            sx={{ '& .MuiDrawer-paper': { width: SIDEBAR_WIDTH } }}>{drawer}</Drawer>
        ) : (
          <Drawer variant="permanent" sx={{ '& .MuiDrawer-paper': { width: SIDEBAR_WIDTH, border: 'none' } }} open>{drawer}</Drawer>
        )}
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` }, mt: 8, bgcolor: 'background.default', minHeight: '100vh' }}>
        {children}
      </Box>
    </Box>
  );
}
