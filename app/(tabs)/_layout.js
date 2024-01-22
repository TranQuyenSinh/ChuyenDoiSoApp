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
                    fontFamily: 'mon-sb',
                    fontSize: 13,
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
                    tabBarIcon: ({ color, size }) => <Ionicons name='home-sharp' color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name='wishlists'
                options={{
                    tabBarLabel: 'Wish lists',
                    tabBarIcon: ({ color, size }) => <Ionicons name='heart-outline' color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name='trips'
                options={{
                    tabBarLabel: 'Trips',
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name='airbnb' color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name='inbox'
                options={{
                    tabBarLabel: 'Inbox',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name='message-outline' color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    tabBarLabel: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='person-circle-outline' color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    )
}
