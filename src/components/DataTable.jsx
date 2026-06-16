import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, IconButton, Tooltip, Box, TextField, InputAdornment, CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

export default function DataTable({
  columns, rows, loading, search, onSearch, basePath, onDelete, statusField = 'isActive',
}) {
  const navigate = useNavigate();

  return (
    <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
      {onSearch && (
        <Box p={2} borderBottom="1px solid" borderColor="divider">
          <TextField
            size="small"
            placeholder="Search..."
            value={search || ''}
            onChange={(e) => onSearch(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
            sx={{ minWidth: 280 }}
          />
        </Box>
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              {columns.map((col) => (
                <TableCell key={col.field} sx={{ fontWeight: 700 }}>{col.header}</TableCell>
              ))}
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={columns.length + 1} align="center" sx={{ py: 6 }}><CircularProgress size={32} /></TableCell></TableRow>
            ) : rows.length === 0 ? (
              <TableRow><TableCell colSpan={columns.length + 1} align="center" sx={{ py: 6, color: 'text.secondary' }}>No records found</TableCell></TableRow>
            ) : rows.map((row) => (
              <TableRow key={row._id} hover>
                {columns.map((col) => (
                  <TableCell key={col.field}>
                    {col.render ? col.render(row) : (
                      statusField && col.field === statusField ? (
                        <Chip label={row[col.field] ? 'Active' : 'Inactive'} size="small" color={row[col.field] ? 'success' : 'default'} />
                      ) : row[col.field]
                    )}
                  </TableCell>
                ))}
                <TableCell align="right">
                  {basePath && (
                    <>
                      <Tooltip title="View"><IconButton size="small" onClick={() => navigate(`${basePath}/${row._id}`)}><VisibilityIcon fontSize="small" /></IconButton></Tooltip>
                      <Tooltip title="Edit"><IconButton size="small" onClick={() => navigate(`${basePath}/${row._id}/edit`)}><EditIcon fontSize="small" /></IconButton></Tooltip>
                    </>
                  )}
                  {onDelete && (
                    <Tooltip title="Delete"><IconButton size="small" color="error" onClick={() => onDelete(row._id)}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
