import React, {useState, useEffect} from "react";
import { useHttp } from "./../hooks/http.hook";
import { useMessage } from "./../hooks/message.hook";

export const AuthPage = () => {
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    };

    const registerHandler = async () => {
        try {

            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
        } catch (e) {

        }
    };

    const loginHandler = async () => {
        try {

            const data = await request('/api/auth/login', 'POST', {...form});
            message(data.message);
        } catch (e) {

        }
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <div className="card blue darken-2">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>

                            <div className="input-field">
                                <input 
                                    id="email"
                                    name="email" 
                                    type="email" 
                                    className="white-input" 
                                    onChange = {changeHandler} />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input 
                                    id="password"
                                    name="password" 
                                    type="password" 
                                    className="white-input" 
                                    onChange = {changeHandler} />
                                <label htmlFor="password">Password</label>
                            </div>

                        </div>

                        <div className="card-action">
                            <button 
                                className="btn yellow darken-4"
                                onClick = {loginHandler}
                                disabled = {loading}>
                                    Sign in
                            </button>
                            &nbsp;
                            &nbsp;
                            <button 
                                className="btn gray lighten-2"
                                onClick = {registerHandler}
                                disabled = {loading}>
                                    Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};