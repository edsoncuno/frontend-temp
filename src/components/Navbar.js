import React from "react";
import logo from './../img/logo.png';
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';

export default function Navbar() {

    const start = <img alt="logo" src={logo} className="mr-2" height="60" />;

    const navigate = useNavigate();

    const irInicio = React.useCallback(() => {
        navigate('/')
    }, [navigate]);

    const irGestionarCategoria = React.useCallback(() => {
        navigate('/gestionar/categoria')
    }, [navigate]);

    const irGestionarCliente = React.useCallback(() => {
        navigate('/gestionar/cliente')
    }, [navigate]);

    const irGestionarItem = React.useCallback(() => {
        navigate('/gestionar/item')
    }, [navigate]);

    const irGestionarProveedor = React.useCallback(() => {
        navigate('/gestionar/proveedor')
    }, [navigate]);

    const irGestionarUnidadDeMedida = React.useCallback(() => {
        navigate('/gestionar/unidad-de-medida')
    }, [navigate]);

    const irInventarioKardex = React.useCallback(() => {
        navigate('/inventario/kardex')
    }, [navigate]);

    const irInventarioMovimiento = React.useCallback(() => {
        navigate('/inventario/movimiento')
    }, [navigate]);

    const items = [
        { label: 'Inicio', icon: 'pi pi-home', command: () => { irInicio() } },
        {
            label: 'Gestionar',
            items: [
                { label: 'Cliente', command: () => { irGestionarCliente() } },
                { label: 'Categoria', command: () => { irGestionarCategoria() } },
                { label: 'Item', command: () => { irGestionarItem() } },
                { label: 'Proveedor', command: () => { irGestionarProveedor() } },
                { label: 'Unidad De Medida', command: () => { irGestionarUnidadDeMedida() } },
            ]
        },
        {
            label: 'Inventario',
            items: [
                { label: 'Kardex', command: () => { irInventarioKardex() } },
                { label: 'Movimiento', command: () => { irInventarioMovimiento() } }
            ]
        }
    ];
    return (
        <React.Fragment>
            <Menubar model={items} start={start} className="adelante" />
        </React.Fragment>
    );
}