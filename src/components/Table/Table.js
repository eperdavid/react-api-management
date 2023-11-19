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


    const [modal, setModal] = useState({show: false, header: null, body: null, buttons: null});

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
    
    const openModal = (id, modalType) => {

        
        if(id !== null)
        {
            const userIndex = users.findIndex(user => user.id === id);

            let user={
                email: users[userIndex].email,
                name: users[userIndex].name,
                age: users[userIndex].age,
            }
            
            setUserData(user);
            console.log(userData);
        }
        
        
        let buttons = [<Button key={1} buttonType="secondary" type="button" clicked={() => setModal(prevModal => ({...prevModal, show: false}))}>Cancel</Button>];
        
        switch(modalType) {
            case("Create"):
                    buttons.unshift(<Button key={2} buttonType="primary">Create</Button>);
                break;
            case("Update"):
                    buttons.unshift(<Button key={2} buttonType="primary">Update</Button>);
                break;
            case("Delete"):
                    buttons.unshift(<Button key={2} buttonType="danger">Delete</Button>);
                break;
            default:
                buttons = null;
        }
        
        setModal(prevModal => ({...prevModal,  show: true, header: modalType, body: <Form user={userData} action={modalType} changed={inputChangeHandler}/>, buttons: buttons}));
    }


    

    let rows = filteredUsers.map(user => (
        <Row key={user.id} email={user.email} name={user.name} age={user.age} updateAction={() => openModal(user.id, "Update")} deleteAction={() => openModal(user.id, "Delete")} />
    ));


    return (
        <>

        <Modal {...modal} />

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