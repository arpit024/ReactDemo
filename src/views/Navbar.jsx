import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography, Button, CardContent, TextField, Grid, FormLabel, FormHelperText } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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
        user: {
            firstName: "",
            lastName: "",
            email: ""
        }
    }
    handleChange = (event) => {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }
    handleSubmit = () => {
        // your submit logic
    }
    render() {
        const { classes } = this.props;
        const { user } = this.state;
        console.log(this.state)
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
                                        value={user.firstName}
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
                                        value={user.lastName}
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
                                        label="Email"
                                        onChange={this.handleChange}
                                        name="email"
                                        className={classes.textWidth}
                                        value={user.email}
                                        validators={['required', 'isEmail']}
                                        errorMessages={['this field is required', 'email is not valid']}
                                    /><br/>
                                    <Button type="submit" variant="outlined">Submit</Button>

                                </Grid>
                            </Grid>
                        </ValidatorForm>
                    </Paper>
                </div>
            </>
        )
    }
}

export default (withStyles(styles, { withTheme: true }))(Users);