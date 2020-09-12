import React from 'react';

class Page404 extends React.Component{

    render(){
        return (
            <div className="w-screen h-screen flex flex-col justify-center items-center bg-blue-900 text-white">
                <h1 className="text-5xl text-custom-color-4 text-center">Página no encontrada</h1>
                <h2 className="text-3xl text-custom-color-4 text-center font-bold">Error 404</h2>
            </div>
        );
    }

}

export default Page404;