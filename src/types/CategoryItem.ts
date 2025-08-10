export class CategoryItem {
    id: number;
    cateName: string;

    constructor(other: CategoryItem) {
        this.id = other.id
        this.cateName = other.cateName
    }

}