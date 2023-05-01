import userModel from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {

    const { username, firstname, lastname, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({ username, firstname, lastname, password: hashPassword });

    try {
        await newUser.save();
        res.status(200).json(newUser);

    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {

        console.log(`username=${username} password=${password}`)

        const user = await userModel.findOne({ username: username });
        if (user) {
            const validity = await bcrypt.compare(password, user.password);
            if (validity) {
                const token = await jwt.sign(JSON.stringify({_id:user._id}), "thisismyprivatekeyithinkthiswillok");
                
                    const userData = {};
                    userData.user = user;
                    userData.token = token
                    res.status(200).json(userData);
            
                }
                else {
                    res.status(400).json("invalid password");
                }

        }

        else {
            res.status(404).json("no user found")
        }


    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err });
    }
}


export const authUser = async (req, res) => {
    const  authToken  = req.params.token;

    try {
        const token = await jwt.verify(authToken, "thisismyprivatekeyithinkthiswillok");
        console.log(token)
        // const user = await userModel.findOne({_id:token});
        const user = await userModel.findOne(token);
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: error });
    }
}
