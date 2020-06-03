export class ArraysHelper{
 public static  IsContains<T>(largArr:Array<T>,arr:T[]){
console.log('===================')
console.log(largArr)
console.log(arr)
console.log(arr.every(el=>largArr.includes(el)))
console.log('===================')
    return arr.every(el=>largArr.includes(el))
 }
}