import { createTheme, alpha } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#117A4B', dark: '#0A4D30', light: '#0D9488' },
    secondary: { main: '#F59E0B' },
    background: { default: '#F1F5F3', paper: '#FFFFFF' },
    text: { primary: '#1A2E23', secondary: '#64748B' },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    button: { textTransform: 'none', fontWeight: 700 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 10, boxShadow: 'none' } } },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 12px rgba(10,77,48,0.06)',
          border: `1px solid ${alpha('#117A4B', 0.08)}`,
        },
      },
    },
  },
});

export default theme;
