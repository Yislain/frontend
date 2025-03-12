"use client";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Estas en inicio</h1>
            <button 
                onClick={() => router.push("/login")} 
                style={{ margin: "10px", padding: "10px", fontSize: "16px" }}>
                Iniciar sesión
            </button>
            <button 
                onClick={() => router.push("/registro")} 
                style={{ margin: "10px", padding: "10px", fontSize: "16px" }}>
                Registrarse
            </button>
        </div>
    );
}
