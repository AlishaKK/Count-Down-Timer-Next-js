"use client"

import { useRef, useState, useEffect, ChangeEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button} from "@/components/ui/button"

export default function Countdown(){
    const[duration, setDuration] = useState<number | string>("");
    const[timeLeft, setTimeLeft] = useState<number> (0);// this state is to tell remaining time
    const[isActive, setIsActive] = useState<boolean>(false);// is timer running or not
    const[isPaused, setIsPaused] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null >(null);  //this is reference to remember the timer id so that you can control timer's start, duration , restart and pause


    const handleSetDuration = (): void => {
        if(typeof duration === "number" && duration> 0){
            setTimeLeft(duration);//time left state updated
            setIsActive(false);// reset timer
            setIsPaused(false);// reset timer
            if(timerRef.current){//if any previous time is active, clear it and run current time
                clearInterval(timerRef.current)
            }
        }
    };

    const handleStart =(): void =>{// this makes start button working as it is pressed
        if(timeLeft >0){ //this condition checks that timer ka waqat abhi katam nahi hua
            setIsActive(true); //keeps timer active
            setIsPaused(false);//rukay huay timer ko active
        }
    };

    const handlePause = ():void =>{
        if(isActive){
            setIsPaused(true);
            setIsActive(false);
            if(timerRef.current){//if any previous time is active, clear it and run current time
                clearInterval(timerRef.current)
        }
    }
};
const handleReset = ():void => {
    setIsPaused(false);
            setIsActive(false);
            setTimeLeft(typeof duration ==="number"?duration:0)
                if(timerRef.current){
                    clearInterval(timerRef.current)
                
            }
};
useEffect(()=>{
    if(isActive ){
        timerRef.current = setInterval(()=>{   //this will reduce the timer
            setTimeLeft((prevTime)=>{ //updted the timer 
                if(prevTime <= 1){    //this code excute 
                    clearInterval(timerRef.current!);
                    return 0;
                }
                return prevTime -1
            })
        },1000)
    }
    return () =>{
        if(timerRef.current){
            clearInterval(timerRef.current)
        }
    };
},[isActive,timeLeft,duration]);
const formatTime =(time:number):string =>{
    const minutes = Math.floor(time/60);
    const seconds = time % 60; //min into sec
    return `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`
}
const handleDurationChange = (e:ChangeEvent<HTMLInputElement>):void=>{
    setDuration(Number(e.target.value) || "")
}

return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-950">
      <h1 className="text-5xl font-bold mb-4 text-white">Countdown Timer</h1>
      <div className="flex items-center mb-4">
        <input
          type="number"
          value={duration}
          onChange={handleDurationChange}
          placeholder="Enter duration in seconds"
          className="w-32 pl-2 rounded-md border-gray-300"
        />
        <button
          onClick={handleSetDuration}
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Set Duration
        </button>
      </div>
      <div className="text-7xl font-bold  text-white mb-4">{formatTime(timeLeft)}</div>
      <div className="flex items-center mb-4">
        <button
          onClick={handleStart}
          className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start
        </button>
        <button
          onClick={handlePause}
          className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Pause
        </button>
        <button
          onClick={handleReset}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};



