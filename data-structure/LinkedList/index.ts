import { LinkedList } from "./LinkedList";

const list = new LinkedList()
list.addAtStart("yan")
console.log(list.getList())
list.addAtStart("fulano")
console.log(list.getList())
list.addAtStart("cicrano")
console.log(list.getList())
list.add("john")
console.log(list.getList())
list.addInPosition(2, "jane");
console.log(list.contains('fulano'))
console.log(list.getList())
list.remove(1)
console.log(list.contains('fulano'))
console.log(list.getList())
