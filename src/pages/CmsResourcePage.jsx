import { CMS_RESOURCES } from '../config/resources';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Card, CardContent, Grid, TextField, Button, Stack, FormControlLabel, Checkbox,
  MenuItem, CircularProgress, Box,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import RichEditor from '../components/RichEditor';
import { useCmsList, useCmsItem } from '../hooks/useCms';

function ResourceForm({ config, id, basePath }) {
  const navigate = useNavigate();
  const isNew = id === 'new';
  const { item, loading, save } = useCmsItem(config.endpoint, isNew ? null : id);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew) {
      const init = {};
      config.fields.forEach((f) => { init[f.name] = f.type === 'checkbox' ? true : f.type === 'number' ? 0 : ''; });
      setForm(init);
    } else if (item) {
      const init = {};
      config.fields.forEach((f) => { init[f.name] = item[f.name] ?? (f.type === 'checkbox' ? true : ''); });
      setForm(init);
    }
  }, [item, isNew, config.fields]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await save(form);
      navigate(basePath);
    } finally {
      setSaving(false);
    }
  };

  if (( !isNew && loading) || !form) return <Box py={8} textAlign="center"><CircularProgress /></Box>;

  return (
    <>
      <PageHeader
        title={id === 'new' ? `Add ${config.title}` : `Edit ${config.title}`}
        breadcrumbs={[{ label: config.title, path: basePath }, { label: id === 'new' ? 'Add' : 'Edit' }]}
      />
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={2}>
            {config.fields.map((field) => (
              <Grid item xs={12} md={field.rich || field.multiline ? 12 : 6} key={field.name}>
                {field.rich ? (
                  <RichEditor label={field.label} value={form[field.name]} onChange={(v) => setForm({ ...form, [field.name]: v })} />
                ) : field.type === 'checkbox' ? (
                  <FormControlLabel control={<Checkbox checked={!!form[field.name]} onChange={(e) => setForm({ ...form, [field.name]: e.target.checked })} />} label={field.label} />
                ) : field.select ? (
                  <TextField select fullWidth label={field.label} value={form[field.name]} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}>
                    {field.select.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                  </TextField>
                ) : (
                  <TextField
                    fullWidth required={field.required} type={field.type || 'text'} label={field.label}
                    multiline={field.multiline} rows={field.rows} value={form[field.name]}
                    onChange={(e) => setForm({ ...form, [field.name]: field.type === 'number' ? Number(e.target.value) : e.target.value })}
                  />
                )}
              </Grid>
            ))}
          </Grid>
          <Stack direction="row" spacing={2} mt={3}>
            <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate(basePath)}>Back</Button>
            <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}

export default function CmsResourcePage({ resourceKey, basePath }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const config = CMS_RESOURCES[resourceKey];
  const { items, loading, search, setSearch, remove } = useCmsList(config.endpoint);

  if (id) return <ResourceForm config={config} id={id} basePath={basePath} />;

  return (
    <>
      <PageHeader title={config.title} subtitle={config.subtitle} actionLabel={`Add New`} onAction={() => navigate(`${basePath}/new`)} />
      <DataTable
        columns={config.columns}
        rows={items}
        loading={loading}
        search={search}
        onSearch={setSearch}
        basePath={basePath}
        onDelete={async (deleteId) => { if (confirm('Delete this item?')) await remove(deleteId); }}
      />
    </>
  );
}
