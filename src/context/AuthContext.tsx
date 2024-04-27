import axios from 'axios'
import { makeRequest } from 'hooks/makeRequest'
import React, { createContext, FC, ReactNode, useContext, useState } from 'react'
import { EditUserType, LoginInputs, RegistrationData } from 'types/ListTypes'


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
    fetchSingleClient: (userId: string) => Promise<EditUserType>
    updateClient: (user: EditUserType) => void;
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
        // return await makeRequest('POST', `logout`, {})
        //     .then(() => {
        //         localStorage.removeItem('userId');
        //         localStorage.removeItem('accessToken');
        //         setUser(undefined);
        //     })
        //     .catch((error) => { throw new Error(error) });
    }

    const isAuth = async (userId: string) => {
        // await axios.post(`http://localhost:4000/login"/${userId}`)
        //     .then((response) => {
        //         setUser(response.data)

        //     })
        //     .catch((error) => {
        //         throw new Error(error);
        //     });
        return await makeRequest('POST', `login"/${userId}`)
            .then((res) => setUser(res?.data))
            .catch((error) => { throw new Error(error) });
    }

    const fetchSingleClient = async (userId: string): Promise<EditUserType> => {
        return await makeRequest('GET', `/getUserById/${userId}`)
            .then((res) => res?.data)
            .catch((err) => { throw new Error(err) });
    }

    const updateClient = async (user: EditUserType) => {
        const { _id, ...rest } = user;
        const token = localStorage.getItem('accessToken');
        await axios.put(`http://localhost:4000/updateUser/${_id}`, rest, {
            headers: {
                Authorization: token
            }
        })
            .catch((error) => {
                throw new Error(error)
            })
    }

    const contextValues: AuthContextProps = {
        isAuth,
        registerClient,
        loginClient,
        logOutClient,
        fetchSingleClient,
        updateClient,
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
