import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Sidebar from '../Components/layout/Sidebar/Sidebar';
import Content from '../Components/layout/Content/Content';
import { SidebarProvider } from '../Components/context/sidebarContext';
import '../../css/Dashboard/index.css';

export default function Dashboard() {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <>
            <Head title="Dashboard" />
            <div className="dashboard-container">
                <SidebarProvider>
                    <div className='app'>
                        {user && <Sidebar user={user} />}
                        <Content />
                    </div>
                </SidebarProvider>
            </div>
        </>
    );
}
