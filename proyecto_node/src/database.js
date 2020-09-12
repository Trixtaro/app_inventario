const mysql=require('mysql');
const conexion=mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '12345',
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