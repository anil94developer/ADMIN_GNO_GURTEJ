import { useEffect, useState } from 'react';
import { Card, CardContent, Stack, Typography, Chip } from '@mui/material';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import api from '../../api/axios';

export default function ContentPagesList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/cms/content-pages').then(({ data }) => {
      setItems(data.items || []);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <PageHeader title="Content Pages" subtitle="Dynamic CMS pages — edit via Settings sub-menus or manage slugs here" />
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Use Settings → About Us / Our Mission for rich editor. Additional pages can be added via API.
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {['about', 'mission', 'privacy', 'terms'].map((slug) => (
              <Chip key={slug} label={slug} variant="outlined" />
            ))}
          </Stack>
        </CardContent>
      </Card>
      <DataTable
        columns={[
          { field: 'slug', header: 'Slug' },
          { field: 'title', header: 'Title' },
          { field: 'isActive', header: 'Status' },
        ]}
        rows={items}
        loading={loading}
      />
    </>
  );
}
