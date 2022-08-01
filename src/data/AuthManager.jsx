import { getAuth, signOut, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import {addDoc,updateDoc,doc,deleteDoc,query,collection,where,getDocs} from 'firebase/firestore'
import {db} from './firestore'
import { useContext } from "react";

import {UserData} from "../contexts/UserData";

export const getUser = (userID) => {
    const q = query( collection(db, "userdata"), where("id","==", userID) );
    
    console.log("first")
    return new Promise(async (resolve,reject)=>{

        const querySnapshot = await getDocs(q);

        if (querySnapshot.size === 0) return reject("NO-USER");

        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            const docData = doc.data();
            docData.dbDocID = doc.id;

            return resolve(docData);
        });
    })        
}
        
export const registerUser = async (userData_in) => {
    
    const authInfo = {
        id: userData_in.uid,
        name: userData_in.displayName,
        avatar: userData_in.photoURL
    };

    await addDoc( collection(db, 'userdata'), authInfo);
    console.log("User Registered");
}

const updateUserField = (docID,fields) => {
    return updateDoc( doc(db, 'userdata', docID), fields);
}

export const updateUser = async (userdata_in) => {
    const d = {
        preferredCurrency: userdata_in.preferredCurrency,
        myBalance: userdata_in.myBalance,
        theme: userdata_in.theme,
        myLocale: userdata_in.myLocale,
        myCurrencies: userdata_in.myCurrencies,
        dbDocID: userdata_in.dbDocID,
    };
    Object.keys(d).forEach(k => d[k] === undefined && delete d[k]);
    
    console.log(1)
    await updateDoc( doc(db, 'userdata', userdata_in.dbDocID), d);
}

const provider = new GithubAuthProvider();
const auth = getAuth();

export const popAuthenticate = (userContext) => {

    return signInWithPopup(auth, provider)
        .then( async (result) => {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;

            const {uid,displayName,photoURL} = user;

            const response = await getUser(uid).then(userDocData=>{
                // morestuff
                console.log("User Found!");

                userContext.setID(uid);
                if (userDocData.preferredCurrency)  userContext.setPreferredCurrency( userDocData.preferredCurrency );
                if (userDocData.myBalance)          userContext.setMyBalance( userDocData.myBalance );
                if (userDocData.theme)              userContext.setTheme( userDocData.theme );
                if (userDocData.myLocale)           userContext.setMyLocale( userDocData.myLocale );
                if (userDocData.myCurrencies)       userContext.setMyCurrencies( userDocData.myCurrencies );
                if (userDocData.dbDocID)            userContext.setDbDocID( userDocData.dbDocID );


            }).catch(err=>{
                console.warn(err);
                registerUser( user )
            });


            userContext.authenticate(true);
    
        // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error);
        // ...
        });
  
}


export const localSignOut = async (userContext) => {

    console.log(userContext)
    await updateUser(userContext);

    //with(userContext){

        userContext.setPreferredCurrency("PLN");
        userContext.setMyBalance(0);
        userContext.setTheme("default");
        userContext.setMyLocale("en");
        userContext.setMyCurrencies( ["BRL","EUR","PLN","USD"] );
        
        userContext.setMyExpenses([]);
        userContext.setMyWishlist([]);

        userContext.authenticate(false);

    //}
    signOut(auth);
};


export function Authentication(){
    const UserDataCtx = useContext(UserData);
    const {authenticated, authenticate} = UserDataCtx;

    return (
        <>
        {
            authenticated 
            ? <button onClick={()=> localSignOut(UserDataCtx)}> [[ SIGN OUT ]]  </button> 
            : <button onClick={()=> popAuthenticate(UserDataCtx)}> [[ SIGN IN ]]  </button> 
        }
        </>
    )
}