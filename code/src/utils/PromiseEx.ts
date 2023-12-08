/**
 * author: cxq
 * time: 2023/12/07 16:33:11
 * desc: 
 */
export class PromiseEx {
    static delay(ms: number): Promise<any> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}