"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/api/peticiones";

export default function Login() {
    const router = useRouter();
    const { register, handleSubmit } = useForm();
    const [mensaje, setMensaje] = useState("");

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Inicio de sesión</h1>
            <form
                onSubmit={handleSubmit(async (usuario) => {
                    console.log("📤 Enviando datos de login:", usuario);

                    const respuesta = await login(usuario);
                    console.log("📥 Respuesta recibida:", respuesta);

                    if (!respuesta || !respuesta.estado) {
                        console.error("❌ Error en login: Respuesta inválida", respuesta);
                        setMensaje("Error al iniciar sesión");
                        return;
                    }

                    // ✅ Guardar usuario y redirigir
                    localStorage.setItem("usuario", JSON.stringify(respuesta.usuario));

                    if (respuesta.usuario.tipoUsuario === "usuario") {
                        console.log("🔹 Redirigiendo a /usuario...");
                        router.push("/perfil");
                    } else if (respuesta.usuario.tipoUsuario === "admin") {
                        console.log("🔹 Redirigiendo a /admin...");
                        router.push("/admin");
                    } else {
                        console.error("❌ Tipo de usuario desconocido:", respuesta.usuario.tipoUsuario);
                        setMensaje("Error en el tipo de usuario.");
                    }
                })}
            >
                <input type="text" placeholder="Usuario" {...register("username")} /><br /><br />
                <input type="password" placeholder="Password" {...register("password")} /><br /><br />
                <button type="submit">Ingresar</button>
                {mensaje && <p style={{ color: "red" }}>{mensaje}</p>}
            </form>
        </div>
    );
}
