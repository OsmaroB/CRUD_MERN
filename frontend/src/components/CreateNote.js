import React, { Component } from 'react'
import axios from 'axios';


export default class CreateNote extends Component {

    state = {
        users:[]
    }

    onSubmit = async (e) =>{
        e.preventDefault();
    }

    async componentDidMount() {//Manipular componente despues de montado
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({
            users: res.data.map(user => user.username)
        })
    }

    onInputChange =  e =>{
        this.setState({
            userSelected: e.target.value
        })
    }   


    render() {
        return (
            <div className="col-md-6 offset-md-3 p-4">
                <div className="card">
                    <div className="card-header">
                        <h3>Create a Note</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>

                            {/**SELECT USER */}
                            <div className="form-group">
                                <select name="userSelected" onChange={this.onInputChange} className="form-control" >
                                    <option value="">Select a user</option>
                                    { 
                                        this.state.users.map(user =>
                                        <option 
                                        key={user} 
                                        value={this.user}
                                        
                                        >{user}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <input 
                                type="text" 
                                placeholder="Title" 
                                name="title" 
                                className="form-control"/>
                            </div>
                            <button className="btn btn-primary" type="submit">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
