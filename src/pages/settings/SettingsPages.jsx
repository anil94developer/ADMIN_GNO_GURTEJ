import { useEffect, useState } from 'react';
import { Card, CardContent, Grid, TextField, Button, Stack, CircularProgress } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PageHeader from '../../components/PageHeader';
import api from '../../api/axios';

function SettingForm({ settingKey, title, subtitle, fields }) {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get(`/admin/cms/settings/${settingKey}`).then(({ data }) => setForm(data.setting.value || {}));
  }, [settingKey]);

  const handleSave = async () => {
    setSaving(true);
    await api.put(`/admin/cms/settings/${settingKey}`, { value: form, group: settingKey });
    setSaving(false);
  };

  if (!form) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={2}>
            {fields.map((f) => (
              <Grid item xs={12} md={f.full ? 12 : 6} key={f.name}>
                <TextField
                  fullWidth
                  label={f.label}
                  multiline={f.multiline}
                  rows={f.rows}
                  type={f.type || 'text'}
                  value={form[f.name] || ''}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                />
              </Grid>
            ))}
          </Grid>
          <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} disabled={saving} sx={{ mt: 3 }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

export function ContactSettingsPage() {
  return (
    <SettingForm
      settingKey="contact"
      title="Contact Details"
      subtitle="Manage contact information shown on the website"
      fields={[
        { name: 'email', label: 'Support Email' },
        { name: 'phone', label: 'Phone Number' },
        { name: 'address', label: 'Office Address', full: true },
        { name: 'hours', label: 'Office Hours' },
      ]}
    />
  );
}

export function GeneralSettingsPage() {
  return (
    <SettingForm
      settingKey="general"
      title="Website / General Settings"
      subtitle="Global site configuration"
      fields={[
        { name: 'siteName', label: 'Site Name' },
        { name: 'tagline', label: 'Tagline' },
        { name: 'logoUrl', label: 'Logo URL' },
        { name: 'footerText', label: 'Footer Text', multiline: true, rows: 2, full: true },
      ]}
    />
  );
}
