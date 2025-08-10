import {CategoryItem} from "./CategoryItem.ts";

export class CateCloudItem extends CategoryItem {
    x: number;
    y: number;
    z: number;
    fill: string;
    href: string;

    constructor(category: CategoryItem) {
        super(category);
    }
}