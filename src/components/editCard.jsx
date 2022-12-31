import { useFormik } from "formik";
import { useState } from "react";
import formikValidateUsingJoi from "../utils/formikValidateUsingJoi";
import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import Joi from "joi";
import { updateCard } from "../services/cardService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import useCard from "../hooks/useCard";
import { useEffect } from "react";

const EditCard = ({ redirect }) => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const card = useCard(id);

    const form = useFormik({
        validateOnMount: true,
        initialValues: {
            bizName: '',
            bizDescription: '',
            bizAddress: '',
            bizPhone: '',
            bizImage: '',
        },
        validate: formikValidateUsingJoi({
            bizName: Joi.string().min(2).max(255).required().label('Name'),
            bizDescription: Joi.string().min(2).max(1024).required().label('Description'),
            bizAddress: Joi.string().min(2).max(400).required().label('Address'),
            bizPhone: Joi.string().min(9).max(10).required().regex(/^0[2-9]\d{7,8}$/).label('Phone'),
            bizImage: Joi.string().min(11).max(1024).label('Image').allow(''),
        }),
        async onSubmit(values) {
            try {
                const { bizImage, ...body } = values;
                if (bizImage) {
                    body.bizImage = bizImage;
                }
                console.log(body);
                await updateCard(id, body);
                toast(' your card was update🎉');
                navigate(redirect);
            } catch ({ response }) {
                if (response && response.status === 400) {
                    setError(response.data);
                }
            }
        },

    });

    useEffect(() => {
        if (!card) {
            return;
        }
        const { bizName,
            bizDescription,
            bizAddress,
            bizPhone,
            bizImage, } = card;
        form.setValues({ bizName, bizAddress, bizDescription, bizPhone, bizImage })
    }, [card])
    return (
        <>
            <PageHeader
                title='Edit Card'
                description='Edit your card' />

            <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
                {error && <div className="alert alert-danger">{error}</div>}

                <Input
                    label='Name'
                    type='text'
                    required
                    {...form.getFieldProps('bizName')}
                    error={form.touched.bizName && form.errors.bizName}
                />
                <Input
                    label='Description'
                    type='text'
                    required
                    {...form.getFieldProps('bizDescription')}
                    error={form.touched.bizDescription && form.errors.bizDescription}
                />
                <Input
                    label='Address'
                    type='text'
                    required
                    {...form.getFieldProps('bizAddress')}
                    error={form.touched.bizAddress && form.errors.bizAddress}
                />
                <Input
                    label='Phone'
                    type='text'
                    required
                    {...form.getFieldProps('bizPhone')}
                    error={form.touched.bizPhone && form.errors.bizPhone}
                />
                <Input
                    label='Image'
                    type='text'
                    {...form.getFieldProps('bizImage')}
                    error={form.touched.bizImage && form.errors.bizImage}
                />
                <div className="my-2">
                    <button
                        type='submit'
                        disabled={!form.isValid}
                        className="btn btn-primary">
                        Edit Card
                    </button>
                </div>

            </form>
        </>
    )
}

export default EditCard;
