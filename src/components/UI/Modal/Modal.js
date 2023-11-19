import React from 'react';
import classes from './Modal.module.css';

import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {

    const formSubmit = (event) => {
        event.preventDefault();
    }

    return(
    <>
    <Backdrop show={props.show}/>
    <form className={classes.Modal} style={{opacity: props.show ? '1' : '0', transform: props.show ? 'translateY(0)' : 'translateY(-100vh)'}} onSubmit={formSubmit}>
        <div className={classes.Header}>
            {props.header}
        </div>
        <div className={classes.Body}>
            {props.body}
        </div>
        <div className={classes.Footer}>
            {props.buttons}
        </div>
    </form>
    </>
    );
};

export default modal;