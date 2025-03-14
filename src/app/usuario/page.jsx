"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { buscarPorId, cerrarSesion } from "@/api/peticiones";

export default function Usuario() {
    const router = useRouter();
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuario");
        if (!usuarioGuardado) {
            console.error("❌ No se encontró el usuario en localStorage");
            router.push("/login");
            return;
        }

        const usuarioData = JSON.parse(usuarioGuardado);
        if (!usuarioData.id) {
            console.error("❌ Error: El usuario no tiene un ID válido");
            localStorage.removeItem("usuario");
            router.push("/login");
            return;
        }

        console.log("📤 Buscando datos del usuario:", usuarioData.id);
        
        buscarPorId(usuarioData.id).then(res => {
            if (res && res.estado) {
                console.log("✅ Datos del usuario recibidos:", res);
                setUsuario(res);
            } else {
                console.error("❌ Error al obtener usuario:", res?.mensaje || "Respuesta inválida");
                router.push("/login");
            }
        });

    }, []);

    const handleLogout = async () => {
        await cerrarSesion();
        localStorage.removeItem("usuario");
        router.push("/login");
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Datos del Usuario</h1>
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
