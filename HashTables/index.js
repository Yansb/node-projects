function hashStringToInt(key, tableSize){
  var hash = 3;
  for (var i = 0; i < key.length; i++) {
    hash = (13* hash * key.charCodeAt(i)) % tableSize;
  }
  return hash;
}

class HashTable {
  tableSize = 100;
  table = new Array(this.tableSize);

  setItem(key, value){
    const idx = hashStringToInt(key, this.tableSize);
    this.table[idx] = value;
  }

  getItem(key){
    const idx = hashStringToInt(key,this.tableSize);
    return this.table[idx];	
  }
}

const myTable = new HashTable();
myTable.setItem('name', 'John');
myTable.setItem('age', '30');
console.log(myTable.getItem('name'));
