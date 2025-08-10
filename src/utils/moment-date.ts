import moment from 'moment'

moment.locale('zh-CN')

export function fromNow(date: Date) {
    return moment(date).fromNow()
}

export function dateFormat (date: Date, pattern = 'yyyy-MM-DD HH:mm:ss') {
    return moment(date).format(pattern)
}