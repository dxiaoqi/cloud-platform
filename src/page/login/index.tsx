import React, { Fragment } from "react";
import LoginComponent from "../../component/login"
import RegisterComponent from "../../component/register"
import styles from './index.module.scss'
const Login: React.FC = (props) => {
    return (
        <Fragment>
            <div className={styles.login__container}>
                {/* <LoginComponent /> */}
                <LoginComponent />
            </div>
        </Fragment>
    )
}
export default Login;
