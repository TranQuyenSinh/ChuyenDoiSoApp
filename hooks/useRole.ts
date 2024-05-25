import { ROLE } from '@constants/Constants';
import { useAppSelector } from '@redux/store';

const useRole = () => {
    const { userProfile } = useAppSelector(state => state.user)
    const isInRole = (roleId: ROLE) => {
        return userProfile?.vaitro?.[0]?.id === roleId
    }
    return { isInRole }
}

export default useRole;