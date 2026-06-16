import { useEffect, useState } from 'react';
import { Card, CardContent, Button, Stack, CircularProgress } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PageHeader from '../../components/PageHeader';
import RichEditor from '../../components/RichEditor';
import api from '../../api/axios';

function ContentEditorPage({ slug, title, subtitle }) {
  const [content, setContent] = useState({ title: '', content: '', metaDescription: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageId, setPageId] = useState(null);

  useEffect(() => {
    api.get('/admin/cms/content-pages', { params: { q: slug } }).then(({ data }) => {
      const page = data.items?.find((p) => p.slug === slug);
      if (page) {
        setPageId(page._id);
        setContent({ title: page.title, content: page.content, metaDescription: page.metaDescription || '' });
      } else {
        setContent({ title, content: '', metaDescription: '' });
      }
      setLoading(false);
    });
  }, [slug, title]);

  const handleSave = async () => {
    setSaving(true);
    const payload = { slug, ...content, isActive: true };
    if (pageId) await api.put(`/admin/cms/content-pages/${pageId}`, payload);
    else await api.post('/admin/cms/content-pages', payload);
    setSaving(false);
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 8 }} />;

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Stack spacing={3}>
            <RichEditor label="Page Content" value={content.content} onChange={(v) => setContent({ ...content, content: v })} minRows={16} />
          </Stack>
          <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} disabled={saving} sx={{ mt: 3 }}>
            {saving ? 'Saving...' : 'Publish Content'}
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

export function MissionSettingsPage() {
  return <ContentEditorPage slug="mission" title="Our Mission" subtitle="Edit mission page content" />;
}

export function AboutSettingsPage() {
  return <ContentEditorPage slug="about" title="About Us" subtitle="Edit about page content with rich editor" />;
}
