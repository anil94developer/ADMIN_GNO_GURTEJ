import { useEffect, useState } from 'react';
import { Chip } from '@mui/material';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import api from '../../api/axios';

export default function QueryListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get('/admin/cms/queries', { params: { q: search || undefined } })
      .then(({ data }) => setItems(data.items || []))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <>
      <PageHeader title="Queries" subtitle="Contact form submissions and support requests" />
      <DataTable
        columns={[
          { field: 'name', header: 'Name' },
          { field: 'email', header: 'Email' },
          { field: 'subject', header: 'Subject' },
          { field: 'status', header: 'Status', render: (r) => <Chip label={r.status} size="small" color={r.status === 'new' ? 'warning' : 'default'} /> },
        ]}
        rows={items}
        loading={loading}
        search={search}
        onSearch={setSearch}
        basePath="/queries"
      />
    </>
  );
}
