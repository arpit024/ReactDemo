import React, { useState, useEffect, useRef } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography, Button, Grid, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { addUser } from '../../redux/actions/userAction';
import { updateUser } from '../../redux/actions/updateAction';
import Success from '../Success'
import { closeDialog } from '../../redux/actions/closeDialog';
import { useParams, useNavigate } from 'react-router-dom';
import AuthenticatedPage from '../../components/AuthenicateApiCall';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
    },
    card: {
        maxWidth: 400,
        textAlign: "center"
    },
    centerAlign: { alignItems: "center", flexDirection: "row", marginBottom: "15px" },
    textWidth: {
        width: 400
    }
});
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
const SignUp = (props) => {
    const [inputField, setInputField] = useState({
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        password: ''
    });
    const { id } = useParams()
    let navigate = useNavigate()
    let formref = useRef('form')
    useEffect(async () => {
        if (id) {
            let res = await props.authenticateApiCall("get", `/api/userService/getUser/${props.match.params.id}`, null)
            if (res.data.status == 1) {
                let resObj = res.data.data
                setInputField.firstName(resObj.FirstName)
                setInputField.lastName(resObj.LastName)
                setInputField.email(resObj.Email)
                setInputField.age(resObj.Age)
            }
        }
    })
    const handleChange = (event) => {
        setInputField({ [event.target.name]: event.target.value });
    }
    const handleSubmit = (values) => {
        if (id) {
            let data = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                age: parseInt(values.age),
                id: id
            }
            props.updateUser(
                data
            );
        } else {
            let data = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                age: parseInt(values.age)
            }
            props.addUser(
                data
            );
        }
    }
    const handleClose = () => {
        props.closeDialog();
        navigate("/")
    }
    const handleCloseEdit = () => {
        props.closeDialog();
    }

    const { classes } = props;
    return (
        <>
            <div className={classes.root}>
                <Paper style={{ padding: 20 }}>
                    <Formik
                        initialValues={{
                            password: '',
                            email: '',
                            firstName:'',
                            lastName:'',
                            age:0
                        }}
                        validationSchema={Yup.object({
                            password: Yup.string()
                                .required('Required'),
                            email: Yup.string()
                                .email('Invalid email address')
                                .required('Required'),
                            firstName: Yup.string().required('Required'),
                            lastName: Yup.string().required('Required'),
                            age: Yup.number().min(1,'Invalid Age').max(100,'Invalid Age').required('Required'),
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
                            <Typography variant="h4" className={classes.centerAlign}>Add New User</Typography>
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
                                    <MyTextInput
                                        label="First Name"
                                        name="firstName"
                                        placeholder="Arpit"
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
                                    <MyTextInput
                                        label="Last Name"
                                        name="lastName"
                                        placeholder="Srivastava"
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
                                    <MyTextInput
                                        label="Age"
                                        name="age"
                                        type="number"
                                        placeholder="Age"
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
                                    <MyTextInput
                                        label="Password"
                                        name="password"
                                        type="password"
                                        placeholder="*****"
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
                                    <Button type="submit">Create User</Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                    </Paper>
                {props.result && <Success headerText="Success" bodyText="Record has been saved successfully" successButton={[{ buttonText: "OK", handleClose: handleClose }]} />}
                {props.emailExists && <Success headerText="Error" bodyText="Email ID already registered" successButton={[{ buttonText: "OK", handleClose: handleCloseEdit }]} />}

            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        result: state.add.success || state.update.success,
        emailExists: state.add.emailExists
    }
}
export default connect(mapStateToProps, { addUser, updateUser, closeDialog })((withStyles(styles, { withTheme: true }))(AuthenticatedPage(SignUp)));