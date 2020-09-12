import React from 'react';
import Header from '../components/Header';

class IntegrantesPage extends React.Component{

    state = {
        integrantes: [
            {
                nombre: 'Wilmer David Cedeño Mendoza',
                rol: 'Desarrollo del front-end en React.js',
                foto: '/fotos/wilmer.jpg'
            },
            {
                nombre: 'Diocles German Avendaño Ponce',
                rol: 'Desarrollo del back-end en Express.js',
                foto: '/fotos/german.jpeg'
            },
            {
                nombre: 'Bryan Steeven Marcillo Delgado',
                rol: 'Instalación y despliegue',
                foto: '/fotos/marcillo.jpeg'
            },
            {
                nombre: 'Gema Briggite Giler Velásquez',
                rol: 'Instalación y despliegue',
                foto: '/fotos/gema.jpeg'
            }
        ]
    }

    render(){

        return(
            <div>
                <Header/>
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold text-blue-800 text-center my-2">Integrantes del grupo</h2>
                    <h3 className="text-lg">Las personas que conforman los miembros de este grupo son:</h3>
                    <ul className="flex flex-col my-4">
                        {
                            this.state.integrantes.map( integrante => (
                                <li key={integrante.nombre} className="flex flex-col">
                                    <h3 className="text-2xl font-semibold text-center">{integrante.nombre}</h3>
                                    <h4 className="text-xl text-center">{integrante.rol}</h4>
                                    <div className="h-64 flex flex-row justify-center my-2">
                                        <img className="object-contain" src={integrante.foto} alt="foto"/>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }

}

export default IntegrantesPage