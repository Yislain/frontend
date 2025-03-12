"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { obtenerUsuarios, borrarUsuario, editarUsuario, peticionRegistro, cerrarSesion } from "@/api/peticiones";

export default function Admin() {
    const router = useRouter();
    const [usuarios, setUsuarios] = useState([]);
    const [editando, setEditando] = useState(null);
    const [nuevoUsuario, setNuevoUsuario] = useState({ username: "", email: "", password: "", tipoUsuario: "usuario" });

    useEffect(() => {
        cargarUsuarios();
    }, []);

    async function cargarUsuarios() {
        try {
            const response = await obtenerUsuarios();
            console.log("📥 Usuarios obtenidos:", response);
            setUsuarios(response || []);
        } catch (error) {
            console.error("❌ Error al obtener usuarios:", error);
        }
    }

    const registrarUsuario = async () => {
        try {
            console.log("📤 Enviando nuevo usuario:", nuevoUsuario);
            const response = await peticionRegistro(nuevoUsuario);

            if (!response || !response.estado) {
                alert("❌ Error al registrar usuario");
                return;
            }

            alert("✅ Usuario registrado correctamente");

            // Recargar la lista de usuarios para evitar errores de `undefined`
            cargarUsuarios();
            
            // Reiniciar el formulario
            setNuevoUsuario({ username: "", email: "", password: "", tipoUsuario: "usuario" });
        } catch (error) {
            console.error("❌ Error al registrar usuario:", error);
        }
    };

    const eliminarUsuario = async (id) => {
        try {
            await borrarUsuario(id);
            setUsuarios(usuarios.filter(user => user._id !== id));
            alert("🗑 Usuario eliminado correctamente");
        } catch (error) {
            console.error("❌ Error al eliminar usuario:", error);
        }
    };

    const actualizarUsuario = async () => {
        try {
            const response = await editarUsuario(editando._id, editando);
            setUsuarios(usuarios.map(user => (user._id === editando._id ? response.usuario : user)));
            setEditando(null);
            alert("✅ Usuario actualizado correctamente");
        } catch (error) {
            console.error("❌ Error al actualizar usuario:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await cerrarSesion();
            router.push("/login");
        } catch (error) {
            console.error("❌ Error al cerrar sesión:", error);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Panel de Administración</h1>

            <h2>Agregar Nuevo Usuario</h2>
            <input type="text" placeholder="Nombre" value={nuevoUsuario.username} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, username: e.target.value })} />
            <input type="email" placeholder="Email" value={nuevoUsuario.email} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })} />
            <input type="password" placeholder="Contraseña" value={nuevoUsuario.password} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })} />
            <select value={nuevoUsuario.tipoUsuario} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, tipoUsuario: e.target.value })}>
                <option value="usuario">Usuario</option>
                <option value="admin">Administrador</option>
            </select>
            <button onClick={registrarUsuario}>Registrar Usuario</button>

            <h2>Lista de Usuarios</h2>
            <table border="1" style={{ margin: "0 auto" }}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Tipo de Usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.length > 0 ? (
                        usuarios.map(user => (
                            <tr key={user?._id}>
                                <td>{user?.username || "Sin nombre"}</td>
                                <td>{user?.email || "Sin email"}</td>
                                <td>{user?.tipoUsuario || "Sin tipo"}</td>
                                <td>
                                    <button onClick={() => setEditando(user)}>Editar</button>
                                    <button onClick={() => eliminarUsuario(user._id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="4">No hay usuarios registrados</td></tr>
                    )}
                </tbody>
            </table>

            {editando && (
                <div>
                    <h2>Editar Usuario</h2>
                    <input type="text" value={editando.username} onChange={(e) => setEditando({ ...editando, username: e.target.value })} />
                    <input type="email" value={editando.email} onChange={(e) => setEditando({ ...editando, email: e.target.value })} />
                    <select value={editando.tipoUsuario} onChange={(e) => setEditando({ ...editando, tipoUsuario: e.target.value })}>
                        <option value="usuario">Usuario</option>
                        <option value="admin">Administrador</option>
                    </select>
                    <button onClick={actualizarUsuario}>Actualizar</button>
                    <button onClick={() => setEditando(null)}>Cancelar</button>
                </div>
            )}

            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
}
