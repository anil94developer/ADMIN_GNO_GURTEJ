import { TextField, Box, Typography } from '@mui/material';

export default function RichEditor({ label, value, onChange, minRows = 12 }) {
  return (
    <Box>
      {label && <Typography variant="subtitle2" fontWeight={700} gutterBottom>{label}</Typography>}
      <TextField
        fullWidth
        multiline
        minRows={minRows}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write content here... Supports plain text and HTML."
        sx={{
          '& .MuiInputBase-root': {
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            bgcolor: 'grey.50',
          },
        }}
      />
      <Typography variant="caption" color="text.secondary" mt={0.5} display="block">
        Tip: You can use HTML tags for formatting (h2, p, ul, strong, etc.)
      </Typography>
    </Box>
  );
}
