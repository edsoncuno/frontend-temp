import React from "react";
import Loading from "./../Loading";
import { Button } from "primereact/button";
import { getItem } from './../../api/apiItem';
import { deleteItem } from './../../api/apiItem';

export default class Eliminar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: { categoria: '', nombre: '' }
        };
    }

    async fetchData() {
        this.setState({ data: await getItem(this.props.id) });
    }

    componentDidMount() {
        this.fetchData();
        this.setState({ loading: false });
    }

    render() {
        const eliminar = async () => {
            document.getElementById("btnEliminar").disabled = true;
            const res = await deleteItem(this.state.data._id);
            if (res.error) {
                this.props.showToast('error', res.name, res.message);
                document.getElementById("btnEliminar").disabled = false;
            } else {
                this.props.showToast('success', res.name, res.message);
                document.getElementById("btnEliminar").disabled = false;
                this.props.ocultar();
            }
        }
        return (
            <React.Fragment>
                {this.state.loading ? <Loading /> : <React.Fragment>
                    <div className="text-center text-2xl font-bold">Eliminar</div>
                    <div className='text-center text-xl'>Esta seguro de eliminar: {this.state.data.categoria} {this.state.data.nombre}?</div>
                    <div className="flex flex-row justify-content-center">
                        <Button label='Si' className='p-button-danger m-2' onClick={eliminar} id='btnEliminar' />
                    </div>
                </React.Fragment>}
            </React.Fragment >
        );
    }
}