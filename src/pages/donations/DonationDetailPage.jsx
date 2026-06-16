import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card, CardContent, Grid, Typography, Button, Stack, MenuItem, TextField, CircularProgress, Chip,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageHeader from '../../components/PageHeader';
import api from '../../api/axios';

const STATUSES = ['pending', 'scheduled', 'collected', 'distributed', 'cancelled'];

export default function DonationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await api.get(`/admin/donations-list/${id}`);
    setDonation(data.donation);
    setStatus(data.donation.status);
  };

  useEffect(() => { load(); }, [id]);

  const handleSave = async () => {
    setSaving(true);
    await api.patch(`/admin/donations-list/${id}`, { status });
    setSaving(false);
    load();
  };

  if (!donation) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 8 }} />;

  return (
    <>
      <PageHeader title={donation.itemName} breadcrumbs={[{ label: 'Donations', path: '/donations' }, { label: donation.itemName }]} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Typography><strong>Category:</strong> {donation.category}</Typography>
                <Typography><strong>Quantity:</strong> {donation.quantity}</Typography>
                <Typography><strong>Description:</strong> {donation.description || '—'}</Typography>
                <Typography><strong>Pickup Address:</strong> {donation.pickupAddress}</Typography>
                <Typography><strong>Submitted:</strong> {new Date(donation.createdAt).toLocaleString()}</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>Donor</Typography>
              <Typography fontWeight={600}>{donation.donor?.name}</Typography>
              <Typography variant="body2" color="text.secondary">{donation.donor?.email}</Typography>
              <Typography variant="body2" color="text.secondary">{donation.donor?.phone}</Typography>
              <Typography variant="h6" fontWeight={700} mt={3} gutterBottom>Update Status</Typography>
              <TextField select fullWidth value={status} onChange={(e) => setStatus(e.target.value)} sx={{ mb: 2 }}>
                {STATUSES.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </TextField>
              <Chip label={`Current: ${donation.status}`} sx={{ mb: 2 }} />
              <Stack spacing={1}>
                <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} disabled={saving}>Save Status</Button>
                <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate('/donations')}>Back</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
