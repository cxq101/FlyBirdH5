import { MathUtil } from "../utils/MathUtils";

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
    private collisionBox: Laya.Box;
    
    private _isGround: boolean = false;
    private _isPressed: boolean = false;
    private _pressedTime: number = 0;

    get isGround(): boolean {
        return this._isGround;
    }

    set isGround(v: boolean) {
        this._isGround = v;
    }

    get enabledInput(): boolean {
        return this.isGround;
    }

    isBelowHeight(y: number): boolean {
        return this.owner.y >= y;
    }

    getGlobalCollisionRange(): [number, number] {
        let p = Laya.Point.create();
        this.collisionBox.localToGlobal(p);
        return [p.x, p.x + this.collisionBox.width];
    }
    
    hide(): void {
        this.owner.visible = false;
    }

    show(): void {
        this.owner.visible = true;
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

    onPressed(): void {
        this._isPressed = true;
        this._pressedTime = 0;
    }

    onRelease(): void {
        let force = this._pressedTime * this.forceVelocity * 0.001;
        force = Math.max(force, this.minForce); 
        this.addForce(force, this.degrees);

        this._isPressed = false;
        this._pressedTime = 0;
        this.imgIcon.scaleY = 1;
    }    

    onUpdate(): void {
        this.move();
        this.press();
    }

    press(): void {
        if (this._isPressed) {
            this._pressedTime += Laya.timer.delta;
            this._pressedTime = Math.min(this._pressedTime, this.maxTime);
            this.imgIcon.scaleY = 1 - this._pressedTime * 0.000325;
        }
    }
}