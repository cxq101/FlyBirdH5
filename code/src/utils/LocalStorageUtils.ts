/**
 * author: cxq
 * time: 2023/12/12 09:31:01
 * desc: 本地数据储存
 * TODO:
 * 1.数据校验，防止篡改和失效；如字段缺失，或违法
 */

interface IGameLocalData {
    skinId: string;
    idleSkinIds: string[];
}

export class GameLocalData {
    static getData(): IGameLocalData {
        return {
            skinId: "100001",
            idleSkinIds: [],
        }
    }
}

export class LocalStorageUtils {
    static gameData: IGameLocalData;
    private static GAME_DATA_KEY: string = "gameDataKey";
    
    private static load(key: string): any {
        return Laya.LocalStorage.getJSON(key);
    }

    private static save(key: string, data: any): void {
        Laya.LocalStorage.setJSON(key, data);
    }

    static init(): void {
        const key = LocalStorageUtils.GAME_DATA_KEY;
        this.gameData = this.load(key);
        if (this.gameData == null) {    
            this.gameData = GameLocalData.getData();
            this.save(key, this.gameData);
        }
    }
}

