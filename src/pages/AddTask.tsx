import { yupResolver } from "@hookform/resolvers/yup";
import { Box, styled, Container, TextField, ToggleButton, ToggleButtonGroup, Typography, ToggleButtonProps, Button } from "@mui/material";
import { useAlertContext } from "context/AlertContext";
import { useTaskContext } from "context/TaskContext";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MouseEvent } from "react";
import { TaskCategory } from "types/ListTypes";
import * as yup from "yup";

type AddTaskInputs = {
    title: string;
    description: string;
    category: TaskCategory;
    startDate: string;
    endDate: string;
};

interface CustomToggleButtonProps extends ToggleButtonProps {
    backgroundColor: string;
}

const schema = yup.object({
    title: yup.string().required("Title is required").min(3, "Must be at least 3 characters"),
    description: yup.string().required("Description is required").min(3, "Must be at least 3 characters"),
    category: yup.mixed<TaskCategory>().oneOf(Object.values(TaskCategory)).required('Category is required'),
    startDate: yup.string().required('Start date is required'),
    endDate: yup.string().required('End date is required')
});

const AddTask: FC<{ toggleDrawer: (open: boolean) => void }> = ({ toggleDrawer }) => {
    const { addTask, fetchTasks } = useTaskContext();
    const { showSuccessAlert, showErrorAlert } = useAlertContext();
    const [alignment, setAlignment] = useState<TaskCategory>(TaskCategory.Personal);
    const { watch, register, handleSubmit, formState: { errors }, setValue } = useForm<AddTaskInputs>({
        resolver: yupResolver(schema), defaultValues: {
            title: '',
            description: '',
            category: TaskCategory.Personal,
            startDate: '',
            endDate: ''
        }
    });

    // const x = watch('startDate')
    // useEffect(() => {
    //     console.log(x);
    //     console.log(typeof x)
    // }, [x])

    const CustomToggleButton = styled(ToggleButton)<CustomToggleButtonProps>(({ backgroundColor }) => ({
        color: 'black',
        '&.Mui-selected': {
            backgroundColor: backgroundColor,
            color: 'white',
        },
    }));

    const handleCategoryChange = (
        event: MouseEvent<HTMLElement>,
        newAlignment: TaskCategory,
    ) => {
        setAlignment(newAlignment);
        setValue('category', newAlignment);
    };

    // const userId = '123'
    const userId = localStorage.getItem('userId');

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
            .then(async () => {
                showSuccessAlert('Task added successfully');
                toggleDrawer(false);
                await fetchTasks();
            })
            .catch(() => showErrorAlert('Something went wrong!'));
    };

    const handleQuit = () => {
        toggleDrawer(false);
    };

    return (
        <Container sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>Add your new Task!</Typography>
                <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: 'gray' }}>Add necessary informations and start working on getting done!</Typography>

                <TextField
                    {...register('title')}
                    label='Title'
                    placeholder='Add title here'
                    error={!!errors.title}
                    helperText={!!errors.title && errors.title.message}
                    fullWidth
                />
                <TextField
                    {...register("description")}
                    label="Description"
                    placeholder='Add description here'
                    error={!!errors.description}
                    helperText={!!errors.description && errors.description.message}
                    fullWidth
                />
                <ToggleButtonGroup
                    sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleCategoryChange}
                    aria-label="Category"
                >
                    <CustomToggleButton backgroundColor='#007AFF' value={TaskCategory.Personal}>Personal</CustomToggleButton>
                    <CustomToggleButton backgroundColor='#FF9500' value={TaskCategory.Work}>Work</CustomToggleButton>
                    <CustomToggleButton backgroundColor='#4CD964' value={TaskCategory.Family}>Family</CustomToggleButton>
                    <CustomToggleButton backgroundColor='#8E8E93' value={TaskCategory.Other}>Other</CustomToggleButton>
                </ToggleButtonGroup>

                <Box sx={{ display: 'flex', gap: 2 }}>
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button variant='contained' onClick={handleQuit} sx={{ width: '45%', backgroundColor: 'gray' }}>Quit</Button>
                    <Button type='submit' variant='contained' sx={{ width: '45%' }}>Create Task</Button>
                </Box>
            </form>
        </Container>
    );
};

export default AddTask;
