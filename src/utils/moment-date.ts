import moment from 'moment'
import 'moment/dist/locale/zh-cn.js'

moment.locale('zh-CN')

export function fromNow(date: Date) {
    return moment(date).fromNow()
}

export function dateFormat (date: Date | undefined, pattern = 'yyyy-MM-DD HH:mm:ss') {
    if (date === undefined) {
        return ''
    }
    return moment(date).format(pattern)
}