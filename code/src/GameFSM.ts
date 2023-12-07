import { t, StateMachine, Callback } from "./core/FSM/StateMatchine";

enum GameStates {
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

enum GameEvents {
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


export class GameFSM extends StateMachine<GameStates, GameEvents> {
    private readonly _id = `Door_${Math.floor(Math.random() * 10000)}`;
    private readonly _key: number;

    constructor(key = 0, init = GameStates.closed) {
        super(init);
        this._key = key;
        const s = GameStates;
        const e = GameEvents;
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
        this.logger.log(`${this._id} ${[GameStates[this.getState()]]}`);
    }

    private async onOpen(): Promise<number> {
        this.logger.log("onOpen==========");
        return setTimeout(() => {
            this.dispatch(GameEvents.openComplete);
        }, 3000);
    }

    private async onBreak(): Promise<void> {
        this.logger.log("onBreak==========");
        return this.dispatch(GameEvents.breakComplete);
    }

    private async onClose(): Promise<void> {
        this.logger.log("onClose==========");
        return this.dispatch(GameEvents.closeComplete);
    }

    private async onLock(): Promise<void> {
        this.logger.log("onLock==========");
        return this.dispatch(GameEvents.lockComplete);
    }

    private async onUnlock(key: number): Promise<void> {
        this.logger.log("onUnlock==========");
        return this.dispatch(key === this._key ? GameEvents.unlockComplete : GameEvents.unlockFailed);
    }

    open(): void {
        this.dispatch(GameEvents.open);
    }

    close(): void {
        this.dispatch(GameEvents.close);
    }

    lock(): void {
        this.dispatch(GameEvents.lock);
    }

    unlock(key: number): void {
        this.dispatch(GameEvents.unlock, key);
    }

    break(): void {
        this.dispatch(GameEvents.break);
    }
    
}