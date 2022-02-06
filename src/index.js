import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import Home from './pages/Home';
import GestionarItem from './pages/gestionar/Item';
import GestionarUnidadDeMedida from './pages/gestionar/UnidadDeMedida';
import GestionarProveedor from './pages/gestionar/Proveedor';
import GestionarCategoria from './pages/gestionar/Categoria';
import InventarioKardex from './pages/inventario/Kardex';
import InventarioMovimiento from './pages/inventario/Movimiento';
import InventarioReporte from './pages/inventario/Reporte';

import 'primereact/resources/themes/md-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css';

import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path="gestionar/">
                        <Route path="categoria" element={<GestionarCategoria />} />
                        <Route path="item" element={<GestionarItem />} />
                        <Route path="unidad-de-medida" element={<GestionarUnidadDeMedida />} />
                        <Route path="proveedor" element={<GestionarProveedor />} />
                    </Route>
                    <Route path="inventario/">
                        <Route path="kardex" element={<InventarioKardex />} />
                        <Route path="movimiento" element={<InventarioMovimiento />} />
                        <Route path="reporte" element={<InventarioReporte />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);