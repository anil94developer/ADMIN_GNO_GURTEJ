import { useState } from 'react';
import {
  Box, Card, CardContent, Typography, IconButton, Button, Stack,
  TextField, Dialog, DialogTitle, DialogContent, DialogActions, Chip, Collapse,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

function CategoryNode({ node, depth = 0, onEdit, onDelete, onAddChild }) {
  const [open, setOpen] = useState(true);
  const hasChildren = node.children?.length > 0;

  return (
    <Box>
      <Card variant="outlined" sx={{ mb: 1, ml: depth * 3, borderLeft: depth > 0 ? '3px solid' : 'none', borderColor: node.color || 'primary.main' }}>
        <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 }, display: 'flex', alignItems: 'center', gap: 1 }}>
          {hasChildren ? (
            <IconButton size="small" onClick={() => setOpen(!open)}>{open ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
          ) : (
            <SubdirectoryArrowRightIcon sx={{ ml: 1, color: 'text.secondary', fontSize: 18 }} />
          )}
          <Box flexGrow={1}>
            <Typography fontWeight={700}>{node.name}</Typography>
            <Stack direction="row" spacing={1} mt={0.5}>
              <Chip label={node.isActive ? 'Active' : 'Inactive'} size="small" color={node.isActive ? 'success' : 'default'} />
              {node.slug && <Chip label={node.slug} size="small" variant="outlined" />}
            </Stack>
          </Box>
          <IconButton size="small" onClick={() => onAddChild(node)} title="Add child"><AddIcon fontSize="small" /></IconButton>
          <IconButton size="small" onClick={() => onEdit(node)}><EditIcon fontSize="small" /></IconButton>
          <IconButton size="small" color="error" onClick={() => onDelete(node._id)}><DeleteIcon fontSize="small" /></IconButton>
        </CardContent>
      </Card>
      <Collapse in={open}>
        {node.children?.map((child) => (
          <CategoryNode key={child._id} node={child} depth={depth + 1} onEdit={onEdit} onDelete={onDelete} onAddChild={onAddChild} />
        ))}
      </Collapse>
    </Box>
  );
}

export default function CategoryTree({ tree, onSave, onDelete, onRefresh }) {
  const [dialog, setDialog] = useState({ open: false, item: null, parentId: null });
  const [form, setForm] = useState({ name: '', slug: '', description: '', color: '#117A4B', order: 0, isActive: true });

  const openCreate = (parent = null) => {
    setForm({ name: '', slug: '', description: '', color: '#117A4B', order: 0, isActive: true });
    setDialog({ open: true, item: null, parentId: parent?._id || null });
  };

  const openEdit = (item) => {
    setForm({ name: item.name, slug: item.slug || '', description: item.description || '', color: item.color || '#117A4B', order: item.order || 0, isActive: item.isActive });
    setDialog({ open: true, item, parentId: item.parent });
  };

  const handleSave = async () => {
    await onSave({ ...form, parent: dialog.parentId }, dialog.item?._id);
    setDialog({ open: false, item: null, parentId: null });
    onRefresh();
  };

  return (
    <Box>
      <Button variant="contained" startIcon={<AddIcon />} onClick={() => openCreate()} sx={{ mb: 2 }}>
        Add Parent Category
      </Button>
      {tree.map((node) => (
        <CategoryNode key={node._id} node={node} onEdit={openEdit} onDelete={onDelete} onAddChild={openCreate} />
      ))}
      <Dialog open={dialog.open} onClose={() => setDialog({ open: false })} maxWidth="sm" fullWidth>
        <DialogTitle>{dialog.item ? 'Edit Category' : dialog.parentId ? 'Add Child Category' : 'Add Parent Category'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Name" fullWidth required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <TextField label="Slug" fullWidth value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            <TextField label="Description" fullWidth multiline rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <TextField label="Color" type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} sx={{ width: 100 }} />
            <TextField label="Order" type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog({ open: false })}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
