import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import ShieldIcon from '@mui/icons-material/Shield';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAuth0 } from '@auth0/auth0-react';

const features = [
  {
    title: 'Threat Intelligence',
    description:
      'Real-time visibility into global attack surfaces and emerging cyber threats to protect enterprise infrastructure.',
    icon: <SecurityIcon color="primary" fontSize="large" />,
  },
  {
    title: 'SOC Monitoring',
    description:
      '24/7 managed security operations center powered by intelligent workflows and expert response teams.',
    icon: <ShieldIcon color="primary" fontSize="large" />,
  },
  {
    title: 'Risk Analytics',
    description:
      'Actionable dashboards for incident trends, compliance posture, and vulnerability prioritization.',
    icon: <AnalyticsIcon color="primary" fontSize="large" />,
  },
];

export default function App() {
  const {
    isAuthenticated,
    isLoading,
    error,
    loginWithRedirect,
    logout,
    user,
  } = useAuth0();

  const handleLogin = async (event) => {
    event.preventDefault();
    await loginWithRedirect();
  };

  if (isLoading) {
    return (
      <Container maxWidth="sm" sx={{ py: 10 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3, bgcolor: 'background.paper' }}>
          <Typography variant="h6" textAlign="center">
            Loading...
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #21304f' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <SecurityIcon color="primary" />
            <Typography variant="h6" fontWeight={700}>
              CyberDefence Systems
            </Typography>
          </Stack>

          {isAuthenticated ? (
            <Button
              variant="outlined"
              color="primary"
              onClick={() =>
                logout({
                  logoutParams: { returnTo: window.location.origin },
                })
              }
            >
              Logout
            </Button>
          ) : (
            <Button variant="outlined" color="primary">
              Contact Sales
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {!isAuthenticated ? (
        <Container maxWidth="sm" sx={{ py: 10 }}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 3, bgcolor: 'background.paper' }}>
            <Stack spacing={1} mb={3} alignItems="center">
              <LockOpenIcon color="primary" fontSize="large" />
              <Typography variant="h4" fontWeight={700}>
                Secure Login
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Access the Cyber Security Defence Portal
              </Typography>
            </Stack>

            {error && (
              <Typography color="error" textAlign="center" mb={2}>
                {error.message}
              </Typography>
            )}

            <Box component="form" onSubmit={handleLogin}>
              <Stack spacing={2}>
                <TextField label="Corporate Email" type="email" required fullWidth />
                <TextField label="Password" type="password" required fullWidth />
                <Button type="submit" size="large" variant="contained" fullWidth>
                  Login
                </Button>
                <Button
                  type="button"
                  size="large"
                  variant="outlined"
                  fullWidth
                  onClick={() =>
                    loginWithRedirect({
                      authorizationParams: { screen_hint: 'signup' },
                    })
                  }
                >
                  Signup
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Container>
      ) : (
        <>
          <Box
            sx={{
              background: 'linear-gradient(120deg, rgba(0,184,212,0.14), rgba(14,20,39,1) 58%)',
              py: { xs: 8, md: 12 },
            }}
          >
            <Container>
              <Typography variant="overline" color="secondary.main" fontWeight={700}>
                IT Company • Cyber Security Defence System
              </Typography>
              <Typography variant="h2" fontWeight={800} sx={{ maxWidth: 760 }} gutterBottom>
                Next-Gen Digital Defence for Modern Enterprises
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700 }}>
                We help organizations prevent breaches, detect threats early, and respond faster with resilient
                cybersecurity architecture.
              </Typography>

              {user && (
                <Typography variant="body1" sx={{ mt: 2 }} color="secondary.main">
                  Logged in as: {user.email || user.name}
                </Typography>
              )}

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={4}>
                <Button variant="contained" size="large">
                  Request Demo
                </Button>
                <Button variant="outlined" size="large">
                  View Solutions
                </Button>
              </Stack>
            </Container>
          </Box>

          <Container sx={{ py: 8 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Core Security Services
            </Typography>
            <Grid container spacing={3}>
              {features.map((feature) => (
                <Grid item xs={12} md={4} key={feature.title}>
                  <Card sx={{ height: '100%', border: '1px solid #1f2e4f', borderRadius: 3 }}>
                    <CardContent>
                      <Stack spacing={2}>
                        {feature.icon}
                        <Typography variant="h6" fontWeight={700}>
                          {feature.title}
                        </Typography>
                        <Typography color="text.secondary">{feature.description}</Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      )}
    </Box>
  );
}