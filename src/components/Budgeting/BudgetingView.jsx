import MonthView from './MonthView';
import CalendarMonth from './CalendarMonth';
import { useContext, useEffect } from 'react';

import {query,collection,onSnapshot, where} from 'firebase/firestore';
import {db} from '../../data/firestore';

import { UserData } from '../../contexts/UserData';


export default function BudgetingView({year,selectedMonth,selectMonth,monthsRange}){

	const {
		id: userID,
		setMyExpenses
	} = useContext(UserData);

	useEffect(() => {
		if (!userID) return;

		const q = query(collection(db, "calendata"), where("user_uid","==",userID));
		const unsub = onSnapshot(q, (querySnapshot) => {
			let dbItems = [];
			querySnapshot.forEach((doc) => {
				dbItems.push({ ...doc.data(), id: doc.id });
			});
			setMyExpenses(dbItems);
		});
		return () => unsub();
	}, [setMyExpenses,userID]);


	return (
		<>

			<div className="calendar-body flex-wrap max-w-xl p-3">
				{
				monthsRange.map((month,i)=>
					<CalendarMonth key={i}  month={month} year={year} selectMonth={selectMonth} />
				)
				}
			</div>
			<div className="month-details-container">
				<MonthView month={selectedMonth||0} year={year} />
			</div>

		</>
	)

}