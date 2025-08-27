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
    extraData: ArticleExtraData
    liked?: boolean

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
    id: number;
    nickname: string;
    avatar: string;
}

class Category {
    id: number;
    cateName: string;
}

class ArticleExtraData {
    previewConfig: ArticleExtraPreview
}
class ArticleExtraPreview {
    vditorPreview: VditorPreview
}
class VditorPreview {
    hlStyle: string;
}