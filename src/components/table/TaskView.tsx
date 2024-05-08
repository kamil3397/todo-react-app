import React, { FC } from 'react';
import { TaskInfo } from 'layouts/SingleTaskPage';
import { ListItem } from 'types/ListTypes';
import { useTaskContext } from '../../context/TaskContext';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type TaskViewProps = {
  task: ListItem;
}

const TaskView: FC<TaskViewProps> = ({ task }) => {
  const { deleteTask, editTask } = useTaskContext();
  const navigate = useNavigate()

  const handleDelete = async (taskId: string) => {
    await deleteTask(taskId) //delete task jest asynchroniczy bo wykonuje zapytanie, wiec ma zwracac promise
    navigate('/yourTasks') // jak poprawisz to to powinno byc w then
  }

  return (
    <>
      <Typography variant='h3'
        sx={{ mt: 1.25, mb: 1.25, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{task.title}</Typography>
      <TaskInfo>{task.description}</TaskInfo>
      <TaskInfo>{task.status}</TaskInfo>
      <Box sx={{ m: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button variant='contained' color='success' sx={{ m: 1 }} onClick={() => editTask({ ...task, status: 'completed' })}>Completed</Button>
        <Button variant='contained' sx={{ m: 1 }} onClick={() => editTask({ ...task, status: 'in-progress' })}>In Progress</Button>
        <Button variant="contained" color='error' sx={{ m: 1 }} onClick={() => handleDelete(task._id)} >Delete Task</Button>


      </Box>
    </>
  );
};

export default TaskView;
