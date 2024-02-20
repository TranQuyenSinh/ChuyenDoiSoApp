import React, { ReactElement } from 'react'

import { View, Pressable, StyleSheet } from 'react-native'
import Animated, {
    runOnUI,
    measure,
    withTiming,
    useAnimatedRef,
    useSharedValue,
    useDerivedValue,
    useAnimatedStyle,
} from 'react-native-reanimated'

import Colors from '@constants/Colors'

import Chevron from './Chevron'

type Props = {
    title: string
    children: ReactElement
}

const Accordion = ({ title, children }: Props) => {
    const listRef = useAnimatedRef<Animated.View>()
    const heightValue = useSharedValue(0)
    const open = useSharedValue(false)
    const progress = useDerivedValue(() => (open.value ? withTiming(1) : withTiming(0)))
    const titleTextAnimationStyle = useAnimatedStyle(() => ({
        color: open.value ? Colors.default : '#000',
        fontWeight: open.value ? '600' : '400',
    }))
    const heightAnimationStyle = useAnimatedStyle(() => ({
        height: heightValue.value,
    }))

    return (
        <View style={{ overflow: 'hidden', paddingHorizontal: 16 }}>
            <View style={styles.container}>
                <Pressable
                    onPress={() => {
                        if (heightValue.value === 0) {
                            runOnUI(() => {
                                'worklet'
                                heightValue.value = withTiming(measure(listRef)!.height)
                            })()
                        } else {
                            heightValue.value = withTiming(0)
                        }
                        open.value = !open.value
                    }}
                    style={styles.titleContainer}>
                    <Animated.Text style={[styles.textTitle, titleTextAnimationStyle]}>{title}</Animated.Text>
                    <Chevron progress={progress} />
                </Pressable>
            </View>
            <Animated.View collapsable={false} style={heightAnimationStyle}>
                <Animated.View style={styles.contentContainer} ref={listRef}>
                    {children}
                </Animated.View>
            </Animated.View>
        </View>
    )
}

export default Accordion

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
        elevation: 6,
        marginVertical: 6,
        borderRadius: 6,
        overflow: 'hidden',
    },
    textTitle: {
        fontSize: 18,
    },
    titleContainer: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contentContainer: {
        position: 'absolute',
        width: '100%',
        top: 0,
        backgroundColor: Colors.white,
    },
})
