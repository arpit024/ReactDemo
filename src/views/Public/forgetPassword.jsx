import React, { useState } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { TextField, Typography, Button, Grid } from '@material-ui/core';
import { useNavigate } from 'react-router-dom'

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
    },
})
const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <Typography htmlFor={props.id || props.name}>{label}</Typography>
            <TextField className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

const ForgotPassword = (props) => {
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (values) => {
        let res = await axios.post('/api/userAuthService/forgotPassword', {
            username: values.email
        })

        if (res.data.status == 1) {
            navigate('/')
        } else {
            setError(true)
        }
    }
    const { classes } = props;
    return (
        <>
            <div className={classes.root}>
                <h1>Forgot Password!</h1>
                <Formik
                    initialValues={{
                        email: ''
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email('Invalid email address')
                            .required('Required')

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
                                <MyTextInput
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
                                {error && <p color="red">This Email Address is not registered</p>}
                                <Button type="submit">Submit</Button>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </div>
        </>
    );
};
export default (withStyles(styles, { withTheme: true })(ForgotPassword))