import React, { Fragment } from "react";
import RegisterComponent from "../../component/register"
import styles from './index.module.scss'
const Register: React.FC = (props) => {
    return (
        <Fragment>
            <div className={styles.login__container}>
                {/* <LoginComponent /> */}
                <RegisterComponent />
            </div>
        </Fragment>
    )
}
export default Register;
