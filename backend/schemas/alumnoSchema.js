const z = require('zod');

const AlumnoSchema = z.object({
    codigo_alumno: z.string({
        invalid_type_error: "El tipo de codigo_alumno debe ser un string",
        required_error: "El codigo_alumno es requerido"
    }),
    carrera: z.string({
        invalid_type_error: "El tipo de carrera debe ser un string",
        required_error: "El carrera es requerido"
    }),
    ciclo: z.number({
            invalid_type_error: "El tipo de ciclo debe ser un entero",
            required_error: "El ciclo es requerido",
        }).int(),
})

function validateAlumno(object) {
    return AlumnoSchema.safeParse(object)
}

module.exports = validateAlumno;