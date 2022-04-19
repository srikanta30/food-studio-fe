import { Button } from "@mui/material";
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import { useSelector } from 'react-redux';

const Navbar = () => {

    const { token } = useSelector(state => state.user);

return (
    <>
    <div className={styles.navbar}>
            <div>
                <h1>DASHBOARD</h1>
            </div>

            <div>

                {token ?
                    <></>
                    :
                    <Link to='/login'>
                        <Button  variant="contained" >
                            Login
                        </Button>
                    </Link>
                }
            </div>
        </div>
    </>
)
};

export default Navbar;