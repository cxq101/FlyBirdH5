export enum ESkinItemStatus {
    Locked,
    Idle,
    Adventure,
}

export class SkinEvent {
    static readonly Unlcok = "Unlcok";
    static readonly Adventure = "Adventure";
}

export interface ISkinListData {
    id: string;
    lblName: string;
    imgAvatar: string;
    status: ESkinItemStatus;
}