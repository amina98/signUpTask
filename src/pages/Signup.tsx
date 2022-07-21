import React, { useEffect, useState } from 'react';
import {
    ArrowBack, PersonOutline, PhoneIphone, MailOutline, LockOutlined, VisibilityOutlined, VisibilityOffOutlined
} from '@material-ui/icons/';
import styles from './signup.module.sass';
import Cookies from 'js-cookie'
import { Snackbar } from '@material-ui/core';

const Signup: React.FC = () => {
    interface IUser {
        userName: string,
        mobile: string,
        email: string,
        password: string
    }
    interface IUserValid {
        userName: string,
        mobile: string,
        email: string,
        password: string
    }
    const initialValue = {
        userName: "",
        mobile: "",
        email: "",
        password: ""
    }
    const [userData, setUserData] = useState<IUser>(initialValue)
    const [firstClick, setFirstClick] = useState<boolean>(false)
    const [passwordType, setPasswordType] = useState<string>("password")
    const [errors, setErrors] = useState<IUserValid>(initialValue);
    const [open, setOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const changePasswordType = () => {
        if (passwordType === "password") {
            setPasswordType("text")
        } else {
            setPasswordType("password")
        }
    }
    useEffect(() => {
        if (firstClick)
            validationForm(userData)
    }, [userData])
    const validationForm = (data: IUser): object => {
        const err: IUserValid = initialValue;
        if (!data.userName) {
            err.userName = "userName is empty"
        } else {
            err.userName = ""
        }
        if (!/(\+?98|098|0|0098)?(9\d{9})$/.test(data.mobile)) {
            err.mobile = "mobile is wrong"
        } else {
            err.mobile = ""
        }
        if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(data.email)) {
            err.email = "email is wrong"
        } else {
            err.email = ""
        }
        if (data.password.length < 8) {
            err.password = "password is short"
        } else {
            err.password = ""
        }

        setErrors(err)
        return err
    }
    const submitHandler = (e: any) => {
        e.preventDefault();
        setFirstClick(true)
        const er: any = validationForm(userData);
        if (!er.userName && !er.mobile && !er.email && !er.password) {
            setIsLoading(true)
            fetch('https://api.freerealapi.com/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: userData.userName,
                    email: userData.email,
                    password: userData.password,
                })
            })
                .then((response) => response.json())
                .then((json) => {
                    setIsLoading(false)
                    if (json.success) {
                        Cookies.set("token", json.token)
                        setOpen(true)
                    } else {
                        Cookies.remove("token")
                        setErrors({ ...errors, email: json.message })
                    }
                })
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.wave1}></div>
            <div className={styles.wave2}></div>
            <div className={styles.backArrow}>
                <ArrowBack />
            </div>
            <div className={styles.mainContainer}>
                <h3 className={styles.title} >Sign up </h3>
                <p className={styles.dis} >create an account here</p>
                <form className={styles.formContainer} onSubmit={submitHandler} >
                    <div className={styles.inputField}>
                        <PersonOutline />
                        <input type={"text"} placeholder="create an account here" value={userData.userName} onChange={(e) => setUserData({ ...userData, userName: e.target.value })} />
                    </div>
                    <span className={styles.errText}>{errors.userName}</span>
                    <div className={styles.inputField}>
                        <PhoneIphone />
                        <input type={"tel"} placeholder="Mobile number" value={userData.mobile} onChange={(e) => setUserData({ ...userData, mobile: e.target.value })} />
                    </div>
                    <span className={styles.errText}>{errors.mobile}</span>
                    <div className={styles.inputField}>
                        <MailOutline />
                        <input type={"text"} placeholder="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                    </div>
                    <span className={styles.errText}>{errors.email}</span>
                    <div className={styles.inputField}>
                        <LockOutlined
                        />
                        <input type={passwordType} placeholder="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                        <div className={styles.passwordEye} onClick={changePasswordType}>
                            {passwordType === "password" && <VisibilityOutlined />}
                            {passwordType === "text" && <VisibilityOffOutlined />}
                        </div>
                    </div>
                    <span className={styles.errText}>{errors.password}</span>
                    <p className={styles.terms}>By signung up you agree with our Terms of Use</p>
                    <button type={'submit'} className={styles.signUpBtn}>{isLoading ? "Loading..." : "Sign UP"}</button>
                </form>
                <div className={styles.orContainer}>
                    <div className={styles.or}><span>OR</span></div></div>
                <button className={styles.otherWay}>
                    Login with Gmail
                </button>
                <button className={styles.otherWay}>
                    Login with Facebook
                </button>
                <p className={styles.link}>New member? <a>Sign up</a></p></div>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                message="you sign up successfully"
            />
        </div>
    )
}

export default Signup