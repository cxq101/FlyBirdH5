/**
 * author: cxq
 * time: 2023/12/29 19:09:06
 * desc: 
 */
export interface IRange {
    min: number;
    max: number;
}

export class SegmentTreeNode {
    min: number;
    max: number;
    left: SegmentTreeNode | null;
    right: SegmentTreeNode | null;
    intersects: IRange[];

    constructor(min: number, max: number) {
        this.min = min;
        this.max = max;
        this.left = null;
        this.right = null;
        this.intersects = [];
    }
}

export class SegmentTree {
    root: SegmentTreeNode | null;

    constructor() {
        this.root = null;
    }

    // 构建线段树
    buildTree(ranges: IRange[]): void {
        if (ranges.length === 0) {
            return;
        }

        const min = Math.min(...ranges.map(r => r.min));
        const max = Math.max(...ranges.map(r => r.max));

        this.root = this._buildTree(ranges, min, max);
    }

    private _buildTree(ranges: IRange[], min: number, max: number): SegmentTreeNode | null {
        if (min > max) {
            return null;
        }

        const root = new SegmentTreeNode(min, max);

        if (min < max) {
            const mid = Math.floor((min + max) / 2);
            root.left = this._buildTree(ranges, min, mid);
            root.right = this._buildTree(ranges, mid + 1, max);
        }

        // 找到与当前节点区间相交的区间
        root.intersects = ranges.filter(
            r => r.min <= root.max && r.max >= root.min
        );

        return root;
    }

    // 查询与给定区间相交的区间
    query(root: SegmentTreeNode | null, min: number, max: number): IRange[] {
        const result: IRange[] = [];

        if (root === null || min > root.max || max < root.min) {
            return result;
        }

        if (min <= root.min && max >= root.max) {
            // 如果当前节点区间完全包含在查询区间内，则返回当前节点的相交区间
            return root.intersects;
        }

        // 否则，递归查询左右子树
        result.push(...this.query(root.left, min, max));
        result.push(...this.query(root.right, min, max));
        
        return [...new Set(result)];
    }

    clear(): void {
        this.root = null;
    }
}