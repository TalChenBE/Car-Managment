import axiosPrivate from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    return async () => {
        const response = await axiosPrivate.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {...prev, accessToken: response.data.accessToken}
        });
        return response.data.accessToken;
    };
};

export default useRefreshToken;