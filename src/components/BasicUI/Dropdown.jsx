import { Fragment,useState } from "react"
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon,SelectorIcon } from '@heroicons/react/solid'


/*
    Item:
        Label
        Value
        Icon *
*/

export default function Dropdown({className, onChange, value, placeholder, options = []})  {
    
    // For array of labels that are also values, convert to objects
    if (options[0] && (typeof options[0] !== 'object' && !options[0].value) ) options = options.map(o=> ({value:o,label:o}) );

    const [select,setSelect] = useState(options[0]);
    const handleChange = (e) => {
        console.log(e,onChange)
        setSelect(e);
        onChange(e.value);
    }

    const labelSync = (options?.find(o=>o.value === value))?.label || select.label || "N/A"

    return ( 
        <div className={ "inline-flex basic-input "+(className||"")}>
            <Listbox value={select} onChange={handleChange} >
                <div className="w-full h-full flex items-center">
                    <Listbox.Button className="
                        relative 
                        cursor-default rounded-md 
                        pl-3 pr-8
                        text-left"
                    >
                        <span className="block truncate">{ labelSync ||placeholder}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                            <SelectorIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
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
                                    { selected = item.label === labelSync }
                                    <span
                                        className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal '
                                        }`}
                                    >
                                        {item.label}
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