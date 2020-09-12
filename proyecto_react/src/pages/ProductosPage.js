import React from 'react';
import { Link } from 'react-router-dom'

import Header from '../components/Header';

class ProductosPage extends React.Component{

    state = {
        productos: [],
        cargando: false,
        error: '',
        productoSeleccionado: ''
    }

    async componentDidMount(){

        try{
            this.setState({
                cargando: true
            })
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/consultaProductos`)
            const data = await response.json()

            this.setState({
                cargando: false,
                productos: data
            })

        } catch(error){
            this.setState({
                cargando: false,
                error: error
            })
            console.log(error)
        }

    }

    mostrarProductos = () => {
        if(this.state.cargando)
            return 'Cargando...'

        if(!this.state.productos || this.state.productos.length === 0)
            return <h1>No hay productos disponibles</h1>

        return <div>
            <div className="flex flex-row justify-around font-bold my-2">
                <div className="flex-1 bg-gray-300 p-1 mx-2 text-gray-900">Código</div>
                <div className="flex-1 bg-gray-300 p-1 mx-2 text-gray-900">Producto</div>
                <div className="flex-1 bg-gray-300 p-1 mx-2 text-gray-900">Precio</div>
            </div>
            {
                this.state.productos.map((producto) => 
                <Link key={producto.id_producto} to={`/producto/${producto.codigo}`}>
                    <div className="flex flex-row justify-around my-1 hover:bg-blue-100"
                        onClick={() => this.setState({ productoSeleccionado: producto.codigo })}
                    >
                        <div className="flex-1 px-2 text-left">{producto.codigo}</div>
                        <div className="flex-1 px-2 text-left">{producto.nombre}</div>
                        <div className="flex-1 px-2 text-right">$ {producto.precio.toFixed(2).toString()}</div>
                    </div> 
                </Link>
                )
            }
        </div>
    }

    render(){
        return(
            <div>
                <Header/>
                <div className="mx-auto container">
                    <h2 className="my-2 font-bold text-2xl">Lista de productos</h2>
                    <div className="flex flex-row justify-end">
                        <Link to="/producto/nuevo">
                            <div className="bg-green-600 hover:bg-green-400 text-white rounded-lg p-2">Nuevo producto</div>
                        </Link>
                    </div>
                    <div>
                        {
                            this.mostrarProductos()
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default ProductosPage