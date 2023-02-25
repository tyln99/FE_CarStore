export type API<T> = {
  getAll(): Promise<Array<T>>;
  getById(id: number): Promise<T>;
  update(data: T): Promise<boolean>;
  delete(id: number): Promise<boolean>;
};
