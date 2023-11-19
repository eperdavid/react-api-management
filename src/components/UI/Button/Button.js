import classes from './Button.module.css';

const button = (props) => {
    let buttonStyle = [classes.Button];
    buttonStyle.push(classes[props.buttonType]);

    return  <button className={buttonStyle.join(' ')} onClick={props.clicked} type={props.type}>{props.children}</button>
}

export default button;