import React, { Component } from 'react'
import MUIDataTable from "mui-datatables";
import { connect } from 'react-redux';
import axios from 'axios'
import { Button } from '@material-ui/core';
import Success from '../Success'
import {deleteUser} from '../../redux/actions/deleteAction'
import {closeDialog} from '../../redux/actions/closeDialog';
import AuthenticatedPage from '../../components/AuthenicateApiCall';
class UserList extends Component {
    state = {
        data: [],
        delete: false,
        userid:""
    }
    columns = [
        {
            name: "FirstName",
            label: "First Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "LastName",
            label: "Last Name",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Email",
            label: "Email",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Age",
            label: "Age",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Delete",
            label: "",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    return (
                        <Button variant="outlined" style={{ backgroundColor: "red" }} onClick={() => this.handleDelete(value.id)}>Delete</Button>
                    )
                }
            }
        },
        {
            name: "Edit",
            label: "",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    return (
                        <Button variant="outlined" style={{ backgroundColor: "grey" }} onClick={() => this.handleEdit(value.id)}>Edit</Button>
                    )
                }
            }
        },
    ];

    options = {
        filterType: 'checkbox',
        selectableRows: false
    };
    handleDelete = (id) => {
        this.setState({ delete: true, userid:id })
    }
    handleEdit = (id) => {
        this.props.history.push("/editUser/"+id)
    }
    componentDidMount = async () => {
        let res = await this.props.authenticateApiCall("get",'/api/userService/userList',null)
        res.data.result.forEach(item => {
            item.Delete = { id: item.ID }
            item.Edit = { id: item.ID }
        })
        this.setState({ data: res.data.result })
    }
    componentDidUpdate = async (prevState) => {
        console.log(prevState.delete, this.state.delete)
        if(prevState.delete!=this.state.delete){
            let res = await axios.get('/api/userService/userList')
            res.data.result.forEach(item => {
                item.Delete = { id: item.ID }
                item.Edit = { id: item.ID }
            })
            this.setState({ data: res.data.result })
        }
    }
    handleClose = () => {
        this.setState({ delete: false })
        this.props.closeDialog();
    }
    dismiss = () => {
        this.setState({ delete: false })
    }
    handleDeleteRecord = () => {
        this.props.deleteUser(this.state.userid)
        this.setState({delete: false})
        this.props.history.push("/index")
    }
    render() {
        return (
            <React.Fragment>
                <div style={{maxWidth:1000, margin:"0px auto"}}>
                <MUIDataTable
                    title={"Users list"}
                    data={this.state.data}
                    columns={this.columns}
                    options={this.options}
                />
                </div>
                {this.state.delete && <Success headerText="Alert" bodyText="Are you sure, you want to delete this record" successButton={[{ buttonText: "YES", handleClose: this.handleDeleteRecord }, { buttonText: "NO", handleClose: this.handleClose }]} dismiss={this.dismiss} />}
                {this.props.result && <Success headerText="Success" bodyText="Record has been deleted successfully" successButton={[{buttonText:"OK",handleClose:this.handleClose}]}/>}

            </React.Fragment>
        );
    }

}
const mapStateToProps = (state) => {
    return {
        result: state.delete.success
    }
}
export default connect(mapStateToProps,{deleteUser,closeDialog})(AuthenticatedPage(UserList));

