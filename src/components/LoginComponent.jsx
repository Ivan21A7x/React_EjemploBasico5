import React, { useState } from 'react';
import { Grid, Checkbox, Button, Typography, IconButton, Input } from '@mui/joy';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

export default function LoginComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Inicializa navigate

  // Función para alternar la visibilidad de la contraseña
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Función para manejar los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };


// Función para manejar el envío del formulario
const handleSubmit = async (e) => {
  e.preventDefault();

  const loginData = {
      email,
      password,
  };

  try {
      const response = await fetch('https://reqres.in/api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
      });

      const data = await response.json(); // Leer el cuerpo de la respuesta

      // Verifica si el código de estado es 200 y si hay un token en la respuesta
      if (response.status === 200 && data.token) {
          console.log('Inicio de sesión exitoso:', data);
          alert('Inicio de sesión exitoso');
          // Aquí podrías redirigir al dashboard
          navigate('/dashboard');
      } else {
          // Si no hay token o el código de estado no es 200, maneja el error
          console.error('Error en el inicio de sesión:', data);
          alert(data.error || 'Error en el inicio de sesión. Verifica tus credenciales.'); // Mensaje de error específico
      }
  } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
      alert('Ocurrió un error al iniciar sesión. Inténtalo de nuevo más tarde.');
  }
};



  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        border: 'solid black 1px',
        p: 3,
        my: 5,
        width: '50%',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Input del email */}
      <Grid width="100%">
        <Input
          name='email'
          label="Email"
          placeholder='Email'
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={handleChange}
          required
        />
      </Grid>

      {/* Input de la contraseña */}
      <Grid width="100%" sx={{ position: 'relative' }}>
        <Input
          name='password'
          label="Password"
          placeholder='Password'
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          margin="normal"
          value={password}
          onChange={handleChange}
          required
        />
        <IconButton
          onClick={handleTogglePasswordVisibility}
          sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1,
          }}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </Grid>

      {/* Opciones de recordar contraseña */}
      <Grid sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', mb: 2 }}>
        <Checkbox label="Remember me" />
      </Grid>

      {/* Botón de iniciar sesión */}
      <Grid width="100%">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 2, border: 'solid black 1px' }}
          onClick={handleSubmit} // Llama a handleSubmit al hacer clic
        >
          Sign in
        </Button>
      </Grid>

      {/* Registro y opciones adicionales */}
      <Grid>
        <Typography textAlign="center" sx={{ mb: 1 }}>
          Not a member? <Typography component="a" href="#" sx={{ textDecoration: 'none', color: 'primary.main' }}>Register</Typography>
        </Typography>
        <Typography textAlign="center" sx={{ mb: 2 }}>or sign up with:</Typography>
      </Grid>

      {/* Iconos de redes sociales */}
      <Grid sx={{ display: 'flex', justifyContent: 'space-between', width: '40%' }}>
        <IconButton color="inherit" href="#">
          <FacebookIcon sx={{ color: '#1266f1' }} />
        </IconButton>
        <IconButton color="inherit" href="#">
          <TwitterIcon sx={{ color: '#1266f1' }} />
        </IconButton>
        <IconButton color="inherit" href="#">
          <GoogleIcon sx={{ color: '#1266f1' }} />
        </IconButton>
        <IconButton color="inherit" href="#">
          <GitHubIcon sx={{ color: '#1266f1' }} />
        </IconButton>
      </Grid>
    </Grid>
  );
}
