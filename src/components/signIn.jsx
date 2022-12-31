import { useFormik } from 'formik';
import { useState } from 'react';
import Input from './common/input';
import PageHeader from './common/pageHeader';
import Joi from 'joi';
import { formikValidateUsingJoi } from '../utils/formikValidateUsingJoi';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth.context';

const SignIn = ({ redirect }) => {
    const [error, setError] = useState('');
    const { login: loginUser, user } = useAuth();

    const navigate = useNavigate();

    const form = useFormik({
        validateOnMount: true,
        initialValues: {
            email: '',
            password: '',
        },
        validate: formikValidateUsingJoi({
            email: Joi.string().min(6).max(255).required().email({ tlds: { allow: false } }),
            password: Joi.string().min(6).max(1024).required(),
        }),
        async onSubmit(values) {
            try {
                await loginUser(values);

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
            <PageHeader title={'Sign In with Real App'}
                description={'mannage your account'} />

            <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
                {error && <div className="alert alert-danger">{error}</div>}

                <Input
                    label={'Your Email'}
                    type={'email'}
                    {...form.getFieldProps('email')}
                    error={form.touched.email && form.errors.email}
                />

                <Input
                    label={'Password'}
                    type={'password'}
                    {...form.getFieldProps('password')}
                    error={form.touched.password && form.errors.password}
                />

                <div className="my-2">
                    <button
                        type='submit'
                        disabled={!form.isValid}
                        className="btn btn-primary">
                        Sign In
                    </button>
                </div>
            </form>
        </>
    )
}

export default SignIn;