export class Student{
  public _name: string;

  constructor(name: string){
    this._name = name;
  }

  get name():string{
    return this._name;
  }
  
  equals(other: Student): boolean{
    return this._name === other._name;
  }
}