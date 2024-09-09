import axios from "axios"

// role mozemy brac z contextu - do zmiany
export const userHasPermissions = async (role: string, permissions: string[]): Promise<boolean> => {
    return await axios.get(`http:127.0.0.1/role/${role}`)
        .then((res) => {
            return permissions.every((permission) => res.data.permissions.includes(permission))
        })
        .catch((err) => {
            console.log(err)
            return false
        })
}