const mongoose = require('mongoose')

const PeopleSchemas = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        cpf: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("People", PeopleSchemas)