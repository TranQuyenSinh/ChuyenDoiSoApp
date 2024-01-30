import { Stack } from 'expo-router'

export default function ModalLayout() {
    return (
        <Stack>
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
