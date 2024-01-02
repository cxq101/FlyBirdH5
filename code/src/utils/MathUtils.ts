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
     * @param radians
     * @return
     */
    public static radiansToDegrees(radians: number): number {
        return radians * this.ONE_RADIANS;
    }

    /**
     * 角度转换成弧度
     * @param degrees
     * @return
     */
    public static degreesToRadians(degrees: number): number {
        return (degrees * Math.PI) / 180;
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
    public static randElement<T>(list: T[]): T | null {
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

    /**
     * 判断两区间是否部分重叠
     * @param rangeAMin 区间0 起始值
     * @param rangeAMax 区间0 结束值
     * @param rangeBMin 区间1 起始值
     * @param rangeBMax 区间1 起始值
     * @returns 
     */
    public static isPartiallyOverlap(rangeAMin: number, rangeAMax: number, rangeBMin: number, rangeBMax: number): boolean {
        return rangeAMin <= rangeBMax && rangeAMax >= rangeBMin;
    }

    // 判断一个小数区间是否包括另一个小数区间
    public static isIntervalIncluding(rangeAMin: number, rangeAMax: number, rangeBMin: number, rangeBMax: number): boolean {
        return rangeAMin <= rangeBMin && rangeAMax >= rangeBMax;
    }

    // 判断两个小数区间是否不相交也不包括
    public static isIntervalsDisjoint(rangeAMin: number, rangeAMax: number, rangeBMin: number, rangeBMax: number): boolean {
        return rangeAMax < rangeBMin || rangeAMin > rangeBMax;
    }
}