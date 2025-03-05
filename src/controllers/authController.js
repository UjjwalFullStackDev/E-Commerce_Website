import { camparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';

// Register API
export const registerController = async (req, res) => {
    const { name, email, phone, password, address } = req.body;
    if(!name && !email && !phone && !password && !address) {
        return res.status(404).send({ message: 'All fields are required'})
    }

    try {
        const checkMail = await userModel.findOne({email});
        if(checkMail) {
            return res.status(400).send({ message: 'Email already registered'})
        }
        const hashedPassword = await hashPassword(password);

        const user = await new userModel({
            name,
            email,
            phone,
            password: hashedPassword,
            address
        }).save();

        res.status(201).send({ message: 'User registered sucessfully', user});
        
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error', error});
    };
};


// Login API
export const loginController = async (req, res) => {
    const { email, password } = req.body;
    if(!email && !password) {
        return res.status(404).send({ message: 'All fields are required'})
    }
    try {
        const verifyEmail = await userModel.findOne({email});
        if(!verifyEmail) {
            return res.status(404).send({ message: 'User not registered with this email'})
        }

        const checkPassoword = await camparePassword(password, verifyEmail.password);
        if(!checkPassoword) {
            return res.status(404).send({ message: "Passowd doesn't match"})
        }

        // Token
        const token = await jwt.sign({ _id:verifyEmail._id }, process.env.JWT_SECRET, { expiresIn:'7d'});

        res.status(200).send({ message: 'Login sucessful', user:{
            name: verifyEmail.name,
            email: verifyEmail.email,
            phone: verifyEmail.phone,
            address: verifyEmail.address,
        }, token})
        
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error', error});
    }
};


// Test Api
export const test = (req, res) => {
    res.status(200).send({ message: 'pass'})
}