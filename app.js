const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");
const mongoose =require("mongoose");
const date = require(__dirname + '/date.js');
require('dotenv').config()
// mongo "mongodb+srv://cluster0.autl6q2.mongodb.net/" --username lordloss

const app = express();

// console.log(date())
app.set('view engine','ejs')

app.use(express.urlencoded({extended:true}))

app.use(express.static("public"))

mongoose.connect(process.env.MongoConnect,{useNewUrlParser:true})
  .then(() => console.log('Connected!'));

const itemsSchema ={
    name: String
}

const Item =  mongoose.model("Item", itemsSchema)

const item1 = new Item({
    name:"welcom to your todolist"
})
const item2 = new Item({
    name:"hit the + button to add a new item"
})
const item3 = new Item({
    name:"<-- hit thi to delete an item"
})

const defaultItems = [item1,item2,item3];

const listSchema = {
    name:String,
    items:[itemsSchema]
}

const List = mongoose.model("List",listSchema)
// Item.insertMany(defaultItems)

// Item.find().then((data) => {
    // console.log(data);
//     // mongoose.connection.close()
//     // data.forEach(fruit => {
//     //     console.log(fruit.name)
//     // });

   
//    })


app.get("/",(req,res)=>{
    
    var todayy = new Date()
    var cuurentDay = todayy.getDay();
    var day =""
   switch (cuurentDay) {
    case 0:
     day=":saturday:"+"شنبه";
        break;
    case 1:
     day=":sunday:"+"یکشنبه";
        break;
    case 2:
     day=":monday:"+"دوشنبه";
        break;
    case 3:
     day=":tuesday: "+"سهشنبه";
        break;
    case 4:
     day=":wednesday:"+"چهارشنبه ";
        break;
    case 5:
     day=":thursday:"+"پنج شنبه";
        break;
    case 6:
     day=":friday: "+" جمه";
        break;
    default:
        console.log("error :current day is equal to :"+cuurentDay )
   }
//    console.log(day)
Item.find({}).then((data)=>{
    var options =date.getOption
    var today =new Date().toLocaleDateString('fa-IR', options) +day;

    if(data.length == 0){
        Item.insertMany(defaultItems)
        res.redirect("/")
    }else{
        res.render('list',{listTitle:'today',newListItems:data})
    }
      
});


    
    // console.log(today.getDay())

})


var todayy = new Date()
var cuurentDay = todayy.getDay();
var day =""
switch (cuurentDay) {
case 0:
 day=":saturday:"+"شنبه";
    break;
case 1:
 day=":sunday:"+"یکشنبه";
    break;
case 2:
 day=":monday:"+"دوشنبه";
    break;
case 3:
 day=":tuesday: "+"سهشنبه";
    break;
case 4:
 day=":wednesday:"+"چهارشنبه ";
    break;
case 5:
 day=":thursday:"+"پنج شنبه";
    break;
case 6:
 day=":friday: "+" جمه";
    break;
default:
    console.log("error :current day is equal to :"+cuurentDay )
}

var options =date.getOption
var today =new Date().toLocaleDateString('fa-IR', options) +day;
app.get("/:customListName",(req,res)=>{

    // console.log(req.params.customListName)
    const  customListName = req.params.customListName;

    List.findOne({name:customListName}).then((data)=>{
        if(!data){
            // console.log("Dosent exist!")
            //Create a new list
            const list = new List({
                name:customListName,
                items:defaultItems
            })
            
            list.save();
            res.redirect("/" + customListName )
         
        }else{
            // console.log("Exists")
            // Show an existin list
            res.render("list",{listTitle:String(data.name),newListItems:data.items})
            
           
        }
    } )
    




})

app.post('/',(req,res)=>{

// let newItem = req.body.newItem;
// if(req.body.list === "work" ){
//     defaultItems.push(newItem)
//     res.redirect("/work")
// }else{
//     defaultItems.push(newItem)
//     res.redirect("/")
// }

const listName = req.body.list;

const itemName = req.body.newItem;
const item = new Item({
    name :  itemName
});

if(listName === 'today'){
    item.save();
    res.redirect("/")
}else(
    List.findOne({name:listName}).then((data)=>{
        data.items.push(item)
        data.save();
        res.redirect("/" + listName )
    })
)



// let item =  req.body.newItem
// newItems.push(newItem)




})

// app.get("/work",(req,res)=>{
 
//     res.render("list",{listTitle:"work List",newListItems:workItems})

// })

// app.get("/about",(req,res)=>{
 
//     res.render("about")

// })

app.post("/delete",(req,res)=>{
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName
    if (listName=== "today"){
        Item.findByIdAndRemove(checkedItemId).then(()=>{})
        res.redirect("/")
    }else{
        List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItemId}}}).then((data)=>{

           res.redirect("/" + listName)
        })
    }
 
})

// app.post("/work",(req,res)=>{

//     workItem.push(item)
//     res.redirect("/work")

// })



 
app.listen(3000,()=> {
    console.log("Server is running on port 3000. ");
})