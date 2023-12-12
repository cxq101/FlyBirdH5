/**
 * author: cxq
 * time: 2023/12/12 09:31:01
 * desc: 本地数据储存
 * TODO:
 * 1.数据校验，防止篡改和失效；如字段缺失，或违法
 */
export class LocalStorageUtils {
    static _game: any;
    private static GAME_KEY: string = "_game_";

    static get game(): any {
        if (this._game == null) {
            this._game = Laya.LocalStorage.getJSON(LocalStorageUtils.GAME_KEY) || {};
        }
        return this._game;
    }
    
    private static saveGame(): void {
        console.log("saveGame=========", this.game);
        Laya.LocalStorage.setJSON(LocalStorageUtils.GAME_KEY, this.game);
    }

    static save(key: string, data: any): void {
        this.game[key] = data;
        Laya.CallLater.I.callLater(this, this.saveGame);
    }

    static saveNow(key: string, data: any): void {
        this.game[key] = data;
        Laya.CallLater.I.runCallLater(this, this.saveGame);
    }

    static load(key: string): any {
        return this.game[key];
    }

}

