import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { EditUserType } from 'types/ListTypes';
import { Box, Button, Card } from '@mui/material';
import { useAuthContext } from 'context/AuthContext';
import ProfileEditView from 'components/table/ProfileEditView';
import ProfileView from './ProfileView';


const ProfilePage: FC = () => {
    const { fetchSingleClient } = useAuthContext();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState<EditUserType>();

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            const fetchUser = async () => {
                const userData = await fetchSingleClient(userId);
                setUser(userData);
            };
            fetchUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!user) {
        return (
            <div>User not found</div>
        );
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ borderRadius: 1.25, }}>
                <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    {!isEditing && <Button variant='contained' sx={{ m: 1 }} onClick={() => setIsEditing(true)}><FontAwesomeIcon icon={faPenToSquare} /></Button>}
                    {!isEditing && <Button variant='contained' color='error' sx={{ m: 1 }} onClick={() => navigate('/yourTasks')}><FontAwesomeIcon icon={faXmark} /></Button>}
                </Box>
                {isEditing ? <ProfileEditView user={user as EditUserType} setIsEditing={setIsEditing} /> : <ProfileView user={user as EditUserType} />}
            </Card>
        </Box>

    );
};
export default ProfilePage;

