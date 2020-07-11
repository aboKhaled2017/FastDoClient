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

export const clone= (obj:any)=> {
    var copy:any;
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    if (obj instanceof FormData) {
        copy = new FormData();
        for(var key of (obj as any).keys())
        {
            copy.append(key,obj.get(key))
        }
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}
