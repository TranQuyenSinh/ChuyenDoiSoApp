import * as ImagePicker from 'expo-image-picker'

const useChonAnh = () => {
    const [status, requestPermission] = ImagePicker.useCameraPermissions()
    const verifyPermission = async () => {
        if (status?.status == ImagePicker.PermissionStatus.DENIED) {
            const permissionResponse = await ImagePicker.requestCameraPermissionsAsync()
            return permissionResponse.granted
        }
        return true
    }

    const pickImageAsync = async (pickType: 'camera' | 'galery') => {
        const hasPermission = await verifyPermission()
        if (!hasPermission) {
            return
        }
        const pickImageOptions = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            cameraType: ImagePicker.CameraType.back,
            quality: 1,
        }
        let { assets } =
            pickType === 'camera'
                ? await ImagePicker.launchCameraAsync(pickImageOptions)
                : await ImagePicker.launchImageLibraryAsync(pickImageOptions)
        if (assets) {
            const uri = assets[0].uri
            let name = uri.split('/').pop() || ''
            let match = /\.(\w+)$/.exec(name)
            let type = match ? `image/${match[1]}` : `image`

            return { uri, name, type }
        }
    }

    return { pickImageAsync }
}

export default useChonAnh
