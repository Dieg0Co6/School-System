const z = require('zod');

const DocenteSchema = z.object({
    dni: z.string({
        invalid_type_error: "El dni debe ser un string",
        required_error: "El dni del Docente es requerido"
    }).length(8, { message: "El DNI debe tener exactamente 8 dígitos" }) 
    .regex(/^\d+$/, { message: "El DNI debe contener solo números" }),
    nombre : z.string({
        invalid_type_error: "El tipo de nombre debe ser un string",
        required_error: "El nombre del Docente es requerido"
    }),
    apellido_paterno: z.string({
        invalid_type_error: "El tipo del apellido paterno debe ser un string",
        required_error: "El apellido paterno del Docente es requerido"
    }),
    apellido_materno: z.string({
        invalid_type_error: "El tipo del apellido materno debe ser un string",
        required_error: "El apellido materno del Docente es requerido"
    }),
    correo: z.string({
        invalid_type_error: "El tipo del correo debe ser un string",
        required_error: "El correo del Docente es requerido"
    }),
    fecha_nacimiento: z.string()
    .refine((date) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(date) && !isNaN(new Date(date).getTime());
    }, {
        message: "Fecha inválida. Debe estar en formato YYYY-MM-DD"
    })
    .transform((date) => {
        return date; // Devuelve la fecha como string sin modificar
    })
})

function validateDocente(object){
    return DocenteSchema.safeParse(object)
}

module.exports = validateDocente;