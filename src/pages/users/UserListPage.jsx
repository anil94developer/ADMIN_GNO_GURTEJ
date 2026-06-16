import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chip } from '@mui/material';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import api from '../../api/axios';

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    const { data } = await api.get('/admin/users', { params: { q: search || undefined } });
    setUsers(data.users || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [search]);

  return (
    <>
      <PageHeader title="Users" subtitle="Customer accounts and activity" />
      <DataTable
        columns={[
          { field: 'name', header: 'Name' },
          { field: 'email', header: 'Email' },
          { field: 'phone', header: 'Phone' },
          { field: 'isLocked', header: 'Status', render: (r) => <Chip label={r.isLocked ? 'Locked' : 'Active'} size="small" color={r.isLocked ? 'error' : 'success'} /> },
        ]}
        rows={users}
        loading={loading}
        search={search}
        onSearch={setSearch}
        basePath="/users"
      />
    </>
  );
}
