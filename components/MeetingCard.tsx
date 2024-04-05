"use client"

import { avatarImages } from '@/constant';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';
import toast from 'react-hot-toast';

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({title, date, icon, isPreviousMeeting, buttonIcon1, buttonText, handleClick, link}: MeetingCardProps) => {
    
  return (
    <section className='flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]'>
        <article className='flex flex-col gap-5'>
            <Image src={icon} alt='Image' width={28} height={28}></Image>
            <div className='flex justify-between'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl font-bold'>{title}</h1>
                    <p className='text-base font-normal'>{date}</p>
                </div>
            </div>
        </article>
        <article className={cn("flex justify-center relative", {})}>
            <div className='relative flex w-full max-sm:hidden'>
                {
                    avatarImages.map((image, i) => (
                        <Image
                            key={i}
                            src={image}
                            alt='Attendes'
                            width={40}
                            height={40}
                            className={cn("rounded-full", { absolute: i > 0 })}
                            style={{ top: 0, left: i * 28 }}
                        ></Image>
                    ))
                }
                <div className='flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4'>+5</div>
            </div>
                {
                    !isPreviousMeeting && (
                        <div className='flex gap-2'>
                            <Button className='rounded bg-blue-1 hover:bg-blue-500 px-6' onClick={handleClick}>
                                {
                                    buttonIcon1 && (
                                        <Image src={buttonIcon1} alt='feature' width={20} height={20} className="mr-2"></Image>
                                    )
                                }
                                {buttonText}
                            </Button>
                            <Button
                                onClick={() => {
                                    navigator.clipboard.writeText(link);
                                    toast.success("Link Copied")
                                }} 
                                className='bg-dark-4 px-6 flex gap-2 hover:bg-dark-3'
                            >
                                <Image src="/icons/copy.svg" alt='feature' width={20} height={20}></Image>
                                Copy Link
                            </Button>
                        </div>
                    )
                }
        </article>
    </section>
  )
}

export default MeetingCard