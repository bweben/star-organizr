import {Star} from './Star';

export class Folder {
  get id(): string {
    return this._id;
  }

  public name: string;
  private _id: string;
  public stars: Star[];
  public children: Folder[];

  constructor(name?: string) {
    if (name) {
      this.name = name;
    }

    this.generateId();
  }

  private generateId(): void {
    this._id = (Date.now()
        .toString(36)
      + Math.random()
        .toString(36)
        .substr(2, 5))
      .toUpperCase();
  }
}
