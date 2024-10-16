import axios from "axios"

export const userHasPermissions = async (permissions: string[]) => {
    const role = localStorage.getItem('role');
    const hasPermission = await axios.get(`http://127.0.0.1/role/${role}`)
        .then((res) => {
            return permissions.every((permission) => res.data.permissions.includes(permission))
        })
        .catch((err) => {
            console.log(err)
            return false
        })
    return hasPermission;
}