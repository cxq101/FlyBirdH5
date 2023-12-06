const { regClass, property } = Laya;
import { t, StateMachine, Callback } from "./core/FSM/StateMatchine";

enum States {
    closing = "closing",
    closed = "closed",
    opening = "opening",
    opened = "opened",
    breaking = "breaking",
    broken = "broken",
    locking = "locking",
    locked = "locked",
    unlocking = "unlocking",
}

enum Events {
    open = 100,
    openComplete,
    close,
    closeComplete,
    break,
    breakComplete,
    lock,
    lockComplete,
    unlock,
    unlockComplete,
    unlockFailed,
}


export class Door extends StateMachine<States, Events> {
    private readonly _id = `Door_${Math.floor(Math.random() * 10000)}`;
    private readonly _key: number;

    constructor(key = 0, init = States.closed) {
        super(init);
        this._key = key;
        const s = States;
        const e = Events;
        this.addTransitions([
            t(s.closed, e.open, s.opening, this.onOpen),
            t(s.opening, e.openComplete, s.opened, this.log),

            t(s.opened, e.close, s.closing, this.onClose),
            t(s.closing, e.closeComplete, s.closed, this.log),

            t(s.closed, e.lock, s.locking, this.onLock),
            t(s.locking, e.lockComplete, s.locked, this.log),

            t(s.locked, e.unlock, s.unlocking, this.onUnlock),
            t(s.unlocking, e.unlockComplete, s.closed, this.log),
            t(s.unlocking, e.unlockFailed, s.locked, this.log),

            t(s.opened, e.break, s.breaking, this.onBreak),
            t(s.closed, e.break, s.breaking, this.onBreak),
            t(s.breaking, e.breakComplete, s.broken, this.log),
        ])
    }

    // log current state
    private log(): void {
        this.logger.log(`${this._id} ${[States[this.getState()]]}`);
    }

    private async onOpen(): Promise<number> {
        this.logger.log("onOpen==========");
        return setTimeout(() => {
            this.dispatch(Events.openComplete);
        }, 3000);
    }

    private async onBreak(): Promise<void> {
        this.logger.log("onBreak==========");
        return this.dispatch(Events.breakComplete);
    }

    private async onClose(): Promise<void> {
        this.logger.log("onClose==========");
        return this.dispatch(Events.closeComplete);
    }

    private async onLock(): Promise<void> {
        this.logger.log("onLock==========");
        return this.dispatch(Events.lockComplete);
    }

    private async onUnlock(key: number): Promise<void> {
        this.logger.log("onUnlock==========");
        return this.dispatch(key === this._key ? Events.unlockComplete : Events.unlockFailed);
    }

    open(): void {
        this.dispatch(Events.open);
    }

    close(): void {
        this.dispatch(Events.close);
    }

    lock(): void {
        this.dispatch(Events.lock);
    }

    unlock(key: number): void {
        this.dispatch(Events.unlock, key);
    }

    break(): void {
        this.dispatch(Events.break);
    }
    
}

@regClass()
export class Main extends Laya.Script {

    onStart() {
        console.log("Game start");
    }
}