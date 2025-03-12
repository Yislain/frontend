import axios from "axios";
const API = process.env.NEXT_PUBLIC_API_URL;

// 🔹 Registrar usuario
export const peticionRegistro = async (usuario) => {
    try {
        console.log("📤 Enviando datos de registro:", usuario);
        const respuesta = await axios.post(`${API}/registro`, usuario, { withCredentials: true });

        console.log("📥 Respuesta de registro:", respuesta.data);

        if (!respuesta.data || !respuesta.data.estado || !respuesta.data.usuario) {
            console.error("❌ Error: Respuesta inesperada en el registro");
            return { estado: false, mensaje: "Error en la respuesta del servidor" };
        }

        return respuesta.data;
    } catch (error) {
        console.error("❌ Error en registro:", error.response?.data || error.message);
        return { estado: false, mensaje: error.response?.data?.mensaje || "Error en la solicitud" };
    }
};


// 🔹 Iniciar sesión (Login)
export const login = async ({ username, password }) => {
    try {
        console.log("📤 Enviando datos de login a:", `${API}/ingresar`);
        const respuesta = await axios.post(`${API}/ingresar`, { username, password }, { withCredentials: true });

        console.log("📥 Respuesta del backend en frontend:", respuesta.data);

        if (!respuesta.data || !respuesta.data.estado || !respuesta.data.usuario) {
            console.error("❌ Error: No se recibió una respuesta válida.");
            return { estado: false };
        }

        return { estado: true, usuario: respuesta.data.usuario };
    } catch (error) {
        console.error("❌ Error en login (UI):", error.response?.data || error.message);
        return { estado: false };
    }
};

// 🔹 Obtener todos los usuarios
export const obtenerUsuarios = async () => {
    try {
        console.log("📤 Solicitando usuarios...");
        const respuesta = await axios.get(`${API}/usuarios`, { withCredentials: true });
        return respuesta.data || [];
    } catch (error) {
        console.error("❌ Error al obtener usuarios:", error.response?.data || error.message);
        return [];
    }
};

// 🔹 Buscar usuario por ID
export const buscarPorId = async (id) => {
    try {
        console.log("📤 Buscando usuario en backend con ID:", id);
        const respuesta = await axios.get(`${API}/buscarPorId/${id}`, { withCredentials: true });

        console.log("📥 Respuesta recibida del backend:", respuesta.data);
        return respuesta.data;
    } catch (error) {
        console.error("❌ Error al buscar usuario por ID:", error.response?.data || error.message);
        return { estado: false, mensaje: "Error al obtener usuario" };
    }
};



// Obtener usuarios logueados
export const obtenerUsuariosLogueados = async () => {
    try {
        console.log("📤 Solicitando usuarios logueados desde:", `${API}/usuariosLogueados`);
        const respuesta = await axios.get(`${API}/usuariosLogueados`, { withCredentials: true });

        if (!respuesta.data || respuesta.data.length === 0) {
            console.warn("⚠ No hay usuarios logueados.");
            return [];
        }

        console.log("📥 Respuesta recibida:", respuesta.data);
        return respuesta.data;
    } catch (error) {
        console.error("❌ Error al obtener usuarios logueados:", error.response?.data || error.message);
        return [];
    }
};


// Obtener administradores
export const obtenerAdministradores = async () => {
    try {
        console.log("📤 Solicitando administradores desde:", `${API}/administradores`);
        const respuesta = await axios.get(`${API}/administradores`, { withCredentials: true });
        console.log("📥 Respuesta recibida:", respuesta.data);
        return respuesta.data;
    } catch (error) {
        console.error("❌ Error al obtener administradores:", error.response?.data || error.message);
        return [];
    }
};

// Editar usuario
export const editarUsuario = async (id, datos) => {
    try {
        console.log("✏ Editando usuario con ID:", id);
        const respuesta = await axios.put(`${API}/editar/${id}`, datos, { withCredentials: true });
        return respuesta.data;
    } catch (error) {
        console.error("❌ Error al editar usuario:", error.response?.data || error.message);
        return null;
    }
};

// Borrar usuario
export const borrarUsuario = async (id) => {
    try {
        console.log("🗑 Eliminando usuario con ID:", id);
        await axios.delete(`${API}/borrar/${id}`, { withCredentials: true });
        console.log("✅ Usuario eliminado correctamente");
    } catch (error) {
        console.error("❌ Error al eliminar usuario:", error.response?.data || error.message);
    }
};

// Cerrar sesión
export const cerrarSesion = async () => {
    try {
        console.log("📤 Cerrando sesión en:", `${API}/cerrarSesion`);
        await axios.post(`${API}/cerrarSesion`, {}, { withCredentials: true });
        console.log("✅ Sesión cerrada correctamente");
    } catch (error) {
        console.error("❌ Error al cerrar sesión:", error.response?.data || error.message);
    }
};

// Obtener recursos públicos (/libre)
export const obtenerLibre = async () => {
    try {
        console.log("📤 Solicitando recurso libre en:", `${API}/libre`);
        const respuesta = await axios.get(`${API}/libre`);
        console.log("📥 Respuesta recibida:", respuesta.data);
        return respuesta.data;
    } catch (error) {
        console.error("❌ Error al obtener recurso libre:", error.response?.data || error.message);
        return null;
    }
};

