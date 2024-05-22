import { ActivityIndicator, Image } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
//@ts-ignore
import loading from '@assets/icons/loading.gif'

interface LoadingProps {
    visible?: boolean
    text?: string
    color?: string
}
const Loading = (props: LoadingProps) => {
    const { text = '', visible = true, color = '#fff' } = props
    return (
        <Spinner
            animation='fade'
            overlayColor='rgba(0, 0, 0, 0)'
            visible={visible}
            textContent={text}
            textStyle={{ color }}
            customIndicator={<ActivityIndicator size={'large'} />}
        />
    )
}

export default Loading
