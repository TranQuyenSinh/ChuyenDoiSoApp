import * as React from 'react'

import { ActivityIndicator, Image, StyleProp, StyleSheet, Text, View, ViewProps, ViewStyle } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import Animated, { AnimateProps, useSharedValue } from 'react-native-reanimated'

import { windowWidth } from '@utils/window'
//@ts-ignore
import image1 from '@assets/images/trungtam/1.jpg'
//@ts-ignore
import image2 from '@assets/images/trungtam/2.jpg'
//@ts-ignore
import image3 from '@assets/images/trungtam/3.jpg'
//@ts-ignore
import image4 from '@assets/images/trungtam/4.jpg'
import { LongPressGestureHandler } from 'react-native-gesture-handler'
const PAGE_WIDTH = windowWidth

function TrungTamCarousel() {
    const progressValue = useSharedValue<number>(0)
    const baseOptions = {
        vertical: false,
        width: PAGE_WIDTH,
    } as const

    return (
        <View
            style={{
                alignItems: 'center',
            }}>
            <Carousel
                {...baseOptions}
                style={{
                    width: PAGE_WIDTH,
                    height: 100,
                }}
                loop
                pagingEnabled={true}
                snapEnabled={true}
                autoPlay={true}
                autoPlayInterval={3000}
                onProgressChange={(_, absoluteProgress) => (progressValue.value = absoluteProgress)}
                mode='parallax'
                modeConfig={{
                    parallaxScrollingScale: 0.95,
                    parallaxScrollingOffset: 10,
                }}
                data={[image1, image2, image3, image4]}
                renderItem={({ item, index }) => {
                    return <Item index={index} img={item} />
                }}
            />
        </View>
    )
}

interface ItemProps extends AnimateProps<ViewProps> {
    style?: StyleProp<ViewStyle>
    index?: number
    pretty?: boolean
    showIndex?: boolean
    img?: any
}

const Item: React.FC<ItemProps> = props => {
    const { style, showIndex = true, index, pretty, img, ...animatedViewProps } = props
    const [isPretty, setIsPretty] = React.useState(pretty)
    return (
        <LongPressGestureHandler
            onActivated={() => {
                setIsPretty(!isPretty)
            }}>
            <Animated.View style={{ flex: 1 }} {...animatedViewProps}>
                <View style={[itemImageStyles.container, style]}>
                    <ActivityIndicator size='small' />
                    <Image key={index} style={itemImageStyles.image} source={img} />
                </View>
            </Animated.View>
        </LongPressGestureHandler>
    )
}

const itemImageStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    image: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
        position: 'absolute',
        borderRadius: 8,
    },
})

export default TrungTamCarousel
