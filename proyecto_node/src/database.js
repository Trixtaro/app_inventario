const mysql=require('mysql');
const conexion=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'app_inventario'
})

conexion.connect((err)=>{
    if(err){
        console.log(err);
        return;

    }else{
        console.log('Conectado');
    }

});
module.exports=conexion;