import React from 'react';
import classes from './Modal.module.css';

import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {

    const formSubmit = (event) => {
        event.preventDefault();
    }

     return (
    <>
      <Backdrop show={props.show} close={props.close} />
      <form className={classes.Modal} style={{ opacity: props.show ? '1' : '0', transform: props.show ? 'translateY(0)' : 'translateY(-100vh)' }} onSubmit={formSubmit}>
        {props.children}
      </form>
    </>
  );
};

const Header = (props) => {
    return <div className={classes.Header}>{props.children}</div>;
};
  
const Body = (props) => {
    return <div className={classes.Body}>{props.children}</div>;
};
  
  const Footer = (props) => {
    return <div className={classes.Footer}>{props.children}</div>;
  };
  
  Modal.Header = Header;
  Modal.Body = Body;
  Modal.Footer = Footer;

export default Modal;