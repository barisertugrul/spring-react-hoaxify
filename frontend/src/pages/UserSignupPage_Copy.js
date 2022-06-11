import React, { useEffect, useState } from "react";
import { signup } from '../api/apiCalls';
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";
import { connect } from "react-redux";
import { signupHandler } from "../redux/authActions";

const UserSignupPage_Copy = (props) => {

/*     state = {
        username: null,
        displayName: null,
        password: null,
        comfirmPassword: null,
        errors: {}
    } */

    // const [username, setUsername] = useState()
    // const [displayName, setDisplayName] = useState()
    // const [password, setPassword] = useState()
    // const [comfirmPassword, setComfirmPassword] = useState()
    
    const [inputValues, setInputValues] = useState({
        username: '', displayName:'', password: '', comfirmPassword:''
      });
    
    const [errors, setErrors] = useState({
        username: '', displayName:'', password: '', comfirmPassword:''
      })


   /*  useEffect((field) => {
        function handleFieldChange(field) {
            
            const { name, value } = field;
            const fieldErrors = {...errors};
            fieldErrors[name] = undefined
          
            if(name === 'password' || name === 'comfirmPassword'){
                if(name === 'password' && value !== this.state.comfirmPassword){
                    fieldErrors.comfirmPassword = t('Password mismatch');
                }else if(name === 'comfirmPassword' && value !== this.state.password){
                    fieldErrors.comfirmPassword = t('Password mismatch');
                }else{
                    fieldErrors.comfirmPassword = undefined
                }
            }
            setErrors(fieldErrors)
        }

        return () => {
            handleFieldChange(field)
        }
    }) */

    const onChangeHandler = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
        const { username, displayName, password, comfirmPassword } = inputValues;
            const fieldErrors = {...errors};
            fieldErrors[name] = undefined
          
            if(name === 'password' || name === 'comfirmPassword'){
                if(name === 'password' && value !== comfirmPassword){
                    fieldErrors.comfirmPassword = t('Password mismatch');
                }else if(name === 'comfirmPassword' && value !== password){
                    fieldErrors.comfirmPassword = t('Password mismatch');
                }else{
                    fieldErrors.comfirmPassword = undefined
                }
            }
            setErrors(fieldErrors)
            console.log(errors)
            console.log(inputValues)
     };
    

/*
    onChange = event => {
        const { t } = this.props
        const { name, value } = event.target;
        const errors = {...this.state.errors};
        errors[name] = undefined

        if(name === 'password' || name === 'comfirmPassword'){
            if(name === 'password' && value !== this.state.comfirmPassword){
                errors.comfirmPassword = t('Password mismatch');
            }else if(name === 'comfirmPassword' && value !== this.state.password){
                errors.comfirmPassword = t('Password mismatch');
            }else{
                errors.comfirmPassword = undefined
            }
        }

        this.setState({
            [name]: value,
            errors
        })
    }
*/

    const onClickSignup = async event => {

        event.preventDefault();

        //const {username, displayName, password} = this.state
        const { history, dispatch } = props
        const { push } = history;

        const body = {
            username,
            displayName,
            password
        };
        
        //this.setState({pendingApiCall:true});

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
            console.log(error)
            // if (error.response.data.validationErrors) {
            //     setErrors(error.response.data.validationErrors)
            //     //this.setState({errors: error.response.data.validationErrors});
            // }
            
        }
        //this.setState({ pendingApiCall: false });
    }

    // onChangeUsername = event => {
    //     this.setState({
    //         username: event.target.value
    //     })
    // };

    // onChangeDisplayname = event => {
    //     this.setState({
    //         displayname: event.target.value
    //     })
    // };

    // onChangePassword = event => {
    //     this.setState({
    //         password: event.target.value
    //     })
    // };

    // onChangeComfirmpassword = event => {
    //     this.setState({
    //         comfirmpassword: event.target.value
    //     })
    // };

    

    //render() {
        const {pendingApiCall, t} = props;
        //const { errors } = this.state;
        const { username, displayName, password, comfirmPassword } = inputValues;

        return (
            <div className="container">
                <form>
                    <h1 className="text-center">{t('Sign Up')}</h1>
                    <Input name="username" label={t("Username")} error={errors.username} onChange={onChangeHandler}></Input>
                    <Input name="displayName" label={t("Display Name")} error={errors.displayName} onChange={onChangeHandler}></Input>
                    <Input name="password" label={t("Password")} error={errors.password} onChange={onChangeHandler} type="password" />
                    <Input name="comfirmPassword" label={t("Comfirm Password")} error={errors.comfirmPassword} onChange={onChangeHandler} type="password" />
                    {/* <div className="form-group">
                        <label>Username</label>
                        <input className={username ? 'form-control is-invalid' : 'form-control'} name="username" onChange={this.onChange}/>
                        <div className="invalid-feedback">{username}</div>
                    </div>
                    <div className="form-group">
                        <label>Display Name</label>
                        <input className={displayName ? 'form-control is-invalid' : 'form-control'} name="displayName" onChange={this.onChange}/>
                        <div className="invalid-feedback">{displayName}</div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" name="password" type="password" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label>Comfirm Password</label>
                        <input className="form-control" name="comfirmpassword" type="password" onChange={this.onChange}/>
                    </div> */}
                    <div className="text-center">
                        
{/* Çıkartıldı - Ders 49
                         <button className="btn btn-primary" 
                            onClick={this.onClickSignup}
                            disabled={pendingApiCall || comfirmPassword !== undefined}
                        >
                            {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>} {t('Sign Up')}
                        </button> */}
                        {/*Ders 49 - Eklenen START*/}
                        <ButtonWithProgress
                            onClick = { onClickSignup }
                            disabled = { pendingApiCall || errors.comfirmPassword !== undefined }
                            pendingApiCall={pendingApiCall}
                            text={t('Sign Up')}
                        />
                        {/*Ders 49 - Eklenen END*/}
                    </div>
                    
                </form>
            </div>
            
        )
    //}
}

const UserSignupPageWithTranslation = withTranslation()(UserSignupPage);
const UserSignupPageWithApiProgressForSignupRequest = withApiProgress(UserSignupPageWithTranslation, 'api/1.0/users')
const UserSignupPageWithApiProgressForLoginRequest = withApiProgress(UserSignupPageWithApiProgressForSignupRequest, 'api/1.0/auth')
export default connect()(UserSignupPageWithApiProgressForLoginRequest);