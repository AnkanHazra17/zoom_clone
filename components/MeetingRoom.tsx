"use client"

import { cn } from '@/lib/utils'
import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react'
import EndCallButton from './EndCallButton'
import Loader from './Loader'

type CallLayoutType = "grid" | "speaker-left" | "speaker-right"

const layoutTypes = [
  {
    type: "Grid",
    action: "grid"
  },
  {
    type: "Speaker Left",
    action: "speaker-left"
  },
  {
    type: "Speaker Right",
    action: "speaker-right"
  }
]

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPresonalRoom = !!searchParams.get("personal")
  const [layout, setlayout] = useState<CallLayoutType>("speaker-left")
  const [showParticipants, setShowParticipants] = useState(false)
  const router = useRouter();

  const {useCallCallingState} = useCallStateHooks();
  const callingState = useCallCallingState();

  if(callingState !== CallingState.JOINED){
    return <Loader></Loader>
  }

  const CallLayout = () => {
    switch(layout){
      case "grid":
        return <PaginatedGridLayout></PaginatedGridLayout>
      
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="right"></SpeakerLayout>

      default:
        return <SpeakerLayout participantsBarPosition="left"></SpeakerLayout>
    }
  }
  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout></CallLayout>
        </div>
        <div className={cn("h-[calc(100vh-86px)] hidden ml-2", {"show-block": showParticipants})}>
          <CallParticipantsList onClose={() => setShowParticipants(false)}></CallParticipantsList>
        </div>
      </div>

      <div className='w-full flex items-center justify-center fixed bottom-0 gap-5 flex-wrap'>
        <CallControls onLeave={() => router.push("/")}></CallControls>

        <DropdownMenu>
          <div>
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535d]">
              <LayoutList size={20} className=' text-white'></LayoutList>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {
              layoutTypes.map((item, i) => (
                <div key={i}>
                  <DropdownMenuItem onClick={() => setlayout(item.action as CallLayoutType)} className="cursor-pointe focus:bg-dark-2 focus:text-white">
                    {item.type}
                  </DropdownMenuItem>
                </div>
              ))
            }
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton></CallStatsButton>
        <button onClick={() => setShowParticipants((prev) => !prev)}>
            <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535d]'>
              <Users size={20} className='text-white'></Users>
            </div>
        </button>
        {
          !isPresonalRoom && <EndCallButton></EndCallButton>
        }
      </div>
    </section>
  )
}

export default MeetingRoom