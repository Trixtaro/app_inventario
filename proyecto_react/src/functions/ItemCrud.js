export const registrarSalida = async(itemSeleccionado, cb) =>{

    if(itemSeleccionado.fecha_salida){
        alert('Ya se registró la salida de este item.')
        return;
    }

    try{

        await fetch(`${process.env.REACT_APP_BACKEND}/actualizarItems`,{
            headers: {
                "Content-Type": "application/json"
            },
            method: 'PUT',
            body : JSON.stringify({ id_item: itemSeleccionado.id_item, localizacion: 'Entregado' })
        });

        alert('Se ingreso la salida del item con éxito.')

        cb()

    } catch(error){
        
        console.log(error)
    }

}