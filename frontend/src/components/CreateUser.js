import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {
    
    state = {
        username: '',
        users: []
        
    }

    async componentDidMount(){//Ejecutar codigo despues que algo a sido montado
        //Aca se pediran los datos
        this.getUsers();
    }

    onChangeUsername = e =>{//Esta forma permite que no agregar bind
        console.log(e.target.value);
        this.setState({
            username: e.target.value
        })
    }

    getUsers = async () =>{
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({
            users: res.data
        });
    }

    onSubmit = async e =>{
        e.preventDefault();//Evitamos que recargue
        await axios.post('http://localhost:4000/api/users',{
            username: this.state.username
        });
        this.setState({username:''});
        this.getUsers();
    }

    deleteUser = async (userId) => {
        const response = window.confirm('are you sure you want to delete it?');
        if (response) {
            await axios.delete('http://localhost:4000/api/users/' + userId);
            this.getUsers();
        }
    }

    render() {
        return (
            <div className="row p-4">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create New User</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    value={this.state.username}
                                    type="text"
                                    onChange={this.onChangeUsername}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Save
                    </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        <li className="list-group-item list-group-item-action text-white bg-info">USUARIOS</li>
                        {
                            this.state.users.map(user => (
                                <li className="list-group-item list-group-item-action" key={user._id} onDoubleClick={() => this.deleteUser(user._id)}>
                                    {user.username}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
