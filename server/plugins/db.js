module.exports=app=>{
    const mongoose =require('mongoose')
    mongoose.connect('mongodb://localhost:27017/node-vue-mongodb',{
        useNewUrlParser:true
    })
    console.log("θΏζ₯ζε");
    require('require-all')(__dirname+'/../models')
}