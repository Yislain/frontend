"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cerrarSesion } from "@/api/peticiones";

export default function Perfil() {
    const router = useRouter();
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuario");
        if (!usuarioGuardado) {
            console.error("❌ No se encontró el usuario en localStorage");
            router.push("/login");
            return;
        }

        setUsuario(JSON.parse(usuarioGuardado));
    }, []);

    const handleLogout = async () => {
        await cerrarSesion();
        localStorage.removeItem("usuario");
        router.push("/login");
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Perfil del Usuario</h1>
            {usuario ? (
                <>
                    <p><strong>Nombre:</strong> {usuario.username}</p>
                    <p><strong>Email:</strong> {usuario.email}</p>
                    <p><strong>Tipo de Usuario:</strong> {usuario.tipoUsuario}</p>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </>
            ) : (
                <p>Cargando datos del usuario...</p>
            )}
        </div>
    );
}
