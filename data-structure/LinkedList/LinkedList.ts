import { Cell } from "./Cell";

export class LinkedList{
  private _head: Cell | undefined= undefined;
  private _tail: Cell | undefined =  undefined;
  private _total = 0

  public addAtStart(element: any){
    if(this._total === 0){
      const newCell = new Cell(element, undefined);
      this._head = newCell;
      this._tail = newCell;
    }else{
      const newCell = new Cell(element, this._head);
      this._head?.setPrevious(newCell);
      this._head = newCell;
    }

    this._total++
  }

  public add(element: any){
    if(this._total === 0){
      this.addAtStart(element)
      return
    }
    if(this._tail){
      const newCell = new Cell(element, undefined);
      this._tail.setNext(newCell);
      newCell.setPrevious(this._tail);
      this._tail = newCell;
      this._total++

    }
  }
  private positionOccupied(position: number){
    return position >= 0 && position < this._total
  }

  private getCell(position: number): Cell{
    let currentCell = this._head
    if(!this.positionOccupied(position)){
      throw new Error("position is not valid")
    }
    if(!currentCell){
      throw new Error("list is empty")
    }

    for(let i = 0; i < position; i++){
      currentCell = currentCell?.getNext()
    }

    return currentCell!;
  }

  public addInPosition(position: number, element: any){
    if(position === 0){
      this.addAtStart(element)
      return
    }
    if(position === this._total){
      this.add(element)
      return
    }else{

      const previousCell = this.getCell(position - 1);
      const next = previousCell.getNext()
      const newCell = new Cell(element, previousCell.getNext());
      newCell.setPrevious(previousCell);
      newCell.setNext(next);
      previousCell.setNext(newCell);
      this._total++
    }

  }
  public get(position: number){
    return this.getCell(position);
  }
  public size(){
    return this._total;
  }

  public removeFromStart(){
    if(this._total===0){
      throw new Error('empty list')
    }
    this._head = this._head?.getNext()
    this._total--

    if(this._total === 0){
      this._tail = undefined
    }
  }
  
  public removeFromEnd(){
    if(this._total=== 0){
      throw new Error('empty list')
    }
    if(this._total === 1){
      this.removeFromStart()
      return
    }
    const previous = this._tail?.getPrevious();
    previous?.setNext(undefined);
    this._tail = previous;
    this._total--
    
  }

  public remove(position:number){
    if(position === 0){
      this.removeFromStart()
    }else if(position === this._total -1){
      this.removeFromEnd()
    }else{
      const previousCell = this.getCell(position - 1);
      const currentCell = previousCell.getNext();
      const nextCell = currentCell?.getNext();

      previousCell.setNext(nextCell);
      nextCell?.setPrevious(previousCell);
      this._total--
    }
  }

  public getList(){
    let currentCell = this._head;
    let array: any[] = []
    for(let i = 0; i < this._total; i++){
      array = [...array, currentCell?.element]
      currentCell = currentCell?.getNext()
    }

    return array
  }

  public contains(element: any){
    let currentCell = this._head;

    while(currentCell !== undefined){
      if(currentCell.element === element){
        return true
      }
      currentCell = currentCell?.getNext()
    }

    return false
  }
}