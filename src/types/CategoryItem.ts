export class CategoryItem {
    id: number;
    cateName: string;
    articleCount: number;
    childCateList: CategoryItem[]

    constructor(other: CategoryItem) {
        this.id = other.id
        this.cateName = other.cateName
    }

}