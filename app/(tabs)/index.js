import { useState, useEffect } from 'react'

import { TabBar, TabView } from 'react-native-tab-view'
import { Text, View, StatusBar, TextInput, Dimensions, StyleSheet, Pressable } from 'react-native'

import Colors from '@constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import ListNews from '@components/TinTuc/News'
import { defaultStyles, textStyles } from '@constants/Styles'
import { getLinhVucs } from '@services/tinTucServices'
import Loading from '@components/StatusPage/Loading'

export default function TrangTin() {
    const [linhVucs, setLinhVucs] = useState([])
    const [index, setIndex] = useState(0)
    const [searchKey, setSearchKey] = useState('')

    useEffect(() => {
        ;(async () => {
            let linhVucs = await getLinhVucs()
            setLinhVucs(linhVucs?.map(item => ({ key: item.id, title: item.tenLinhVuc })))
        })()
    }, [])

    const renderScene = ({ route }) => {
        return <ListNews key={route.key} linhVucId={route.key} />
    }

    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <Ionicons name='search-outline' size={24} color={Colors.bodyText} />
                    <TextInput
                        value={searchKey}
                        onChangeText={text => setSearchKey(text)}
                        placeholder='Tìm kiếm...'
                        style={{ flex: 1 }}
                    />
                    {searchKey && (
                        <Pressable onPress={() => setSearchKey('')} style={{ zIndex: 99 }}>
                            <Ionicons name='close-circle-sharp' size={24} color={Colors.bodyText} />
                        </Pressable>
                    )}
                </View>
                <Pressable>
                    <Text style={[textStyles.small, { color: Colors.default }]}>Tìm kiếm</Text>
                </Pressable>
            </View>
            {(!linhVucs || linhVucs?.length == 0) && <Loading />}
            {linhVucs?.length > 0 && (
                <TabView
                    style={styles.container}
                    navigationState={{ index: index, routes: linhVucs }}
                    renderScene={renderScene}
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
                            tabStyle={{ flex: 1, width: 'auto' }}
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
    searchContainer: {
        backgroundColor: Colors.white,
        paddingTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        paddingHorizontal: 16,
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderColor: Colors.bodyText,
        borderWidth: 1,
        borderRadius: 6,
        // margin: 16,
        marginBottom: 0,
        paddingHorizontal: 10,
        height: 44,
        overflow: 'hidden',
        flex: 1,
    },
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
