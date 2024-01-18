import { Stack } from 'expo-router'

export default function ModalLayout() {
    return (
        <Stack>
            <Stack.Screen
                name='login'
                options={{
                    presentation: 'modal',
                    animation: 'slide_from_right',
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='settings'
                options={{
                    presentation: 'modal',
                    animation: 'slide_from_right',
                    headerShown: false,
                }}
            />
        </Stack>
    )
}
