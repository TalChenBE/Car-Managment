import { Outlet } from 'react-router-dom'
import {useEffect, useState} from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        }

        !auth?.user?.accessToken ? verifyRefreshToken(): setIsLoading(false);
    }, [])

    return (
        <>
            {!persist ?
            <Outlet /> :
                isLoading ?
                    <p>Loading...</p> :
                    <Outlet />

            }
        </>
    )
}

export default PersistLogin;