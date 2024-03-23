import * as React from 'react'

import { View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import Animated, { Extrapolate, interpolate, useSharedValue, useAnimatedStyle } from 'react-native-reanimated'

import { windowWidth } from '@utils/window'
import { getSlides } from '@services/commonServices'
import Loading from '@components/StatusPage/Loading'

import { SBItem } from './SBItem'

const PAGE_WIDTH = windowWidth

function TinTucCarousel2() {
    const [data, setData] = React.useState<string[]>([])
    const progressValue = useSharedValue<number>(0)
    const baseOptions = {
        vertical: false,
        width: PAGE_WIDTH,
    } as const

    const fetchSlider = async () => {
        const data = await getSlides()
        setData(data?.map(item => item.image))
    }

    React.useEffect(() => {
        fetchSlider()
    }, [])

    return (
        <View
            style={{
                alignItems: 'center',
            }}>
            <Carousel
                {...baseOptions}
                style={{
                    width: PAGE_WIDTH,
                    height: 125,
                    marginTop: 12,
                }}
                loop
                pagingEnabled={true}
                snapEnabled={true}
                autoPlay={true}
                autoPlayInterval={3000}
                onProgressChange={(_, absoluteProgress) => (progressValue.value = absoluteProgress)}
                mode='parallax'
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                }}
                data={data}
                renderItem={({ item, index }) => {
                    return <SBItem index={index} img={item} />
                }}
            />
        </View>
    )
}

export default TinTucCarousel2
