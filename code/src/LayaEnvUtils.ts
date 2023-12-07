Laya.LayaEnv.beforeInit = function(config: Laya.IStageConfig) {
    //这个方法会在Laya.init前调用
    console.log("before init==========");
    //这里可以对config以及Laya.Config、Laya.Config3D进行自定义的修改
}

Laya.LayaEnv.afterInit = function() {
    //这个方法会在Laya.init后调用
    console.log("after init==========");
}
