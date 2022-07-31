import { useState } from 'react'
import { Switch } from '@headlessui/react'

export default function ToggleSwitch({onChange}) {
  const [enabled, setEnabled] = useState(false);
  const toggle = (e)=>{
    setEnabled(e);
    onChange(e);
  }

  return (
    <div className="inline-block -rotate-45">
      <Switch

        checked={enabled}
        onChange={toggle}
        className={`${enabled ? 'bg-emerald-500' : 'bg-slate-200'}
          relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-6 bg-emerald-100' : 'translate-x-0 bg-slate-400'}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  )
}
