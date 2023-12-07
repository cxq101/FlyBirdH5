export function Singleton<T>() {
    return class SingletonBase {
        private static _ins: SingletonBase;
        public static get ins(): T {
            if (!SingletonBase._ins) {
                SingletonBase._ins = new this();
            }
            return SingletonBase._ins as T;
        }
    };
}