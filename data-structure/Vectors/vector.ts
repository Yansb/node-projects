import { Student } from "./Student";

export class Vector{
  private _students: string[] = new Array(100)
  private totalStudents = 0

  public add(student: Student): void{
    this._students[this.totalStudents] = student.name;
    this.totalStudents++
  }

  public addInPosition(student: Student, position: number){
    if(this.positionOccupied(position)){
      for(let i = this.totalStudents -1; i >= position; i--){
        this._students[i + 1] = this._students[i]
      }
    }
    this._students[position] = student._name
  }

  public positionOccupied(position: number){
    return this._students[position] !== undefined
  }

  public get(position: number){
    return this._students[position];
  }

  public removes (position: number){
    for(let i = position; i <= this.totalStudents; i++){
      this._students[i] = this._students[i + 1]
    }
    this.totalStudents--
  }

  public contains(student: Student){
    return this._students.some(s => s === student._name )
  }

  public size(){
    return this.totalStudents
  }

  get students(){
    return this._students
  }

}