import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserType } from 'types/UserTypes';
import { userHasPermissions } from 'utils/userHasPermissions';

const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState<UserType | null>(null)
    const [hasAssignRolePermission, setHasAssignRolePermission] = useState(false);

    useEffect(() => {
        axios.get(`http://127.0.0.1/users/${id}`)
            .then((res) => {
                console.log(res.data);
                setUser(res.data)
            })
            .catch((err) => console.log(err));

        userHasPermissions(['assignRole']).then((res) => setHasAssignRolePermission(res))
    }, [id])

    if (!user) {
        return <p>User not found</p>
    }
    return (
        <div>
            <p>some user data</p>
            {hasAssignRolePermission && <button>Assgin roles</button>}
        </div>
    )
}

export default UserProfile;