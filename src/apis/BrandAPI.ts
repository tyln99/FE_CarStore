import { ApiEndpoints } from "./config/apiEndpoints";
import axios, { AxiosResponse } from "axios";
import { Brand } from "../types/Brand";
import { API } from "./../types/API";

export default class BrandAPI implements API<Brand> {
  add(data: Brand): Promise<Brand> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<Brand[]> {
    return new Promise<Brand[]>((resolve, reject) => {
      axios
        .get(ApiEndpoints.brand)
        .then((response: AxiosResponse<any, any>) => {
          return resolve(response.data);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
  getById(id: number): Promise<Brand> {
    return new Promise<Brand>((resolve, reject) => {
      axios
        .get(ApiEndpoints.brand + "/" + id)
        .then((response: AxiosResponse<any, any>) => {
          return resolve(response.data);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
  update(data: Brand): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      axios
        .put(ApiEndpoints.brand + "/" + data.id, data)
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
        .delete(ApiEndpoints.brand + "/" + id)
        .then((response: AxiosResponse<any, any>) => {
          return resolve(response.data);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export const brandService = new BrandAPI();
