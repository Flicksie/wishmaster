import { Fragment,useState } from "react"
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon,SelectorIcon } from '@heroicons/react/solid'
import { PriorityColorScale } from './utils'


function Label({label,value,color}){
    return (
        <>
            <div className="flex items-center">
                <div className="rounded-lg w-6 h-6 mx-2 items-center text-center text-white font-bold " style={ {backgroundColor: color} } > { value } </div>
                <span> { label } </span>
            </div>
        </>
    )
}

const options = [
    {label: "  Very High",   value: 1 },
    {label: " ",             value: 2 },
    {label: "  High ",       value: 3 },
    {label: " ",             value: 4 },
    {label: "  Medium",      value: 5 },
    {label: " ",             value: 6 },
    {label: " ",             value: 7 },
    {label: "  Low",         value: 8 },
    {label: " ",             value: 9 },
    {label: "  Very Low",    value: 10 },
]




export default function PriorityPicker({value,onChange}){

    const [select,setSelect] = useState(options[0]);
    const handleChange = (e) => {
        console.log(e,onChange)
        setSelect(e);
        onChange(e.value);
    }

    const labelSync = (options?.find(o=>o.value === value))?.label || select.label ||1


    return (
        <div className=" block mx-2 w-[120px] ">
            <Listbox value={select} onChange={handleChange} >
                <div className="relative">
                    <Listbox.Button 
                        className=" cursor-pointer relative w-full cursor-default rounded-md bg-white h-8 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                        style={ {backgroundColor: PriorityColorScale[ value-1 ]} }
                    >
                        <span className="block truncate text-slate-500" style={ { mixBlendMode: "difference"} }> Priority { value }</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <SelectorIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                                style={ { mixBlendMode: "difference"} }
                                />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-[calc(100%+5rem)] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {options.map((item,key) =>
                            <Listbox.Option 
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                    }`
                                }
                                value={item}
                                key={key}
                            >
                                {({ selected }) => (
                                    <>                                   
                                    <span
                                        className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal '
                                        }`}
                                    >
                                        <Label {...item} color={PriorityColorScale[key]}/>
                                    </span>
                                    {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 ">
                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        )}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}