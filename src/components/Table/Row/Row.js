import classes from './Row.module.css';

import Button from '../../UI/Button/Button';
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const row = (props) => (
        <tr className={classes.Row}>
            <td>{props.email}</td>
            <td>{props.name}</td>
            <td>{props.age}</td>
            <td className={classes.Buttons}>
                <Button buttonType="primary" clicked={props.updateAction}><FaEdit /></Button>
                <Button buttonType="danger" clicked={props.deleteAction}><FaTrashAlt /></Button>
            </td>
        </tr>
);

export default row;