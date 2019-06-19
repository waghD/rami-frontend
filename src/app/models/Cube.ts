export interface Cube {
    uid?: number;
    label?: string;
    color?: string;
    x?: number;
    y?: number;
    z?: number;
    items?: Item[];
    neighbours?: Cube[];
}

export interface Item {
    itemUid?: number;
    type?: 'book' | 'shelf' | 'unknown';
    label?: string;
    content?: string;
    refs?: Item[];
}