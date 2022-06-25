export class Cell{
  private _element: any;
  private _next: Cell | undefined;
  private _previous:  Cell | undefined;

  constructor(element: any, next: Cell | undefined){
    this._element = element;
    this._next = next;
  }

  get element(){
    return this._element;
  }

  getNext(){
    return this._next
  }

  setNext(next: Cell | undefined){
    this._next = next;
  }
  getPrevious(){
    return this._previous
  }

  setPrevious(previous: Cell){
    this._previous = previous;
  }
}