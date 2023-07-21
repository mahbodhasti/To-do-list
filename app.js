const express = require("express");
const https = require('https');
const bodyParser = require("body-parser")
const date = require(__dirname + '/date.js')
const app = express();

// console.log(date())
app.set('view engine','ejs')

app.use(express.urlencoded({extended:true}))

app.use(express.static("public"))
let workItems =[]
var newItems=['buyfood','feed woody','capsul']
app.get("/",(req,res)=>{
    
//     var today = new Date()
//     var cuurentDay = today.getDay();
//     var day =""
//    switch (cuurentDay) {
//     case 0:
//      day="saturday::   "+"شنبه";
//         break;
//     case 1:
//      day="sunday:   :"+"یکشنبه";
//         break;
//     case 2:
//      day="monday:   "+"دوشنبه";
//         break;
//     case 3:
//      day="tuesday::   "+"سهشنبه";
//         break;
//     case 4:
//      day="wednesday:   :"+"چهارشنبه ";
//         break;
//     case 5:
//      day="thursday:   :"+"پنج شنبه";
//         break;
//     case 6:
//      day="friday::   "+" جمه";
//         break;
//     default:
//         console.log("error :current day is equal to :"+cuurentDay )
//    }



    let today =date.getDate()

    res.render('list',{listTitle:today,newListItems:newItems})    
    // console.log(today.getDay())

})

app.post('/',(req,res)=>{
let newItem = req.body.newItem;


if(req.body.list === "work" ){
    workItems.push(newItem)
    res.redirect("/work")
}else{
    newItems.push(newItem)
    res.redirect("/")
}

let item =  req.body.newItem
newItems.push(newItem)




})

app.get("/work",(req,res)=>{
 
    res.render("list",{listTitle:"work List",newListItems:workItems})

})

app.get("/about",(req,res)=>{
 
    res.render("about")

})

// app.post("/work",(req,res)=>{

//     workItem.push(item)
//     res.redirect("/work")

// })



 
app.listen(3000,()=> {
    console.log("Server is running on port 3000. ");
})