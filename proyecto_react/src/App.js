import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

//Pages
import DashboardPage from './pages/Dashboard';
import IntegrantesPage from './pages/IntegrantesPage';
import ProductosPage from './pages/ProductosPage';
import ProductoDetalle from './pages/ProductoDetalle';
import ActualizarProductoDetalle from './pages/ActualizarProductoPage';
import ItemsPage from './pages/ItemsPage';
import ActualizarItemDetalle from './pages/ActualizarItemPage';
import Page404 from './pages/Page404';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={DashboardPage}/>
        <Route exact path="/productos" component={ProductosPage}/>
        <Route exact path="/producto/nuevo" component={ActualizarProductoDetalle}/>
        <Route exact path="/producto/:codigo" component={ProductoDetalle}/>
        <Route exact path="/items" component={ItemsPage}/>
        <Route exact path="/item/:id/nuevo" component={ActualizarItemDetalle}/>
        <Route exact path="/integrantes" component={IntegrantesPage}/>
        <Route exact path="/404" component={Page404} />
        <Redirect path="*" to="/404" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
