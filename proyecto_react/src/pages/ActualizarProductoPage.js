import React from 'react';
import Header from '../components/Header';

class ActualizarProducto extends React.Component{

    state = {
        form: {
            codigo: '',
            nombre: '',
            precio: 0,
            iva: true
        }
    }

    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name] : e.target.value
            }
        })
    }

    handleChangeCheck = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name] : e.target.checked
            }
        })
    }

    handleSubmit = async e => {
        e.preventDefault()

        try{

            this.setState({cargando: true});

            console.log(this.state.form)
            console.log(JSON.stringify(this.state.form))

            await fetch(`${process.env.REACT_APP_BACKEND}/insertarProducto`,{
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body : JSON.stringify(this.state.form)
            });

            this.setState({cargando: false, error: ''});

            alert('Se ingreso el producto con éxito.')

            this.limpiarCampos()

        } catch(error){
            this.setState({cargando: false, error: 'Error inesperado. Contacte con soporte técnico', modalIsOpen: true});
            console.log(error)
        }
    }

    limpiarCampos(){
        this.setState({
            form: {
                codigo: '',
                nombre: '',
                iva: true,
                precio: 0
            }
        })
    }

    render(){
        return (
            <div>
                <Header/>
                <div className="container mx-auto">
                    <h1 className="font-bold text-2xl my-3">Nuevo producto</h1>
                    <form action="" autoComplete="off" onSubmit={this.handleSubmit}>
                        <div className="my-1 flex flex-col">
                            <label htmlFor="">Código</label>
                            <input type="text" className="m-3 p-1 w-full md:w-1/2 border border-gray-400 rounded-lg" name="codigo" placeholder="Código" onChange={this.handleChange} value={this.state.form.codigo} pattern="\w{4,}" title="Código de 4 o más caracteres, sin espacios" required/>
                        </div>
                        <div className="my-1 flex flex-col">
                            <label htmlFor="">Nombre</label>
                            <input type="text" className="m-3 p-1 w-full md:w-1/2 border border-gray-400 rounded-lg" name="nombre" placeholder="Nombre del producto" onChange={this.handleChange} value={this.state.form.nombre} pattern="[\w -_/\.]{8,}" title="Nombre de 8 o más caracteres" required/>
                        </div>
                        <div className="my-1 flex flex-col">
                            <label htmlFor="">Precio</label>
                            <input type="number" className="m-3 p-1 w-full md:w-1/2 border border-gray-400 rounded-lg text-right" name="precio" placeholder="Precio del producto" onChange={this.handleChange} value={this.state.form.precio} step="0.10" required/>
                        </div>
                        <div className="my-1 flex flex-col">
                            <label htmlFor="">Tiene IVA?</label>
                            <input className="border border-gray-400 rounded-lg ml-2 pl-2" type="checkbox" name="iva" onChange={this.handleChangeCheck} checked={this.state.form.iva} />
                        </div>
                        <div className="flex flex-row w-full md:w-1/2 justify-center">
                            <button className="bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg p-2 my-2">
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    
}

export default ActualizarProducto