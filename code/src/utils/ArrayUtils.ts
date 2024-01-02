/**
 * author: cxq
 * time: 2023/12/29 10:11:17
 * desc: 
 */
export class ArrayUtils {
    static intersection<T>(arrA: T[], arrB: T[]): T[] {
        return arrA.filter(i => arrB.indexOf(i) !== -1);
    }

    static difference<T>(arrA: T[], arrB: T[]): T[] {
        return arrA.filter(i => arrB.indexOf(i) === -1);
    }

    static union<T>(arr1: T[], arr2: T[]): T[] {
        return [...new Set([...arr1, ...arr2])];
    }

    static clear(arr: any[]): void {
        arr.length = 0;
    }
}