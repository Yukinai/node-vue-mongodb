module.exports=app=>{
    const mongoose =require('mongoose')
    mongoose.connect('mongodb://localhost:27017/node-vue-mongodb',{
        useNewUrlParser:true
    })
    console.log("连接成功");
}