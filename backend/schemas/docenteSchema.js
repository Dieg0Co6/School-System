const z = require('zod');

const DocenteSchema = z.object({
    codigo_docente : z.string({
        invalid_type_error: "El tipo del codigo de docente debe ser un string",
        required_error: "El codigo de docente es requerido"
    }),
    facultad: z.string({
        invalid_type_error: "El tipo de la facultad debe ser un string",
        required_error: "La facultad del Docente es requerido"
    }),
    especialidad: z.string({
        invalid_type_error: "El tipo de la especialidad debe ser un string",
        required_error: "La especialidad del Docente es requerido"
    })
})

function validateDocente(object){
    return DocenteSchema.safeParse(object)
}

module.exports = validateDocente;