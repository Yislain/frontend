"use client"
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { peticionRegistro } from "@/api/peticiones";
export default function Registro(){
    const {register, handleSubmit} = useForm();
    return(
        <>
            <h1>Regístrate</h1>
            <form action="" onSubmit={handleSubmit(async(usuario)=>{
                //console.log(usuario);
                const respuesta = await peticionRegistro(usuario);
                //console.log(respuesta);
                redirect("/")
            })}>
                <input type="text" placeholder="Usuario" {... register("username")} /><br/><br/>
                <input type="text" placeholder="Correo" {... register("email")} /><br/><br/>
                <input type="text" placeholder="Password" {... register("password")} /><br/><br/>
                <button type="submit">Registrar usuario</button>
            </form>
        </>
    );
}