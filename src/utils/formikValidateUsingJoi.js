import Joi from "joi";

export const formikValidateUsingJoi = (schema) =>{
return (values) => {
    const { error } = Joi.object(schema).validate(values, { abortEarly: false });
            console.dir(error);
            const errors = {};
            {
                if (error) {
                    // for (const detail of error.details) {
                    //     // detail.path[0] = detail.message
                    //     const path = detail.path[0];
                    //     errors[path] = detail.message
                    // }
                    for (const { message, path: [errorKey] } of error.details) {
                        // detail.path[0] = detail.message

                        errors[errorKey] = message
                    }
                }
            }
            console.log(errors);
            return errors;
};
};

export default formikValidateUsingJoi;