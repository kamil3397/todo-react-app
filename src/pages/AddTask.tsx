import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Card, Container, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { Button } from '@mui/material';
import { useAlertContext } from "context/AlertContext";
import { useTaskContext } from "context/TaskContext"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { MouseEvent } from "react";
import { TaskCategory } from "types/ListTypes";

import * as yup from "yup"

type AddTaskInputs = {
    title: string,
    description: string,
    category: TaskCategory,
    startDate: Date,
    endDate: Date,
}

const schema = yup.object({
    title: yup.string().required("Title is required").min(3, "Must be at least 3 characters"),
    description: yup.string().required("Description is required").min(3, "Must be at least 3 characters"),
    category: yup.mixed<TaskCategory>().oneOf(Object.values(TaskCategory)).required('Category is required'),
    startDate: yup.date().required('Start date is required'),
    endDate: yup.date().required('End date is required')

})

const AddTask: FC = () => {

    const { addTask } = useTaskContext()
    const { showSuccessAlert, showErrorAlert } = useAlertContext()
    const [alignment, setAlignment] = useState<TaskCategory>(TaskCategory.Personal)
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<AddTaskInputs>({ resolver: yupResolver(schema) });


    const handleCategoryChange = (
        event: MouseEvent<HTMLElement>,
        newAlignment: TaskCategory,
    ) => {
        setAlignment(newAlignment);
        setValue('category', newAlignment)
    }

    const userId = localStorage.getItem('userId')

    if (!userId) return null;

    const onSubmit = async (values: AddTaskInputs) => {

        await addTask({
            title: values.title,
            description: values.description,
            userId: userId,
            category: alignment,
            startDate: values.startDate,
            endDate: values.endDate
        })
            .then(() => {
                showSuccessAlert('Task added successfully');
                navigate('/yourTasks');
            })
            .catch(() => showErrorAlert('Something went wrong!'));
    }

    return (
        <Container sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', height: '100vh' }} >
            <Card sx={{ borderRadius: 1.25, width: 500, height: 520, display: "flex", flexDirection: 'column', py: 6, px: 2, boxShadow: 10 }}>
                {/*Brakuje title i description do info clienta */}

                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
                    <Typography variant="h3" sx={{ display: 'flex', justifyContent: 'flex-start' }}>Add your new Task!</Typography>
                    <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'flex-start', color: 'gray' }}>Add neccesary informations and start working on getting done!</Typography>


                    <TextField {...register('title')}
                        label='Title'
                        placeholder='Add title here'
                        error={!!errors.title}
                        helperText={!!errors.title && errors.title.message}
                        multiline
                        fullWidth
                    />
                    <TextField {...register("description")}
                        label="Description"
                        placeholder='Add description here'
                        error={!!errors.description}
                        helperText={!!errors.description && errors.description.message}
                        multiline
                        fullWidth
                    />
                    <ToggleButtonGroup sx={{ display: 'flex', justifyContent: 'center' }}
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleCategoryChange}
                        aria-label="Platform"
                    >
                        <ToggleButton sx={{ backgroundColor: '#007AFF', color: 'black' }} value={TaskCategory.Personal}>Personal</ToggleButton>
                        <ToggleButton sx={{ backgroundColor: '#FF9500', color: 'black' }} value={TaskCategory.Work}>Work</ToggleButton>
                        <ToggleButton sx={{ backgroundColor: '#FF2D55', color: 'black' }} value={TaskCategory.Family}>Family</ToggleButton>
                        <ToggleButton sx={{ backgroundColor: '#4CD964', color: 'black' }} value={TaskCategory.Other}>Other</ToggleButton>
                    </ToggleButtonGroup>

                    <Box sx={{ display: 'flex', gap: 5 }}>
                        <TextField
                            {...register('startDate')}
                            label="Start Date"
                            type='date'
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.startDate}
                            helperText={errors.startDate?.message}
                            fullWidth
                        />
                        <TextField
                            {...register('endDate')}
                            label='End Date'
                            type='date'
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.endDate}
                            helperText={errors.endDate?.message}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button sx={{ m: 2, mr: 1 }} type='submit' variant='contained'>Create Task</Button>
                        <Button sx={{ m: 2, ml: 0 }} variant='contained' component={Link} to="/yourTasks">Quit</Button>
                    </Box >
                </form>
            </Card>
        </Container >

    )
}
export default AddTask;