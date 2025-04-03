const z = require('zod')

const UsuarioSchema = z.object({
    nombre : z.string({
        invalid_type_error: "El tipo de nombre debe ser un string",
        required_error: "El nombre es requerido"
    }),
    dni:z.string({
        invalid_type_error: "El tipo de dni debe ser un string",
        required_error: "El dni es requerido"
    }),
    apellido_paterno: z.string({
        invalid_type_error: "El tipo del apellido paterno debe ser un string",
        required_error: "El apellido paterno es requerido"
    }),
    apellido_materno: z.string({
        invalid_type_error: "El tipo del apellido materno debe ser un string",
        required_error: "El apellido materno es requerido"
    }),
    email: z.string({
        invalid_type_error: "El tipo del email debe ser un string",
        required_error: "El email es requerido"
    }),
    password: z.string({
        invalid_type_error: "El tipo del password debe ser un string",
        required_error: "El password es requerido"
    })
})

const UsuarioLoginSchema = z.object({
    email: z.string({
        invalid_type_error: "El tipo del email debe ser un string",
        required_error: "El email es requerido"
    }),
    password: z.string({
        invalid_type_error: "El tipo del password debe ser un string",
        required_error: "El password es requerido"
    })
})

function validateUsuario (object){
    return UsuarioSchema.safeParse(object);
}

function validateUsuarioParcial(object){
    return UsuarioLoginSchema.safeParse(object);
}

module.exports = {validateUsuario, validateUsuarioParcial}