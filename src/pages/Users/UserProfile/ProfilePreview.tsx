import React, { FC, useEffect, useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { Preview } from './components/Preview';
import { Settings } from './components/Settings';
import TablePage from 'pages/TablePage';
import { makeRequest } from 'hooks/makeRequest';
import { UserType } from 'types/ListTypes';
import UserTasksPreview from './components/UserTasksPreview';
import { Loader } from 'components/Loader';

type ProfilePreviewProps = {
    userId: string;
};

const ProfilePreview: FC<ProfilePreviewProps> = ({ userId }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [user, setUser] = useState<UserType>()
    const [isSubmitted, setIsSubmitted] = useState(false);


    useEffect(() => {
        setIsSubmitted(false);
        const fetchUser = async (): Promise<void> => {
            return await makeRequest('GET', `/users/${userId}`)
                .then((res) => { setUser(res?.data) })
                .catch((err) => { throw new Error(err) })
        }
        fetchUser()
    }, [userId, isSubmitted])

    if (!user) {
        return <Loader />;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', padding: [2, 2, 2, 0] }}>
            <Tabs
                orientation="vertical"
                value={activeTab}
                onChange={(e, value) => setActiveTab(value)}
                sx={{ borderRight: 1, borderColor: 'divider', width: '30%' }}
            >
                <Tab label='Preview' />
                <Tab label='Settings' />
                <Tab label='User Tasks' />
            </Tabs>
            <Box width="70%" pl={1}>
                {activeTab === 0 ? (
                    <Preview {...user} />
                ) : activeTab === 1 ? (
                    <Settings role={user.role} userId={user._id} setSubmitted={setIsSubmitted} />
                ) : activeTab === 2 ? (
                    <UserTasksPreview />
                ) : null}
            </Box>
        </Box>
    );
};

/* 
1. zrob tak, zeby inputy w Preview byly disabled ale nie mialy narzuconego stylu disabled. 
######2. usunac fetchUsers i users i setUsers z contextu.
######- to powinien byc zwykly API request na poziomie UsersList
######-to powinno rozwiazac problem z pobieraniem w nieskonczonosc (ktore ma miejsce w useEffecie w UsersList)
3. Zrobic Taba Settings
   ######## - ostylowac to jakos milo 
   ######## - zmiana roli powinna odbywac sie tak, ze klikamy przycisk z inna nazwa roli
   ######## - przycisk (ktorego nie ma, musisz go dodac) 'Save' robi sie z disabled na enabled
   ######## - po kliknieciu przycisku wysylamy request do backendu gdzie obslugujemy zmiane roli
4. Zrobic zakladke Tasks
   ########- stworzyc endpoint do pobierania taskow konkretnego usera
    - wyswietlic tabele z taskami przypisanymi do usera
    - po kliekniciu w task przekieruje nas do TasksList i otwiera Drawer dla tego taska (mozesz to ukryc w useParams jakos np. lub dorzucic w urlu cos w stylu http://localhost:3000/tasks/:id -> id teterminuje otwartego taska, lub cos w stylu ?open:id)
    (manipulowanie url)
5. ####### Zmienic endpoint w settings na nowy- users/:id/updateRole - ktory bedzie update'owac tylko role, a nie calego usera.
6. ########Zmienic alerty w Settings na Twoje alerty z contextu
7. ########Dodac loader do profilePreview

praca domowa 16.10
1. ##### Wypozycjonowac badga przy zmianie roli; (nie byłem w stanie ruszyć samego badge, ale zmienjszyłem padding całego Boxa co poskutkowao tym ze elementy nie sa tak rozciagniete a tak miało być)
#####2. Popsprzatac z backendu nieuzywane endpointy i uzywane przez nie funkcje
##### - zmienic nazwy obecnych endpointow jesli sa pisane camelCasem na get-all-by-id np;
#####- sprawdzic potem front czy nic sie nie wywalilo, uaktualnic te, ktore sa w uzyciu
*/

export default ProfilePreview;
