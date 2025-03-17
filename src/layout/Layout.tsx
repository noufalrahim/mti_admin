import { AppSideBar } from '@/components/AppSideBar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSideBar />
            <Toaster closeButton position="top-right" theme="light" richColors className="bg-white" />
            <main className='bg-light-100 w-full px-5'>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}
