const express=require('express');
const router=express.Router();
const conexion=require('../database');

router.get('/consultaItems',async(req,res)=>{
    await conexion.query('SELECT id_item, codigo, nombre, precio, iva, localizacion, CAST(fecha_llegada AS CHAR) AS fecha_llegada, CAST(fecha_salida AS CHAR) AS fecha_salida from productos inner join items on productos.id_producto=items.id_producto',(err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else {
            console.log('Error en la consulta: '+err);
        }

    });
});

router.get('/consultaItems/:criterio',async(req, res)=>{
    const {criterio}=req.params;
    await conexion.query('SELECT id_item, codigo, nombre, precio, iva, localizacion,fecha_llegada, fecha_salida from productos inner join items on productos.id_producto=items.id_producto where codigo=? or nombre=?',[criterio,criterio],(err,rows,fields)=>{
        if(!err){
            res.json(rows[0]);
        }else {
            console.log('Error en la consulta: '+err);
        }
    });
    console.log(criterio);
});

router.post('/insertarItem',async(req,res)=>{
    const {localizacion,id_producto}=req.body;
    await conexion.query('insert into items (localizacion,fecha_llegada,id_producto) values(?,NOW(),?)',[localizacion,id_producto],(err,rows,fields)=>{
        if(!err){
            res.json({Status:'Item registrado registrado'});
        }else {
            console.log('error: '+err);
        }
    
    });
            
      
    });


router.put('/actualizarItems',async(req,res)=>{
    const {id_item}=req.body;
   await conexion.query('update items set fecha_salida=NOW() where id_item=?',[id_item],(err,rows,field)=>{
        if(!err){
            res.json("Se actualizo correctamente el producto con el código: "+id_item);
             
        }else {
            console.log('Error en no se pudo actualizar: '+err);
        }
});
  


   
});


module.exports=router;
