import Spinner from 'react-native-loading-spinner-overlay'

interface LoadingProps {
    visible?: boolean
    text?: string
    color?: string
}
const Loading = (props: LoadingProps) => {
    const { text = 'Đang tải...', visible = true, color = '#fff' } = props
    return <Spinner visible={visible} textContent={text} textStyle={{ color }} />
}

export default Loading
