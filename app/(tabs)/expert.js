import { useState } from 'react'

import { StyleSheet } from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import { SafeAreaView } from 'react-native-safe-area-context'

import Colors from '@constants/Colors'
import ExperPage from '@components/Page/expertPage'
import AssociationPage from '@components/Page/associationPage'
import { screenWidth } from '@utils/window'

const Page = () => {
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'exper', title: 'Chuyên gia' },
        { key: 'assiociation', title: 'Hiệp hội doanh nghiệp' },
    ])
    const renderScene = SceneMap({
        exper: ExperPage,
        assiociation: AssociationPage,
    })

    return (
        <SafeAreaView style={styles.container}>
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
                        activeColor={Colors.default}
                        style={styles.tabContainerStyle}
                        contentContainerStyle={{ alignItems: 'center' }}
                    />
                )}
                onIndexChange={setIndex}
                initialLayout={{ width: screenWidth }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.default,
    },
    tabContainerStyle: {
        backgroundColor: 'white',
        elevation: 0,
        height: 45,
        marginBottom: 8,
    },
    indicatorStyle: {
        backgroundColor: Colors.default,
        height: 3,
        borderRadius: 20,
    },
    labelStyle: {
        textTransform: 'none',
        fontSize: 16,
        textAlign: 'center',
        color: '#000',
        height: '100%',
    },
})

export default Page
