
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserType } from 'types/UserTypes';
import { useHasPermissions } from 'utils/useHasPermissions';

const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState<UserType | null>(null)
    const { hasPermissions } = useHasPermissions(['assignRole']);

    useEffect(() => {
        const fetchUserData = async () => {
            axios.get(``).then((res) => console.log(res.data)).catch((err) => console.log(err))
        }
        fetchUserData()
    }, [id])

    if (!user) {
        return <p>User not found</p>
    }
    return (
        <div>
            <p>some user data</p>
            {hasPermissions && <button>Assgin roles</button>}
        </div>
    )
}

export default UserProfile;