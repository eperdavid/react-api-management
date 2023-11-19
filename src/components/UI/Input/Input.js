import classes from './Input.module.css';

const input = (props) => (
    <input 
    className={classes.Input} 
    placeholder={props.placeholder} 
    onChange={props.change} 
    type={props.type} 
    value={props.value} 
    name={props.name} 
    ref={props.ref} />
)

export default input;