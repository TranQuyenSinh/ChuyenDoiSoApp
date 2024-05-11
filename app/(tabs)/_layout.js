import { Tabs } from 'expo-router'

import { Entypo, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import Colors from '@constants/Colors'


export default function TabLayout() {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors.default,
                    tabBarInactiveTintColor: '#aaa',
                    headerShown: false,
                    tabBarLabelStyle: {
                        fontSize: 12,
                    },
                    tabBarStyle: {
                        height: 55,
                        backgroundColor: 'white',
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
                        tabBarLabel: 'Nhu cầu DN',
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
                                        <Ionicons name='grid-sharp' size={size} color={color} />
                                    ) : (
                                        <Ionicons name='grid-outline' size={size} color={color} />
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
                                    {focused ? (
                                        <FontAwesome5 name='user-alt' size={size} color={color} />
                                    ) : (
                                        <FontAwesome5 name='user' size={size} color={color} />
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
