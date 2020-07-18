const usersControll = {};

const User = require('../models/User');

usersControll.getUsers = async (req,res) => {
    const users = await User.find();
    res.json(users);
};
usersControll.createUser = async (req,res) =>{
    const { username} = req.body;
    const NewUser = new User({
        username: username
    });
    await NewUser.save();
    res.json('CREATE - User')
};
usersControll.deleteUser= async (req,res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json('DELETE - User ')
};

module.exports = usersControll;