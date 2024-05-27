import { yupResolver } from "@hookform/resolvers/yup"
import { Card, Container, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material"
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
    category: TaskCategory
}

const schema = yup.object({
    title: yup.string().required("Title is required").min(3, "Must be at least 3 characters"),
    description: yup.string().required("Description is required").min(3, "Must be at least 3 characters"),
    category: yup.mixed<TaskCategory>().oneOf(Object.values(TaskCategory)).required('Category is required')

})

const AddTask: FC = () => {

    const { addTask } = useTaskContext()
    const { showSuccessAlert, showErrorAlert } = useAlertContext()
    const [alignment, setAlignment] = useState<TaskCategory>(TaskCategory.Personal)
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<AddTaskInputs>({ resolver: yupResolver(schema) });


    const handleCategoryChange = (
        event: MouseEvent<HTMLElement>,
        newAlignment: TaskCategory,
    ) => {
        setAlignment(newAlignment);
    }

    const userId = localStorage.getItem('userId')

    if (!userId) return null;

    const onSubmit = async (values: AddTaskInputs) => {
        console.log("wysyłam dane :", values, "z kategorią:", alignment);

        await addTask({
            title: values.title,
            description: values.description,
            userId: userId,
            category: alignment
        })
            .then(() => {
                showSuccessAlert('Task added successfully');
                navigate('/yourTasks');
            })
            .catch(() => showErrorAlert('Something went wrong!'));
    }

    return (
        <Container sx={{ display: "flex", justifyContent: 'center', alignItems: 'center' }} >
            <Card sx={{ borderRadius: 1.25, width: 400, height: 350, display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 10 }}>
                {/*Brakuje title i description do info clienta */}
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}>

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
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleCategoryChange}
                        aria-label="Platform"
                    >
                        <ToggleButton value={TaskCategory.Personal}>Personal</ToggleButton>
                        <ToggleButton value={TaskCategory.Work}>Work</ToggleButton>
                        <ToggleButton value={TaskCategory.Family}>Family</ToggleButton>
                        <ToggleButton value={TaskCategory.Other}>Other</ToggleButton>
                    </ToggleButtonGroup>
                    <Button type='submit' variant='contained'>Save</Button>

                    <Button variant='contained' component={Link} to="/yourTasks">
                        Quit
                    </Button>
                </form>
            </Card>
        </Container >

    )
}
export default AddTask;