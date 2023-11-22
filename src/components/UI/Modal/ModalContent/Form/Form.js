import React, { useState, useRef } from 'react';

import classes from './Form.module.css';

import Input from '../../../Input/Input';


const Form = (props) => {

    console.log(props.user);    


    let content = null;

    if(props.action !== "Delete")
    {
        content = (
            <>
            <div>
                <label>Email</label>
                <Input type="text" name="email" value={props.user.email} change={props.changed} />
            </div>
            <div>
                <label>Name</label>
                <Input type="text" name="name" value={props.user.name} change={props.changed} />
            </div>
            <div>
                <label>Age</label>
                <Input type="number" name="age" value={props.user.age} change={props.changed} />
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