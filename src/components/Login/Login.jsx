
import { TextField, Button } from "@mui/material";
import styles from './login.module.css';
import { loginUser } from "../../redux/user/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Login = () => {

    const { loading, failure } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        const payload = {
            email: data.get('email'),
            password: data.get('password')
        }

        dispatch(loginUser(payload));

        history.push('/');

    }

    return (
        <div className={styles.loginContainer}>
            <h1>LOGIN HERE</h1>
            <form onSubmit={handleLogin}>
                <TextField name="email" type="text" required placeholder="Enter Email..." sx={{ color: 'white' }} variant="outlined" label="Username" />
                <TextField name="password" type="password" required placeholder="Enter Password..." sx={{ color: 'white' }} variant="outlined" label="Password" />

                {loading ? <p>Logging you in....</p> : null}
                {failure ? <p>Something went wrong!</p> : null}

                <Button type="submit" variant="contained" disableElevation sx={{ marginTop: '20px' }}>Login</Button>
            </form>
        </div>
    )

};

export default Login;