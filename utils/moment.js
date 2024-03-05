import moment from 'moment'
import 'moment/locale/vi'

moment.updateLocale('vi', {
    relativeTime: {
        future: '%s tới',
        past: '%s trước',
        s: '%d giây',
        ss: '%d giây',
        m: '%d phút',
        mm: '%d phút',
        h: '%d giờ',
        hh: '%d giờ',
        d: '%d ngày',
        dd: '%d ngày',
        w: '%d tuần',
        ww: '%d tuần',
        M: '%d tháng',
        MM: '%d tháng',
        y: '%d năm',
        yy: '%d năm',
    },
})
export default moment
