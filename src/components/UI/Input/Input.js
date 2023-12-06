import classes from './Input.module.css';

const input = (props) => {

    let inputStyle = [classes.Input];
    inputStyle.push(classes[props.inputStyle]);

    return (
    <input 
    id={props.id}
    className={inputStyle.join(' ')} 
    placeholder={props.placeholder} 
    onChange={props.change} 
    type={props.type} 
    value={props.value} 
    name={props.name} 
    ref={props.inputRef} 
    defaultValue={props.defVal}
    maxLength={props.maxLen} 
    min={props.min} 
    max={props.max} 
    disabled={props.disabled} />
    );
}

export default input;