import { Box, Container, CssBaseline } from '@mui/material';
import { Button, TextField } from '@mui/material';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Auth } from 'aws-amplify';

async function signUp(email, password, nickname) {
  try {
    const { user } = await Auth.signUp({
      username: email,
      password: password,
      attributes: {
        nickname: nickname, // optional
      },
    });
    console.log(user);
  } catch (error) {
    console.log('error signing up:', error);
  }
}

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

export default function SignUpForm() {
  function handleSubmit(event) {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    console.log(data);
    let nickname = data.get('nickname');
    let email = data.get('email');
    let password = data.get('password');
    signUp(email, password, nickname);
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nickname"
              label="Nickname"
              name="nickname"
              autoComplete="nickname"
              autoFocus
            />

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
              Sign Up
            </Button>
          </Box>

          <RouterLink to="/">
            <Link component="button" variant="body2">
              {'Already have an account? Sign In'}
            </Link>
          </RouterLink>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
