import Api from './Api';

export default class ApiCliente {
    #router = '/cliente';
    #newApi = null;
    constructor() {
        this.#newApi = new Api();
    }
    async post(json) {
        const res = await this.#newApi.post(this.#router, json);
        return res;
    }
    async getAll() {
        const res = await this.#newApi.get(this.#router);
        return res;
    }
    async get(id) {
        const res = await this.#newApi.get(this.#router + '/' + id);
        return res;
    }
    async delete(id) {
        const res = await this.#newApi.delete(this.#router + '/' + id);
        return res;
    }
    async put(id, json) {
        const res = await this.#newApi.put(this.#router + '/' + id, json);
        return res;
    }
}