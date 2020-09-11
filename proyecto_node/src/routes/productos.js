const express=require('express');
const router=express.Router();
const conexion=require('../database');

router.get('/consultaProductos',async(req,res)=>{
    await conexion.query('SELECT * from productos',(err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else {
            console.logs('Error en la consulta: '+err);
        }

    });
});

router.get('/consultaProductos/:criterio',async (req, res)=>{
    const {criterio}=req.params;
    await conexion.query('select * from productos where id_producto=? or codigo=? or nombre=?',[criterio,criterio,criterio],(err,rows,fields)=>{
        if(!err){
            res.json(rows[0]);
        }else {
            console.logs('Error en la consulta: '+err);
        }
    });
    console.log(criterio);
});

router.post('/insertarProducto',async(req,res)=>{
    const {codigo,nombre, precio, iva}=req.body;
               await conexion.query('insert into productos (codigo,nombre,precio,iva) values(?,?,?,?)',[codigo,nombre,precio,iva],async(err,rows,fields)=>{
                    if(!err){
    
                        res.json({Status:'Producto registrado'});
                    }else {
                        console.logs('Error: '+err);
                    }
            
                });
      
    });

   

router.put('/actualizarProducto',async(req,res)=>{
    const {codigo,nombre, precio, iva}=req.body;
    await conexion.query('Update productos SET nombre=?, precio=?, iva=? where codigo=?',[nombre,precio,iva,codigo],(err,rows,fields)=>{
        if(!err){
            res.json("Se actualizo correctamente el producto con el código: "+codigo);
             
        }else {
            console.logs('Error en no se pudo actualizar: '+err);
        }
    });

   
});



module.exports=router;
