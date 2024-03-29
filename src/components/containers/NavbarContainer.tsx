import { useAuthContext } from 'context/AuthContext';
import React from 'react'
import styled from "styled-components";

const ListItem = styled.li`
:active{
    background-color: #555;
    }
:hover{
    background-color: rgb(22, 23, 46) ;
    border-radius: 2px;
}
`

const AnchorTag = styled.a`
    font-size: 1.2rem;
    font-weight:500;
    color: inherit;
    text-decoration: none;
    height: 100%;
    align-items: center;
    padding: 0.5rem;

`
const SiteTitle = styled.a`
        color: inherit;
        font-size: 2rem;
        text-decoration: none;
`
const Navbar = () => {
    const { logOutClient } = useAuthContext();

    const handleLogout = async () => {
        try {
            await logOutClient();
        } catch (error) {
            console.log('Error during logout:', error);
        }
    };

    return (
        <nav style={{
            height: 80,
            backgroundColor: '#202142',
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem',
            padding: '0 1rem',
        }}>
            <SiteTitle href='/'>TODO APP</SiteTitle>
            <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', gap: '1rem' }}>
                <ListItem><AnchorTag href="/yourTasks">Your Tasks</AnchorTag></ListItem>
                <ListItem> <AnchorTag href="/profil">Profile</AnchorTag></ListItem>
                <ListItem> <AnchorTag href="/" onClick={handleLogout}>Log out</AnchorTag></ListItem>
            </ul>
        </nav >
    )
}

export default Navbar
