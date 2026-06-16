import { useEffect, useState } from 'react';
import { Card, CardContent } from '@mui/material';
import PageHeader from '../components/PageHeader';
import CategoryTree from '../components/CategoryTree';
import api from '../api/axios';

export default function CategoryPage() {
  const [tree, setTree] = useState([]);

  const load = async () => {
    const { data } = await api.get('/admin/cms/categories/tree');
    setTree(data.tree || []);
  };

  useEffect(() => { load(); }, []);

  const onSave = async (payload, id) => {
    if (id) await api.put(`/admin/cms/categories/${id}`, payload);
    else await api.post('/admin/cms/categories', payload);
  };

  const onDelete = async (id) => {
    if (confirm('Delete this category?')) {
      await api.delete(`/admin/cms/categories/${id}`);
      load();
    }
  };

  return (
    <>
      <PageHeader title="Categories" subtitle="Parent-child tree structure for dynamic donation categories" />
      <Card>
        <CardContent>
          <CategoryTree tree={tree} onSave={onSave} onDelete={onDelete} onRefresh={load} />
        </CardContent>
      </Card>
    </>
  );
}
