import type {ArticleItem} from "./ArticleItem.ts";

export class TopicItem {
    articleList: ArticleItem[]
    commentCount: number;
    coverImg: string;
    createDate: Date;
    id: number;
    praise: number;
    readCount: number;
    title: string;
    updateDate: Date;
}