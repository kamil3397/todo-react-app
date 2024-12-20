import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ListItem } from 'types/ListTypes';
import { useTaskContext } from '../context/TaskContext';
import EditView from 'components/table/EditView';
import TaskView from 'components/table/TaskView';
import { Box, Button, Card } from '@mui/material';
import { ReusableDrawer } from 'components/drawer/ReusableDrawer';

const SingleTask: FC = () => {
  const { fetchSingleTask } = useTaskContext();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState<ListItem | null>(null);
  const { id } = useParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  useEffect(() => {
    const fetchTask = async () => {
      const taskData = await fetchSingleTask(id as string);
      setTask(taskData);
    };
    fetchTask();
  }, []);

  if (!task) {
    return <div>Task not found</div>;
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card sx={{ borderRadius: 1.25, padding: 3, width: '100%', maxWidth: 600 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
          <Button variant="contained" sx={{ m: 1 }} onClick={() => toggleDrawer(true)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
          <Button variant="contained" color="error" sx={{ m: 1 }} onClick={() => navigate('/tasks')}>
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TaskView task={task} />
        </Box>
      </Card>
      <ReusableDrawer open={drawerOpen} toggleDrawer={toggleDrawer} width={500} title='Edit Your Tasks'>
        <EditView task={task} setIsEditing={toggleDrawer} />
      </ReusableDrawer>
    </Box>
  );



}
export default SingleTask;