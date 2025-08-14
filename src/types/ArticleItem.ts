export class ArticleItem {
    id: number;
    articleId: string;
    title: string;
    text: string;
    digest: string;
    source: number;
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

    static emptyArticleItem(): ArticleItem {
        let articleItem = new ArticleItem()
        articleItem.author = new Author()
        articleItem.categories = []
        return articleItem
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