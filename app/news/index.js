import { useState, useEffect, useLayoutEffect } from 'react'

import { useNavigation, useRouter } from 'expo-router'
import { TabBar, TabView } from 'react-native-tab-view'
import { StatusBar, Dimensions, StyleSheet } from 'react-native'

import Colors from '@constants/Colors'
import ListNews from '@components/TinTuc/News'
import Loading from '@components/StatusPage/Loading'
import SearchBar from '@components/TinTuc/SearchBar'
import { getLinhVucs } from '@services/tinTucServices'

export default function TinTucPage() {
    const router = useRouter()
    const navigation = useNavigation()
    const [linhVucs, setLinhVucs] = useState([])
    const [index, setIndex] = useState(0)
    const [searchKey, setSearchKey] = useState('')

    useEffect(() => {
        ;(async () => {
            let linhVucs = await getLinhVucs()
            let data = linhVucs?.map(item => ({ key: item.id, title: item.tenLinhVuc })) || []
            setLinhVucs(data)
        })()
    }, [])

    const handleSearch = async () => {
        if (!searchKey) return
        router.push({ pathname: '/news/search', params: { searchKey } })
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            animation: 'fade',
        })
    }, [])

    return (
        <>
            <StatusBar barStyle={'light-content'} />
            <SearchBar searchKey={searchKey} onChangeSearchKey={setSearchKey} onSearch={handleSearch} />
            {(!linhVucs || linhVucs?.length == 0) && <Loading />}
            {linhVucs?.length > 0 && (
                <TabView
                    style={styles.container}
                    navigationState={{ index: index, routes: linhVucs }}
                    renderScene={({ route }) => <ListNews key={route.key} linhVucId={route.key} />}
                    swipeEnabled={true}
                    renderTabBar={props => (
                        <TabBar
                            {...props}
                            pressColor='transparent'
                            indicatorStyle={{
                                backgroundColor: Colors.default,
                                height: 3,
                                borderRadius: 20,
                            }}
                            labelStyle={{
                                textTransform: 'none',
                                fontSize: 16,
                                color: '#000',
                            }}
                            tabStyle={{ width: 'auto' }}
                            activeColor={Colors.default}
                            style={styles.tabBar}
                            scrollEnabled
                        />
                    )}
                    onIndexChange={setIndex}
                    initialLayout={{ width: Dimensions.get('window').width }}
                />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    tabBarWrapper: {
        paddingTop: 25,
        // paddingBottom: 6,
    },
    tabBar: {
        backgroundColor: 'transparent',
        elevation: 0,
        height: 45,
    },
    tabBarLabel: {
        fontSize: 16,
        color: 'white',
    },
    tabBarLabelActive: {
        fontSize: 18,
    },
})
