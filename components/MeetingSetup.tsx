'use client'

import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const MeetingSetup = ({ setIsSetupComplite }: { setIsSetupComplite: (value: boolean) => void }) => {

    const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false)

    const call = useCall()

    if (!call) {
        throw new Error('usecall must be used within StreamCall componnent')
    }

    useEffect(() => {
        if (isMicCamToggledOn) {
            call?.camera.disable()
            call?.microphone.disable()

        } else {
            call?.camera.enable()
            call?.microphone.enable()
        }
    }, [isMicCamToggledOn, call?.camera, call?.microphone])

    return (
        <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
            <h1 className='text-2xl font-bold'>Setup</h1>
            <VideoPreview />
            <div className='flex flex-col justify-center items-center gap-3 h-16'>
                <label className='flex items-center justify-center gap-2 font-medium'>
                    <input
                        type='checkbox'
                        checked={isMicCamToggledOn}
                        onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
                    />
                    Join with mic and camera off
                </label>
                <DeviceSettings />
            </div>
            <Button className='rounded-md bg-green-500 px-4 py-2.5' onClick={() => { call.join() 
                setIsSetupComplite(true) }}>
                Join meeting
            </Button>
        </div>
    )
}

export default MeetingSetup