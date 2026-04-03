const z = require('zod');

const MatriculaSchema = z.object({
    id_alumno: z.number({
        invalid_type_error: "El tipo de id_alumno debe ser un entero",
        required_error: "El id_alumno es requerido",
    }).int(),
    id_curso: z.string({
        invalid_type_error: "El tipo de id_curso debe ser un string",
        required_error: "El id_curso es requerido"
    }),
    ciclo_academico: z.string({
        invalid_type_error: "El tipo de ciclo_academico debe ser un string",
        required_error: "El ciclo_academico es requerido"
    }).min(6).max(8)
});

function validateMatricula(object) {
    return MatriculaSchema.safeParse(object);
}

module.exports = validateMatricula