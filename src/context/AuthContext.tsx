import { makeRequest } from 'hooks/makeRequest'
import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import { EditUserType, LoginInputs, RegistrationData, UserType } from 'types/UserTypes'


type AuthContextProps = {
    loginUser: (userId: string) => void
    registerClient: (values: RegistrationData) => Promise<void>
    loginClient: (values: LoginInputs) => Promise<void>
    logOutClient: () => Promise<void>
    fetchSingleClient: (userId: string) => Promise<EditUserType>
    updateClient: (user: EditUserType) => void;
    user?: UserType
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserType>();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetchSingleClient(userId)
                .catch(error => console.error('Błąd podczas pobierania użytkownika:', error));
        }
    }, []);

    const registerClient = async (values: RegistrationData) => {
        await makeRequest('POST', '/register', values)
            .catch((error) => {
                throw new Error(error)
            })
    };

    const loginClient = async (values: LoginInputs) => {
        return await makeRequest('POST', '/login', values)
            .then((response) => {
                const userData = response?.data;
                if (userData && userData.user._id) {
                    localStorage.setItem('userId', userData.user._id);
                    localStorage.setItem('accessToken', userData.accessToken)
                    localStorage.setItem('role', userData.role)
                    setUser(userData.user);
                } else { console.error("Invalid user data received") }
            })
            .catch((error) => { throw new Error(error) });
    }

    const logOutClient = async () => {
        return await makeRequest('POST', '/logout')
            .then(() => {
                localStorage.removeItem('userId')
                localStorage.removeItem('accessToken')
                setUser(undefined)
            })
            .catch((error) => {
                throw new Error('Error during logout:', error);
            })
    }

    const loginUser = async (userId: string) => {
        return await makeRequest('POST', `login"/${userId}`)
            .then((res) => setUser(res?.data))
            .catch((error) => { throw new Error(error) });
    }

    const fetchSingleClient = async (userId: string): Promise<EditUserType> => {
        return await makeRequest('GET', `/users/${userId}`)
            .then((res) => {
                setUser(res?.data);
                return res?.data
            })
            .catch((err) => { throw new Error(err) });
    }

    const updateClient = async (user: EditUserType) => {
        const { _id, ...rest } = user;
        return await makeRequest('PUT', `/update-user/${_id}`, rest)
            .then((res) => setUser(res?.data))
            .catch((error) => console.log(error))
    }

    const contextValues: AuthContextProps = {
        loginUser,
        registerClient,
        loginClient,
        logOutClient,
        fetchSingleClient,
        updateClient,
        user,
    }

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used in AuthProvider');
    }
    return context;
}
