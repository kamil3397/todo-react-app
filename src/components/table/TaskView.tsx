import React, { FC } from 'react';
import { ListItem } from 'types/ListTypes';
import { useTaskContext } from '../../context/TaskContext';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDialogContext } from 'context/DialogContext';
import { useAlertContext } from 'context/AlertContext';

type TaskViewProps = {
  task: ListItem;
}

const TaskView: FC<TaskViewProps> = ({ task }) => {
  const { deleteTask, editTask } = useTaskContext();
  const { setOpen, setDialogConfiguration } = useDialogContext()
  const { showSuccessAlert, showErrorAlert } = useAlertContext()

  const navigate = useNavigate()

  const deleteTaskWithRedirection = async (taskId: string) => {
    await deleteTask(taskId).then(() => {
      showSuccessAlert('Task deleted succesfully')
      navigate('/yourTasks')
    }).catch(() => {
      showErrorAlert('Something went wrong! Status has not been changed.')
    })

  }
  const updateStatusWithRedirection = async (task: ListItem) => {
    await editTask(task).then(() => {
      showSuccessAlert('Task status updated succesfully')
      navigate('/yourTasks')
    }).catch((err) => {
      showErrorAlert('Something went wrong! Task has not been updated.')
    })
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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant='h3'>{task.title}</Typography>
      </Box>
      {/* <TextField sx={{ p: 1 }} id="outlined-disabledf"
        label="Title"
        defaultValue={task.title}
        InputProps={{
          readOnly: true,
        }} /> */}
      <TextField sx={{ p: 1 }} id="outlined-read-only-input"
        label="Description"
        defaultValue={task.description}
        InputProps={{
          readOnly: true,
        }} />
      <TextField sx={{ p: 1 }} id="outlined-read-only-input"
        label="Status"
        defaultValue={task.status}
        InputProps={{
          readOnly: true,
        }} />
      <Box sx={{ m: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button variant='contained' color='success' sx={{ m: 1 }} onClick={() => updateStatusWithRedirection({ ...task, status: 'completed' })}>Completed</Button>
        <Button variant='contained' sx={{ m: 1 }} onClick={() => updateStatusWithRedirection({ ...task, status: 'in-progress' })}>In Progress</Button>
        <Button variant="contained" color='error' sx={{ m: 1 }} onClick={() => handleDelete(task._id)} >Delete Task</Button>
      </Box>
    </>
  );
};

export default TaskView;
