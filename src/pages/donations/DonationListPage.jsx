import { useEffect, useState } from 'react';
import { Chip } from '@mui/material';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import api from '../../api/axios';

export default function DonationListPage() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get('/admin/donations-list', { params: { q: search || undefined } })
      .then(({ data }) => setDonations(data.donations || []))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <>
      <PageHeader title="Donations" subtitle="All physical resource donation requests" />
      <DataTable
        columns={[
          { field: 'itemName', header: 'Item' },
          { field: 'donor', header: 'Donor', render: (r) => r.donor?.name },
          { field: 'category', header: 'Category' },
          { field: 'quantity', header: 'Qty' },
          { field: 'status', header: 'Status', render: (r) => <Chip label={r.status} size="small" /> },
        ]}
        rows={donations}
        loading={loading}
        search={search}
        onSearch={setSearch}
        basePath="/donations"
      />
    </>
  );
}
