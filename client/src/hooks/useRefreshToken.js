import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    return async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            return {...prev, user: { accessToken: response.data.accessToken }}
        });
        return response.data.accessToken;
    };
};

export default useRefreshToken;