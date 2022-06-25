function lonelyinteger(a: number[]): number {


  let lonelyInt: number = 0;

  for (const n of a){
    const copyWithoutCurrentNumber = [...a]
    copyWithoutCurrentNumber.splice(copyWithoutCurrentNumber.indexOf(n), 1)
    const haveTwin =copyWithoutCurrentNumber.some(i => i === n)
   
    if(!haveTwin){
       lonelyInt = n
   }
  }


  if(lonelyInt){
    return lonelyInt
  }
}

console.log(lonelyinteger([1,2,3,4,3,2,1]))