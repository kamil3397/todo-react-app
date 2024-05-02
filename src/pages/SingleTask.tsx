import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ListItem } from 'types/ListTypes';
import { useTaskContext } from '../context/TaskContext';
import EditView from 'components/table/EditView';
import TaskView from 'components/table/TaskView';
import { Box, Button, Card } from '@mui/material';


const SingleTask: FC = () => {
  const { fetchSingleTask } = useTaskContext();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState<ListItem>();
  const { id } = useParams()

  useEffect(() => {
    const fetchTask = async () => {
      const taskData = await fetchSingleTask(id as string);
      setTask(taskData);
    };
    fetchTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!task) {
    return (
      <div>Task not found</div>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card sx={{ borderRadius: 1.25, }}>
        <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
          {!isEditing && <Button variant='contained' sx={{ m: 1 }} onClick={() => setIsEditing(true)}><FontAwesomeIcon icon={faPenToSquare} /></Button>}
          {!isEditing && <Button variant='contained' color='error' sx={{ m: 1 }} onClick={() => navigate('/yourTasks')}><FontAwesomeIcon icon={faXmark} /></Button>}
        </Box>
        {isEditing ? <EditView task={task as ListItem} setIsEditing={setIsEditing} /> : <TaskView task={task as ListItem} />}
      </Card>
    </Box>

  );
};
export default SingleTask;

