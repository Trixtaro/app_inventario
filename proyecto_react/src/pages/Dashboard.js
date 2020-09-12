import React from 'react';

import Header from '../components/Header';

class Dashboard extends React.Component{

    render(){
        return (
            <div>
                <Header/>
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold my-4">Deber de aplicaciones informáticas</h2>
                    <p className="my-2">
                        Este proyecto es realizado por estudiantes de la Facultad de Ciencias informáticas
                        de la Universidad Técnica de Manabí.
                        <br/><br/>
                        Esta desarrollado con tecnologías javascript, como son:
                    </p>
                    <ul className="bg-gray-300 p-2 my-3 rounded-lg">
                        <li><span className="font-semibold">Node: </span>Node permite ejecutar Javascript en el servidor, en el cual se implementa una API usando Express.</li>
                        <li><span className="font-semibold">React.js: </span>React.js es un framework de Javascript, que permite realizar aplicaciones del lado del navegador, usando componentes reutilizables.</li>
                        <li><span className="font-semibold">MySQL: </span>MySQL es un sistema gestor de base de datos, que permite crear base de datos relacionales para operaciones transaccionales.</li>
                    </ul>
                </div>
            </div>
        )
    }

}

export default Dashboard