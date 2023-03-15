import { Button, TextField } from '@mui/material';
import { Box, Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../App';
import { Auth } from 'aws-amplify';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#009207',
    },
    secondary: {
      main: '#1149BF',
    },
  },
});

async function signIn(email, password, userContext) {
  try {
    const user = await Auth.signIn(email, password);
    console.log('Sign in successful', user);
    userContext.setUser(user);
  } catch (error) {
    console.log('Error signing in', error);
  }
}

export default function SignInForm() {
  const user = useContext(UserContext);
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get('email');
    let password = data.get('password');
    signIn(email, password, user);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="sm"
        sx={{
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'stretch',
        }}
      >
        <Box
          sx={{
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 0,
            paddingTop: '20%',
            border: 1,
            borderColor: 'rgb(128, 128, 128)',
            borderRadius: 2,
            padding: 2,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <NavLink to="/SignUpForm">
              <Link component="button" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </NavLink>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
