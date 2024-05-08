import React, { FC } from 'react';
import { EditUserType } from 'types/ListTypes';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'context/AuthContext';


type EditViewProps = {
    user: EditUserType;
    setIsEditing: (value: boolean) => void;

}

type Inputs = {
    email: string,
    newEmail: string,
    password: string,
    newPassword: string,
}

const schema = yup.object({
    email: yup.string().required(),
    newEmail: yup.string().required(),
    password: yup.string().min(8).required(),
    newPassword: yup.string().min(8).required(),

})

const ProfileEditView: FC<EditViewProps> = ({ user, setIsEditing }) => {
    const { updateClient } = useAuthContext();
    const navigate = useNavigate();

    const { register, formState: { errors }, handleSubmit } = useForm<Inputs>({
        resolver: yupResolver(schema),
        defaultValues: { password: user.password, email: user.email }
    });


    const onSubmit = (values: Inputs) => {
        const editedUser = { ...user, password: values.newPassword, email: values.newEmail }
        if (values) {
            updateClient(editedUser);
            navigate('/profile')
        }
    }
    return (

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', padding: 10, gap: 5 }}>
            <TextField
                {...register("newEmail")}
                label='New name'
                placeholder='Add new name here'
                error={!!errors.newEmail}
                helperText={!!errors.newEmail && errors.newEmail.message}
            />
            <TextField
                {...register("newPassword")}
                label="New Surname"
                placeholder='Add new description'
                error={!!errors.newPassword}
                helperText={!!errors.newPassword && errors.newPassword.message}
            />


            <Button type='submit' variant='contained'>Zapisz</Button>
            <Button onClick={() => setIsEditing(false)} variant='contained'>Anuluj</Button>
        </form>

    );
};

export default ProfileEditView;