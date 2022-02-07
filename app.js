const express = require('express') //importing express   
const app = express();

const mongoose = require('mongoose') // importing mongoose

const bodyparser = require('body-parser')

const path = require("path")


app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(express.json())




//connection to databse LOCALLY
mongoose.connect("mongodb://localhost:27017/Empl", { //this creates the dabase name
    useNewURLParser:true //makes the connection to the database

}).then(()=>{

    console.log("Congratulations we have connected to the Database !")
}).catch((err) =>{

    console.log(err)
});

//path to database model Javascript file
require("./models/Employee")

let EmployeeCollection = mongoose.model("employeeSchema") //SCHEMA From Food.js


//route for saving the data. to data base
app.post("/saveEmployee", (request, response)=>{

    console.log(request.body)//data on server //Names on the form input must match the database column names in Model/Food.js

    //create a new entry for the food on the database
    new EmployeeCollection(request.body).save().then(()=>{

        console.log("Data Saved!")

        response.redirect("employeeList.html")
    })
})


//gets the data from database //reads it
app.get("/getData",(request, response)=>{

    EmployeeCollection.find().then((employeesFound)=>{

        response.json({employeesFound})

    })

})


//Delete the data from the database
app.post("/deleteEmployee", (request, response)=>{

    console.log("Employee deleted " + request.body._id + " " + request.body.employeeFirstName + " " + request.body.employeeLastName)

    EmployeeCollection.findByIdAndDelete(request.body._id).exec() //deletes based on the ID

    response.redirect("foodlist.html")

})





//Update the data from the database
app.post("/updateEmployee", (request, response)=>{
 //   {"_id":{"$oid":"6201481a89b77b9716675054"},"employeeFirstName":"Michael","employeeLastName":"Jordan","__v":0}

 

    let searchQueryID = {_id: request.body._id}
    let updatedInfo = { 
        $set: {
            employeeFirstName: request.body.employeeFirstName,
            employeeLastName: request.body.employeeLastName,
            employeeDepartment: request.body.employeeDepartment,
            employeeStartDate: request.body.employeeStartDate,
            employeeJobTitle: request.body.employeeJobTitle,
            employeeSalary: request.body.employeeSalary
       
        } 
    };

    console.log("HERE" + request.body._id)
    console.log(updatedInfo)

    EmployeeCollection.updateOne(searchQueryID, updatedInfo, (err, res)=> {

      if (err) throw err;

      console.log("1 Employee updated");

    });

    response.redirect("employeeList.html")
})



//Databasde we want to create for the application is food entreies

//Basic codew to save some data

//model - database
//let Food = mongoose.model("Food",{typeOfFood:String})

// let food = new Food({typeOfFood:"Pizza"})

// food.save().then(()=>{
    
//     console.log("Food Saved")
// })


//static route
app.use(express.static(__dirname + "/views"))
app.listen(3000, ()=>{

    console.log("We are listening on Port 3000")
})