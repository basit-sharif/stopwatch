import Link from "next/link";
import Notifications from "./icons/Notifications";
import { useState } from "react";
import Close from "./icons/Close";

interface propsType {
    Draft: { heading: string, message: string }[],
    setToDraft: any
}

export default function Navbar({ Draft, setToDraft }: propsType) {
    const [notificationArea, setNotificationArea] = useState(false);
    return (
        <div className="w-full bg-blue-900 h-14 absolute top-0 right-0 left-0 z-10 px-4">
            <div className="flex justify-between h-full items-center max-w-7xl mx-auto">
                <div className="flex space-x-8">
                    <Link href="/" className="navbarText">Stopwatch</Link>
                    <Link href="https://abdulbasit-self.vercel.app" className="navbarText">Abdul-Basit</Link>
                </div>
                <div className="">
                    <div onClick={() => setNotificationArea(true)} className="cursor-pointer">
                        <Notifications />
                    </div>
                </div>
            </div>
            <div onClick={() => setNotificationArea(false)} className={`${notificationArea ? "block" : "hidden"} fixed z-30 opacity-70 bg-gray-900 inset-0`}>
            </div>
            <div className={` space-y-8 ${notificationArea ? "visible translate-x-0" : "invisible translate-x-full"} duration-700 p-6 fixed z-40 right-0 top-0 bottom-0 bg-white`}>
                <div className="flex justify-between min-w-[20rem] items-center border-b border-blue-400 pb-4">
                    <h3 className="text-2xl font-semibold text-gray-700">Notifications</h3>
                    <div className="cursor-pointer" onClick={() => setNotificationArea(false)}><Close /></div>
                </div>
                <div className="overflow-y-auto space-y-6 max-h-[28rem]">
                    {Draft.map((item: { heading: string, message: string }, index: number) => {
                        if (!item.heading && !item.message) { } else {
                            return (
                                <div key={index} className="py-2 px-6 border-4">
                                    <h2 className=' text-lg font-semibold border-gray-300'>Stopwatch {item.heading} </h2>
                                    <p className='text-blue-900'>{item.message}</p>
                                </div>
                            )
                        }
                    })}
                </div>
                <button onClick={() => { setToDraft([]) }} className="hover:scale-95 fixed bottom-0 right-0 left-0 w-full">Delete All</button>
            </div>
        </div >
    )
}