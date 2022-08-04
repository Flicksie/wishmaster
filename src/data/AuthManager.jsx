import { getAuth, signOut, signInWithPopup, GithubAuthProvider, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import {addDoc,updateDoc,doc,deleteDoc,query,collection,where,getDocs} from 'firebase/firestore'
import {db} from './firestore'
import { useContext, useEffect } from "react";

import {UserData} from "../contexts/UserData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef } from "react";

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
        baseCurrency: userdata_in.baseCurrency,
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


const auth = getAuth();

export const consolidateUser = (user,uCtx   ) => {

    const {uid} = user;
    return getUser(uid).then(userDocData=>{
        // morestuff
        console.log("User Found!");

        uCtx.setID(uid);
        if (userDocData.baseCurrency)  uCtx.setBaseCurrency( userDocData.baseCurrency );
        if (userDocData.myBalance)          uCtx.setMyBalance( userDocData.myBalance );
        if (userDocData.theme)              uCtx.setTheme( userDocData.theme );
        if (userDocData.myLocale)           uCtx.setMyLocale( userDocData.myLocale );
        if (userDocData.myCurrencies)       uCtx.setMyCurrencies( userDocData.myCurrencies );
        if (userDocData.dbDocID)            uCtx.setDbDocID( userDocData.dbDocID );
        if (userDocData.avatar)             uCtx.setAvatar( userDocData.avatar );
        if (userDocData.name)               uCtx.setName( userDocData.name );


    }).catch(err=>{
        console.warn(err);
        registerUser( user )
    });
}

export const popAuthenticate = (userContext) => {

    return setPersistence(auth, browserLocalPersistence).then( ()=> {
        const provider = new GithubAuthProvider();

        return signInWithPopup(auth, provider)
        .then( async (result) => {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            
            await consolidateUser( user, userContext );


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
        })
    });
  
}


export const localSignOut = async (userContext) => {

    console.log(userContext)
    await updateUser(userContext);

    //with(userContext){

        userContext.setBaseCurrency("PLN");
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

    let mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;
        const unsub = onAuthStateChanged(auth, (user) => {
          if (user) {
            if (mounted.current) {
                consolidateUser(user,UserDataCtx);
                authenticate(true);
            }
          } else {
            if (mounted.current) authenticate(false);
          }
        });
    
        return () => {
          mounted.current = false;
          unsub();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
      

    return (
        <>
        {
            authenticated 
            ? <button className="btn danger" onClick={()=> localSignOut(UserDataCtx)}>
                <FontAwesomeIcon icon="fa-arrow-right-from-bracket" />
                <span className="px-3" >
                    SIGN OUT
                </span>
            </button> 
            : <button className="btn github" onClick={()=> popAuthenticate(UserDataCtx)}>
                <FontAwesomeIcon icon="fab fa-github"/>
                <span className="px-3" >
                    SIGN IN
                </span>
            </button>
        }
        </>
    )
}