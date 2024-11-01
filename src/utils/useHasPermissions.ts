import axios from "axios"
import { useState, useEffect } from 'react';

export const useHasPermissions = (permissions: string[]) => {
    const role = localStorage.getItem('role');
    const [hasPermissions, setHasPermissions] = useState(false);
    useEffect(() => {
        const fetchPermissions = async () => {
            axios.get(`http://127.0.0.1/role/${role}`)
                .then((res) => {
                    setHasPermissions(permissions.every((permission) => res.data.permissions.includes(permission)))
                })
                .catch((err) => {
                    console.log(err)
                    return false
                })
        };

        fetchPermissions();


    }, [permissions, role]);

    return { hasPermissions };
}