/**
 * author: cxq
 * time: 2023/12/09 19:14:46
 * desc: 
 */
export class MathUtil {
    /**
     * int的最大值
     */
    public static INT_MAX_VALUE: number = 2147483647;

    /**
     * 一弧度的角度数
     */
    public static ONE_RADIANS: number = 180 / Math.PI;

    /**
     * 弧度转换成角度
     * @param degrees
     * @return
     *
     */
    public static getAngle(radians: number): number {
        return radians * this.ONE_RADIANS;
    }

    /**
     * 得到一个区间的随机数
     * @param min 最小数
     * @param max 最大数
     */
    public static randomF(min: number, max: number): number {
        return min + Math.random() * (max - min);
    }

    /**
     * 得到一个区间的随机整数,结果包含最小数跟最大数
     * @param min 最小数
     * @param max 最大数
     */
    public static randomI(min: number, max: number): number {
        return this.randomF(min, max + 0.99999) >> 0;
    }

    /**
     * 掷硬币 50%
     * @returns
     */
    public static coinFlip(): boolean {
        return this.randomF(0, 1) > 0.5;
    }

    /**
     * 得到一个数组的随机项
     * @param list
     * @returns
     */
    public static randElement<T>(list: T[]): T | null{
        if (list == null || list.length == 0) {
            return null;
        }
        return list[this.randomI(0, list.length - 1)];
    }

    /**
     * 概率是否发生
     * @param value (0~1)
     * @returns
     */
    public static chance(value: number): boolean {
        return Math.random() < value;
    }
}