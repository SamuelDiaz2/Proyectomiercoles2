import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/usuarios';

const UserList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null);
  const [contrasena, setContrasena] = useState('');

  // Obtener usuarios
  const fetchUsuarios = async () => {
    const res = await axios.get(API_URL);
    setUsuarios(res.data);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Crear o actualizar usuario
  const subir = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, { nombre, email, contrasena });
      setEditId(null);
    } else {
      await axios.post(API_URL, { nombre, email, contrasena });
    }
    setNombre('');
    setEmail('');
    setContrasena('');
    fetchUsuarios();
  };

  // Editar usuario
  const editar = (user) => {
    setNombre(user.nombre);
    setEmail(user.email);
    setContrasena(user.contrasena);
    setEditId(user.id);
  };

  // Eliminar usuario
  const eliminar = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchUsuarios();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestión de Usuarios</h2>
      <form onSubmit={subir}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
      </form>

      <table border="1" cellPadding="10" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Contraseña</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.contrasena}</td>
              <td>
                <button onClick={() => editar(u)}>Editar</button>
                <button onClick={() => eliminar(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;