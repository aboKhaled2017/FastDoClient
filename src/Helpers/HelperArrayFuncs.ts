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

export const clone= <T>(obj:T)=> {
    var copy:any;
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy as T;
    }

    if (obj instanceof FormData) {
        copy = new FormData();
        for(var key of (obj as any).keys())
        {
            copy.append(key,obj.get(key))
        }
        return copy as T;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy as T;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if ((obj as any).hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy as T;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

