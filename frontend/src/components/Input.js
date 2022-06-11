import React from "react";

const Input = props => {
    const { label, error, name, onChange, type, defaultValue, className:classname } = props;
    let className = 'form-control'
    if(type === "file"){
        className += '-file'
    }
    if(classname){
        className += " " + classname
    }
    if(error !== undefined){
        className += ' is-invalid'
    }
    //const className = error ? 'form-control is-invalid' : 'form-control';
    return(
        <div className="form-group">
            <label>{label}</label>
            <input 
                className={className} 
                name={name} 
                onChange={onChange} 
                type={type}
                defaultValue={defaultValue}
            />
            <div className="invalid-feedback">{error}</div>
        </div>
    );
}

export default Input;