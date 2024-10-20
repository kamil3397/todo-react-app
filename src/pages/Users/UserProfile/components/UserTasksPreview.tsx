import { Loader } from 'components/Loader';
import { makeRequest } from 'hooks/makeRequest';
import React, { FC, useEffect, useState } from 'react';
import { UserType, ListItem } from 'types/ListTypes';

type UserTasksPreviewProps = {
    userId: string;
};

const UserTasksPreview: FC<UserTasksPreviewProps> = ({ userId }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [tasks, setTasks] = useState<ListItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserAndTasks = () => {
            setLoading(true);

            // Pobieramy dane użytkownika
            makeRequest('GET', `/users/${userId}`)
                .then(user => {
                    setUser(user?.data);

                    // Po pobraniu użytkownika, pobieramy zadania
                    return makeRequest('GET', `/user/${userId}/tasks`);
                })
                .then(tasks => {
                    setTasks(tasks?.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching user or tasks:', err);
                    setLoading(false);
                });
        };

        fetchUserAndTasks();
    }, [userId]);

    if (loading) {
        return <Loader />;
    }

    if (!user) {
        return <p>User not found</p>;
    }

    if (!tasks.length) {
        return <h3>No tasks available for this user</h3>;
    }

    return (
        <div>
            <h3>{`Tasks for ${user.name} ${user.surname}`}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Task ID</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task._id}>
                            <td>{task._id}</td>
                            <td>{task.title}</td>
                            <td>{task.status}</td>
                            <td>{task.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTasksPreview;
