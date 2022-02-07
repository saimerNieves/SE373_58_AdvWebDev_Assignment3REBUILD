const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//SCHEMA
const EmployeeSchema = new Schema({

    employeeFirstName: {
        type:String,
        required:true
    },
    employeeLastName: {
        type:String,
        required:true
    },
    employeeDepartment: {
        type:String,
        required:true
    },
    employeeStartDate: {
        type:Date,
        required:true
    },
    employeeJobTitle: {
        type:String,
        required:true
    },
    employeeSalary: {
        type:Number,
        required:true
    }
})


mongoose.model("employeeSchema", EmployeeSchema);