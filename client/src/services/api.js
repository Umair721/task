/**
 * @format
 */
import axios from "axios";

export default class Api {
    _api = null;

    static init = ({ url }) => {
        try {
            this._api = axios.create({
                baseURL: url,
                timeout: 10000,
            });
        } catch (error) {
            return error;
        }
    };

    static setClientToken = async (token) => {
        this._api.interceptors.request.use(function (config) {
            config.headers.Authorization = token;
            return config;
        });
    };



    /*************** Auth API  ******************/

    static login = async data => {
        try {
            const response = await this._api.post("api/auth/login", data);
            return response;
        } catch (error) {
            return error.response;
        }
    };


    static signup = async data => {
        try {
            const response = await this._api.post("api/auth/signup", data);
            return response;
        } catch (error) {
            return error.response;
        }
    };

    /*************** Category API  ******************/
    static addCategory = async data => {

        try {
            const response = await this._api.post("api/addCategory", data);

            return response;
        } catch (error) {
            return error.response;
        }
    };
    static getCategory = async data => {

        try {
            const response = await this._api.get("api/getCategory");
            return response;
        } catch (error) {
            return error.response;
        }
    };
    static updateCategory = async (id, data) => {

        try {
            const response = await this._api.patch(`api/updateCategory/${id}`, data);

            return response;
        } catch (error) {
            return error.response;
        }
    };
    static deleteCategory = async id => {

        try {
            const response = await this._api.delete(`api/deleteCategory/${id}`);

            return response;
        } catch (error) {
            return error.response;
        }
    };


    /*************** Vehicle API  ******************/
    static addVehicle = async data => {
        console.log(data, "34567890")

        try {
            const response = await this._api.post("api/addVehicle", data);

            return response;
        } catch (error) {
            return error.response;
        }
    };
    static getVehicle = async () => {

        try {
            const response = await this._api.get("api/getVehicle");
            return response;
        } catch (error) {
            return error.response;
        }
    };
    static updateVehicle = async (id, data) => {

        try {
            const response = await this._api.patch(`api/updateVehicle/${id}`, data);

            return response;
        } catch (error) {
            return error.response;
        }
    };
    static deleteVehicle = async id => {

        try {
            const response = await this._api.delete(`api/deleteVehicle/${id}`);

            return response;
        } catch (error) {
            return error.response;
        }
    };

}
