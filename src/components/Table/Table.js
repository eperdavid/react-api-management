import React, { useState, useEffect } from "react";

import classes from './Table.module.css';
import Row from "./Row/Row";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import Modal from "../UI/Modal/Modal";

import Form from "../UI/Modal/ModalContent/Form/Form";

const Table = () => {
    
    const [users] = useState([
        {id: 0, email: 'asl.com', name: 'Vaiajjfkglhdlfkgjdklfjgdfkélgjdfklégjdfklgjdfkglkjdfgasl nev', age: 28},
        {id: 1, email: 'bsd.com', name: 'nev', age: 30},
        {id: 2, email: 'ashh.com', name: 'Vaiajjfkglhdlfkgjdklfjgdfkélgjdfklégjdfklgjdfkglkjdfgasl nev', age: 29}
    ]);

    const [userData, setUserData] = useState({
        id: "",
        email: "",
        name: "",
        age: ""
    });

    const [filteredUsers, setFilteredUsers] = useState(users);

    const [modal, setModal] = useState({show: false, header: null, buttons: null});

    const userFilter = (event) => {
        setFilteredUsers(users.filter(user => user.email.toLowerCase().includes(event.target.value.toLowerCase())));
    }

    const inputChangeHandler = (event) => {
        const {name, value} = event.target;
        setUserData(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    }

    console.log("Table");

    const openModal = (id, modalType) => {

        let user = {
            email: '',
            name: '',
            age: ''
        };
        
        if(id !== null)
        {
            const userIndex = users.findIndex(user => user.id === id);

            user={
                email: users[userIndex].email,
                name: users[userIndex].name,
                age: users[userIndex].age,
            }
            
        }
        
        setUserData(user);
        
        setModal(prevModal => ({...prevModal,  show: true, header: modalType}));
    }

    const createUserHandler = () => {
        console.log("create", userData);
    }

    const updateUserHandler = () => {
        console.log("update", userData);
    }

    const deleteUserHandler = () => {
        console.log("delete", userData);
    }

    

    let rows = filteredUsers.map(user => (
        <Row key={user.id} email={user.email} name={user.name} age={user.age} updateAction={() => openModal(user.id, "Update")} deleteAction={() => openModal(user.id, "Delete")} />
    ));

    let buttons = [<Button key={1} buttonType="secondary" type="button" clicked={() => setModal(prevModal => ({...prevModal, show: false}))}>Cancel</Button>];
        
        switch(modal.header) {
            case("Create"):
                    buttons.unshift(<Button key={2} buttonType="primary" clicked={createUserHandler}>Create</Button>);
                break;
            case("Update"):
                    buttons.unshift(<Button key={2} buttonType="primary" clicked={updateUserHandler}>Update</Button>);
                break;
            case("Delete"):
                    buttons.unshift(<Button key={2} buttonType="danger" clicked={deleteUserHandler}>Delete</Button>);
                break;
            default:
                buttons = null;
        }


    return (
        <>

        <Modal {...modal}>
            <Modal.Header>
                {modal.header}
            </Modal.Header>
            <Modal.Body>
                <Form user={userData} action={modal.header} changed={inputChangeHandler} />
            </Modal.Body>
            <Modal.Footer>
                {buttons}
            </Modal.Footer>
        </Modal>

        <div className={classes.Table}>
            <div className={classes.flexContainer}>
                <Input change={userFilter} placeholder="Search users" />
                <Button className="addBtn" buttonType="primary" clicked={() => openModal(null, "Create")}>Add new user</Button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default Table;