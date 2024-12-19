import express from 'express';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "mysecretkey";

const userRoute = express();


userRoute.get('/check', (req, res) => {  
    res.send('Hello World!');
});

userRoute.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    console.log(username)
    console.log(email)
    console.log(password)
    if(!username || !email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        // TODO DB call
        
        const newUser = await User.create({
            username: username,
            email : email,
            password: password
        }); 

        const token = jwt.sign({ id: newUser._id },JWT_SECRET, { expiresIn: '30d' });

        res.status(201).json({  
            user: {
                id: newUser._id,
                msg : `Welcome ${newUser.name}`,
            },
            token   
        });
    } catch (error) {
        console.log(error);
    }
});

userRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = Boolean(user.password === password);

        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });

        res.status(201).json({  
            user: {
                id: user._id,
                msg : `Welcome ${user.username}`,
            },
            token   
        });
    } catch (error) {
        console.log(error);
    }
});

userRoute.get('/userinfo', async (req, res) => {
    const { id } = req.headers;
    console.log(id)
    if (!id) {
        return res.status(400).json({ message: 'Please provide user ID' });
    }

    try {
        const user = await User.findById(id);
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            username : user.username,
            email : user.email
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});


userRoute.post('/update', async (req, res) => {
    console.log("/update tiggered");
    
    const { id } = req.headers;
    const { username, email } = req.body;

    if (!id || !username || !email) {
        return res.status(400).json({ message: 'Please provide user ID and new name' });
    }

    try {
        const user = await User.findByIdAndUpdate(id, { 
            username : username,
            email : email 
        });
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User name updated successfully', user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});

userRoute.delete('/delete', async (req, res) => {
    const { id } = req.headers;

    if (!id) {
        return res.status(400).json({ message: 'Please provide user ID' });
    }

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export { userRoute};    