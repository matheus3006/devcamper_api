const mongoose  = require('mongoose');
const Bootcamp = require('./Bootcamp');

const CourseSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: [true,'please add a course title']
    },
    description:{
        type: String,
        required:[true, 'Please add a description']
    },
    weeks:{
        type: String,
        required:[true, 'Please add number of weeks']
    },
    tuition:{
        type: Number,
        required:[true, 'Please add a tuition cost']
    },
    minimumSkill:{
        type: String,
        required:[true, 'Please add a minimum  skill '],
        enum:['beginner', 'intermediate', 'advanced']
    },
    scholarshipAvaible:{
        type: Boolean,
        default: false
    },
    createAt:{
        type: Date,
        default: Date.now
    },
    bootcamp:{
        type: mongoose.Schema.ObjectId,
        ref:'Bootcamp',
        required: true
    }

});

module.exports = mongoose.model('Course' , CourseSchema);