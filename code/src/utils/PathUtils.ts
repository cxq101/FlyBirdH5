/**
 * author: cxq
 * time: 2023/12/20 15:56:33
 * desc: 
 */
export class PathUtils {
    static getAvatar(icon: string): string {
        return `resources/icon/avatar/${icon}.png`;
    }

    static getUiImage(icon: string): string {
        return `resources/ui/${icon}.png`;
    }
}