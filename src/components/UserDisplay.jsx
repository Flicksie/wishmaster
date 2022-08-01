import { useContext } from "react";
import { UserData } from "../contexts/UserData";

export default function UserDisplay(){    

    const {avatar, name} = useContext(UserData);

    return (
        <>
            <div className="flex items-center p-2">
                <img className="w-10 rounded-full mr-2" src={avatar}></img>
                <span className="text-lg font-bold">{name}</span>
            </div>
        </>
    )
}