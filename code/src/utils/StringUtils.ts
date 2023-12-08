/**
 * author: cxq
 * time: 2023/12/07 19:45:28
 * desc: 
 */
export class StringUtils {
    /**
     * 转换成百分比
     * @param decimal 小数
     * @param precision 精度位数 默认两位
     */
    static toPercent(decimal: number, precision: number = 2): string {
        return `${(decimal * 100).toFixed(precision)}%`;
    }

    static lang(key: string): string {
        return Laya.Text.langPacks ? Laya.Text.langPacks[key] : key;
    }

    static format(template: string, ...values: string[]): string {
        return template.replace(/{(\d+)}/g, (match, index) => {
            let replacement = values[Number(index)];
            replacement = this.lang(replacement);
            return typeof replacement !== 'undefined' ? replacement : match;
        });
    }
}