/**
 * author: cxq
 * time: 2023/12/12 09:40:48
 * desc: 
 */
export class ObjectUtils {
    static isEmpty(obj: any): boolean {
        return Object.keys(obj).length === 0;
    }
}