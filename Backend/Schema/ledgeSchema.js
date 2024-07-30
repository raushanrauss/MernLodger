const { Schema, default: mongoose } = require("mongoose");

const ledgeSchme = new Schema({
    name: {
        type: String,
        required: true,
        min:3,
    },
    amount: {
        type: Number,
        required:true,
    },
    date: {
        type: String,
        required: true,
        
    },
    type: {
        type: String,
        required:true
    }
})
const ledgeModel = mongoose.model('ledgeData', ledgeSchme);
module.exports = ledgeModel;