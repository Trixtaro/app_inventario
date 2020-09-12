import React from 'react';
import { Link, Redirect } from 'react-router-dom'

import { registrarSalida } from '../functions/ItemCrud';

import Header from '../components/Header';

class ProductoDetalle extends React.Component{

    state = {
        producto: null,
        cargando: false,
        error: '',
        items: [],
        itemSeleccionado: {}
    }

    async componentDidMount(){

        await this.cargarProducto()

    }

    cargarProducto = async () => {
        try{
            this.setState({
                cargando: true
            })

            const response = await fetch(`${process.env.REACT_APP_BACKEND}/consultaProductos/${this.props.match.params.codigo}`)
            const data = await response.json()

            const Itemsresponse = await fetch(`${process.env.REACT_APP_BACKEND}/consultaItems/${this.props.match.params.codigo}`)
            const dataItems = await Itemsresponse.json()

            this.setState({
                cargando: false,
                producto: data,
                items: dataItems
            })

        } catch(error){
            this.setState({
                cargando: false,
                error: error
            })
            console.log(error)
        }
    }

    mostrarProducto = () => {
        
        if (this.state.cargando)
            return <div className="mx-auto font-xl">Cargando...</div>

        if (this.state.error)
            return <Redirect to="/404"/>
        
            if (!this.state.producto)
            return <div className="mx-auto font-xl">Producto no disponible</div>

        return (
        <React.Fragment>

            <h2 className="my-2 font-bold text-2xl">{this.state.producto.nombre}</h2>
            <h2 className="my-2 font-bold text-1xl text-gray-500">{this.state.producto.codigo}</h2>
            {
                (this.state.producto.iva)?
                    <h2 className="my-2 font-bold text-1xl text-red-500">Paga IVA</h2>
                :
                    <h2 className="my-2 font-bold text-1xl text-green-500">No paga IVA</h2>
                }
                <div className="flex flex-row justify-end">
                    <Link to={`/item/${this.state.producto.id_producto}/nuevo`}>
                        <div className="mx-2 p-2 bg-indigo-600 text-white rounded-md">Agregar nuevos items</div>
                    </Link>
            </div>
        </React.Fragment>)
    }

    mostrarItems = () => {

        if(this.state.items.length === 0)
            return <h2 className="font-bold text-red-500">No hay items de este producto.</h2>;

        return <ul>
            <li className="flex flex-row justify-around font-bold my-2">
                <div className="w-24 bg-gray-300 p-1 mx-2 text-gray-900 ">Código</div>
                <div className="flex-1 bg-gray-300 p-1 mx-2 text-gray-900">Localizacion</div>
                <div className="flex-1 bg-gray-300 p-1 mx-2 text-gray-900">Fecha de llegada</div>
                <div className="flex-1 bg-gray-300 p-1 mx-2 text-gray-900">Fecha de salida</div>
            </li>
            {
                this.state.items.map((item) => 
                    <div key={item.id_item} className={"flex flex-row justify-around my-1 hover:bg-blue-100 cursor-pointer "+((this.state.itemSeleccionado.id_item === item.id_item)&&' bg-blue-200 ')}
                        onClick={()=> {
                            if(!this.state.itemSeleccionado.id_item || this.state.itemSeleccionado.id_item !== item.id_item)
                                this.setState({itemSeleccionado: item})
                            else
                                this.setState({itemSeleccionado: {}})
                        }}
                    >
                        <div className="w-24 px-2 mx-2 text-center ">#{item.id_item}</div>
                        <div className="flex-1 px-2 mx-2 text-left">{item.localizacion}</div>
                        <div className="flex-1 px-2 mx-2 text-right">{item.fecha_llegada}</div>
                        <div className="flex-1 px-2 mx-2 text-right">{item.fecha_salida || 'Permanece en inventario'}</div>
                    </div> 
                )
            }
        </ul>

    }

    render(){

        return(
            <div>
                <Header/>
                <div className="mx-auto container">
                    {
                        this.mostrarProducto()
                    }
                    <div className="flex flex-row justify-end h-16">
                        {
                            (this.state.itemSeleccionado.id_item) &&
                            <button onClick={async()=>
                                registrarSalida(this.state.itemSeleccionado, this.cargarProducto)
                            }>
                                <div className="bg-orange-500 hover:bg-orange-400 text-white rounded-lg p-2">Registrar salida</div>
                            </button>
                        }
                    </div>
                    {
                        this.mostrarItems()
                    }
                </div>
            </div>
        )
    }

}

export default ProductoDetalle