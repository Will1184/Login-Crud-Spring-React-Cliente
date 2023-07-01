import React, { useEffect, useState } from 'react';

    
function Clock(){  
        const[timeState,setTimeState]=useState();
        useEffect(()=>{
            setInterval(()=>{        
                let today=new Date();
                let hour=today.getHours();
                let min=today.getMinutes();
                let sec=today.getSeconds();
                let ap=(hour<12)? "AM":"PM";
                hour=(hour===12)? 12:hour;
                hour=(hour>12)? hour-12:hour;
                hour=checkTime(hour);
                min=checkTime(min);
                sec=checkTime(sec);
                setTimeState(hour+":"+min+":"+sec+" "+ap);            
            },500);
        }, []);


        const[clockState,setClockState]=useState();
        useEffect(()=>{
            setInterval(()=>{        
                const date = new Date();
                setClockState(date.toLocaleDateString());
            },1000);
        }, []);


    function checkTime(i){
        if(i<10){
            i="0"+i;
        }
        return i;
    }
    return(
        <div id="clocks">
            <div className="digitalClock">                
                <br/>            
                <div id="clock">      
                {timeState}
                <br/>             
                {clockState}                 
                </div>
               <br/>
            </div>
        </div>   
        );    
}
    
export default Clock;