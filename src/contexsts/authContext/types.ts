import {User} from "../../components/types";
import React from "react";

export type AuthContextType = {
    isLoggedIn: boolean,
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}