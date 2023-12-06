import React from 'react';

import classes from './Form.module.css';

import Input from '../../../Input/Input';


const Form = (props) => {


    const emailVal = props.user.email.value;
    const nameVal = props.user.name.value;
    const ageVal = props.user.age.value;

    let content = null;

    if(props.action !== "Delete")
    {
        content = (
            <>
            <p className={classes.ErrorMsg}>{props.error}</p>
            <div>
                <label>Email</label>
                <Input inputStyle={!emailVal && props.user.email.touched ? 'Error' : null} type="email" name="email" value={emailVal} change={props.changed} maxLen={30} />
            </div>
            <div>
                <label>Name</label>
                <Input inputStyle={!nameVal && props.user.name.touched ? 'Error' : null} type="text" name="name" value={nameVal} change={props.changed} maxLen={20} />
            </div>
            <div>
                <label>Age</label>
                <Input inputStyle={!ageVal && props.user.age.touched ? 'Error' : null} type="number" name="age" value={ageVal} change={props.changed} min={1} max={100} />
            </div>
            </>
        );
    }
    else{
        content = ("Are you sure you want to delete this user?");
    }


    return (
    <div className={classes.Form}>

        {content}

    </div>
    );
}

export default Form;