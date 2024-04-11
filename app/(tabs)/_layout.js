import { Tabs } from 'expo-router'
import { Image } from 'react-native'
import { useSelector } from 'react-redux'

import { Entypo, Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
    const { userProfile } = useSelector(state => state.user)
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: '#bbb',
                    headerShown: false,
                    tabBarLabelStyle: {
                        fontSize: 10,
                    },
                    tabBarStyle: {
                        height: 55,
                        backgroundColor: '#7700ff',
                        elevation: 0,
                    },
                    headerTitleAlign: 'center',
                }}>
                <Tabs.Screen
                    name='index'
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Trang chủ',
                        tabBarIcon: ({ color, size, focused }) => {
                            return (
                                <>
                                    {focused ? (
                                        <Ionicons name='home-sharp' color={color} size={size} />
                                    ) : (
                                        <Ionicons name='home-outline' color={color} size={size} />
                                    )}
                                </>
                            )
                        },
                    }}
                />
                <Tabs.Screen
                    name='social'
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Diễn đàn',
                        tabBarIcon: ({ color, size, focused }) => {
                            return (
                                <>
                                    {focused ? (
                                        <Entypo name='network' color={color} size={size} />
                                    ) : (
                                        <Entypo name='network' color={color} size={size} />
                                    )}
                                </>
                            )
                        },
                    }}
                />

                <Tabs.Screen
                    name='doanhnghiep'
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Doanh nghiệp',
                        tabBarIcon: ({ color, size, focused }) => {
                            return (
                                <>
                                    {focused ? (
                                        <MaterialCommunityIcons name='electron-framework' size={size} color={color} />
                                    ) : (
                                        <MaterialCommunityIcons name='electron-framework' size={size} color={color} />
                                    )}
                                </>
                            )
                        },
                    }}
                />

                <Tabs.Screen
                    name='profile'
                    options={{
                        tabBarLabel: 'Cá nhân',
                        headerShown: false,
                        tabBarIcon: ({ color, size, focused }) => {
                            return (
                                <>
                                    {userProfile?.image ? (
                                        <Image
                                            source={{ uri: userProfile?.image }}
                                            style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 50,
                                            }}
                                        />
                                    ) : (
                                        <Ionicons name='settings-outline' color={color} size={size} />
                                    )}
                                </>
                            )
                        },
                    }}
                />
            </Tabs>
        </>
    )
}
