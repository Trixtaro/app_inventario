import React from 'react';
import Header from '../components/Header';

class ActualizarItemPage extends React.Component{

    state = {
        form: {
            id_producto: this.props.match.params.id,
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

            const respuesta = await fetch(`${process.env.REACT_APP_BACKEND}/insertarItem`,{
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body : JSON.stringify(this.state.form)
            });

            this.setState({cargando: false, error: ''});

            alert('Se ingreso el item con éxito.')

            this.props.history.goBack()

        } catch(error){
            this.setState({cargando: false, error: 'Error inesperado. Contacte con soporte técnico', modalIsOpen: true});
            console.log(error)
        }
    }

    render(){
        return (
            <div>
                <Header/>
                <div className="container mx-auto">
                    <h1 className="font-bold text-2xl my-3">Nuevo item</h1>
                    <form action="" autoComplete="off" onSubmit={this.handleSubmit}>
                        <div className="my-1 flex flex-col">
                            <label htmlFor="">Localización</label>
                            <input type="text" className="m-3 p-1 w-full md:w-1/2 border border-gray-400 rounded-lg" name="localizacion" placeholder="Localización del item" onChange={this.handleChange} value={this.state.form.codigo} pattern="[\w -_/\.]{8,}" title="Código de 4 o más caracteres, sin espacios" required/>
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

export default ActualizarItemPage