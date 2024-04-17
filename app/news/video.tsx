import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import PageHeader from '@components/View/PageHeader'
import { useNavigation } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import YoutubePlayer from 'react-native-youtube-iframe'
import { getVideos } from '@services/commonServices'
import { Video } from '@constants/TinTuc/VideoType'
import Loading from '@components/StatusPage/Loading'
import BackgroundImage from '@components/View/BackgroundImage'
//@ts-ignore
import background from '@assets/images/test2.jpeg'
const VideoPage = () => {
    const [data, setData] = useState<Video[]>([])
    const [loading, setloading] = useState(false)

    const fetchVideos = async () => {
        setloading(true)
        let data = await getVideos()
        data = data.map(item => {
            const regex = /\/embed\/([a-zA-Z0-9_-]+)/
            const match = item?.url?.match(regex)
            item.videoId = match ? match?.[1] : undefined
            return item
        })
        setData(data)
        setloading(false)
    }

    React.useEffect(() => {
        fetchVideos()
    }, [])

    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            presentation: 'modal',
            animation: 'fade',
        })
    }, [])

    if (loading) return <Loading />

    return (
        <View style={styles.container}>
            <BackgroundImage blurRadius={10} source={background} />
            <PageHeader title={'Video nổi bật'} tintColor='white' />
            <ScrollView style={{ marginTop: 12 }} showsVerticalScrollIndicator={false}>
                {data.map(item => (
                    <View key={item.id} style={styles.videoContainer}>
                        <View style={styles.videoWrapper}>
                            <YoutubePlayer height={200} videoId={item.videoId} />
                        </View>
                        <View style={styles.videoInfoContainer}>
                            <Text style={styles.videoTitle}>{item.title}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default VideoPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    videoContainer: {
        backgroundColor: Colors.white,
        // borderBottomRightRadius: 8,
        // borderBottomLeftRadius: 8,
        marginHorizontal: 16,
        marginVertical: 12,
        elevation: 4,
    },
    videoWrapper: {},
    videoInfoContainer: {
        padding: 12,
    },
    videoTitle: {
        fontWeight: '500',
        fontSize: 16,
        textAlign: 'justify',
    },
})
