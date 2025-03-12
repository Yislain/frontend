"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { peticionRegistro } from "@/api/peticiones";

export default function Registro() {
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm();
    const [mensaje, setMensaje] = useState("");

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Registro</h1>
            <form
                onSubmit={handleSubmit(async (usuario) => {
                    console.log("📤 Enviando datos al backend:", usuario);

                    const respuesta = await peticionRegistro(usuario);
                    console.log("📥 Respuesta recibida:", respuesta);

                    if (respuesta.estado && respuesta.usuario) {
                        console.log("✅ Registro exitoso, guardando usuario...");
                        localStorage.setItem("usuario", JSON.stringify(respuesta.usuario));
                        router.push("/perfil"); // 🔥 Redirección corregida
                    } else {
                        console.error("❌ Error en registro:", respuesta.mensaje);
                        setMensaje(respuesta.mensaje);
                    }
                })}
            >
                <input type="text" placeholder="Nombre de usuario" {...register("username", { required: true })} /><br /><br />
                <input type="email" placeholder="Email" {...register("email", { required: true })} /><br /><br />
                <input type="password" placeholder="Contraseña" {...register("password", { required: true })} /><br /><br />
                <button type="submit">Registrarse</button>
                {mensaje && <p style={{ color: "red" }}>{mensaje}</p>}
            </form>
        </div>
    );
}
