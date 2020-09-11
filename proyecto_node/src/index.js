const express=require("express");
const app=express();

require('dotenv').config()

//Middlewares
app.use(express.json());
//Routes
app.use(require('./routes/productos'));
app.use(require('./routes/items'));

//Cofiguración
app.set('port',process.env.PORT || 3000);
app.listen(app.get('port'),()=>{
    console.log('Server on port: '+app.get('port'));
});