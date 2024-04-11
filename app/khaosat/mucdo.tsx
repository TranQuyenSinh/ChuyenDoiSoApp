import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'

import PagerView from 'react-native-pager-view'
import { Text, View, StyleSheet, Image } from 'react-native'
import StepIndicator from 'react-native-step-indicator'
import { useNavigation, useLocalSearchParams } from 'expo-router'

import Colors from '@constants/Colors'
import { screenHeight } from '@utils/window'
import { textStyles } from '@constants/Styles'
import { MucDo } from '@constants/KhaoSat/MucDoType'
import Loading from '@components/StatusPage/Loading'
import PageHeader from '@components/View/PageHeader'
import { getMucDos } from '@services/khaoSatServices'
//@ts-ignore
import background from '@assets/images/test2.jpeg'
const stepIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: Colors.success,
    separatorFinishedColor: Colors.success,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: Colors.success,
    stepIndicatorUnFinishedColor: '#aaaaaa',
    stepIndicatorCurrentColor: Colors.success,
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 18,
    stepIndicatorLabelCurrentColor: Colors.white,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: '#666666',
    labelSize: 15,
    currentStepLabelColor: '#fe7013',
}

const MucDoPage = () => {
    const navigation = useNavigation()
    const { id } = useLocalSearchParams<{ id: string }>()
    const [mucDos, setMucDos] = useState<MucDo[]>([])
    const [loading, setLoading] = useState(false)

    const [currentPage, setCurrentPage] = useState<number>(+id)
    const scrollRef = useRef<PagerView>(null)

    const renderIndicator = ({ position, stepStatus }: { position: number; stepStatus: string }) => {
        const style =
            stepStatus == 'current' || stepStatus == 'finished' ? styles.customCurrentIndicator : styles.customIndicator
        return <Text style={style}>{position}</Text>
    }

    const fetchData = async () => {
        setLoading(true)
        const data = await getMucDos()
        setMucDos(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            presentation: 'modal',
            animation: 'fade',
        })
    }, [navigation])

    if (loading) {
        return <Loading />
    }
    return (
        <View style={styles.container}>
            <PageHeader tintColor='white' title={'Mức độ chuyển đổi số'} />
            <Image source={background} style={[StyleSheet.absoluteFill, styles.background]} />

            <View style={styles.content}>
                <View style={{ padding: 24 }}>
                    <StepIndicator
                        customStyles={stepIndicatorStyles}
                        stepCount={mucDos.length}
                        direction='vertical'
                        currentPosition={currentPage}
                        renderStepIndicator={renderIndicator}
                        onPress={(step: number) => {
                            scrollRef.current?.setPage(step)
                        }}
                    />
                </View>

                <PagerView
                    orientation={'vertical'}
                    ref={scrollRef}
                    style={{ flex: 1, height: screenHeight }}
                    initialPage={currentPage}
                    onPageSelected={({ nativeEvent }) => setCurrentPage(nativeEvent.position)}
                    keyboardDismissMode={'on-drag'}
                    scrollEnabled={true}>
                    {mucDos?.map((item: MucDo) => {
                        return (
                            <View collapsable={false} style={styles.item} key={item.id}>
                                <Text style={{ fontSize: 24, marginBottom: 12, color: 'white', fontWeight: '500' }}>
                                    {item.tenMucDo}
                                </Text>
                                <Text style={[textStyles.longText, { color: 'white' }]}>{item.noiDung}</Text>
                            </View>
                        )
                    })}
                </PagerView>
            </View>
        </View>
    )
}

export default MucDoPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    item: {
        paddingRight: 16,
        height: screenHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    customIndicator: {
        fontWeight: '500',
        fontSize: 14,
    },
    customCurrentIndicator: {
        color: Colors.white,
    },
})
