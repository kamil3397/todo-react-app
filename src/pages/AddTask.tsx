import { yupResolver } from "@hookform/resolvers/yup"
import { Card, Container, TextField } from "@mui/material"
import { Button } from '@mui/material';
import { useAlertContext } from "context/AlertContext";
import { useTaskContext } from "context/TaskContext"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { Slide } from "react-toastify";

import * as yup from "yup"

type AddTaskInputs = {
    title: string,
    description: string,
}

const schema = yup.object({
    title: yup.string().required("Title is required").min(3, "Must be at least 3 characters"),
    description: yup.string().required("Description is required").min(3, "Must be at least 3 characters")

})

const AddTask: FC = () => {

    const { addTask } = useTaskContext()
    const { showAlert } = useAlertContext()
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<AddTaskInputs>({ resolver: yupResolver(schema) });

    const userId = localStorage.getItem('userId')

    if (!userId) return null;

    const onSubmit = async (values: AddTaskInputs) => {

        await addTask({
            title: values.title,
            description: values.description,
            userId: userId,
        })
            .then(() => navigate('/yourTasks'))
            .catch((err) => showAlert(`Something went wrong!: ${err}`, 'error', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            }))
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