import React from 'react';

import { registrarSalida } from '../functions/ItemCrud'

import Header from '../components/Header';

class ItemsPage extends React.Component{

    state = {
        items: [],
        cargando: false,
        error: '',
        itemSeleccionado: {}
    }

    async componentDidMount(){
        await this.cargarItems()
    }

    cargarItems = async() =>{

        try{
            this.setState({
                cargando: true
            })
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/consultaItems`)
            const data = await response.json()

            this.setState({
                cargando: false,
                items: data
            })

        } catch(error){
            this.setState({
                cargando: false,
                error: error
            })
            console.log(error)
        }

    }

    mostrarItems = () => {
        if(this.state.cargando)
            return 'Cargando...'

        if(!this.state.items || this.state.items.length === 0)
            return <h1>No hay items disponibles</h1>

        return <ul>
            <li className="flex flex-row justify-around font-bold my-2">
                <div className="w-24 bg-gray-300 p-1 mx-2 text-gray-900 ">Código</div>
                <div className="flex-1 bg-gray-300 p-1 mx-2 text-gray-900">Producto</div>
                <div className="flex-1 bg-gray-300 p-1 mx-2 text-gray-900">Localizacion</div>
                <div className="flex-1 bg-gray-300 p-1 mx-2 text-gray-900">Fecha de llegada</div>
                <div className="flex-1 bg-gray-300 p-1 mx-2 text-gray-900">Fecha de salida</div>
            </li>
            {
                this.state.items.map((item) => 
                    <div key={item.id_item} className={"flex flex-row justify-around my-1 hover:bg-blue-100 cursor-pointer "+((this.state.itemSeleccionado.id_item === item.id_item) && ' bg-blue-200 ')}
                        onClick={()=> {
                            if(!this.state.itemSeleccionado.id_item || this.state.itemSeleccionado.id_item !== item.id_item)
                                this.setState({itemSeleccionado: item})
                            else
                                this.setState({itemSeleccionado: {}})
                        }}
                    >
                        <div className="w-24 px-2 mx-2 text-center ">#{item.id_item}</div>
                        <div className="flex-1 px-2 mx-2 text-left">{item.nombre}</div>
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
                    <h2 className="my-2 font-bold text-2xl">Lista de items</h2>
                    <div className="flex flex-row justify-end h-16">
                        {
                            (this.state.itemSeleccionado.id_item) &&
                            <button onClick={() => registrarSalida(this.state.itemSeleccionado, this.cargarItems)}>
                                <div className="bg-orange-500 hover:bg-orange-400 text-white rounded-lg p-2">Registrar salida</div>
                            </button>
                        }
                    </div>
                    <div>
                        {
                            this.mostrarItems()
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default ItemsPage