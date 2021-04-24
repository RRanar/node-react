import React from "react";  
import {Switch, Route, Redirect} from "react-router-dom";
import {MainUserPage} from "./pages/MainUser.page";
import {CreatePage} from "./pages/Create.page";
import {InfoPage} from "./pages/Info.page";
import {AuthPage} from "./pages/Auth.page";

export const useRoutes = (isAuth) => {
    if (isAuth) {
        return (
            <Switch>
                <Route path="/home" exact>
                    <MainUserPage />
                </Route>

                <Route path="/create" exact>
                    <CreatePage />
                </Route>

                <Route path="/info/:id" exact>
                    <InfoPage />
                </Route>

                <Redirect to="/create"/>
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>

            <Redirect to="/" />
        </Switch>
    );
};