import Api from './Api';

export const putStock = async (id, json) => {
    const newApi = new Api();
    const res = await newApi.put('/stock/' + id, json);
    return res;
}