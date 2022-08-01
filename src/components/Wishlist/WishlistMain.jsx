import WishlistEntryWriter from './WishlistEntryWriter';

import { useContext, useEffect } from 'react';

import { query, collection, onSnapshot, addDoc, updateDoc,doc, where } from 'firebase/firestore';
import { db } from '../../data/firestore';

import { UserData } from '../../contexts/UserData';


export default function Wishlist (){

    const { 
        id: userID,
        myWishlist,
        setMyWishlist,
    } = useContext(UserData);

    const commitPurchase = async (item) => {
        const timestamp = new Date();

        await addDoc( collection(db, 'calendata'), {
            month:          timestamp.getMonth() //~~monthRef.current?.value
          , year:           timestamp.getFullYear()  //~~yearRef.current?.value
          , type:           "expense"
          , value:        ~~item.price
          //, tags:           tagsRef.current?.value
          , currency:       item.currency
          , confirmed:      true
          , description:    item.description
        });
          
        await updateDoc( doc(db, 'wishlist', item.id), {
        acquired:true
        });
    
      }
  
    useEffect(()=>{
        if (!userID) return setMyWishlist([]);

        const q = query(collection(db,"wishlist"), where("user_uid","==",userID));
        const unsub = onSnapshot(q,(querySnapshot)=>{
            let dbItems=[];
            querySnapshot.forEach(doc => {
                dbItems.push({...doc.data(), id: doc.id})
            })
            setMyWishlist(dbItems);
        });
        return ()=> unsub();
    },[setMyWishlist, userID]);

    return (
        <>
            <WishlistEntryWriter />
            <table className='table-auto'>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Priority</th>
                        <th>details</th>
                        <th>Link</th>
                        <th>BUY</th>
                        <th>acq</th>
                    </tr>
                </thead>
                <tbody>
                    {(myWishlist||[]).map((entry,i) => 
                        <tr key={i}>
                            <td>{entry.name}</td>
                            <td>{entry.price}</td>
                            <td>{entry.priority}</td>
                            <td>{entry.details}</td>
                            <td>{entry.description}</td>
                            <td>
                                <button onClick={ ()=> commitPurchase(entry)}>YES!</button>
                            </td>
                            <td>{entry.acquired?"ye":"no"}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )

}