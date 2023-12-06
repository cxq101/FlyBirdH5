export type Callback = ((...args: any[]) => Promise<void>) | ((...args: any[]) => void) | undefined;

export interface ITransition<STATE, EVENT, CALLBACK> {
    fromState: STATE;
    event: EVENT;
    toState: STATE;
    cb: CALLBACK;
}

export function t<STATE, EVENT, CALLBACK>(
    fromState: STATE, event: EVENT, toState: STATE,
    cb?: CALLBACK): ITransition<STATE, EVENT, CALLBACK> {
    return { fromState, event, toState, cb };
}

type ILogger = Partial<typeof console> & { error(...data: unknown[]): void };

export class StateMachine<
    STATE extends string | number | symbol,
    EVENT extends string | number | symbol,
    CALLBACK extends Record<EVENT, Callback> = Record<EVENT, Callback>,
> {

    protected _current: STATE;

    // initialize the state-machine
    constructor(
        _init: STATE,
        protected transitions: ITransition<STATE, EVENT, CALLBACK[EVENT]>[] = [],
        protected readonly logger: ILogger = console,
    ) {
        this._current = _init;
    }

    addTransitions(transitions: ITransition<STATE, EVENT, CALLBACK[EVENT]>[]): void {

        // bind any unbound method
        transitions.forEach((_tran) => {
            const tran: ITransition<STATE, EVENT, CALLBACK[EVENT]> = Object.create(_tran);
            if (tran.cb && !tran.cb.name?.startsWith("bound ")) {
                tran.cb = tran.cb.bind(this) as any;
            }
            this.transitions.push(tran);
        });
    }

    getState(): STATE { return this._current; }

    can(event: EVENT): boolean {
        return this.transitions.some((trans) => (trans.fromState === this._current && trans.event === event));
    }

    getNextState(event: EVENT): STATE | undefined {
        const transition = this.transitions.find((tran) => tran.fromState === this._current && tran.event === event);
        return transition?.toState;
    }

    isFinal(): boolean {
        // search for a transition that starts from current state.
        // if none is found it's a terminal state.
        return this.transitions.every((trans) => (trans.fromState !== this._current));
    }

    // post event async
    async dispatch<E extends EVENT>(event: E, ...args: Parameters<CALLBACK[E]>): Promise<void> {
        return new Promise<void>((resolve, reject) => {

            // delay execution to make it async
            setTimeout((me: this) => {

                // find transition
                const found = this.transitions.some((tran) => {
                    if (tran.fromState === me._current && tran.event === event) {
                        me._current = tran.toState;
                        if (tran.cb) {
                            try {
                                const p = tran.cb(...args) as any;
                                if (p instanceof Promise) {
                                    p.then(resolve).catch((e: Error) => reject(e));
                                } else {
                                    resolve();
                                }
                            } catch (e) {
                                this.logger.error("Exception caught in callback", e);
                                reject(e);
                            }
                        } else {
                            resolve();
                        }
                        return true;
                    }
                    return false;
                });

                // no such transition
                if (!found) {
                    const errorMessage = this.#formatNoTransitionError(me._current, event);
                    this.logger.error(errorMessage);
                    reject(new Error(errorMessage));
                }
            }, 0, this);
        });
    }

    #formatNoTransitionError(fromState: STATE, event: EVENT) {
        return `No transition: from ${String(fromState)} event ${String(event)}`;
    }
}
