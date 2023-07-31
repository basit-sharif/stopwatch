"use client"
import React, { useState, useMemo, useEffect } from 'react';
import RightArrow from './icons/RightArrow';
import Close from './icons/Close';
import Navbar from './Navbar';

let StopWatch = () => {
    const [timeinSecond, setTimeinSecond] = useState(0);
    const [sideZeroForSec, setSideZeroForSec] = useState(true);
    const [timeinMinutes, setTimeinMinutes] = useState(0);
    const [sideZeroForMin, setSideZeroForMin] = useState(true);
    const [timeinHours, setTimeinHours] = useState(0);
    const [sideZeroForHours, setSideZeroForHours] = useState(true);
    const [isRunning, setIsRunning] = useState(false);
    const [notification, setNotification] = useState(false);
    const [message, setMessage] = useState("");
    const [messageText, setMessageText] = useState("");
    const [draft, setToDraft] = useState<any>([]);
    const [discard, setDiscard] = useState(false);

    useEffect(() => {
        if (timeinSecond >= 10) {
            setSideZeroForSec(false);
        } else if (timeinMinutes >= 10) {
            setSideZeroForMin(false);
        } else if (timeinHours >= 10) {
            setSideZeroForHours(false)
        }
        if (timeinSecond >= 60) {
            setTimeinSecond(0);
            setTimeinMinutes(timeinMinutes + 1);
            setSideZeroForSec(true)
        }

    }, [timeinSecond])

    useEffect(() => {
        let intervalId: any;
        if (isRunning) {
            intervalId = setInterval(() => {
                setTimeinSecond((prevTime) => prevTime + 1)
            }, 1000)
        }
        return () => {
            clearInterval(intervalId)
        }
    }, [isRunning])
    function handleStart() {
        setIsRunning(true);
        setNotification(true);
        setMessageText("First Time will be calculated in Seconds")
        setMessage("Started");
        setTimeout(() => {
            setNotification(false);
            if (!discard) {
                setToDraft([...draft, { heading: message, message: messageText }]);
            }
        }, 3000);
    }
    // important use for in css
    function handlePause() {
        setIsRunning(false);
        setMessage("Paused");
        setNotification(true);
        setMessageText("This won't loss your calculated Time");
        setTimeout(() => {
            setNotification(false);
            if (!discard) {
                setToDraft([...draft, { heading: message, message: messageText }]);
            }
        }, 3000);
    }
    function handleResume() {
        setIsRunning(true);
        setMessage("Resume");
        setNotification(true);
        setMessageText("This will continue where you left");
        setTimeout(() => {
            setNotification(false);
            if (!discard) {
                setToDraft([...draft, { heading: message, message: messageText }]);
            }
        }, 3000);
    }
    function handleReset() {
        setSideZeroForSec(true)
        setIsRunning(false);
        setTimeinSecond(0);
        setTimeinMinutes(0);
        setSideZeroForMin(true);
        setTimeinHours(0);
        setSideZeroForHours(true);
        setMessageText("You lost your calculated Time");
        setMessage("had reset")
        setNotification(true);
        setTimeout(() => {
            setNotification(false);
            if (!discard) {
                setToDraft([...draft, { heading: message, message: messageText }]);
            }
        }, 3000);
    }

    return (
        <div className='relative overflow-hidden bg-blue-950 h-screen flex justify-center items-center'>
            <Navbar Draft={draft} setToDraft={setToDraft} />
            <div className='space-y-5 text-center'>
                <div className='text-3xl sm:text-4xl text-cyan-500 tracking-wider'>
                    <h1>Time: &nbsp;<span className='text-4xl sm:text-6xl text-cyan-400'><span>{sideZeroForHours && 0}{timeinHours}</span>:<span>{sideZeroForMin && 0}{timeinMinutes}</span>:<span>{sideZeroForSec && 0}</span>{timeinSecond}</span></h1>
                </div>
                <div className='gap-2 sm:gap-6 grid grid-cols-2 sm:grid-cols-4'>
                    <button className='bg-red-600 text-gray-200' onClick={handleStart}>Start</button>
                    <button onClick={handlePause}>Pause</button>
                    <button onClick={handleResume}>Resume</button>
                    <button onClick={handleReset}>Reset</button>
                </div>
            </div>
            <div className={`${notification ? "visible translate-x-0" : "invisible translate-x-full"} duration-500 absolute right-1 bottom-6 py-2 px-12 space-y-1 border-t-4 rounded-md border-yellow-100 bg-cyan-500 text-blue-900`}>
                <div className='absolute top-[0.05rem] right-3 font-semibold cursor-pointer flex space-x-1'>
                    <div onClick={() => { setNotification(false); setDiscard(false) }} >
                        <RightArrow />
                    </div>
                    <div onClick={() => {
                        setDiscard(true);
                        setNotification(false);
                        setTimeout(() => {
                            setDiscard(false);
                        }, 3500);
                    }}>
                        <Close />
                    </div>
                </div>
                <h2 className='text-lg font-semibold border-b border-gray-300'>Stopwatch {message}</h2>
                <p className='text-blue-900'>{messageText}</p>
            </div>
        </div >
    )
}
export default StopWatch



// use split and join to convert math number to english text by checking by doing loop and check each element and match every element and se its corrosponding value