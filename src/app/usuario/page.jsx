"use client";
import { useAuth } from "@/hooks/useAuth";

export default function Usuario() {
    const autorizado = useAuth(["usuario","admin"]);   
    if (autorizado === null) {
        return <p>Verificando autorización...</p>;
        
    }
    
    return(
        <h1>Datos del usuario</h1>
    );
}
