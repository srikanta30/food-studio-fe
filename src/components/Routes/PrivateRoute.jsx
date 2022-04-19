import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({path, children}) => {
    const {token} = useSelector(state => state.user);


    if(token) {
        return <Route path = {path}>{children}</Route>
    }
    else {
        return <Redirect to = '/login'/>
    }

   
}

export default PrivateRoute;