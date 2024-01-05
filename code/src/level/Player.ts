import { ConfigPath } from "../const/ConfigPath";
import { MathUtil } from "../utils/MathUtils";
import { SkinModel } from "../views/skin/SkinModel";

/**
 * author: cxq
 * time: 2023/12/12 19:01:10
 * desc: 
 */
const { property, regClass } = Laya;

@regClass()
export class Player extends Laya.Script {
    declare owner: Laya.Sprite;

    velocityX: number = 0;
    velocityY: number = 0;

    @property({ type: Number, tips: "默认的弹跳角度" })
    private degrees: number = 35;

    @property({ type: Number, tips: "跳跃力度增长系数" })
    private forceVelocity: number = 800;

    @property({ type: Number, tips: "点击有效时间" })
    private maxTime: number = 1800;

    @property({ type: Number, tips: "最小促发力度" })
    private minForce: number = 250;

    @property({ type: Number, tips: "重力加速度" })
    private grav: number = -9.8;

    @property({ type: Laya.Image, tips: "icon" })
    private imgIcon: Laya.Image;

    @property({ type: Laya.Box, tips: "碰撞检测范围" })
    private collisionBoxNode: Laya.Box;
    
    @property({ type: Laya.Sprite, tips: "脚部中心点" })
    private spFoot: Laya.Sprite;

    private _isGround: boolean = false;
    private _isPressed: boolean = false;
    private _pressedTime: number = 0;
    private _isScrolling: boolean = false;
    private _footPoint: Laya.Point = Laya.Point.create();
    private _collisionBox: Laya.Rectangle = Laya.Rectangle.create();

    get isGround(): boolean {
        return this._isGround;
    }

    set isGround(v: boolean) {
        this._isGround = v;
    }

    get enabledInput(): boolean {
        return this.isGround;
    }

    get zoomVelocity(): number {
        return (1 - 0.3) / this.maxTime;
    }

    get collisionBox(): Laya.Rectangle {
        let p = Laya.Point.create();
        this.collisionBoxNode.localToGlobal(p);
        this._collisionBox.setTo(p.x, p.y, this.collisionBoxNode.width, this.collisionBoxNode.height);
        return this._collisionBox;
    }

    onPressed(): void {
        this._isPressed = true;
        this._pressedTime = 0;
    }

    onPressedCancel(): void {
        this._isPressed = false;
        this._pressedTime = 0;
        this.imgIcon.scaleY = 1;
    }

    onRelease(): void {
        let force = this._pressedTime * this.forceVelocity * 0.001;
        force = Math.max(force, this.minForce); 
        this.addForce(force, this.degrees);
        Laya.SoundManager.playSound(ConfigPath.M_CatJump);

        this._isPressed = false;
        this._pressedTime = 0;
        this.imgIcon.scaleY = 1;
    }    

    onStart(): void {
        this.imgIcon.skin = SkinModel.ins.getCurrentSkin();
    }

    onUpdate(): void {
        if (this._isScrolling) return;
        this.move();
        this.press();
        console.log("player=======", this.owner.y);
    }

    onDestroy(): void {
        this._collisionBox.recover();
        this._collisionBox = null;
    }
    
    isBelowHeight(y: number): boolean {
        return this.owner.y >= y;
    }

    getFootPoint(sp: Laya.Sprite): Laya.Point {
        const { x, y } = this.spFoot;
        this._footPoint.setTo(x, y );
        return sp.globalToLocal(this.owner.localToGlobal(this._footPoint));
    }

    spawn(x: number, y?: number): void {
        this.owner.visible = true;
        this.owner.pos(x, y == null ? this.owner.y : y);
    }

    hide(): void {
        this._isScrolling = true;
        this.stop();
        Laya.Tween.to(this.owner, { alpha: 0 }, 400, null, Laya.Handler.create(this, () => {
            this.owner.visible = false;
        }), 0, true, true);
    }

    show(): void {
        this.owner.alpha = 1;
        this.owner.visible = true;
        this._isScrolling = false;
        Laya.Tween.from(this.owner, { alpha: 0 }, 400, null, null, 0, true, true);
    }

    stop(): void {
        this.velocityX = this.velocityY = 0;
    }

    move(): void {
        const delta = Laya.timer.delta * 0.001;
        this.owner.y -= this.velocityY * delta;
        if (!this.isGround) {
            this.velocityY += this.grav * delta;
        }
    }

    addForce(force: number, degrees: number): void {
        const radians = MathUtil.degreesToRadians(degrees);
        const velocityX = force * Math.cos(radians);
        const velocityY = force * Math.sin(radians);
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    press(): void {
        if (this._isPressed) {
            this._pressedTime += Laya.timer.delta;
            this._pressedTime = Math.min(this._pressedTime, this.maxTime);
            this.imgIcon.scaleY = 1 - this._pressedTime * this.zoomVelocity;
        }
    }
}