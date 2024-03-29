import React, { FC, useEffect, useState } from 'react';
import { ListItem } from 'types/ListTypes';
import { useTaskContext } from '../../context/TaskContext';
import TextField from '@mui/material/TextField';
import { Button, Alert } from '@mui/material';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


type EditViewProps = {
  task: ListItem;
  setIsEditing: (value: boolean) => void;

}

type Inputs = {
  title: string,
  description: string,
}

const schema = yup.object({
  title: yup.string().required("Title is required").min(3, "Moredeczko musi być minimum 3 literki byczq"),
  description: yup.string().required("Description is required").min(3, "Must be at least 3 characters")
})

const EditView: FC<EditViewProps> = ({ task, setIsEditing }) => {
  const { editTask } = useTaskContext();
  const navigate = useNavigate();

  const { register, formState: { errors }, handleSubmit } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: { title: task.title, description: task.description }
  });


  const onSubmit = (values: Inputs) => {
    const editedTask = { ...task, title: values.title, description: values.description }
    if (values) {
      editTask(editedTask);
      navigate('/yourTasks')
    }
  }
  return (

    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', padding: 10, gap: 5 }}>
      <TextField
        {...register("title")}
        label='Title'
        placeholder='Add new title here'
        error={!!errors.title}
        helperText={!!errors.title && errors.title.message}
      />
      <TextField
        {...register("description")}
        label="Description"
        placeholder='Add new description'
        error={!!errors.description}
        helperText={!!errors.description && errors.description.message}
      />


      <Button type='submit' variant='contained'>Zapisz</Button>
      <Button onClick={() => setIsEditing(false)} variant='contained'>Anuluj</Button>
    </form>

  );
};

export default EditView;

/*
To jest formularz, ale bez zadnej kontroli- to jest bledne. 
Formularze powinny byc opakowane w <form></form> 
My to jeszcze rozszezymy o react-hook-form (https://react-hook-form.com/) 
a walidacje przeprowadzimy za pomoca biblioteki yup (https://www.npmjs.com/package/yup)
*/