import Api from './Api';

export const postMovimiento = async (json) => {
    const newApi = new Api();
    const res = await newApi.post('/movimiento', json);
    return res;
}

export const getMovimientos = async () => {
    const newApi = new Api();
    const res = await newApi.get('/movimiento');
    return res;
}

export const getMovimiento = async (id) => {
    const newApi = new Api();
    const res = await newApi.get('/movimiento/' + id);
    return res;
}

export const putMovimiento = async (id, json) => {
    const newApi = new Api();
    const res = await newApi.put('/movimiento/' + id, json);
    return res;
}