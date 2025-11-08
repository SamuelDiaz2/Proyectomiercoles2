import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth/login';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [contrasena, setcontrasena] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, { email, contrasena });
      onLogin(res.data.user); // Guardamos usuario logueado
      setError('');
    } catch (err) {
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block' }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setcontrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ingresar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
