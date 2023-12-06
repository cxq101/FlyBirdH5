export { };
declare global {
    export namespace IEditorEnv {
        export namespace ICreateAssetUtil {
            /**
             * @param node
             * @param path 在assets中的相对路径
             */
            function createPrefab(node: Laya.Node, path: string, texturefilter: number): Promise<IAssetInfo>;

            /**
             * @param scene
             * @param path 在assets中的相对路径
             */
            function createScene(scene: Laya.Scene, path: string, texturefilter: number): Promise<IAssetInfo>;

            /**
             * @param mat
             * @param path 在assets中的相对路径
             */
            function createMaterial(mat: Laya.Material, path: string, texturefilter: number): Promise<IAssetInfo>;

            /**
             * @param mesh
             * @param path 在assets中的相对路径
             */
            function createMesh(mesh: Laya.Mesh, path: string): Promise<IAssetInfo>;

            /**
             * @param tex
             * @param path 在assets中的相对路径
             */
            function createTexture(tex: Laya.Texture | Laya.BaseTexture, path: string, texturefilter: number): Promise<IAssetInfo>;

            function writeAnimationClip(clip: Laya.AnimationClip): ArrayBuffer;

            function writeAnimationClip2D(clip: Laya.AnimationClip2D): ArrayBuffer;

            function writeMaterial(mat: Laya.Material): ArrayBuffer;

            function writeMesh(mesh: Laya.Mesh): ArrayBuffer;

            function writeTexture(tex: Laya.Texture | Laya.BaseTexture, filter: number): ArrayBuffer;
        }
        export interface IEditorEnvSingleton {
            readonly projectPath: string;
            readonly projectName: string;
            readonly projectType: string;
            readonly appPath: string;
            readonly userDataPath: string;
            readonly assetsPath: string;
            readonly webRootPath: string;
            readonly unpackedWebRootPath: string;
            readonly isPackaged: boolean;
            readonly isForeground: boolean;
            readonly started: boolean;
            readonly ipc: IIpc;
            readonly assetMgr: IAssetManager;
            readonly liveServer: ILiveServer;
            readonly sceneManager: ISceneManager;
            readonly port: IMyMessagePort;
            readonly scene: IGameScene;
            readonly onUpdate: IDelegate<() => void>;
            readonly onAppActivate: IDelegate<() => void>;

            readonly playerSettings: ISettings;
            readonly editorSettings: ISettings;
            readonly sceneViewSettings: ISettings;
            getSettings(name: string, autoSync?: boolean): ISettings;

            invalidateFrame(): void;
        }
        export interface IGameScene extends IMyScene {
            readonly selection: ReadonlyArray<Laya.Node>;
            readonly allNodes: Map<string, WeakRef<Laya.Node>>;
            readonly topLevelSelection: ReadonlyArray<Laya.Node>;

            readonly nodesSet_gizmo: Set<Laya.Node>;
            readonly nodesSet_cameras: Set<Laya.Camera>;

            readonly rootNode2D: Laya.Scene;
            readonly rootNode3D: Laya.Scene3D;
            readonly prefabRootNode: Laya.Sprite | Laya.Sprite3D;

            readonly openedBoxChain: ReadonlyArray<Laya.Sprite>;
            readonly openedBox: Laya.Sprite;

            getNodeById(id: string): Laya.Node;
        }
        export namespace IGizmos2D {
            var showPhysicsToos: boolean;
            var allowObjectAction: boolean;

            function getManager(node: IMyNode): IGizmosManager;
        }

        export interface StrokeData {
            color?: string;
            width?: number;
            opacity?: number;
            linecap?: string;
            linejoin?: string;
            miterlimit?: number;
            dasharray?: string;
            dashoffset?: number;
        }

        export interface FillData {
            color?: string
            opacity?: number
            rule?: string
        }

        export interface IGizmosManager {
            readonly owner: IMyNode;
            locked: boolean;

            createRect(width: number, height: number): IGizmoRect;
            createCircle(radius: number): IGizmoCircle;
            createPolygon(easyTouch?: boolean): IGizmoPolygon;
            createEllipse(rx: number, ry: number): IGizmoEllipse;
            createPath(easyTouch?: boolean): IGizmoPath;
            createText(text?: string): IGizmoText;
            createHandle(shape: "rect" | "circle", size: number, fill: FillData | string, stroke?: StrokeData | string, cursor?: string): IGizmoHandle;
            createHandleGroup(shape: "rect" | "circle", size: number, fill: FillData | string, stroke?: StrokeData | string, cursor?: string): IGizmoHandleGroup;

            localToGlobal(x: number, y: number, out?: gui.Vec2): gui.Vec2;
            globalToLocal(x: number, y: number, out?: gui.Vec2, targetSpace?: IMyNode): gui.Vec2;
        }

        export interface IGizmoElement {
            readonly owner: IGizmosManager;
            readonly node: SVGElement;
            tag: string;

            readonly onDragStart: IDelegate<(evt: MouseEvent) => void>;
            readonly onDragMoving: IDelegate<(evt: MouseEvent, dx: number, dy: number) => void>;
            readonly onDragEnd: IDelegate<(evt: MouseEvent) => void>;
            readonly onClick: IDelegate<(evt: MouseEvent) => void>;
            readonly onDblClick: IDelegate<(evt: MouseEvent) => void>;

            get x(): number;
            get y(): number;

            get visible(): boolean;
            set visible(value: boolean);

            get touchable(): boolean;
            set touchable(value: boolean);

            get direction(): number;
            set direction(value: number);

            setLocalPos(x: number, y: number): this;
            setPos(x: number, y: number): this;
            setSize(width: number, height: number): this;

            stroke(value: StrokeData | string): this;
            fill(value: FillData | string): this;

            setData(name: string, value: any): this;
            getData(name: string): any;
        }

        export interface IGizmoHandle extends IGizmoElement {
        }

        export interface IGizmoHandleGroup extends IGizmoElement {
            readonly onHandleDragStart: IDelegate<(handle: IGizmoHandle, evt: MouseEvent) => void>;
            readonly onHandleDragMoving: IDelegate<(handle: IGizmoHandle, evt: MouseEvent, dx: number, dy: number) => void>;
            readonly onHandleDragEnd: IDelegate<(handle: IGizmoHandle, evt: MouseEvent) => void>;
            readonly onHandleClick: IDelegate<(handle: IGizmoHandle, evt: MouseEvent) => void>;
            readonly onHandleDblClick: IDelegate<(handle: IGizmoHandle, evt: MouseEvent) => void>;

            get array(): ReadonlyArray<IGizmoHandle>;

            add(): IGizmoHandle;
            remove(handle: IGizmoHandle): void;
            clear(): void;
        }

        export interface IGizmoRect extends IGizmoElement {
        }

        export interface IGizmoCircle extends IGizmoElement {
            setLocalRadius(value: number): this;
            setRadius(value: number): this;
        }

        export interface IGizmoEllipse extends IGizmoElement {
            setLocalRadius(rx: number, ry: number): this;
            setRadius(rx: number, ry: number): this;
        }

        export interface IGizmoPolygon extends IGizmoElement {
            readonly points: Array<number>;
            refresh(): void;
        }

        export interface IGizmoPath extends IGizmoElement {
            relativeCoords: boolean;

            moveTo(x: number, y: number): this;
            lineTo(x: number, y: number): this;
            cubicCurveTo(x: number, y: number, x2: number, y2: number): this;
            cubicCurveTo(x: number, y: number, x1: number, y1: number, x2: number, y2: number): this;
            quadCurveTo(x: number, y: number): this;
            quadCurveTo(x: number, y: number, x1: number, y1: number): this;
            quadCurveTo(x: number, y: number, x1?: number, y1?: number): this;

            resetPath(): this;
            refresh(): void;
        }

        export interface IGizmoText extends IGizmoElement {
            setFontProp(prop: string, value: string | number): this;
            setText(text: string): this;
        }
        export namespace IGizmos3D {

            /**
             * Gizmos icon
             * @param position 图标位置
             * @param iconTexUrl icon 图片资源路径
             */
            function drawIcon(position: Laya.Vector3, iconTexUrl: string, color?: Laya.Color): void;

            /**
             * Gizmos line
             * @param from 线段起点
             * @param to 线段终点
             * @param color 线段颜色
             */
            function drawLine(from: Laya.Vector3, to: Laya.Vector3, color?: Laya.Color): void;

            /**
             * Gizmos wire box
             * @param center 中心点
             * @param size 立方体尺寸
             * @param color 线段颜色
             */
            function drawWireBox(center: Laya.Vector3, size: Laya.Vector3, color?: Laya.Color): void;

            /**
             * Gizmos wire sphere
             * @param center 中心点
             * @param radius 半径
             * @param color 线段颜色
             */
            function drawWireSphere(center: Laya.Vector3, radius: number, color?: Laya.Color): void;

            /**
             * Gizmos bound frustum
             * @param frustum 截锥体
             * @param color 线段颜色
             */
            function drawBoundFrustum(frustum: Laya.BoundFrustum, color?: Laya.Color): void;

            /**
             * Gizmos bound box
             * @param bBox 
             * @param color 
             */
            function drawBoundBox(bBox: Laya.BoundBox, color?: Laya.Color): void;

            /**
             * Gizmos Mesh
             * @param mesh 绘制 模型 mesh
             * @param subMeshIndex 绘制 submesh 索引， -1 为全部绘制
             * @param position 模型位置
             * @param rotation 模型旋转
             * @param scale 模型缩放
             */
            function drawMesh(mesh: Laya.Mesh, subMeshIndex: number, position?: Laya.Vector3, rotation?: Laya.Quaternion, scale?: Laya.Vector3, color?: Laya.Color): void;

        }
        export interface IHandle {
            get valueChanged(): boolean;
        }

        export interface IBoxHandle extends IHandle {
            position: Laya.Vector3;
            size: Laya.Vector3;
        }

        export interface ICapsuleHandle extends IHandle {
            position: Laya.Vector3;
            radius: number;
            height: number;
        }

        export interface ICylinderHandle extends IHandle {
            position: Laya.Vector3;
            upRadius: number;
            downRadius: number;
            height: number;
        }

        export namespace IHandles {
            /**
             * 方向移动操作组件
             * @param direction 移动方向
             * @param position 初始位置
             * @param size 组件绘制大小
             * @param color 颜色
             * @returns 修改后的位置
             */
            function directionMoveHandle(direction: Laya.Vector3, position: Laya.Vector3, size: number, color?: Laya.Color): Laya.Vector3;

            function directionMoveQuadHandle(direction: Laya.Vector3, position: Laya.Vector3, size: number, color?: Laya.Color): Laya.Vector3;
            /**
             * 缩放操作组件
             * @param scale 初始缩放值 
             * @param position 组件绘制位置
             * @param rotation 组件绘制旋转 (同时改变操作方向)
             * @param size 组件绘制大小
             * @param color 颜色
             * @returns 修改后缩放值
             */
            function directionScaleHandle(scale: number, position: Laya.Vector3, rotation: Laya.Quaternion, size: number, color?: Laya.Color): number;

            /**
             * 半径操作组件
             * @param radius 输入半径
             * @param position 位置
             * @param rotation 旋转
             * @param color 颜色
             * @returns 返回半径
             */
            function radiusHandle(radius: number, position: Laya.Vector3, rotation?: Laya.Quaternion, color?: Laya.Color): number;

            /**
             * 圆锥操作组件
             * @param rotation 圆锥旋转
             * @param topPosition 圆锥顶点位置
             * @param angle 圆锥角度
             * @param range 圆锥高度
             * @param color 线段颜色
             * @returns x: 圆锥角度 y: 圆锥高度
             */
            function coneHandle(rotation: Laya.Quaternion, topPosition: Laya.Vector3, angle: number, range: number, color?: Laya.Color): Laya.Vector2;

            /**
             * 绘制线段
             * @param start 线段起点
             * @param end 线段终点
             * @param color 线段颜色
             */
            function drawLine(start: Laya.Vector3, end: Laya.Vector3, color?: Laya.Color): void;

            function drawDottedLine(start: Laya.Vector3, end: Laya.Vector3, color?: Laya.Color): void;

            /**
             * 绘制线框圆
             * @param center 圆心位置
             * @param radius 半径
             * @param normal 垂直于圆平面的法线方向
             * @param color 线段颜色
             */
            function drawWireCircle(center: Laya.Vector3, radius: number, normal: Laya.Vector3, color?: Laya.Color, angle?: number): void;

            /**
            * 编辑线盒子
            * @param center 位置
            * @param size   大小
            * @param color 线段颜色
            * @param rotation 旋转
            */
            function drawBox(center: Laya.Vector3, size: Laya.Vector3, color?: Laya.Color, rotation?: Laya.Quaternion): void;

            /**
            * 编辑线盒子
            * @param center 位置
            * @param size   大小
            * @param color 线段颜色
            * @param rotation 旋转
            */
            function editBox(center: Laya.Vector3, size: Laya.Vector3, color?: Laya.Color, rotation?: Laya.Quaternion, isCenter?: boolean): IBoxHandle;

            /**
            * 绘制线胶囊体
            * @param center 位置
            * @param size   大小
            * @param color 线段颜色
            * @param rotation 旋转
            */
            function drawCapsule(center: Laya.Vector3, radius: number, height: number, color?: Laya.Color, rotation?: Laya.Quaternion): void;

            /**
             * 编辑胶囊体
             * @param center 位置
             * @param radius 半径
             * @param height 高度
             * @param color 线段颜色
             * @param rotation 旋转
             */
            function editCapsule(center: Laya.Vector3, radius: number, height: number, color?: Laya.Color, rotation?: Laya.Quaternion): ICapsuleHandle;

            /**
             * 绘制半球
             * @param center 位置
             * @param size   大小
             * @param color 线段颜色
             * @param rotation 旋转
             */
            function drawHemiSphere(center: Laya.Vector3, radius: number, color?: Laya.Color, rotation?: Laya.Quaternion): void;

            /**
            * 绘制球体
            * @param center 位置
            * @param size   大小
            * @param color 线段颜色
            */
            function drawSphere(center: Laya.Vector3, radius: number, color?: Laya.Color): void;

            /**
             * 绘制圆柱体
             * @param center 位置
             * @param radius 半径
             * @param height 高度
             * @param color 线段颜色
             * @param rotation 旋转
             */
            function drawCylinder(center: Laya.Vector3, upRadius: number, downRadius: number, height: number, color?: Laya.Color, rotation?: Laya.Quaternion): void;

            /**
             * 编辑圆柱体
             * @param center 位置
             * @param radius 半径
             * @param height 高度
             * @param color 线段颜色
             * @param rotation 旋转
             */
            function editCylinder(center: Laya.Vector3, upRadius: number, downRadius: number, height: number, color?: Laya.Color, rotation?: Laya.Quaternion, editorConfig?: any): ICylinderHandle;
            /**
             * 绘制线矩行
             * @param rotation 矩形旋转
             * @param center 矩形位置
             * @param width 宽
             * @param height 高
             * @param color 线段颜色
             */
            function drawWirePlane(rotation: Laya.Quaternion, center: Laya.Vector3, width: number, height: number, color?: Laya.Color, spread?: number): Laya.Vector2;

            /**
            * 绘制线椭圆
            * @param rotation 椭圆旋转
            * @param center 椭圆位置
            * @param width 宽
            * @param height 高
            * @param color 线段颜色
            */
            function drawEllipse(rotation: Laya.Quaternion, center: Laya.Vector3, width: number, height: number, color?: Laya.Color, spread?: number): Laya.Vector2;

            /**
             * 绘制 billboard
             * @param position 位置
             * @param size 绘制大小
             * @param color 颜色
             */
            function drawBillboard(position: Laya.Vector3, size: number, color?: Laya.Color): void;

            /**
             * 绘制 立方体
             * @param position 位置
             * @param rotation 旋转
             * @param size 绘制大小
             * @param color 颜色
             */
            function drawCube(position: Laya.Vector3, rotation: Laya.Quaternion, size: number, color?: Laya.Color): void;

            function drawMesh(mesh: Laya.Mesh, position?: Laya.Vector3, rotation?: Laya.Quaternion, scale?: Laya.Vector3, color?: Laya.Color): void;

            function drawMeshLine(mesh: Laya.Mesh, position?: Laya.Vector3, rotation?: Laya.Quaternion, scale?: Laya.Vector3, color?: Laya.Color): void;
        }
        export namespace IHandleUtils {
            /**
             * 计算还原透视缩放
             * @param position 
             */
            function getHandleSize(position: Laya.Vector3): number;
        }
        export interface IHierarchyWriterOptions {
            getNodeRef?: (node: Laya.Node) => string | string[];
            noHeader?: boolean;

            //internal
            outNodeRefs?: Map<Laya.Node, string>;
        }

        export namespace IHierarchyWriter {
            function write(node: Laya.Node, options?: IHierarchyWriterOptions): any;
            function writeMultiple(nodes: ReadonlyArray<Laya.Node>, props?: any, options?: IHierarchyWriterOptions): any;
            function writeScene(scene2D: Laya.Scene, scene3D: Laya.Scene3D): any;
            function collectResources(node: Laya.Node, out?: Set<any>): Set<any>;
        }
        export interface IMyNodeExtra {
            id?: string;
            type?: string;
            selected?: boolean;
            isTopPrefab?: boolean;
            scene?: IMyScene;
        }

        export interface IMyNode {
            hideFlags: number;
            name: string;
            readonly parent: IMyNode;
            readonly destroyed: boolean;
            readonly numChildren: number;

            getChildAt(index: number): IMyNode;
            isAncestorOf(node: IMyNode): boolean;
            hasHideFlag(flag: number): boolean;

            _setBit(type: number, value: boolean): void;
            _getBit(type: number): boolean;

            _extra: IMyNodeExtra;
        }

        export interface IMyComponent {
            readonly owner: IMyNode;
            hideFlags: number;
            enabled: boolean;
        }
        export interface IMyScene extends gui.EventDispatcher {
            readonly id: string;
            readonly asset: IAssetInfo;
            readonly port: IMyMessagePort;
            readonly selection: ReadonlyArray<IMyNode>;
            readonly allNodes: Map<string, WeakRef<IMyNode>>;
            readonly topLevelSelection: ReadonlyArray<IMyNode>;
            readonly modified: boolean;
            readonly viewerMode: boolean;

            readonly loading: boolean;
            readonly rootNode2D: IMyNode;
            readonly rootNode3D: IMyNode;
            readonly prefabRootNode: IMyNode;
            readonly worldType: WorldType;

            readonly status: IConfigObject;

            readonly openedBoxChain: ReadonlyArray<IMyNode>;
            readonly openedBox: IMyNode;
            openBox(box: IMyNode): void;
            closeBox(): void;
            findBox(node: IMyNode): IMyNode;
            isBox(node: IMyNode): boolean;
            validateScene(): void;

            addSelection(target: IMyNode, ctrlKey?: boolean): void;
            setSelection(nodes: IMyNode[]): void;
            removeSelection(node: IMyNode): void;
            clearSelection(): void;
            readonly has3DSelection: boolean;

            getNodeById(id: string): IMyNode;
            findNodes(keyword: string, maxResults?: number): Array<any>;
            setProps(obj: any, datapath: string[], value: any): Promise<boolean>;
            getProps(obj: any, changes?: Array<any>, excludeUnserializable?: boolean): boolean;

            recordObject(node: any, ...propNames: string[]): void;
            writeRuntime(): void;

            runScript(name: string, ...args: any[]): Promise<any>;
            runNodeScript(target: IMyNode | IMyComponent, methodName: string, ...args: any[]): Promise<any>;
        }

        export interface ISceneManager {
            readonly onSelectionChanged: IDelegate<() => void>;
            readonly onSceneActivated: IDelegate<(currentScene: IMyScene, previousScene: IMyScene) => void>;

            activeScene: IMyScene;
            readonly scenes: ReadonlyArray<IMyScene>;
        }
        export interface IEncodeObjOptions {
            writeType?: boolean,
            eliminateDefaults?: boolean,
            getNodeRef?: (node: Laya.Node) => string | string[],

            forceType?: string;
        }

        export interface IDecodeObjOptions {
            outErrors?: Array<string>;
            strictTypeCheck?: boolean;
            getNodeByRef?: (id: string | string[]) => Laya.Node;
            getNodeData?: (node: Laya.Node) => any;
        }

        export namespace ISerializeUtil {
            const isDeserializing: boolean;

            function encodeObj(obj: any, receiver?: any, options?: IEncodeObjOptions): any;

            function encodeProperty(prop: FPropertyDescriptor, obj: any, options?: IEncodeObjOptions): any;

            function decodeObj(data: any, receiver?: any, type?: string, options?: IDecodeObjOptions): any;
        }

        export interface IAssetImporter {
            silent?: boolean;

            handleImport(asset: IImportingAsset): Promise<void>;
        }
        export interface IAssetManager {
            readonly allAssets: Readonly<Record<string, IAssetInfo>>;
            readonly customAssetFilters: Record<string, IAssetFilter>;

            getAllAssetsInDir(folder: IAssetInfo, types?: Array<AssetType>): Array<IAssetInfo>;

            readonly resourceDirs: Readonly<Set<IAssetInfo>>;
            getAllAssetsInResourceDir(): Array<IAssetInfo>;

            getAsset(idOrPath: string, allowResourcesSearch?: boolean): IAssetInfo;
            getAssetsByType(types?: Array<AssetType>, matchSubType?: boolean): Array<IAssetInfo>;

            createFileAsset(filePath: string, metaData?: any, allowOverwrite?: boolean): IAssetInfo;
            createFolderAsset(folderPath: string): IAssetInfo;

            getShader(shaderName: string): IAssetInfo;
            setAssetIsShader(asset: IAssetInfo, shaderName: string): void;

            readPrefab(asset: IAssetInfo): any;

            setMetaData(asset: IAssetInfo, data: any): void;

            getFullPath(asset: IAssetInfo): string;
            toFullPath(assetFile: string): string;

            flushChanges(): Promise<void>;
        }

        export interface ISubAssetInfo {
            readonly id: string;
            readonly fileName: string;
            readonly fullPath: string;
        }

        export interface IImportingAsset {
            readonly source: IAssetInfo;
            readonly uuid: string;
            readonly name: string;
            readonly type: AssetType;
            readonly subAssets: ISubAssetInfo[];
            readonly filePath: string;
            readonly basePath: string;
            readonly fullPath: string;
            readonly subAssetLocation: string;
            readonly tempPath: string;
            readonly metaData: any;
            readonly importerData: any;

            toFullPath(filePath: string): string;
            clearLibrary(): void;
            createSubAsset(name: string, entry?: boolean, useFileNameForId?: boolean): ISubAssetInfo;
            createAsset(filePath: string, metaData?: any): IAssetInfo;
            setIsShader(shaderName: string, typeDef: FTypeDescriptor): void;
            getAssetPathById(assetId: string): string;
            findAsset(filePath: string): IAssetInfo;

            /**
             * @param progress 0-100的值
             */
            setProgress(progress: number): void;
        }
        export interface ILiveServer {
            readonly host: string;
            readonly port: number;
        }

        export type FEnumDescriptor = {
            name: string,
            value: any,
            extend?: FEnumDescriptor,
            [index: string]: any,
        }[] | any[] | string;

        export type WorldType = "2d" | "3d" | "gui" | null;
        export type FPropertyType = string | [FPropertyType] | ["Record", FPropertyType];

        export interface FPropertyDescriptor {
            /** 属性名称 */
            name: string;
            /** 
             * 属性类型。
             * 基础类型有：number,string,boolean,any
             * 复合类型有：数组，使用类似[number]这样的方式表达；字典，使用类似["Record", number]这样的方式表达，第一个元素固定为Record，第二个元素为实际类型。
             * 其他名称为在typeRegistry注册的类型。
             * 如果不提供type，表示只用于ui展示，没有实际对应数据。
             */
            type?: FPropertyType;

            /** 该属性在原型中的初始值。这个值也用于序列化时比较，如果相同则不序列化这个属性，所以必须保证这里设置的值就是类中变量的初始值。*/
            default?: any;

            /** 标题。如果不提供，则使用name。 */
            caption?: string;
            /** 本地语言的标题。 */
            localizedCaption?: string;
            /** 本地语言的标题，但只有激活翻译引擎符号才生效。*/
            $localizedCaption?: string;
            /** 可以设定是否隐藏标题 */
            captionDisplay?: "normal" | "hidden" | "none";

            /** 提示文字 */
            tips?: string;
            /** 本地语言的提示文字。 */
            localizedTips?: string;

            /** 属性栏目。为多个属性设置相同的值，可以将它们显示在同一个Inspector栏目内。*/
            catalog?: string;
            /**属性栏目的帮助 */
            catalogHelp?: string;
            /* 栏目标题。不提供则直接使用栏目名称。 */
            catalogCaption?: string;
            /* 本地语言的栏目标题 */
            localizedCatalogCaption?: string;
            /* 栏目的显示顺序，数值越小显示在前面。不提供则按属性出现的顺序。*/
            catalogOrder?: number;

            /**
             * 编辑这个属性的控件。内置有：number,string,boolean,color,vec2,vec3,vec4,asset
             * 
             *      number : 数字输入。
             *      string : 字符串输入。默认为单行输入，如果是多行，需要激活multiline选项。
             *      boolean : 多选框。
             *      color : 一个颜色框+调色盘+拾色器
             *      vec2 : XY输入的组合
             *      vec3 : XYZ输入的组合
             *      vec4 : XYZW输入的组合
             *      asset : 选择资源
             * 
             * 一般来说，不需要设置这个选项，编辑器会自动根据属性类型选择适合的控件，但在某些情况下可以需要强制指定。
             * 例如，如果数据类型是Vector4，但其实它表达的是颜色，用默认编辑Vector4的控件不适合，需要在这里设置为“color”。
             * 
             * 显式设置inspector为null，则不会为属性构造inspector。这与hidden设置为true不同。hidden为true是创建但不可见，
             * inspector为null的话则是完全不创建。
             */
            inspector?: string;

            /** 隐藏控制。
             * 可以用表达式，支持的语法有：
             * 1. 字符串。例如"!data.a && !data.b"，表示属性a和属性b均为空时，隐藏这个属性。隐含的变量有两个，data为当前数据，field为IPropertyField接口。
             * 2. 函数。函数原型为func(data:any, field:IPropertyField)。
             */
            hidden?: boolean | string | Function;
            /** 只读控制。可以用表达式，参考隐藏控制。 */
            readonly?: boolean | string | Function;

            /** 数据检查机制。
             * 可以用表达式，支持的语法有：
             * 1. 字符串。例如"data.a"， 如果data.a是一个字符串，表示验证不通过，这个字符串作为错误提示信息显示；如果是其他值，则表示验证通过。
             *    隐含的变量有三个，data为当前数据，value为当前用户输入的值，field为IPropertyField接口。
             * 2. 函数。函数原型为func(data:any, value:any, field:IPropertyField)。
             *    如果返回值是一个字符串，表示验证不通过，这个字符串作为错误提示信息显示；如果是其他值，则表示验证通过。
             */
            validator?: string | Function;

            /** 是否序列化 */
            serializable?: boolean;
            /** 属性在不参与序列化时，如果它的数据可能受其他可序列化的属性影响，在这里填写其他属性名称。这通常用于判断预制体属性是否覆盖。*/
            affectBy?: string;

            /** 是否多行文本输入 */
            multiline?: boolean;
            /** 是否密码输入 */
            password?: boolean;
            /** 如果true或者缺省，文本输入每次输入都提交；否则只有在失焦时才提交 */
            submitOnTyping?: boolean;
            /** 输入文本的提示信息 */
            prompt?: string;
            /** 本地语言的输入文本的提示信息 */
            localizedPrompt?: string;

            /** 提供数据源显示一个下拉框去改变属性的值 */
            enumSource?: FEnumDescriptor;
            /** 当数据源为空时，隐藏这个属性 */
            hideIfEnumSourceEmpty?: boolean;

            /** 是否反转布尔值。例如当属性值为true时，多选框显示为不勾选。 */
            reverseBool?: boolean;

            /** 是否允许null值。默认为true。*/
            nullable?: boolean;

            /** 数字的最小值 */
            min?: number,
            /** 数字的最大值 */
            max?: number,
            /** 数值范围，等同于一次性设置min和max。 */
            range?: [number, number];
            /** 拖动方式改变数值时，每次数值改变的幅度。 */
            step?: number;
            /** 小数点后的位数 */
            fractionDigits?: number;
            /** 显示为百分比 */
            percentage?: boolean;

            /** 对数组类型属性适用。表示数组是固定长度，不允许修改。*/
            fixedLength?: boolean;
            /** 对数组类型属性适用。如果不提供，则表示数组允许所有操作，如果提供，则只允许列出的操作。*/
            arrayActions?: Array<"append" | "insert" | "delete" | "move">;
            /** 对数组类型属性适用。这里可以定义数组元素的属性 */
            elementProps?: Partial<FPropertyDescriptor>;

            /** 对字典类型属性适用。表示字典适用指定的固定的key值集合。 */
            fixedKeys?: Array<string>;

            /** 对颜色类型属性适用。表示是否提供透明度a值的修改。对于字符串或者Color类型的属性，默认为true；对于number类型的属性，默认为false */
            showAlpha?: boolean;
            /** 对颜色类型属性适用。它与default值不同的是，当default是null时，可以用defaultColor定义一个非null时的默认值。*/
            defaultColor?: any;
            /** 对颜色类型属性适用。允许显示一个checkbox决定颜色是否为null。 */
            colorNullable?: boolean;

            /** 对对象类型属性适用。如果为true，隐藏对象的标题，同时对象下的属性的显示缩进会减少一级。*/
            hideHeader?: boolean;
            /** 对对象类型属性适用。对象创建时可以下拉选择一个类型。如果显式置为null，则禁止菜单。默认是显示一个创建基类的菜单。使用“ClassName*”这样的格式表示ClassName的所有扩展类*/
            createObjectMenu?: Array<string> | Function;

            /** 说明此属性是引用一个资源 */
            isAsset?: boolean;
            /** 对资源类型的属性适用。多个资源类型用逗号分隔，例如“Image,Audio"。可用值参考editor/public/IAssetInfo.ts*/
            assetTypeFilter?: string;
            /** 如果属性类型是string，并且进行资源选择时，这个选项决定属性值是资源原始路径还是res://uuid这样的格式。如果是true，则是资源原始路径。默认false。*/
            useAssetPath?: boolean;
            /** 对资源类型的属性适用。选择资源时是否允许选择内部资源 */
            allowInternalAssets?: boolean;
            /** 对资源类型的属性适用。可以设置一个自定义的过滤器。过滤器需要先通过EditorEnv.assetMgr.customAssetFilters注册。 */
            customAssetFilter?: string;

            /** 对类型是Node或者Component的属性适用。如果不为null，当在实际运行环境里执行反序列化时，引用对象不再实例化，而是将它的序列化数据原样保存到指定的属性中。*/
            toTemplate?: string;

            /** 表示属性是否可写。默认是true。设置为false则属性为只读。 */
            writable?: boolean;

            /** 显示位置。语法：before xxx/after xxx/first/last。 */
            position?: string;

            /** 表示属性是私有属性。私有属性不会显示在Inspector里，但会序列化保存。 与inspector:null不同，private的数据不会从场景进程传递到UI进程。*/
            "private"?: boolean;

            /** 如果为true，序列化时属性必定写入。否则会与默认值比较，相同则不写入。*/
            forceWriteDefault?: boolean;

            /** 如果为true，预制体实例根节点在序列化属性时，不管是否有覆盖，都会写入该属性。也同时意味着这个属性不会出现在覆盖列表中 **/
            forceWriteInPrefabRoot?: boolean;

            /** 增加缩进，单位是层级，不是像素。 */
            addIndent?: number;

            /** 表示属性是否允许多选情况下编辑。默认true。 */
            allowMultipleObjects?: boolean;

            /** 表示属性不显示在派生类的属性表中 */
            hideInDeriveType?: boolean;

            /** 属性改变时额外调用对象的一个函数，这里是函数名称。
             * 函数原型是func(key?:string)。其中key在改变成员内部属性时会传递。
             * 例如改变数据某个元素的内部属性，则key是这个元素的索引。 
             */
            onChange?: string;

            /** 额外的选项 */
            options?: Record<string, any>;
        }

        export interface FTypeDescriptor {
            /** 类型名称。 */
            name: string;
            /**帮助文档url地址 */
            help?: string;
            /** 标题。如果不提供，则使用name。 */
            caption?: string;
            /** 本地语言的标题。 */
            localizedCaption?: string;
            /** 本地语言的标题，但只有激活翻译引擎符号才生效。*/
            $localizedCaption?: string;
            /** 添加到组件菜单。 */
            menu?: string;
            /** 图标。*/
            icon?: string;
            /** 脚本的路径 */
            scriptPath?: string;
            /** 是否资源类型 */
            isAsset?: boolean;
            /** 基类 */
            base?: string;
            /** 默认值。这个值只在面板中使用，它指从面上上创建对象时赋予属性的初始值。*/
            init?: any;
            /** 属性列表 */
            properties: Array<FPropertyDescriptor>;
            /** 编辑这个类实例的控件 */
            inspector?: string;

            /** 对资源类型的属性适用。多个资源类型用逗号分隔，例如“Image,Audio"。可用值参考editor/public/IAssetInfo.ts。 */
            assetTypeFilter?: string;

            /** 对Component适用，是否允许在Editor执行 */
            runInEditor?: boolean;
            /** 对Component适用，当AddComponent时同时添加依赖的Component */
            requireComponents?: Array<string>;
            /** 对Component使用，为true时，表示隐藏设置enable和屏蔽Remove Component功能。 */
            noRemoveComponent?: boolean;
            /** 对Component使用，表示这个组件允许挂载的节点类型。默认null */
            worldType?: WorldType;
            /** 对Component使用，如果为true，并且定义了menu属性，则这个组件还会显示在层级面板的新建对象菜单上。 */
            inHierarchyMenu?: boolean;

            /** 栏目样式 */
            catalogBarStyle?: null | "normal" | "hidden" | "transparent";

            /** 额外的选项 */
            options?: any;
        }
        export enum AssetType {
            Unknown = 0,
            Folder,
            Image,
            Scene,
            Prefab,
            Material,
            Mesh,
            Model,
            TypeScript,
            JavaScript,
            ShaderScript,
            WebAssembly,
            ScriptBundleDefinition,
            Json,
            Text,
            XML,
            BitmapFont,
            TTFFont,
            Audio,
            Video,
            Shader,
            ShaderBlueprint,
            ShaderBlueprintFunction,
            AnimationClip,
            AnimationClip2D,
            AnimationController,
            AnimationController2D,
            Cubemap,
            AvatarMask,
            LightingSettings,
            RenderTexture,
            Atlas,
            AtlasConfig,
            Skeleton,
            Spine,
            GUIPrefab,

            FairyGUIPackage,
            LensFlareData,
            Texture2DArray,

            SVGImage
        }

        export enum AssetFlags {
            Readonly = 1,
            SubAsset = 2,
            Composite = 4,
            Internal = 256,
            Memory = 512,
            NoDbCache = 1024,
            Hidden = 2048,
            Temp = 4096
        }

        export enum AssetChangedFlag {
            Modified = 0,
            New = 1,
            Deleted = 2,
            Moved = 3
        }

        export enum AssetScriptType {
            None = 0,
            Engine = 1,
            Scene = 2,
            Editor = 4,
            Plugin = 8
        }

        export interface IAssetInfo {
            id: string;
            name: string;
            fileName: string;
            file: string;
            ext: string;
            type: AssetType;
            icon: string;
            openedIcon?: string;
            ver: number;
            parentId: string;
            hasChild?: boolean;
            flags: number;
            scriptType: AssetScriptType,
            children?: ReadonlyArray<IAssetInfo>;
        }

        export interface IAssetFilter {
            (asset: IAssetInfo): boolean;
        }
        export interface IConf {
            set(key: string, value: any): void;
            get(key: string, defaultValue?: any): any;
            dispose(): void;
            save(): void;
        }
        export interface IConfigObject {
            [index: string]: any,

            get(key: string, defaultValue?: any): any;
            getNumber(key: string, defaultValue?: number): number;
            getBool(key: string, defaultValue?: boolean): boolean;
            getSection(key: string): IConfigObject;
            set(key: string, value: any): void;
            delete(key: string): void;
            clear(): void;
            copyFrom(data: any): void;
        }
        export interface ICryptoUtils {
            createHash(data: string): string;
            createFileHash(path: string): Promise<string>;

            encryptAES(data: string, key: string): string;

            decryptAES(encrypted: string, key: string): string;
        }

        export interface IDelegate<T extends (...args: any[]) => any> {
            executor: (method: Function, thisArg: any, ...args: any[]) => void;

            add(callback: T, target?: any): void;
            once(callback: T, target?: any): void;
            remove(callback: T, target?: any): void;

            clear(): void;
            clearForTarget(target: any): void;
            clearFor(test: (target: any, callback: T) => boolean): void;
            readonly count: number;
            invoke(...args: Parameters<T>): void;
        }
        export interface IIpc {
            invoke(channel: string, ...args: any[]): Promise<any>;
            on(channel: string, listener: (event: Event, ...args: any[]) => void): void;
            once(channel: string, listener: (event: Event, ...args: any[]) => void): void;
            postMessage(channel: string, message: any, transfer?: MessagePort[]): void;
            removeAllListeners(channel: string): void;
            removeListener(channel: string, listener: (...args: any[]) => void): void;
            send(channel: string, ...args: any[]): void;
            sendSync(channel: string, ...args: any[]): any;
            sendTo(webContentsId: number, channel: string, ...args: any[]): void;
            sendToHost(channel: string, ...args: any[]): void;
        }
        export interface ILanguageModule {
            readonly language: string;

            t(name: string, defaultValue?: string): string;
            t(name: string, options: Record<string, any>): string;
            t(name: string, defaultValue: string, options: Record<string, any>): string;
        }
        export namespace MyMessagePortStatic {
            function requestFromHost(queueTask?: boolean): Promise<IMyMessagePort>;
            function connectService(serviceName: string, subscribe?: boolean, ...args: any[]): IMyMessagePort;
        }

        export interface IMyMessagePort {
            readonly onClose: IDelegate<() => void>;
            start(): void;
            close(): void;

            handle(channel: string, func: (...args: any[]) => Promise<any> | any, target?: any, noAwait?: boolean): void;
            send(channel: string, ...args: any[]): void;
            transfer(channel: string, transfer: Transferable[], ...args: any[]): void;
            invoke(channel: string, ...args: any[]): Promise<any>;
        }

        export type ExecResult = { code: number, error: string, output: string };
        export type AbortToken = { aborted: boolean };
        export type ExecOptions = { cwd?: string, progress?: (output: string) => void, abortToken?: AbortToken, shell?: boolean, stringEncoding?: string };
        export type ExecProgress = (output: string) => void;

        export interface INativeTools {
            runTool(toolName: string, args: ReadonlyArray<string>, options: ExecOptions): Promise<ExecResult>;
            runTool(toolName: string, args: ReadonlyArray<string>, progress?: ExecProgress, abortToken?: AbortToken): Promise<ExecResult>;

            runAny(command: string, args: ReadonlyArray<string>, options: ExecOptions): Promise<ExecResult>;
            runAny(command: string, args: ReadonlyArray<string>, progress?: ExecProgress, abortToken?: AbortToken): Promise<ExecResult>;

            formatOutpathArg(path: string): string;

            formatInFileArg(path: string, tempPath?: string): string;
            openCodeEditor(filePath: string): void;

            openBrowser(url: string): void;
            getStringEncoding(): Promise<string>;
        }
        export interface IFetchResponseTypeMap {
            "text": string;
            "json": any;
            "arraybuffer": ArrayBuffer;
        }

        export interface IFetchOptions<K> {
            method?: string;
            query?: Record<string, string>;
            body?: Record<string, any> | URLSearchParams | FormData | ArrayBuffer;
            headers?: Record<string, string>;
            responseType?: K,
            username?: string,
            password?: string,
            downloadProgress?: (loaded: number, total: number) => void;
            uploadProgress?: (loaded: number, total: number) => void;
            abortToken?: AbortToken;
        }

        export interface INetUtils {
            httpRequest<K extends keyof IFetchResponseTypeMap>(url: string, options?: IFetchOptions<K>): Promise<IFetchResponseTypeMap[K]>;
            downloadFileToBuffer(url: string, progress?: (receivedLength: number, contentLength: number) => void, abortToken?: AbortToken): Promise<ArrayBuffer>;
            downloadFile(url: string, localPath: string, progress?: (receivedLength: number, contentLength: number) => void): Promise<void>;
            getIPAddress(): string;
        }
        export interface IObjectUtils {

            /**
             * 把一个obj变成{}, 由于是proxy，且可能被别人引用了，不能直接赋值
             * @param obj 
             */
            clearObj(obj: any): void;

            deepCloneObj(obj: any): void;

            mergeObjs(target: any, source: any, override?: boolean): void;

            setDataByPath(obj: any, datapath: ReadonlyArray<string>, pathIndex: number, value: any, forceCreate?: boolean): boolean;

            deleteDataByPath(obj: any, datapath: string[], pathIndex: number): boolean
            getDataByPath(obj: any, datapath: ReadonlyArray<string>, pathLen?: number): any;
            isEmptyObj(obj: any): boolean;

            /**
             * 比较两个数组是否相等。元素比较直接用的!==。
             */
            arrayEquals(a: ReadonlyArray<any>, b: ReadonlyArray<any>): boolean;
            /**
             * 如果a包含b，返回true
             */
            arrayStartsWith(a: ReadonlyArray<any>, b: ReadonlyArray<any>): boolean;

            /**
             * 比较两个对象是否相等。元素比较直接用的!==。
             */
            objEquals(a: any, b: any): boolean;

            /**
             * 复制一个对象的属性到另一个对象，使两个对象的属性完全相同。与Object.assign不同的是，它会先删除目标对象在source中不存在的属性。
             * @param target 
             * @param source 
             * @returns 目标对象
             */
            assignObject(target: any, source: any): any;
        }
        export type SettingsLocation = "application" | "project" | "local" | "memory";

        export interface ISettings {
            readonly data: IConfigObject;
            readonly onChanged: IDelegate<(sender: ISettings) => void>;

            sync(): Promise<void>;
            push?(keys?: ReadonlyArray<string>): Promise<void>;
        }

        export const ShaderTypePrefix = "Shader.";
        export type DefaultValueComparator = (value: any) => boolean;
        export type TypeMenuItem = { type: FTypeDescriptor, label: string, icon: string, order: number };

        export interface ITypeRegistry {
            readonly types: Readonly<Record<string, FTypeDescriptor>>;
            readonly version: number;
            readonly onUserTypesChanged: IDelegate<() => void>;

            nodeTypeName: string;
            componentTypeName: string;

            localizedCaptions: boolean;
            localizedEngineSymbols: boolean;

            addTypes(types: Array<FTypeDescriptor>): void;
            removeTypes(names: Array<string>): void;
            setUserTypesChanged(): void;

            getDerivedTypes(type: FTypeDescriptor): Array<FTypeDescriptor>;
            getRequireComponents(type: string): Array<string>;
            getNodeMenuItems(type: WorldType): Record<string, Array<TypeMenuItem>>;
            getComponentMenuItems(type: WorldType, inHierarchyMenu?: boolean): Record<string, Array<TypeMenuItem>>;
            sortMenuItems(col: Array<TypeMenuItem>): void;
            findScriptByPath(path: string): FTypeDescriptor;

            isType3d(type: string): boolean;
            isDerivedOf(type: string, baseType: string): boolean;
            isNodeType(type: string): boolean;
            isTypeDeprecated(type: FTypeDescriptor): boolean;

            getTypeCaption(type: string | FTypeDescriptor, noSplit?: boolean): string;
            getTypeIcon(type: string | FTypeDescriptor): string;
            getPropCaption(prop: FPropertyDescriptor): string;
            getNodeBaseType(type: string): string;

            getAllPropsOfType(type: FTypeDescriptor): Readonly<Record<string, FPropertyDescriptor>>;
            getInitProps(typeDef: FTypeDescriptor): any;
            getDefaultValue(typeDef: FTypeDescriptor, includePrivate?: boolean): any;
            getPropDefaultValue(prop: FPropertyDescriptor): any;
            getPropTestFunctions(prop: FPropertyDescriptor): { hiddenTest: Function, readonlyTest: Function, validator: Function };
            getDefaultValueComparators(typeDef: FTypeDescriptor): Readonly<Record<string, DefaultValueComparator>>;

            getPropertyByPath(type: FTypeDescriptor, datapath: ReadonlyArray<string>, out?: FPropertyDescriptor[]): FPropertyDescriptor[];
        }
        export interface ICopyDirOptions {
            autoRename?: boolean,
            regenerateUUID?: boolean
        }

        export interface IUtils {

            readJson(filePath: string, silient?: boolean): any | null;

            readJsonAsync(filePath: string, silient?: boolean): Promise<any>;

            readJson5(filePath: string): any | null;

            writeJson(filePath: string, content: any, space?: string | number): void;
            writeJsonAsync(filePath: string, content: any, space?: string | number): Promise<void>;
            isObject(obj: any): boolean;

            parseFeatures(features: string): Record<string, string>;

            toFixedPro(n: number, fractionDigits: number): string;

            splitCamelCase(str: string): string;


            /**
             * source是一个文件夹路径，将source文件夹内的内容全部拷贝到destDir里。
             */
            copyDir(source: string, destDir: string, options?: ICopyDirOptions): Promise<void>;
            /*
             * source是一个文件夹路径，将source文件夹内的内容全部移到到destDir里。
            */
            moveDir(source: string, destDir: string, options?: ICopyDirOptions): Promise<void>;

            /**
             * source是一个文件或者文件夹路径，将source拷贝到destDir里。 
             */
            copyRecursively(source: string, destDir: string, options?: ICopyDirOptions): Promise<void>;

            /**
             * source是一个文件夹，将source文件夹内符合规则的文件拷贝到destDir里。 
             */
            copyFiles(source: string, pattern: string, destDir: string, ignore?: string | ReadonlyArray<string>): Promise<void>;

            fileExists(filePath: string): Promise<boolean>;
            getNewFilePath(path: string, name: string): string;

            resolveConflictFileName(path: string, name: string): Promise<string>;

            sleep(ms: number): Promise<void>;

            until(predicate: () => boolean, timeoutInMs?: number): Promise<void>;

            escapeRegExp(str: string): string;

            getSizeLabel(limit: number): string;

            loadLib(src: string): Promise<void>;

            calculate(str: string): number;

            getProjectTempPath(): string;

            simplifyHtml(source: string, ignoreWhiteSpace?: boolean): string;
        }
        export interface IUUIDUtils {
            genUUID(): string;
            genShortId1(): string;
            genShortId2(): string;
            isUUID(str: string): boolean;

            compressUUID(uuid: string): string;
            decompressUUID(str: string): string;
        }
        export interface IZipFileW {
            excludeNames: Array<string>;
            addFile(realPath: string): void;
            addFolder(realPath: string, pattern?: string, ignore?: string[]): void;
            save(filePath: string, progressCallback?: (progress: number) => void, abortToken?: AbortToken): Promise<void>;
        }

        export interface IZipFileR {
            open(filePath: string): Promise<void>;
            open(buf: ArrayBuffer): Promise<void>;
            getEntries(): Array<string>;
            hasEntry(entryName: string): boolean;
            extract(entryName: string, savePath: string): Promise<void>;
            extractAll(savePath: string, progressCallback?: (progress: number) => void, abortToken?: AbortToken): Promise<void>;
            close(): void;
        }
        export class CustomEditor {
            readonly owner: Laya.Node;
            readonly comp: Laya.Component;
            onAwake?(): void;
            onChildChanged?(): void;
            onSizeChanged?(): void;
            onOpenBox?(): void;
            onCloseBox?(): void;
            onSelected?(): void;
            onUnSelected?(): void;
            onSceneGUI?(): void;
            /**
             * 绘制始终显示的 gizmos
             */
            onDrawGizmos?(): void;
            /**
             * 仅在对象被选中时绘制的 gizmos
             */
            onDrawGizmosSelected?(): void;
        }

        export declare function setupCustomEditors(node: Laya.Node): void;
        export declare function setupCustomEditorsForComp(comp: Laya.Component): void;
        const Conf: new (path: string, fileName?: string) => IConf;
        const Delegate: new <T extends (...args: any[]) => any>() => IDelegate<T>;
        const MyMessagePort: (new (port: MessagePort, queueTask?: boolean) => IMyMessagePort) & typeof MyMessagePortStatic;
        const Gizmos2D: typeof IGizmos2D;
        const Gizmos: typeof IGizmos3D;
        const Handles: typeof IHandles;
        const HandleUtils: typeof IHandleUtils;
        const ZipFileW: new (basePath: string) => IZipFileW;
        const ZipFileR: new () => IZipFileR;
        const utils: ICryptoUtils & INativeTools & IUUIDUtils & IObjectUtils & IUtils & INetUtils;
        const CreateAssetUtil: typeof ICreateAssetUtil;
        const HierarchyWriter: typeof IHierarchyWriter;
        const SerializeUtil: typeof ISerializeUtil;

        function customEditor(target: Node | Component): Function;
        function regClass(): Function;
    }

    var EditorEnv: IEditorEnv.IEditorEnvSingleton;
    var i18n: IEditorEnv.ILanguageModule;
}
