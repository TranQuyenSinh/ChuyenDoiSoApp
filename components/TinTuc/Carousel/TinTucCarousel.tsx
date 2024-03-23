import { windowWidth } from '@utils/window'
import { View } from 'react-native'
import Animated, { interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SBItem } from './SBItem'
import { useCallback, useEffect, useState } from 'react'
import { Slide } from '@constants/TinTuc/SlideType'
import { getSlides } from '@services/commonServices'
import Loading from '@components/StatusPage/Loading'

const PAGE_WIDTH = windowWidth

function TinTucCarousel() {
    const animationStyle = useCallback((value: number) => {
        'worklet'
        const zIndex = interpolate(value, [-1, 0, 1], [-1000, 0, 1000])
        const translateX = interpolate(value, [-1, 0, 1], [0, 0, PAGE_WIDTH])
        return {
            transform: [{ translateX }],
            zIndex,
        }
    }, [])

    const [data, setData] = useState<string[]>([])

    const fetchSlider = async () => {
        const data = await getSlides()
        setData(data?.map(item => item.image))
    }

    useEffect(() => {
        fetchSlider()
    }, [])

    if (data.length === 0) return <Loading />

    return (
        <SafeAreaView style={{ alignItems: 'center' }}>
            <Carousel
                loop={true}
                autoPlay={true}
                style={{ width: PAGE_WIDTH, height: 150 }}
                width={PAGE_WIDTH}
                data={data}
                renderItem={({ item, index, animationValue }) => {
                    return <CustomItem data={item} key={index} index={index} animationValue={animationValue} />
                }}
                customAnimation={animationStyle}
                scrollAnimationDuration={1000}
            />
        </SafeAreaView>
    )
}

interface ItemProps {
    index: number
    animationValue: Animated.SharedValue<number>
    data: any
}

const IMAGE_BORDER_RADIUS = 12

const CustomItem: React.FC<ItemProps> = ({ data, index, animationValue }) => {
    const maskStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            animationValue.value,
            [-1, 0, 1],
            ['#000000dd', 'transparent', '#000000dd']
        )

        return {
            backgroundColor,
        }
    }, [animationValue])

    return (
        <View style={{ flex: 1, margin: 12, borderRadius: IMAGE_BORDER_RADIUS, overflow: 'hidden', elevation: 10 }}>
            <SBItem img={data} key={index} index={index} style={{ borderRadius: IMAGE_BORDER_RADIUS }} />
            <Animated.View
                pointerEvents='none'
                style={[
                    {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: IMAGE_BORDER_RADIUS,
                    },
                    maskStyle,
                ]}></Animated.View>
        </View>
    )
}

export default TinTucCarousel
