/**
 * author: cxq
 * time: 2024/01/08 19:11:03
 * desc: 
 */
export class Log {
    private isDevelopEnvironment
    static init(): void {

    }

    static log(...args: any[]): void {
        console.log(...args);
    }

    static warn(...args: any[]): void {
        console.warn(...args);
    }
    
    static error(...args: any[]): void {
        console.error(...args);
    }
}