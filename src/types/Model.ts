import { Brand } from "./Brand";

export type Model = {
  id: number;
  description: string;
  logo: string;
  name: string;
  price: number;
  status: number;
  releaseDate: string;
  brand: Brand;
  updatedAt: Date;
  createdAt: Date;
};
