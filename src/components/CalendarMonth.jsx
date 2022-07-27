import {useState,useContext,useEffect} from 'react';
import {query,collection,onSnapshot} from 'firebase/firestore';
import {db} from '../data/firestore';
import { LocaleProvider } from "../contexts/LocaleContext";


const MonthTools = {
	reducer: (p, c) => p + c.value || 0,
	filterByType: (type) => (itm) => itm.confirmed && itm.type === type,
};
export default function CalendarMonth({ month, selectMonth }) {
	
	const { locale } = useContext(LocaleProvider);
	const [entries, setEntries] = useState([]);

	useEffect(() => {
		const q = query(collection(db, "calendata"));
		const unsub = onSnapshot(q, (querySnapshot) => {
			let dbItems = [];
			querySnapshot.forEach((doc) => {
				dbItems.push({ ...doc.data(), id: doc.id });
			});
			setEntries(dbItems);
		});
		return () => unsub();
	}, []);

	const monthName = new Date(1, month, 1).toLocaleString(locale, {
		month: "long",
	});
	const entriesFromThisMonth = entries.filter((entry) => entry.month === month);

	const month_total_in = entriesFromThisMonth
		.filter(MonthTools.filterByType("income"))
		.reduce(MonthTools.reducer, 0);

	const month_total_out = entriesFromThisMonth
		.filter(MonthTools.filterByType("expense"))
		.reduce(MonthTools.reducer, 0);

	const net_total = month_total_in - month_total_out;

	//new Date(year, month, 0). getDate();

	return (
		<>
			<div
				onClick={() => selectMonth(month)}
				className="cursor-pointer cal-month-container rounded-md overflow-hidden w-40 h-28 shadow-md shadow-slate-200 m-1 inline-block"
			>
				<div className="month-header bg-slate-500 px-2 pt-.5 pb-1 text-white font-bold">
					{" "}
					{monthName}{" "}
				</div>
				<div className="month-body px-3 py-1">
					<div className="justify-between flex">
						<span className="font-light text-slate-700">Income:</span>
						<span className="text-green-600">{month_total_in}</span>
					</div>
					<div className="justify-between flex">
						<span className="font-light text-slate-700">Expenses:</span>
						<span className="text-red-600">{month_total_out}</span>
					</div>
					<div className="justify-between flex">
						<span className="font-light text-slate-700">Net Total:</span>
						<span
							className={net_total > 0 ? "text-emerald-700" : "text-red-700"}
						>
							{net_total}
						</span>
					</div>
				</div>
			</div>
		</>
	);
}
