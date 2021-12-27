import React, { useState } from 'react';
import { Formik, Form, useField, Field } from 'formik';
import * as Yup from 'yup';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { TextField, Typography, Button, Grid } from '@material-ui/core';
import { useNavigate, Link } from 'react-router-dom'
import FormikController from '../../FormikComponent/FormikController'
const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
    },
})

const MyCheckbox = ({ children, ...props }) => {
    // React treats radios and checkbox inputs differently other input types, select, and textarea.
    // Formik does this too! When you specify `type` to useField(), it will
    // return the correct bag of props for you -- a `checked` prop will be included
    // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <div>
            <label className="checkbox-input">
                <input type="checkbox" {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

// And now we can use these
const Login = (props) => {
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (values) => {
        let res = await axios.post('/api/userAuthService/login', {
            username: values.email,
            password: values.password
        })

        if (res.data.status == 1) {
            localStorage.setItem("token", res.data.token)
            navigate('/user')
        } else {
            setError(true)
        }
    }
    const handleForget = () => {
        navigate('/forgetPassword')
    }
    const { classes } = props;
    return (
        <>
            <div className={classes.root}>
                <h1>Login!</h1>
                <Formik
                    initialValues={{
                        password: '',
                        email: '',
                        acceptedTerms: true, // added for our checkbox
                    }}
                    validationSchema={Yup.object({
                        password: Yup.string()
                            .required('Required'),
                        email: Yup.string()
                            .email('Invalid email address')
                            .required('Required'),
                        acceptedTerms: Yup.boolean()
                            .oneOf([true], 'You must accept the terms and conditions.'),

                    })}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            className={classes.centerAlign}
                        >
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <FormikController 
                                    control="input"
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            className={classes.centerAlign}
                        >
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                            <FormikController 
                                    control="input"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    placeholder="*****"
                                />
                            </Grid>
                        </Grid><br />
                        {/* <MyCheckbox name="acceptedTerms">
                        I accept the terms and conditions
          </MyCheckbox> */}
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            className={classes.centerAlign}
                        >
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                {error && <p color="red">Incorrect Email or password</p>}
                                <Button type="submit">Submit</Button>
                                <Button onClick={handleForget}>Forget Password</Button><br />
                                <Link to="signup" style={{ 'text-decoration': 'none' }}>New User Sign Up</Link>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </div>
        </>
    );
};
export default (withStyles(styles, { withTheme: true })(Login))