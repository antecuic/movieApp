import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { withRouter } from 'react-router';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const currentUser = useContext(AuthContext);
    return(
        <Route
            { ...rest }
            render={ routeProps => {
               if (currentUser) {
                   return <Component {...routeProps}/>
               } else {
                   return <Redirect to={"/signIn"}/>
               }
            }
            }
        />
    )


}

export default  withRouter(PrivateRoute);