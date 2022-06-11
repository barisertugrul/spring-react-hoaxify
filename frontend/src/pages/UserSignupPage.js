import React, { useState } from "react";
import Input from "../components/Input";
import { useTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { useApiProgress } from "../shared/ApiProgress";
import { useDispatch } from "react-redux";
import { signupHandler } from "../redux/authActions";

const UserSignupPage = (props) => {

    const [inputValues, setInputValues] = useState({
        username: null, 
        displayName:null, 
        password: null, 
        comfirmPassword:null
      });
    
    const [errors, setErrors] = useState({})

    const dispatch = useDispatch()

    const onChangeHandler = event => {
        const { name, value } = event.target;
        setErrors((previousErrors) => ({...previousErrors,[name]:undefined}))
        setInputValues((previousValues) => ({...previousValues,[name]:value}))
     };

    const onClickSignup = async event => {

        event.preventDefault();

        const { username, displayName, password } = inputValues;
        const { history } = props
        const { push } = history;

        const body = {
            username,
            displayName,
            password
        };

        //Javascript promise yöntemi
        // signup(body)
        //     .then((response) => {
        //         this.setState({pendingApiCall:false});
        //     })
        //     .catch(error => {
        //         this.setState({ pendingApiCall: false })
        //     });

        //Promise yerine async sayesinde await
        //catch için try-catch bloğu
        try {
            await dispatch(signupHandler(body));
            push('/')
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors)
                //this.setState({errors: error.response.data.validationErrors});
            }
        }
    }
        const { t } = useTranslation()
        const pendingApiCallSignup = useApiProgress('post','api/1.0/users');
        const pendingApiCallLogin = useApiProgress('post','api/1.0/auth');

        const pendingApiCall = pendingApiCallSignup || pendingApiCallLogin
        const { username:usernameError, displayName:displayNameError, password:passwordError} = errors;
        let comfirmPasswordError;
        if(inputValues.password !== inputValues.comfirmPassword){
            comfirmPasswordError = t('Password mismatch')
        }

        return (
            <div className="container">
                <form>
                    <h1 className="text-center">{t('Sign Up')}</h1>
                    <Input name="username" label={t("Username")} error={usernameError} onChange={onChangeHandler}></Input>
                    <Input name="displayName" label={t("Display Name")} error={displayNameError} onChange={onChangeHandler}></Input>
                    <Input name="password" label={t("Password")} error={passwordError} onChange={onChangeHandler} type="password" />
                    <Input name="comfirmPassword" label={t("Comfirm Password")} error={comfirmPasswordError} onChange={onChangeHandler} type="password" />
                    <div className="text-center">
                        <ButtonWithProgress
                            onClick = { onClickSignup }
                            disabled = { pendingApiCall || comfirmPasswordError !== undefined }
                            pendingApiCall={pendingApiCall}
                            text={t('Sign Up')}
                        />
                    </div>
                    
                </form>
            </div>
            
        )
}

//const UserSignupPageWithApiProgressForSignupRequest = withApiProgress(UserSignupPage, 'api/1.0/users')
//const UserSignupPageWithApiProgressForLoginRequest = withApiProgress(UserSignupPageWithApiProgressForSignupRequest, 'api/1.0/auth')
export default UserSignupPage