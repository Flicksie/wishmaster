import {useState,useContext,useEffect} from 'react';
import {query,collection,onSnapshot} from 'firebase/firestore';
import {db} from '../../data/firestore';
import { LocaleProvider } from "../../contexts/LocaleContext";
import CurrencyToken from './CurrencyToken';


export default function CalendarMonth({ baseCurrency, currRates, month, selectMonth }) {
	
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


	const reducer= (p, c) => {
		//console.log( 1,c.currency, "are",1/currRates.rates?.[c.currency] ,baseCurrency, `( for [${c.value}])` )
		return p + (c.value || 0)  / currRates.rates?.[c.currency];
	}
	const filterByType= (type) => (itm) => itm.confirmed && itm.type === type;


	const month_total_in = ~~ entriesFromThisMonth
		.filter(filterByType("income"))
		.reduce(reducer, 0);

	const month_total_out = ~~ entriesFromThisMonth
		.filter(filterByType("expense"))
		.reduce(reducer, 0);

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
				{ currRates.loading 
					? 
						<> <div> Loading... </div> </> 
					:						
						<div className="month-body px-3 py-1">
						<div className="justify-between flex">
							<span className="font-light text-slate-700">Income:</span>
							<span className="text-green-600">
								{month_total_in}<CurrencyToken {...{baseCurrency}}/>
							</span>
						</div>
						<div className="justify-between flex">
							<span className="font-light text-slate-700">Expenses:</span>
							<span className="text-red-600">
								{month_total_out}<CurrencyToken {...{baseCurrency}}/>
								</span>
						</div>
						<div className="justify-between flex">
							<span className="font-light text-slate-700">Net Total:</span>
							<span
								className={net_total > 0 ? "text-emerald-700" : "text-red-700"}
							>
								{net_total}<CurrencyToken {...{baseCurrency}}/>
							</span>
						</div>
					</div>					
				}
				
			</div>
		</>
	);
}

