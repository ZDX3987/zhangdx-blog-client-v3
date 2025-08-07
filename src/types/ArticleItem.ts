export class ArticleItem {
    id: number;
    articleId: string;
    tittle: string;
    text: string;
    digest: string;
    publishDate: Date;
    coverImg: string;
    articleType: string;
    readCount: number;
    praise: number;
    commentCount: number;
    author: Author;
    categories: Category[];

    hasCoverImg(): boolean {
        return this.coverImg != null && this.coverImg != '';
    }
}

class Author {
    nickname: string;
    avatar: string;
}

class Category {
    id: number;
    cateName: string;
}