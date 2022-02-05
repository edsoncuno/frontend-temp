import Api from './Api';

export const postProveedor = async (json) => {
    const newApi = new Api();
    const res = await newApi.post('/proveedor', json);
    return res;
}

export const getProveedores = async () => {
    const newApi = new Api();
    const res = await newApi.get('/proveedor');
    return res;
}

export const getProveedor = async (id) => {
    const newApi = new Api();
    const res = await newApi.get('/proveedor/' + id);
    return res;
}

export const deleteProveedor = async (id) => {
    const newApi = new Api();
    const res = await newApi.delete('/proveedor/' + id);
    return res;
}

export const putProveedor = async (id, json) => {
    const newApi = new Api();
    const res = await newApi.put('/proveedor/' + id, json);
    return res;
}