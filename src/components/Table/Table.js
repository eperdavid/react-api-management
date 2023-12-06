import React, { useState ,useEffect } from "react";

import classes from './Table.module.css';
import Row from "./Row/Row";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import Modal from "../UI/Modal/Modal";
import Spinner from "../UI/Spinner/Spinner";

import Form from "../UI/Modal/ModalContent/Form/Form";

const Table = () => {

    const KEY = "b2d5f45a3e11430e922334ffb8a559c3";

    const [error, setError] = useState(false);

    const [users, setUsers] = useState([]);

    const [filteredUsers, setFilteredUsers] = useState(users);

    useEffect(() => {
        fetch(`https://crudcrud.com/api/${KEY}/users`)
        .then(response => response.json())
        .then(data => {
            setUsers(data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setError(true); 
            setLoading(false);
        })
    }, []);

    useEffect(() => {
        setFilteredUsers(users);
        document.getElementById("search").value='';
    }, [users]); 


    const [userData, setUserData] = useState({
        userIndex: '',
        id: '',
        email: {value: "", touched: false},
        name: {value: "", touched: false},
        age: {value: "", touched: false}
    });

    const closeModal = () => {
        setModal(prevModal => ({...prevModal, show: false}));
    }

    const [modal, setModal] = useState({show: false, header: null, buttons: null, close: closeModal});

    const [loading, setLoading] = useState(true);

    const [errorMsg, setErrorMsg] = useState('');

    const userFilter = (event) => {
        setFilteredUsers(users.filter(user => user.email.toLowerCase().includes(event.target.value.toLowerCase())));
    }

    const inputChangeHandler = (event) => {
        
        const {name, value} = event.target;

        setUserData(prevUser => ({
            ...prevUser,
            [name]: {value: value, touched: true}
        }));

        setErrorMsg('');
        
    }

    

    const openModal = (id, modalType) => {

        let user = {
            userIndex: '',
            id: '',
            email: {value: "", touched: false},
            name: {value: "", touched: false},
            age: {value: "", touched: false}
        };
        
        if(id !== null)
        {
            const userIndex = users.findIndex(user => user._id === id);

            user={
                userIndex: userIndex,
                id: id,
                email: {value: users[userIndex].email, touched: false},
                name: {value: users[userIndex].name, touched: false},
                age: {value: users[userIndex].age, touched: false},
            }
            
        }
        
        setUserData(user);
        
        setModal(prevModal => ({...prevModal,  show: true, header: modalType}));
    }

    const createUserHandler = () => {
        const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if(userData.email.value && userData.name.value && userData.age.value && userData.age.value > 0 && userData.age.value <= 100)
        {
            if(userData.email.value.match(isValidEmail))
            {   

                fetch(`https://crudcrud.com/api/${KEY}/users`, {
                    headers: { "Content-Type": "application/json; charset=utf-8" },
                    method: 'POST',
                    body: JSON.stringify({
                        email: userData.email.value,
                        name: userData.name.value,
                        age: userData.age.value,
                    })
                })
                .then(response => response.json())
                .then(data => {
                    setUsers(prevUsers => ([
                        ...prevUsers,
                        {...data}
                    ]));
                    setModal(prevModal => ({...prevModal, show: false}));
                })
                .catch(err => {
                    console.log(err);
                    setError(true);
                    setModal(prevModal => ({...prevModal, show: false}));
                })
            }
            else{
                setErrorMsg('Érvénytelen email');
            }
        }
        else{
            setUserData(prevUserData => ({
                ...prevUserData,
                email: {...prevUserData.email, touched: true},
                name: {...prevUserData.name, touched: true},
                age: {...prevUserData.age, touched: true}
            }));
        }
    }

    const updateUserHandler = () => {
        const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if(userData.email.value && userData.name.value && userData.age.value && userData.age.value > 0 && userData.age.value <= 100)
        {
            if(userData.email.value.match(isValidEmail))
            {
                const updatedUsersArr = [...users]
                updatedUsersArr[userData.userIndex] = {
                    ...updatedUsersArr[userData.userIndex],
                    email: userData.email.value,
                    name: userData.name.value,
                    age: userData.age.value
                };


                fetch(`https://crudcrud.com/api/${KEY}/users/${userData.id}`, {
                    headers: {"Content-Type": "application/json"},
                    method: 'PUT',
                    body: JSON.stringify({
                        email: userData.email.value,
                        name: userData.name.value,
                        age: userData.age.value
                    })
                })
                .then(() => {
                    setUsers(updatedUsersArr);
                    setModal(prevModal => ({...prevModal, show: false}));
                })
                .catch(err => {
                    console.log(err);
                    setError(true);
                    setModal(prevModal => ({...prevModal, show: false}));
                })

            }
            else{
                setErrorMsg('Érvénytelen email');
            }
        }
        else{
            setUserData(prevUserData => ({
                ...prevUserData,
                email: {...prevUserData.email, touched: true},
                name: {...prevUserData.name, touched: true},
                age: {...prevUserData.age, touched: true}
            }));
        }
    }

    const deleteUserHandler = () => {
        const updatedUsersArr = [...users];
        updatedUsersArr.splice(userData.userIndex, 1);

        fetch(`https://crudcrud.com/api/${KEY}/users/${userData.id}`, {
            method: 'DELETE'
        })
        .then(() => {
            setUsers(updatedUsersArr);
            setModal(prevModal => ({...prevModal, show: false}));
        })
        .catch(err => {
            console.log(err);
            setError(true);
            setModal(prevModal => ({...prevModal, show: false}));
        })
    }

    let rows;

    if(!loading)
    {
        if(error)
        {
            rows = <tr><td colSpan={4} className={classes.centerText}>Something went wrong</td></tr>
        }
        else{
            if(filteredUsers.length > 0)
            {
                rows = filteredUsers.map(user => (
                    <Row key={user._id} email={user.email} name={user.name} age={user.age} updateAction={() => openModal(user._id, "Update")} deleteAction={() => openModal(user._id, "Delete")} />
                ));
            }
            else{
                rows = <tr><td colSpan={4} className={classes.centerText}>No data</td></tr>
            }
        }
        
    }
    else{
        rows = <tr><td colSpan={4}><Spinner /></td></tr>
    }
    

    let buttons = [<Button key={1} buttonType="secondary" type="button" clicked={closeModal}>Cancel</Button>];
        
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
                <Form user={userData} action={modal.header} changed={inputChangeHandler} error={errorMsg} />
            </Modal.Body>
            <Modal.Footer>
                {buttons}
            </Modal.Footer>
        </Modal>

        <div className={classes.Table}>
            <div className={classes.flexContainer}>
                <Input id="search" change={userFilter} placeholder="Search users by email" disabled={loading || error} />
                <Button className="addBtn" buttonType="primary" disabled={loading || error} clicked={() => openModal(null, "Create")}>Add new user</Button>
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