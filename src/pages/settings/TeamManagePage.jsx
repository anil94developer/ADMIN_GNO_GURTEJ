import { useEffect, useState } from 'react';
import {
  Card, CardContent, Grid, TextField, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions,
  FormControlLabel, Checkbox, IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import api from '../../api/axios';

export default function TeamManagePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState(false);
  const [form, setForm] = useState({ name: '', role: '', bio: '', imageUrl: '', order: 0, isActive: true });
  const [editId, setEditId] = useState(null);

  const load = async () => {
    setLoading(true);
    const { data } = await api.get('/admin/cms/team');
    setItems(data.items || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setForm({ name: '', role: '', bio: '', imageUrl: '', order: 0, isActive: true });
    setEditId(null);
    setDialog(true);
  };

  const openEdit = (item) => {
    setForm(item);
    setEditId(item._id);
    setDialog(true);
  };

  const handleSave = async () => {
    if (editId) await api.put(`/admin/cms/team/${editId}`, form);
    else await api.post('/admin/cms/team', form);
    setDialog(false);
    load();
  };

  const handleDelete = async (id) => {
    if (confirm('Remove team member?')) {
      await api.delete(`/admin/cms/team/${id}`);
      load();
    }
  };

  return (
    <>
      <PageHeader title="Team Management" subtitle="Leadership and team members on About page" onAction={openAdd} actionLabel="Add Member" />
      <DataTable
        columns={[
          { field: 'name', header: 'Name' },
          { field: 'role', header: 'Role' },
          { field: 'order', header: 'Order' },
          { field: 'isActive', header: 'Status' },
        ]}
        rows={items}
        loading={loading}
        onDelete={handleDelete}
      />
      <Dialog open={dialog} onClose={() => setDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? 'Edit Member' : 'Add Team Member'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Name" fullWidth required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <TextField label="Role" fullWidth required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            <TextField label="Bio" fullWidth multiline rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
            <TextField label="Image URL" fullWidth value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
            <TextField label="Order" type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
            <FormControlLabel control={<Checkbox checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />} label="Active" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
