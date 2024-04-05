"use client"

import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetUp = ({setIsSetUpComplete}: {setIsSetUpComplete: (value: boolean) => void}) => {
  const [isMicCamToggeledOn, setIsMicCamToggeledOn] = useState(false);

  const call = useCall()

  if(!call){
    throw new Error("useCall must be used in stream call component");
  }

  useEffect(() => {
    if(isMicCamToggeledOn){
      call?.camera.disable();
      call?.microphone.disable();
    }else{
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggeledOn, call?.camera, call?.microphone])
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <div className="w-full md:w-[700px] flex-center">
        <VideoPreview></VideoPreview>
      </div>

      <div className="flex h-16 items-center justify-center gap-3">
        <label className='flex items-center justify-center gap-2 font-medium'>
          <input 
            type="checkbox"
            checked={isMicCamToggeledOn}
            onChange={(e) => setIsMicCamToggeledOn(e.target.checked)}
          ></input>
          Join with mic and camera off
        </label>
        <DeviceSettings></DeviceSettings>
      </div>
      <Button className="bg-blue-1 hover:bg-blue-500"
       onClick={() => {
        call.join();
        setIsSetUpComplete(true);
      }}>
        Join Meeting
      </Button>
    </div>
  )
}

export default MeetingSetUp