import { Box, Typography, Breadcrumbs, Link, Stack, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

export default function PageHeader({ title, subtitle, breadcrumbs = [], action, actionLabel, onAction }) {
  return (
    <Box mb={3}>
      {breadcrumbs.length > 0 && (
        <Breadcrumbs sx={{ mb: 1 }}>
          {breadcrumbs.map((b) =>
            b.path ? (
              <Link key={b.label} component={RouterLink} to={b.path} underline="hover" color="inherit">
                {b.label}
              </Link>
            ) : (
              <Typography key={b.label} color="text.primary" fontWeight={600}>{b.label}</Typography>
            )
          )}
        </Breadcrumbs>
      )}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} gap={2}>
        <Box>
          <Typography variant="h4" fontWeight={800}>{title}</Typography>
          {subtitle && <Typography color="text.secondary" mt={0.5}>{subtitle}</Typography>}
        </Box>
        {(action || onAction) && (
          <Button variant="contained" startIcon={<AddIcon />} component={action ? RouterLink : 'button'} to={action} onClick={onAction}>
            {actionLabel || 'Add New'}
          </Button>
        )}
      </Stack>
    </Box>
  );
}
