import { useCallback, useEffect, useState } from 'react';
import api from '../api/axios';

export function useCmsList(endpoint) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(endpoint, { params: { q: search || undefined } });
      setItems(data.items || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [endpoint, search]);

  useEffect(() => { load(); }, [load]);

  const remove = async (id) => {
    await api.delete(`${endpoint}/${id}`);
    load();
  };

  return { items, loading, search, setSearch, load, remove };
}

export function useCmsItem(endpoint, id) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(!!id && id !== 'new');

  const load = useCallback(async () => {
    if (!id || id === 'new') {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.get(`${endpoint}/${id}`);
      setItem(data.item);
    } finally {
      setLoading(false);
    }
  }, [endpoint, id]);

  useEffect(() => { load(); }, [load]);

  const save = async (payload) => {
    if (id && id !== 'new') {
      await api.put(`${endpoint}/${id}`, payload);
    } else {
      await api.post(endpoint, payload);
    }
  };

  return { item, loading, load, save };
}
