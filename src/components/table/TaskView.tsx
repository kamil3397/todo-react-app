import React, { FC } from 'react';
import { TaskInfo } from 'layouts/SingleTaskPage';
import { ListItem } from 'types/ListTypes';
import { useTaskContext } from '../../context/TaskContext';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDialogContext } from 'context/DialogContext';

type TaskViewProps = {
  task: ListItem;
}

const TaskView: FC<TaskViewProps> = ({ task }) => {
  const { deleteTask, editTask } = useTaskContext();
  const { setOpen, setDialogConfiguration } = useDialogContext()
  const navigate = useNavigate()

  const deleteTaskWithRedirection = async (taskId: string) => {
    // tutaj w przypadku pozytywnym dodaj success toast
    // w przypadku negatywnym dodaj error toast
    // ewentualnie zastanow sie, bo moze lepiej je dorzucic juz w DialogContext?
    await deleteTask(taskId).then(() => {
      navigate('/yourTasks')
    }).catch((err) => console.log(err))

  }

  const handleDelete = async (taskId: string) => {
    setOpen(true)
    setDialogConfiguration({
      onSubmit: async () => await deleteTaskWithRedirection(taskId),
      title: "Delete a task",
      description: 'Are you sure?',
      variant: 'delete'
    })
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
