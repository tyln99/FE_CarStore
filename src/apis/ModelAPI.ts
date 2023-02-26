import { Model } from "./../types/Model";
import { API } from "./../types/API";
import axios, { AxiosResponse } from "axios";
import { ApiEndpoints } from "./config/apiEndpoints";

export default class ModelAPI implements API<Model> {
  getAll(): Promise<Model[]> {
    return new Promise<Model[]>((resolve, reject) => {
      axios
        .get(ApiEndpoints.model)
        .then((response: AxiosResponse<any, any>) => {
          return resolve(response.data);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
  getById(id: number): Promise<Model> {
    return new Promise<Model>((resolve, reject) => {
      axios
        .get(ApiEndpoints.model + "/" + id)
        .then((response: AxiosResponse<any, any>) => {
          return resolve(response.data);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
  getByBrand(brandId: number): Promise<Model[]> {
    return new Promise<Model[]>((resolve, reject) => {
      axios
        .get(ApiEndpoints.model + "/getByBrand", { params: { brandId } })
        .then((response: AxiosResponse<any, any>) => {
          return resolve(response.data);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
  update(data: Model): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      axios
        .put(ApiEndpoints.model + "/" + data.id, data)
        .then((response: AxiosResponse<any, any>) => {
          return resolve(response.data);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
  delete(id: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      axios
        .delete(ApiEndpoints.model + "/" + id)
        .then((response: AxiosResponse<any, any>) => {
          return resolve(response.data);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
  add(data: Model): Promise<Model> {
    return new Promise<Model>((resolve, reject) => {
      axios
        .post(ApiEndpoints.model, data)
        .then((response: AxiosResponse<any, any>) => {
          return resolve(response.data);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export const modelService = new ModelAPI();
