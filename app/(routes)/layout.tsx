import React from 'react'
import DashboardProvider from './provider';
import { Toaster } from '@/components/ui/toaster';


function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <DashboardProvider>
            {children}
            <Toaster/>
        </DashboardProvider>
    )
}

export default DashboardLayout