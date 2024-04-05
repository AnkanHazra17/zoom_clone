"use client"
import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { SideBarLink } from '@/constant'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'


const MobileNav = () => {
    const pathname = usePathname();
  return (
    <section className='w-full max-w-[264px]'>
        <Sheet>
            <SheetTrigger asChild>
                <Image 
                    src="/icons/hamburger.svg"
                    width={36}
                    height={36}
                    alt='hamburger icon'
                    className='cursor-pointer sm:hidden'
                ></Image>
            </SheetTrigger>
            <SheetContent side="left" className=' flex flex-col gap-20 border-none text-white ring-0 bg-dark-1'>
                <Link href="/" className='flex items-center gap-1'>
                    <Image src="/icons/logo.svg" width={32} height={32} alt='Yoom Logo' className=' max-sm:size-10'></Image>
                    <p className="text-[26px] font-extrabold text-white">Yoom</p>
                </Link>
                <div className='flex h-[calc(100vh-200px)] flex-col justify-between overflow-y-auto'>
                    {
                        SideBarLink.map((link) => {
                            const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);
                            return (
                                <SheetClose key={link.label} asChild>
                                    <Link href={link.route} className={cn("flex gap-4 items-center p-4 rounded-lg w-full max-w-60", {"bg-blue-1": isActive})}>
                                        <Image src={link.imgUrl} alt={link.label} width={20} height={20}></Image>
                                        <p className="font-semibold">{link.label}</p>
                                    </Link>
                                </SheetClose>
                            )
                        })
                    }
                </div>
            </SheetContent>
        </Sheet>

    </section>
  )
}

export default MobileNav