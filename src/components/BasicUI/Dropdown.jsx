import { Fragment,useState } from "react"
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon,SelectorIcon } from '@heroicons/react/solid'


/*
    Item:
        Label
        Value
        Icon *
*/

export default function Dropdown({onChange, options = []})  {
    
    const [select,setSelect] = useState(options[0]);
    const handleChange = (e) => {
        setSelect(e);
        onChange(e.value);
    }

    return ( 
        <div className=" inline-block top-16 w-72">
            <Listbox value={select} onChange={handleChange} >
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{select.label}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
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
                        <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                                        selected ? 'font-medium' : 'font-normal'
                                        }`}
                                    >
                                        {item.label}
                                    </span>
                                    {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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