"use client";
import { useEffect, useState } from "react";
import { obtenerUsuariosLogueados } from "@/api/peticiones";

export default function UsuariosLogueados() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        async function cargarUsuarios() {
            const respuesta = await obtenerUsuariosLogueados();
            if (respuesta.length > 0) {
                setUsuarios(respuesta);
            } else {
                setUsuarios([]);
            }
        }
        cargarUsuarios();
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Usuarios Logueados</h1>
            {usuarios.length > 0 ? (
                <table border="1" style={{ margin: "auto", marginTop: "20px" }}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((user) => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.tipoUsuario}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay usuarios logueados.</p>
            )}
        </div>
    );
}
