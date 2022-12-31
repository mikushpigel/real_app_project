import { useFormik } from "formik";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { useAuth } from "../context/auth.context";
import formikValidateUsingJoi from "../utils/formikValidateUsingJoi";
import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import Joi from 'joi';


const SignUpBiz = ({ redirect }) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { createUser, login, user } = useAuth();

    const form = useFormik({
        validateOnMount: true,
        initialValues: {
            email: '',
            password: '',
            name: "",
        },
        validate: formikValidateUsingJoi({
            name: Joi.string().min(2).max(255).required(),
            email: Joi.string().min(6).max(255).required().email({ tlds: { allow: false } }),
            password: Joi.string().min(6).max(1024).required(),
        }),
        async onSubmit(values) {
            try {
                await createUser({ ...values, biz: true });
                console.log(values.email, values.password);
                await login({ email: values.email, password: values.password })

                toast('🦄 Your bissines account is ready!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                if (redirect) {
                    navigate(redirect);
                }
            } catch ({ response }) {
                if (response && response.status === 400) {
                    setError(response.data);
                }
            }
        },
    });
    if (user) {
        return <Navigate to="/" />
    }

    return (
        <>
            <PageHeader
                title='Creat Your Bussiness account now!'
                description='Only 29.99$ per month'
            />

            <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
                {error && <div className="alert alert-danger">{error}</div>}

                <Input type='email' label='Email' required {...form.getFieldProps("email")}
                    error={form.touched.email && form.errors.email} />
                <Input type='password' label='Password' required {...form.getFieldProps('password')}
                    error={form.touched.password && form.errors.password} />
                <Input type='text' label='Name' required {...form.getFieldProps('name')}
                    error={form.touched.name && form.errors.name} />

                <div className="my-2">
                    <button
                        type='submit'
                        disabled={!form.isValid}
                        className="btn btn-primary">Sign Up</button>
                </div>
            </form>
        </>
    )
}

export default SignUpBiz;