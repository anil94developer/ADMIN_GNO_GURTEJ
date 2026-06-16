import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card, CardContent, Grid, Typography, Chip, Button, Stack, Divider, Table, TableBody, TableCell, TableRow, CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PageHeader from '../../components/PageHeader';
import api from '../../api/axios';

export default function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const load = async () => {
    const { data: res } = await api.get(`/admin/users/${id}`);
    setData(res);
  };

  useEffect(() => { load(); }, [id]);

  const toggleLock = async () => {
    await api.patch(`/admin/users/${id}`, { isLocked: !data.user.isLocked });
    load();
  };

  if (!data) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 8 }} />;

  const { user, donations } = data;

  return (
    <>
      <PageHeader title={user.name} subtitle={user.email} breadcrumbs={[{ label: 'Users', path: '/users' }, { label: user.name }]} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>User Details</Typography>
              <Table size="small"><TableBody>
                <TableRow><TableCell>Phone</TableCell><TableCell>{user.phone || '—'}</TableCell></TableRow>
                <TableRow><TableCell>Status</TableCell><TableCell><Chip label={user.isLocked ? 'Locked' : 'Active'} color={user.isLocked ? 'error' : 'success'} size="small" /></TableCell></TableRow>
                <TableRow><TableCell>Joined</TableCell><TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell></TableRow>
                <TableRow><TableCell>Last Login</TableCell><TableCell>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : '—'}</TableCell></TableRow>
              </TableBody></Table>
              <Stack direction="row" spacing={2} mt={2}>
                <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate('/users')}>Back</Button>
                <Button variant="contained" color={user.isLocked ? 'success' : 'warning'} startIcon={user.isLocked ? <LockOpenIcon /> : <LockIcon />} onClick={toggleLock}>
                  {user.isLocked ? 'Unlock Account' : 'Lock Account'}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>Donation History ({donations.length})</Typography>
              <Divider sx={{ mb: 2 }} />
              {donations.length === 0 ? <Typography color="text.secondary">No donations yet</Typography> : donations.map((d) => (
                <Stack key={d._id} direction="row" justifyContent="space-between" py={1} borderBottom="1px solid" borderColor="divider">
                  <Box>
                    <Typography fontWeight={600}>{d.itemName}</Typography>
                    <Typography variant="caption" color="text.secondary">{d.category} · Qty {d.quantity}</Typography>
                  </Box>
                  <Chip label={d.status} size="small" />
                </Stack>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
