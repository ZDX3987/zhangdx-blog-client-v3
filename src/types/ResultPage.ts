export class ResultPage<E> {
    current: number;
    pages: number;
    size: number;
    total: number;
    records: E[]

    constructor() {
    }


    isEmpty(): boolean {
        return this.total === 0
    }
}