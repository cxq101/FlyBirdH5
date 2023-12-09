export class EventDispatcher {
    private static dict: { [key: string]: any[] } = {};

    /**
     * 检查 CustomEventDispatcher 对象是否为特定事件类型注册了任何侦听器。
     * @param type 事件的类型。
     * @return 如果指定类型的侦听器已注册，则值为 true；否则，值为 false。
     */
    static hasListener(type: string): boolean {
        return !!this.dict[type];
    }

    /**
     * 派发事件。
     * @param type 事件类型。
     * @param data （可选）回调数据。<b>注意：</b>如果是需要传递多个参数 p1,p2,p3,...可以使用数组结构如：[p1,p2,p3,...] ；如果需要回调单个参数 p ，且 p 是一个数组，则需要使用结构如：[p]，其他的单个参数 p ，可以直接传入参数 p。
     * @return 此事件类型是否有侦听者，如果有侦听者则值为 true，否则值为 false。
     */
    static event(type: string, data?: any): boolean {
        let list = this.dict[type];
        if (list) {
            for (let i = list.length - 1; i > -1; i--) {
                let item = list[i];
                let handler = item[0] as Laya.Handler;
                handler.runWith(data);
                if (handler.once) {
                    list.splice(i, 1);
                }
            }
            return true;
        }
        return false;
    }

    /**
     * 使用 CustomEventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知。
     * @param type 事件的类型。
     * @param caller 事件侦听函数的执行域。
     * @param listener 事件侦听函数。
     * @param args （可选）事件侦听函数的回调参数。
     * @return 此 CustomEventDispatcher 对象。
     */
    static on(type: string, caller: any, listener: Function, args?: any[], onceOnly: boolean = false, priority: number = 0, overBefore: boolean = true): EventDispatcher {
        overBefore && this.off(type, caller, listener);
        let dict = this.dict;
        dict[type] = dict[type] || [];
        let handler = Laya.Handler.create(caller, listener, args, onceOnly);
        dict[type].unshift([handler, priority]);
        dict[type].sort((a, b) => a[1] - b[1]);
        return this;
    }

    /**
     * 使用 CustomEventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知，此侦听事件响应一次后自动移除。
     * @param type 事件的类型。
     * @param caller 事件侦听函数的执行域。
     * @param listener 事件侦听函数。
     * @param args （可选）事件侦听函数的回调参数。
     * @return 此 CustomEventDispatcher 对象。
     */
    static once(type: string, caller: any, listener: Function, args?: any[], priority: number = 0): EventDispatcher {
        return this.on(type, caller, listener, args, true, priority);
    }

    /**
     * 从 CustomEventDispatcher 对象中删除侦听器。
     * @param type 事件的类型。
     * @param caller 事件侦听函数的执行域。
     * @param listener 事件侦听函数。
     * @param onceOnly （可选）如果值为 true ,则只移除通过 once 方法添加的侦听器。
     * @return 此 CustomEventDispatcher 对象。
     */
    static off(type: string, caller: any, listener: Function, onceOnly: boolean = false): EventDispatcher {
        let list = this.dict[type] || [];
        for (let i = list.length - 1; i > -1; i--) {
            let item = list[i];
            let handle = item[0] as Laya.Handler;
            if (handle.caller === caller && handle.method === listener && handle.once === onceOnly) {
                list.splice(i, 1);
            }
        }
        return this;
    }

    /**
     * 从 CustomEventDispatcher 对象中删除指定事件类型的所有侦听器。
     * @param type （可选）事件类型，如果值为 null，则移除本对象所有类型的侦听器。
     * @return 此 CustomEventDispatcher 对象。
     */
    static offAll(type?: string): EventDispatcher {
        if (type == null) {
            for (let key in this.dict) {
                let list = this.dict[key];
                list.forEach(item => {
                    let handle = item[0] as Laya.Handler;
                    handle.recover();
                    item[0] = null;
                });
            }
            this.dict = {};
        } else {
            let list = this.dict[type];
            if (list && list.length > 0) {
                list.forEach(item => {
                    let handle = item[0] as Laya.Handler;
                    handle.recover();
                    item[0] = null;
                });
                delete this.dict[type];
            }
        }
        return this;
    }

    /**
     * 移除caller为target的所有事件监听
     * @param caller caller对象
     */
    static offAllCaller(caller: any): EventDispatcher {
        for (let key in this.dict) {
            let list = this.dict[key];
            for (let i = list.length - 1; i > -1; i--) {
                let item = list[i];
                let handle = item[0] as Laya.Handler;
                if (handle.caller === caller) {
                    list.splice(i, 1);
                }
            }
        }
        return this;
    }
}