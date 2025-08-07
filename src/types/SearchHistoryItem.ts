export class SearchHistoryItem {
    keyword: string;
    searchType: number;

    constructor(keyword: string, searchType: number) {
        this.keyword = keyword
        this.searchType = searchType
    }

    public equals(other: SearchHistoryItem): boolean {
        if (other === null) {
            return false
        }
        return this.keyword === other.keyword && this.searchType === other.searchType
    }
}