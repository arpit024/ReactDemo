import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography, Button, Grid } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { connect } from 'react-redux';
import { addUser } from '../../redux/actions/userAction';
import { updateUser } from '../../redux/actions/updateAction';
import Success from '../Success'
import { closeDialog } from '../../redux/actions/closeDialog';
import axios from 'axios'
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
class Users extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        age: ""
    }
    componentDidMount = async () => {
        if (this.props.match.params.id) {
            let res = await axios.get(`/api/getUser/${this.props.match.params.id}`)
            if (res.data.status == 1) {
                let resObj = res.data.data
                this.setState({
                    firstName: resObj.FirstName,
                    lastName: resObj.LastName,
                    email: resObj.Email,
                    age: resObj.Age
                })
            }
        }
        ValidatorForm.addValidationRule('isValidAge', (value) => {console.log(value)
            if (value < 0 || value > 100) {
                return false;
            }
            return true;
        });
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit = (e) => {
        if (this.props.match.params.id) {
            let data = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                age: this.state.age,
                id: this.props.match.params.id
            }
            this.props.updateUser(
                data
            );
        } else {
            let data = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                age: parseInt(this.state.age)
            }
            this.props.addUser(
                data
            );
        }
    }
    handleClose = () => {
        this.props.closeDialog();
        this.props.history.push("/index")
    }
    handleCloseEdit = () => {
        this.props.closeDialog();
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <div className={classes.root}>
                    <Paper style={{ padding: 20 }}>
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
                        <ValidatorForm
                            ref="form"
                            onSubmit={this.handleSubmit}
                            onError={errors => console.log(errors)}
                        >
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                className={classes.centerAlign}
                            >
                                <Grid item xs={12} sm={12} md={6} lg={4}>
                                    <TextValidator
                                        label="First Name"
                                        onChange={this.handleChange}
                                        name="firstName"
                                        className={classes.textWidth}
                                        value={this.state.firstName}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    className={classes.centerAlign}
                                ></Grid>
                                <Grid item xs={12} sm={12} md={6} lg={4}>
                                    <TextValidator
                                        label="Last Name"
                                        onChange={this.handleChange}
                                        name="lastName"
                                        className={classes.textWidth}
                                        value={this.state.lastName}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
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
                                <TextValidator
                                    label="Age"
                                    onChange={this.handleChange}
                                    name="age"
                                    type="number"
                                    className={classes.textWidth}
                                    value={this.state.age}
                                    validators={['required','isValidAge']}
                                    errorMessages={['this field is required','Please enter valid age between 0 to 100']}
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
                                    <TextValidator
                                        label="Email"
                                        onChange={this.handleChange}
                                        name="email"
                                        className={classes.textWidth}
                                        value={this.state.email}
                                        validators={['required', 'isEmail']}
                                        errorMessages={['this field is required', 'email is not valid']}
                                    /><br />
                                    <Button type="submit" variant="outlined">Submit</Button>

                                </Grid>

                            </Grid>
                        </ValidatorForm>
                    </Paper>
                    {this.props.result && <Success headerText="Success" bodyText="Record has been saved successfully" successButton={[{ buttonText: "OK", handleClose: this.handleClose }]} />}
                    {this.props.emailExists && <Success headerText="Error" bodyText="Email ID already registered" successButton={[{ buttonText: "OK", handleClose: this.handleCloseEdit }]} />}

                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        result: state.add.success || state.update.success,
        emailExists: state.add.emailExists
    }
}
export default connect(mapStateToProps, { addUser, updateUser, closeDialog })((withStyles(styles, { withTheme: true }))(Users));