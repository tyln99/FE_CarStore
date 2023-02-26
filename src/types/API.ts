export type API<T> = {
  getAll(): Promise<Array<T>>;
  getById(id: number): Promise<T>;
  update(data: T): Promise<T>;
  delete(id: number): Promise<boolean>;
  add(data: T): Promise<T>;
};
