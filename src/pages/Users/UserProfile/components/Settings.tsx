import { Button, Box, Typography, Badge } from '@mui/material';
import { useAlertContext } from 'context/AlertContext';
import { makeRequest } from 'hooks/makeRequest';
import React, { FC, useState } from 'react';
import { UserRoles } from 'types/UserTypes';

const roleDescriptions: Record<UserRoles, string> = {
    admin: 'Allows managing users and system settings.',
    manager: 'Allows editing tasks.',
    employee: 'Allows viewing content without editing permissions.',
};

export const Settings: FC<{ role: UserRoles, userId: string, setSubmitted: (arg: boolean) => void; }> = ({ role, userId, setSubmitted }) => {
    const [selectedRole, setSelectedRole] = useState<UserRoles>(role);
    const [isModified, setIsModified] = useState(false);
    const { showErrorAlert, showSuccessAlert } = useAlertContext()


    const handleRoleChange = (newRole: UserRoles) => {

        setSelectedRole(newRole);
        setIsModified(true);
    };

    const handleSave = () => {
        makeRequest('POST', `/users/${userId}/update-role`, { role: selectedRole })
            .then(() => {
                showSuccessAlert('Role updated successfully!');
                setIsModified(false);
                setSubmitted(true);
            })
            .catch((error) => {
                console.error('Error updating role:', error);
                showErrorAlert('Failed to update role.');
            });
    };

    return (
        <Box display="flex" flexDirection="column" gap={3} padding={2}>
            <Typography variant="h6" component="h1">User Role Settings</Typography>

            {Object.values(UserRoles).map((userRole) => (
                <Box key={userRole}>
                    {role === userRole ?
                        <Badge badgeContent={'Active'} color="success" sx={{ width: '100%' }}>
                            <Button
                                fullWidth
                                variant={userRole === selectedRole ? 'contained' : 'outlined'}
                                onClick={() => handleRoleChange(userRole)}
                            >
                                {userRole}
                            </Button>
                        </Badge> : <Button
                            fullWidth
                            variant={userRole === selectedRole ? 'contained' : 'outlined'}
                            onClick={() => handleRoleChange(userRole)}
                        >
                            {userRole}
                        </Button>}
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        {roleDescriptions[userRole]}
                    </Typography>
                </Box>
            ))}

            <Button
                variant="contained"
                color="primary"
                disabled={!isModified || (role === selectedRole)}
                onClick={handleSave}
            >
                Save
            </Button>
        </Box>
    );
};
