import { Singleton } from "../core/base/Singleton";


/**
 * author: cxq
 * time: 2023/12/14 15:36:39
 * desc: 
 */
export class LevelLoader extends Singleton<LevelLoader>() {
    createByLH(path: string): void {
        let prefab: Laya.Prefab = Laya.loader.getRes(path);
        let sp = prefab.create() as Laya.Sprite;
        
    }
}