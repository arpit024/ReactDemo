import axios from 'axios';
import React from 'react';

function Authenticate(Component){
    return class authenticateApi extends React.Component{
        makeAuthenticatedApiCall=async(method, url, data)=>{
            try{
           let token=localStorage.getItem("token")
            let response =await axios({ method: method, url: url, headers: { 'Authorization': token },data })
            if(response.status == 200){
                return response
            }
        }catch(err){
            if(err.response.status==401){
                return "token expired"
            }
        }
        }
        render(){
            return(
                <>
                <Component authenticateApiCall={this.makeAuthenticatedApiCall} {...this.props}/>
                </>
            )
            }
    }
    
}
const AuthenticatedPage = (Component)=>{
        return Authenticate(Component)
}
export default AuthenticatedPage;