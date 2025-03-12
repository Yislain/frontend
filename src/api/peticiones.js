import axios from "axios";
const API = process.env.NEXT_PUBLIC_API_URL;

export const peticionRegistro = async (usuario) => {
    return await axios.post(`${API}/registro`, usuario, { withCredentials: true });
};

export const login = async ({ username, password }) => {
    try {
        console.log("Datos enviados al backend:", { username, password }); // 🔍 Debug
        const respuesta = await axios.post(`${API}/ingresar`, { username, password }, { withCredentials: true });
        console.log("Respuesta del backend en UI:", respuesta.data);
        if (!respuesta.data) return { estado: false };
        return { estado: true, tipoUsuario: respuesta.data };
    } catch (error) {
        console.error("Error en login (UI):", error);
        return { estado: false };
    }
};

export const buscarPorId = async (id) => {
    return await axios.get(`${API}/buscarPorId/${id}`);
};

export const obtenerUsuariosLogueados = async () => {
    return await axios.get(`${API}/usuariosLogueados`, { withCredentials: true });
};

export const obtenerAdministradores = async () => {
    return await axios.get(`${API}/administradores`, { withCredentials: true });
};

export const cerrarSesion = async () => {
    return await axios.post(`${API}/cerrarSesion`, {}, { withCredentials: true });
};

export const obtenerUsuarios = async () => {
    return await axios.get(`${API}/usuarios`, { withCredentials: true });
};

export const editarUsuario = async (id, datos) => {
    return await axios.put(`${API}/editar/${id}`, datos, { withCredentials: true });
};

export const borrarUsuario = async (id) => {
    return await axios.delete(`${API}/borrar/${id}`, { withCredentials: true });
};

export const obtenerLibre = async () => {
    return await axios.get(`${API}/libre`);
};
