import axios from 'axios'
import React, { createContext, FC, ReactNode, useContext, useState } from 'react'
import { LoginInputs, RegistrationData } from 'types/ListTypes'


type UserType = {
    email: string
    name: string
    surname: string,
    _id: string
}

type AuthContextProps = {
    isAuth: (userId: string) => void
    registerClient: (values: RegistrationData) => Promise<void>
    loginClient: (values: LoginInputs) => Promise<void>
    logOutClient: () => Promise<void>
    user?: UserType
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserType>();
    const registerClient = async (values: RegistrationData) => {
        await axios.post("http://localhost:4000/register", values)
            .catch((error) => {
                console.log("Error while adding user:", error);
            })

    };


    const loginClient = async (values: LoginInputs) => {
        await axios.post("http://localhost:4000/login", values)
            .then((response) => {
                const userData = response.data;
                if (userData && userData.user._id) {
                    localStorage.setItem('userId', userData.user._id);
                    localStorage.setItem('accessToken', userData.accessToken)
                    setUser(userData.user);
                } else {
                    console.error("Invalid user data received");

                }
            })
            .catch((error) => {
                console.error('Error during login:', error);
                throw new Error('error')
            });
    }
    const logOutClient = async () => {
        await axios.post("http://localhost:4000/logout", {}, {
            headers: {
                Authorization: localStorage.getItem('accessToken')
            }
        })
            .then(() => {
                localStorage.removeItem('userId');
                localStorage.removeItem('accessToken');
                setUser(undefined);

            })
            .catch((error) => {
                throw new Error('Error during logout:', error);
            })
    }

    const isAuth = async (userId: string) => {
        await axios.post(`http://localhost:4000/login"/${userId}`)
            .then((response) => {
                setUser(response.data)

            })
            .catch((error) => {
                throw new Error(error);
            });

    }
    const contextValues: AuthContextProps = {
        isAuth,
        registerClient,
        loginClient,
        logOutClient,
        user
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
