"use client";
import { useEffect, useState } from "react";
import { obtenerUsuarios, borrarUsuario, editarUsuario, peticionRegistro } from "@/api/peticiones";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Admin() {
    const autorizado = useAuth(["admin"]);
    const router = useRouter();
    const [usuarios, setUsuarios] = useState([]);
    const [editando, setEditando] = useState(null); // Almacena el usuario en edición
    const [nuevoUsuario, setNuevoUsuario] = useState({ username: "", email: "", password: "", tipoUsuario: "usuario" });

    useEffect(() => {
        async function cargarUsuarios() {
            try {
                const response = await obtenerUsuarios();
                console.log("Usuarios cargados:", response.data);
                setUsuarios(response.data);
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        }
        cargarUsuarios();
    }, []);

    if (autorizado === null) {
        return <p>Verificando autorización...</p>;
    }

    if (!autorizado) {
        router.push("/login");
        return null;
    }

    const eliminarUsuario = async (id) => {
        try {
            await borrarUsuario(id);
            setUsuarios(usuarios.filter(user => user._id !== id));
            alert("Usuario eliminado correctamente");
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    };

    const actualizarUsuario = async () => {
        try {
            await editarUsuario(editando._id, editando);
            setUsuarios(usuarios.map(user => (user._id === editando._id ? editando : user)));
            setEditando(null);
            alert("Usuario actualizado correctamente");
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    };

    const registrarUsuario = async () => {
        try {
            const response = await peticionRegistro(nuevoUsuario);
            alert("Usuario registrado correctamente");
            setUsuarios([...usuarios, response.data]);
            setNuevoUsuario({ username: "", email: "", password: "", tipoUsuario: "usuario" });
        } catch (error) {
            console.error("Error al registrar usuario:", error);
        }
    };

    return (
        <div>
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
            <table border="1">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(user => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => setEditando(user)}>Editar</button>
                                <button onClick={() => eliminarUsuario(user._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editando && (
                <div>
                    <h2>Editar Usuario</h2>
                    <input type="text" placeholder="Nombre" value={editando.username} onChange={(e) => setEditando({ ...editando, username: e.target.value })} />
                    <input type="email" placeholder="Email" value={editando.email} onChange={(e) => setEditando({ ...editando, email: e.target.value })} />
                    <button onClick={actualizarUsuario}>Actualizar Usuario</button>
                    <button onClick={() => setEditando(null)}>Cancelar</button>
                </div>
            )}
        </div>
    );
}
