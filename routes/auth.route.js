const {Router} = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const {check, validationResult} = require("express-validator");
const User = require("./../models/User.model");

const router = Router();

// /api/auth/register
router.post(
"/register",
[
    check("email", "Email is incorrect").isEmail(),
    check("password", "Min password length is 8 symbols").isLength({min: 8})
],
async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Validation error"
            })
        }

        const {email, password} = req.body;
        
        const isExists = await User.findOne({
            email
        });

        if (isExists) {
            return res.status(400).json(
                {
                    message:`User with this email alredy exists`
                }
            );
        }

        const hashedPass = await bcrypt.hash(
            password,
            config.get("passSalt")
        );

        const user = new User({
            email,
            password: hashedPass
        });

        await user.save();

        return res.status(201).json(
            {
                message: "User was create"
            }
        );

    } catch (e) {
        return res.status(500).json(
            {
                "message": e.message || "Server error was ocurred"
            }
        );
    }
});

// /api/auth/login
router.post(
    "/login",
    [
        check("email", "Email is incorrect").normalizeEmail().isEmail(),
        check("password", "Password is empty").exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Validation error"
                });
            }


            const {password, email} = req.body;
            
            const user = await User.findOne({ email });

            if(!user) {
                return res.status(400).json({
                    message: "User not found"
                });
            }

            const isMatch = bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json(
                    {
                        message: "Incorrect password"
                    }
                );
            }

            const token = jwt.sign(
                {
                    userId: user.id
                },
                config.get("jwtSecret"),
                {
                    expiresIn: "1h"
                }
            );

            return res.json({
                token,
                userId: user.id
            });

        } catch (e) {
            return res.status(500).json(
                {
                    "message": "Server error was occured"
                }
            );
        }
    }
);

module.exports = router;