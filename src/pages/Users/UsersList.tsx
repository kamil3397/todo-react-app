import React, { FC, useEffect, useState, } from 'react';
import { GridColDef, GridRowParams, useGridApiRef } from '@mui/x-data-grid';
import { ReusableDrawer } from 'components/drawer/ReusableDrawer';
import ProfilePreview from './UserProfile/ProfilePreview';
import { Table } from 'components/table2/Table';
import { UserType } from 'types/UserTypes';
import { makeRequest } from 'hooks/makeRequest';



const UsersList: FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [users, setUsers] = useState<UserType[]>([])

    const toggleDrawer = (open: boolean) => {
        setDrawerOpen(open)
    }

    const columns: GridColDef[] = [
        { field: '_id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 100 },
        { field: 'surname', headerName: 'Surname', width: 100 },
        { field: 'role', headerName: 'Role', width: 90 }
    ]

    useEffect(() => {
        const fetchUsers = async (): Promise<void> => {
            return await makeRequest('GET', '/users')
                .then((res) => { setUsers(res?.data) })
                .catch((err) => { throw new Error(err) })
        }
        fetchUsers()
    }, [selectedUser])

    const handleRowClick = (params: GridRowParams) => {
        setSelectedUser(params.row as UserType);
        toggleDrawer(true);
    };
    const apiRef = useGridApiRef();

    return (
        <>
            <Table
                loading={!users}
                apiRef={apiRef}
                rows={users || []}
                columns={columns}
                onRowClick={handleRowClick}
            />
            <ReusableDrawer open={drawerOpen} toggleDrawer={toggleDrawer} width={800} title='Profile page'>
                {selectedUser && <ProfilePreview userId={selectedUser._id} />}
            </ReusableDrawer>
        </>
    );
}
export default UsersList
