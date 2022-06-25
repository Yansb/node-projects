import { Student } from "./Student";
import { Vector } from "./vector";

const student = new Student("João");
const student2 = new Student("Jose");
const student3 = new Student("Lucas");

const list = new Vector()

list.add(student)
list.add(student2)
console.log(list.contains(student3))

console.log(list.students)

list.addInPosition(student3, 1)
console.log(list.students)

list.removes(0)
console.log(list.students)