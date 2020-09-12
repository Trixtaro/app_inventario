import React from 'react';

import { Link } from 'react-router-dom'

const Header = props => {

    return (
        <div className="flex flex-row justify-between items-center bg-blue-800 text-white py-2">
            <Link to="/">
                <h1 className="text-2xl font-bold ml-2">Aplicación de inventario</h1>
            </Link>
            <div className="flex flex-row">
                <Link to="/productos">
                    <h2 className="mx-2 font-semibold hover:text-blue-500">Productos</h2>
                </Link>
                <Link to="/stock">
                    <h2 className="mx-2 font-semibold hover:text-blue-500">Stock</h2>
                </Link>
                <Link to="/integrantes">
                    <h2 className="mx-2 font-semibold hover:text-blue-500">Integrantes</h2>
                </Link>
            </div>
        </div>
    )

}

export default Header;