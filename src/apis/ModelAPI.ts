import { Model } from "./../types/Model";
import { API } from "./../types/API";
import axios from "axios";
import { ApiEndpoints } from "./config/apiEndpoints";

export default class ModelAPI implements API<Model> {
  getAll(): Promise<Model[]> {
    return new Promise<Model[]>((resolve, reject) => {
      axios
        .get(ApiEndpoints.model)
        .then((response: any) => {
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
        .then((response: any) => {
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
        .then((response: any) => {
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
        .then((response: any) => {
          return resolve(response.data);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export const modelService = new ModelAPI();
