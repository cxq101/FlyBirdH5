import { Controller } from "../../core/mvc/Controller";
import { model, register } from "../../core/mvc/MVCDecorator";
import { SkinModel } from "./SkinModel";

/**
 * author: cxq
 * time: 2023/12/09 19:32:14
 * desc: 
 */
export class SkinController extends Controller {
    constructor() {
        super();
        console.log("skin ctrl  init======");
    }
}