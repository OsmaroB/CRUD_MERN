import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {
    
    state = {
        users: [],
        username: ''
    }

    async componentDidMount(){//Ejecutar codigo despues que algo a sido montado
        //Aca se pediran los datos
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({
            users: res.data
        });
    }

    onChangeUserName = (e)=>{
        console.log(e.target.value);
        this.setState({
            username: e.target.value
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 p-4">
                        <div className="card">
                            <div className="card-header">
                                <h3>Create User</h3>
                            </div>
                            <div className="card-body">
                                <form >
                                    <div className="form-group">
                                        <input 
                                        type="text"
                                        className="form-control" 
                                        onChange={this.onChangeUserName}
                                        placeholder="User Name"
                                    />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 p-4">
                        <ul className="list-group">
                            <li className="list-group-item list-group-item-action">USUARIOS</li> 
                            {
                                this.state.users.map(user =>
                                <li className="list-group-item list-group-item-action" key={user._id}>{user.username}</li>    
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
