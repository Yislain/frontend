"use client";
import { useEffect, useState } from "react";
import { obtenerLibre } from "@/api/peticiones";

export default function Libre() {
    const [mensaje, setMensaje] = useState("Cargando...");

    useEffect(() => {
        async function cargarMensaje() {
            const respuesta = await obtenerLibre();
            if (respuesta) {
                setMensaje(respuesta.mensaje);
            } else {
                setMensaje("❌ Error al obtener el recurso libre");
            }
        }
        cargarMensaje();
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Ruta Libre</h1>
            <p>{mensaje}</p>
        </div>
    );
}
