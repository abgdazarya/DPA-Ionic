export abstract class Model<T extends Model = any> {
  // public id!: string;

  public constructor(data?: Partial<T>) {
    Object.assign(this, data);
  }
}
