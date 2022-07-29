
import { useState, useContext, useEffect } from 'react';
import { query, collection, onSnapshot, addDoc, updateDoc,doc } from 'firebase/firestore';
import { db } from '../../data/firestore';
import WishlistEntryWriter from './WishlistEntryWriter';

export default function Wishlist (){
    const [entries, setEntries] = useState([]);


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
      const q = query(collection(db,"wishlist"));
      const unsub = onSnapshot(q,(querySnapshot)=>{
        let dbItems=[];
        querySnapshot.forEach(doc => {
          dbItems.push({...doc.data(), id: doc.id})
        })
        setEntries(dbItems);
      });
      return ()=> unsub();
    },[]);

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
                    {entries.map((entry,i) => 
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