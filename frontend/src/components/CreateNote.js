import React, { Component } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {

    state = {
        users:[],
        userSelected: '',
        title:'',
        content:'',
        date: new Date(),
        editing:false,
        _id: ''
    }

    onSubmit = async (e) =>{
        e.preventDefault();
        const newNote ={
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        }
        if(this.state.editing){
            await axios.put('http://localhost:4000/api/notes/'+this.state._id, newNote)
        }else{
            await axios.post('http://localhost:4000/api/notes',newNote)
        }
        window.location.href='/';
    }

    async componentDidMount() {//Manipular componente despues de montado
        
       const res = await axios.get('http://localhost:4000/api/users');
        this.setState({
            users: res.data.map(user => user.username)
        })
        if(this.props.match.params.id){
            const res = await axios.get('http://localhost:4000/api/notes/'+this.props.match.params.id);
            this.setState({
                editing: true,
                _id: this.props.match.params.id,
                title: res.data.title,
                content: res.data.content,
                userSelected: res.data.author,
                date: new Date(res.data.date)

            });
        }
    }

    onInputChange =  e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }   

    onChangeDate = date =>{
        this.setState({
            date: date
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
                                <select name="userSelected" onChange={this.onInputChange} className="form-control" value={this.state.userSelected}>
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
                                    className="form-control"
                                    required    
                                    onChange={this.onInputChange}
                                    value={this.state.title}
                                />
                            </div>
                            <div className="form-group">
                                <textarea 
                                    name="content" 
                                    className="form-control"
                                    placeholder="content"
                                    required
                                    onChange={this.onInputChange}
                                    value={this.state.content}
                                    ></textarea>
                            </div>
                            <div className="form-group">
                                <DatePicker 
                                    className="form-control"
                                    selected={this.state.date} 
                                    onChange={this.onChangeDate}
                                />
                            </div>
                            <button className="btn btn-primary" type="submit">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
