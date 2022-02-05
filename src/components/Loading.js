import React from 'react';

export default function Loading() {
    return (
        <React.Fragment>
            <i className="pi pi-spin pi-spinner flex justify-content-center" style={{ 'fontSize': '5rem' }}></i>
            <div>Cargando...</div>
        </React.Fragment>);
}