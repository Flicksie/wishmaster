import MonthView from './MonthView';
import CalendarMonth from './CalendarMonth';
import { useContext, useEffect } from 'react';

import {query,collection,onSnapshot, where} from 'firebase/firestore';
import {db} from '../../data/firestore';

import { UserData } from '../../contexts/UserData';
import ExpenseEntryWriter from '../Expenses/ExpenseEntryWriter';


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
			<div className='container'>
				<div className='bg-white px-3'>
					<ExpenseEntryWriter month={selectedMonth} year={year}></ExpenseEntryWriter>
				</div>
				<div className='container flex'>
					<div className="calendar-body flex-wrap max-w-xl p-3">
						{
							monthsRange.map((monthName,i)=>
							<CalendarMonth key={i}  month={monthName} year={year} selectedMonth={selectedMonth} selectMonth={selectMonth} />
							)
						}
					</div>
					<div className="w-full month-details-container bg-white py-3 px-6">
						<MonthView month={selectedMonth||0} year={year} />
					</div>

				</div>
			</div>
		</>
	)

}