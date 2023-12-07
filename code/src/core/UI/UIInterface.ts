export type IViewKey = string;
export type IViewLayer = string;

export type IViewReg = { 
    key: IViewKey;
    prefab?: string;// prefab url
    layer: IViewLayer;
    options: IViewParam;
    //cls: new(id: IViewKey, param: IViewParam, skin: string) => BaseView;
}

export interface IViewParam {
    showMask?: boolean;
    enterAnim?: boolean;
    extraClick?: boolean;
}

export type IViewMap = {
    [key: IViewKey]: IViewParam,
}

export const enum EViewCloseMode {
    // 移除节点对象，缓存起来，不销毁，下次打开无需加载。但是会占用内存。
    HIDE = 1,
    // 同上，但是会在N秒后自动销毁。
    HIDE_AND_AUTO,
    // 立即销毁显示对象。
    DESTROY,
}