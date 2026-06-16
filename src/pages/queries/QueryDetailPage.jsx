import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card, CardContent, Grid, Typography, Button, Stack, MenuItem, TextField, CircularProgress,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageHeader from '../../components/PageHeader';
import RichEditor from '../../components/RichEditor';
import api from '../../api/axios';

const STATUSES = ['new', 'in_progress', 'resolved', 'closed'];

export default function QueryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  const load = async () => {
    const { data } = await api.get(`/admin/cms/queries/${id}`);
    setItem(data.item);
    setStatus(data.item.status);
    setAdminNotes(data.item.adminNotes || '');
  };

  useEffect(() => { load(); }, [id]);

  const handleSave = async () => {
    await api.put(`/admin/cms/queries/${id}`, { status, adminNotes });
    load();
  };

  if (!item) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 8 }} />;

  return (
    <>
      <PageHeader title={item.subject || 'Query'} breadcrumbs={[{ label: 'Queries', path: '/queries' }, { label: item.name }]} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700}>{item.name} · {item.email}</Typography>
              <Typography color="text.secondary" mb={2}>{new Date(item.createdAt).toLocaleString()}</Typography>
              <Typography variant="subtitle2" fontWeight={700}>Message</Typography>
              <Typography sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>{item.message}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <TextField select fullWidth label="Status" value={status} onChange={(e) => setStatus(e.target.value)} sx={{ mb: 2 }}>
                {STATUSES.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </TextField>
              <RichEditor label="Admin Notes" value={adminNotes} onChange={setAdminNotes} minRows={6} />
              <Stack direction="row" spacing={2} mt={2}>
                <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>Save</Button>
                <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate('/queries')}>Back</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
