const RandomUUID = require('crypto');

class Alumno{
    static async getAll(){

    }

    static async getById(){

    }

    static async create(input){
        const newAlumno = {
        ...input
        }

        return newAlumno
    }

    static async edit({id, input}){
        
    }

    static async delete({id}){
        
    }
}

module.exports = Alumno;