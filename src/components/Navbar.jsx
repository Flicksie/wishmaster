import { useContext } from "react";
import { UserData } from "../contexts/UserData";
import { Authentication } from "../data/AuthManager";
import UserDisplay from "./UserDisplay";

export default function Navbar(){

    const { authenticated } = useContext(UserData);
    
    return (
        <nav className="flex items-center h-12">
        {
            authenticated 
            ? <UserDisplay></UserDisplay>
            : <></>
        }
            <Authentication/>
        </nav>  
    )
}