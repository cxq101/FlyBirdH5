import { LevelModel } from "../../views/level/LevelModel";
import { Item } from "./Item";

/**
 * 碰到陷阱次数越多，
 * 受到诅咒会加重喵~
 * 
 * 训练时为了在真正的
 * 冒险中拿到罐头喵~
 * 
 * 还差169米就能突破你的
 * 历史记录了喵~
 * 
 * 诅咒越强，连续弹飞
 * 次数越多喵~
 * 
 * 训练可以让自己
 * 越来越强大喵~
 * 
 * 你的历史记录是173米，
 * 想突破自我还差点意思喵~
 * 
 * 使用传送能消除身上的
 * 诅咒喵~
 * 
 * 一步一个猫脚印！
 * 加油！
 * 
 * 想突破你的173米历史
 * 记录吗？加油！
 * 
 * 使用传送能快速回到你
 * 的最强战绩
 * 
 * 如果准备好的话，
 * 要不去拿猫罐头吧！
 * 
 * 什么时候能突破你的17
 * 3米历史记录呢~
 * 
 * 快体验一下传送带来的
 * 神奇效果吧~
 * 
 * 感觉你有能力拿到猫罐
 * 头了喵~
 */
/**
 * author: cxq
 * time: 2023/12/23 11:23:34
 * desc: 
 */
const { regClass, classInfo, property } = Laya;

@regClass()
@classInfo({ menu: "Level_Item", caption: "FoCat" })
export class FoCat extends Item {
    @property({ type: Laya.Label })
    private lblDesc: Laya.Label;

    @property({ type: Laya.Image })
    private imgDialog: Laya.Image;
    
    @property({ type: Laya.Box, tips: "碰撞检测范围" })
    private collisionBoxNode: Laya.Box;
    
    private _hideTime = 0;
    private _isShowing: boolean = false;
    
    get collisionBox(): Laya.Rectangle {
        let p = Laya.Point.create();
        this.collisionBoxNode.localToGlobal(p);
        this._collisionBox.setTo(p.x, p.y, this.collisionBoxNode.width, this.collisionBoxNode.height);
        return this._collisionBox;
    }
  
    private showRandomDialog(): void {
        this._isShowing = true;
        this.imgDialog.alpha = 1;
        this.imgDialog.visible = true;
        LevelModel.ins.setLableDialog(this.lblDesc);
        Laya.Tween.from(this.imgDialog, { alpha: 0 }, 300);
    }

    private hideRandomDialog(): void {
        Laya.Tween.to(this.imgDialog, { alpha: 0 }, 300);
    }

    collisionEvent(): void {
        this._hideTime = 1000;
        if (this._isShowing) return;
        this.showRandomDialog();
    }

    onUpdate(): void {
        if (this._hideTime > 0) {
            this._hideTime -= Laya.timer.delta;
        } else {
            if (this._isShowing) {
                this._hideTime = 0;
                this._isShowing = false;
                this.hideRandomDialog();
            }
        }
    }   
}   