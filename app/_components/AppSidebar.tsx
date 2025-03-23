import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutGrid , Brush , WalletCards , SquareUserRound } from "lucide-react"
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const items = [
    {
        title: "Home",
        url: "/dashboard",
        icon: LayoutGrid,
    },
    {
        title: "Design",
        url: "/designs",
        icon: Brush,
    },
    {
        title: "Credits",
        url: "/credits",
        icon: WalletCards,
    },
    {
        title: "Contact Us",
        url: "/contactus",
        icon: SquareUserRound,
    },
]

export function AppSidebar() {
    const path = usePathname();
    return (
        <Sidebar>
            <SidebarHeader>
                <div className='p-4'>
                    <Image src={'./design_logo.svg'} alt='logo' width={100} height={100}
                        className='w-full h-full rounded-lg' />
                    <h2 className='text-sm text-gray-600 text-center animate-bounce mt-2'>Design Spark</h2>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>

                    <SidebarGroupContent>
                        <SidebarMenu className='mt-5'>
                            <div className='flex flex-col gap-4'>
                            {items.map((item, index) => (
                                <a href={item.url} key={index} className={`p-2 text-lg flex gap-2 items-center
                                 hover:bg-gray-100 rounded-lg ${path === item.url ? 'bg-white text-primary font-bold' : 'bg-white'}`}>
                                    <item.icon className='h-5 w-5' />
                                    <span>{item.title}</span>
                                </a>
                            ))} 
                            </div>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <h2 className='p-2 text-gray-400 text-sm animate-pulse'>Copyright @Techxcelerate</h2>
            </SidebarFooter>
        </Sidebar>
    )
}