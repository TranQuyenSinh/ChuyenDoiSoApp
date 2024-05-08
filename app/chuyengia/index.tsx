import { useLayoutEffect, useState, useSyncExternalStore } from 'react'

import { Image, StyleSheet, View } from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import { SafeAreaView } from 'react-native-safe-area-context'

import Colors from '@constants/Colors'
import ExperPage from '@components/Page/expertPage'
import AssociationPage from '@components/Page/associationPage'
import { screenWidth } from '@utils/window'
import { useNavigation } from 'expo-router'

const Page = () => {
    const navigation = useNavigation()
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'exper', title: 'Chuyên gia' },
        { key: 'assiociation', title: 'Hiệp hội doanh nghiệp' },
    ])
    const renderScene = SceneMap({
        exper: ExperPage,
        assiociation: AssociationPage,
    })
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerStyle: {
                backgroundColor: Colors.default,
            },
            headerShadowVisible: false,
            headerTintColor: 'white',
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            <TabView
                style={styles.container}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                swipeEnabled={true}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        indicatorStyle={styles.indicatorStyle}
                        labelStyle={styles.labelStyle}
                        activeColor={'white'}
                        style={styles.tabContainerStyle}
                        contentContainerStyle={{ alignItems: 'center' }}
                    />
                )}
                onIndexChange={setIndex}
                initialLayout={{ width: screenWidth }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f8fd',
    },
    tabContainerStyle: {
        backgroundColor: Colors.default,
        elevation: 0,
        height: 45,
    },
    indicatorStyle: {
        backgroundColor: Colors.orange,
        height: 3,
        borderRadius: 20,
    },
    labelStyle: {
        textTransform: 'none',
        fontSize: 16,
        textAlign: 'center',
        color: '#fff',
        height: '100%',
    },
    background: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
    },
})

export default Page
