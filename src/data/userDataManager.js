import { useContext, useEffect } from 'react';
import {query,collection,where,getDocs} from 'firebase/firestore';
import {db} from '../../data/firestore';

import {UserData} from '../contexts/UserData';

export default function SetUserData({userID}){

    const userDataCtx = useContext(UserData)

	useEffect( () => {
        (async () => {

            //               [  Collection reference  ]
            const q = query( collection(db, "userdata"), where("id","==", userID) );
            
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());

                const docData = doc.data();
                
                userDataCtx.setID(userID);
                userDataCtx.setBaseCurrency( docData.baseCurrency );
                userDataCtx.setMyBalance( docData.myBalance );
                userDataCtx.setTheme( docData.theme );
                userDataCtx.setMyLocale( docData.myLocale );
                userDataCtx.setMyCurrencies( docData.myCurrencies );
                userDataCtx.setDbDocID( doc.id );
                
            });
        })()
	}, [userDataCtx, userID]);

}