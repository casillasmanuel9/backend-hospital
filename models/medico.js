const { Schema, model } = require('mongoose');

const MedicosSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
});

MedicosSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    return { ...object, id: _id };
})

module.exports = model('Medico', MedicosSchema);


