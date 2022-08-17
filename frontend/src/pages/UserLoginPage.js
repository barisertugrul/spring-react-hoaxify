import Input from "../components/Input"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import ButtonWithProgress from "../components/ButtonWithProgress"
import { useApiProgress } from "../shared/ApiProgress";
//import { Authentication } from "../shared/AuthenticationContext"
import { useDispatch } from "react-redux"
import { loginHandler } from "../redux/authActions"

const UserLoginPage = (props) => {

    //static contextType = Authentication

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [loginError, setLoginError] = useState()

    useEffect(() => {
        setLoginError(undefined)
    },[username, password])

    const dispatch = useDispatch()

    const onClickLogin = async event => {
        event.preventDefault()

        const creds = {
            username,
            password
        }

        const { history } = props
        const { push } = history;

        setLoginError(undefined)
        try {
            await dispatch(loginHandler(creds))
            push('/user/' + username)
        } catch (apiError) {
            setLoginError(apiError.response.data.message)
        }
        
    }
    const { t } = useTranslation()
    const pendingApiCall = useApiProgress('post','api/1.0/auth')
    const buttonEnabled = username && password;
    return(
        <div className="container">
            <form>
                <h1 className="text-center">{t("Login")}</h1>
                <Input label={t("Username")} 
                    onChange={(event) => { setUsername(event.target.value) }}
                />
                <Input label={t("Password")} 
                    onChange={(event) => { setPassword(event.target.value) }} 
                    type="password"
                />
                {loginError && <div className="alert alert-danger">{ loginError }</div>}
                <div className="text-center mt-2">
                    <ButtonWithProgress
                        onClick={onClickLogin}
                        disabled={!buttonEnabled || pendingApiCall}
                        pendingApiCall={pendingApiCall}
                        text={t('Login')}
                    />
                </div>
            </form>
        </div>
    )
}

//const UserLoginPageWithApiProgress = withApiProgress(UserLoginPage, 'api/1.0/auth')
//const UserLoginPageWithTranslation = withTranslation()(UserLoginPageWithApiProgress);

export default UserLoginPage;