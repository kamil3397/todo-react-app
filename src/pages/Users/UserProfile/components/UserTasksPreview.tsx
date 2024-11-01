import { Loader } from 'components/Loader';
import { makeRequest } from 'hooks/makeRequest';
import React, { FC, useEffect, useState } from 'react';
import { ListItem } from 'types/ListTypes';
import { UserType } from 'types/UserTypes';


type UserTasksPreviewProps = {
    userId: string;
};

const UserTasksPreview: FC<UserTasksPreviewProps> = ({ userId }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [tasks, setTasks] = useState<ListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await Promise.all([
                makeRequest('GET', `/users/${userId}`),
                makeRequest('GET', `/users/${userId}/tasks`)]) // to bylo zmienione z /user/ poprawic na backendzie
                .then(([userRes, tasksRes]) => {
                    setUser(userRes?.data);
                    setTasks(tasksRes?.data);
                })
                .catch((err) => {
                    setError(err)
                })
                .finally(() => setLoading(false))
        }
        fetchData()

    }, [userId])

    if (loading) {
        return <Loader />;
    }

    if (error || !user || !tasks.length) {
        return <p>No data to display</p>;
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
