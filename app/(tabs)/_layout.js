import Colors from '@constants/Colors'
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
                tabBarLabelStyle: {
                    fontFamily: 'mon',
                    fontSize: 12,
                },
                tabBarStyle: {
                    height: 55,
                },
                headerTitleAlign: 'center',
            }}>
            <Tabs.Screen
                name='index'
                options={{
                    headerShown: false,
                    tabBarLabel: 'Tin tức',
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <>
                                {focused ? (
                                    <Ionicons name='newspaper-sharp' color={color} size={size} />
                                ) : (
                                    <Ionicons name='newspaper-outline' color={color} size={size} />
                                )}
                            </>
                        )
                    },
                }}
            />
            <Tabs.Screen
                name='survey'
                options={{
                    headerShown: false,
                    tabBarLabel: 'Đánh giá',
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <>
                                {focused ? (
                                    <Ionicons name='reader-sharp' color={color} size={size} />
                                ) : (
                                    <Ionicons name='reader-outline' color={color} size={size} />
                                )}
                            </>
                        )
                    },
                }}
            />
            <Tabs.Screen
                name='expert'
                options={{
                    headerShown: false,
                    tabBarLabel: 'Chuyên gia',
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <>
                                {focused ? (
                                    <Ionicons name='people-sharp' color={color} size={size} />
                                ) : (
                                    <Ionicons name='people-outline' color={color} size={size} />
                                )}
                            </>
                        )
                    },
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    tabBarLabel: 'Cài đặt',
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <>
                                {focused ? (
                                    <Ionicons name='ios-settings-sharp' color={color} size={size} />
                                ) : (
                                    <Ionicons name='ios-settings-outline' color={color} size={size} />
                                )}
                            </>
                        )
                    },
                }}
            />
        </Tabs>
    )
}
