import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';


const AppRoutes = () => {
    return (
        <div>
            <Switch>
                <Route path='/login' component={Login} />    
                <PrivateRoute>
                    <Route path='/' exact component={Dashboard} />
                </PrivateRoute>            
            </Switch>
        </div>
    )
}

export default AppRoutes;