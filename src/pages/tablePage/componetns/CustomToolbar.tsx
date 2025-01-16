import React, { useState, useEffect, FC } from "react";
import {
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton,
    GridToolbarColumnsButton,
    GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { Button, Menu, MenuItem } from "@mui/material";
import { UserType } from "types/UserTypes";
import { useAuthContext } from "context/AuthContext";

interface CustomToolbarProps {
    selectedUserId: string | null;
    setSelectedUserId: (userId: string | null) => void;
}

const CustomToolbar: FC<CustomToolbarProps> = ({ selectedUserId, setSelectedUserId }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const { clients, fetchClients } = useAuthContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchClients();
            } catch (error) {
                console.log('Error fetching clients:', error);
            }
        };

        fetchData();
    }, []);

    const handleUsersClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    const handleUserSelect = (user: UserType) => {
        if (selectedUserId === user._id) {
            setSelectedUserId(null);
            setSelectedUser(null);
        } else {
            setSelectedUserId(user._id);
            setSelectedUser(user);
        }
        handleClose();
    }

    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
            <Button color="primary" onClick={handleUsersClick}>
                {selectedUserId ? `Selected: ${selectedUser?.name} ${selectedUser?.surname}` : "USERS"}
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                {clients.map((client: UserType) => (
                    <MenuItem
                        key={client._id}
                        selected={selectedUserId === client._id}
                        onClick={() => handleUserSelect(client)}
                    >
                        {`${client.name} ${client.surname}`}
                    </MenuItem>
                ))}
            </Menu>
        </GridToolbarContainer>
    );
};


export default CustomToolbar;
