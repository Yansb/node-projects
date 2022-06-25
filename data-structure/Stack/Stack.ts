import { LinkedList } from "./LinkedList";

export class Stack{
  private names = new LinkedList()

  public push(name: string){
    this.names.add(name);
  }
  public remove(){
    return this.names.removeFromEnd()
  }

  public empty(){
    for(let i = 0; i < this.names.size() + 1; i++){
      this.remove()
    }

  }

  public getStack(){
    console.log(this.names.getList())
  }
}