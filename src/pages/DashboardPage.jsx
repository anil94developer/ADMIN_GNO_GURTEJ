import { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Chip, List, ListItem, ListItemText } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PendingIcon from '@mui/icons-material/Pending';
import PageHeader from '../components/PageHeader';
import api from '../api/axios';

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Box sx={{ width: 52, height: 52, borderRadius: 2.5, bgcolor: `${color}18`, color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon />
        </Box>
        <Box>
          <Typography variant="h4" fontWeight={800}>{value}</Typography>
          <Typography variant="body2" color="text.secondary">{label}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/admin/dashboard').then(({ data: res }) => setData(res));
  }, []);

  if (!data) return <Box py={8} textAlign="center">Loading dashboard...</Box>;

  const { stats, recentDonations, recentQueries } = data;

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Overview of platform activity" />
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}><StatCard icon={PeopleIcon} label="Total Users" value={stats.totalCustomers} color="#117A4B" /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard icon={VolunteerActivismIcon} label="Total Donations" value={stats.totalDonations} color="#0284C7" /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard icon={PendingIcon} label="Pending Donations" value={stats.pendingDonations} color="#D97706" /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard icon={QuestionAnswerIcon} label="New Queries" value={stats.newQueries} color="#7C3AED" /></Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>Recent Donations</Typography>
              <List dense>
                {recentDonations?.map((d) => (
                  <ListItem key={d._id} divider>
                    <ListItemText
                      primary={d.itemName}
                      secondary={`${d.donor?.name} · ${d.status}`}
                    />
                    <Chip label={d.status} size="small" />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>Recent Queries</Typography>
              <List dense>
                {recentQueries?.map((q) => (
                  <ListItem key={q._id} divider>
                    <ListItemText primary={q.subject || q.name} secondary={q.email} />
                    <Chip label={q.status} size="small" color={q.status === 'new' ? 'warning' : 'default'} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
