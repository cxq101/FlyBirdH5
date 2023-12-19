import { LocalStorageUtils } from "./LocalStorageUtils";

export class LocalData<DATATYPE extends object> {
    private _key: string;
    private _data: DATATYPE;
    private _defaultData: DATATYPE;

    constructor(key: string, defaultData: DATATYPE) {
        this._key = key;
        this._defaultData = defaultData; 
    }

    get data(): DATATYPE {
        if (this._data == null) {
            this._data = LocalStorageUtils.load(this._key);
            if (this._data == null) {
                this._data = this._defaultData;
            }
        }
        return this._data;
    }

    save(): void {
        LocalStorageUtils.save(this._key, this.data);
    }
}
