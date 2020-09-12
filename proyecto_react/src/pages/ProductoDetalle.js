import React from 'react';
import { Link, Redirect } from 'react-router-dom'

import Header from '../components/Header';

class ProductoDetalle extends React.Component{

    state = {
        producto: null,
        cargando: false,
        error: '',
    }

    async componentDidMount(){

        try{
            this.setState({
                cargando: true
            })
            console.log(`${process.env.REACT_APP_BACKEND}/consultaProductos/${this.props.match.params.codigo}`)
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/consultaProductos/${this.props.match.params.codigo}`)
            const data = await response.json()

            this.setState({
                cargando: false,
                producto: data
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
                    {/* <button>
                        <div className="mx-2 p-2 bg-orange-400 text-white rounded-md w-24">Editar</div>
                    </button> */}
                    <button>
                        <div className="mx-2 p-2 bg-indigo-600 text-white rounded-md">Agregar nuevos items</div>
                    </button>
            </div>
        </React.Fragment>)
    }

    render(){

        return(
            <div>
                <Header/>
                <div className="mx-auto container">
                    {
                        this.mostrarProducto()
                    }
                </div>
            </div>
        )
    }

}

export default ProductoDetalle