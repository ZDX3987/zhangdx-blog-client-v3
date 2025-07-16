export interface MenuItem {
    id: number,
    text: string,
    router: string,
    iconClass: string,
    childrenMenu: MenuItem[]
}