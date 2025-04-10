import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;
    const { user } = auth;

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p>You're logged in as <strong>{user.name}</strong>!</p>
                            <p>Your roles: {user.roles.join(', ')}</p>

                            {user.isAdmin && (
                                <div className="mt-4">
                                    <Link
                                        href={route('admin.dashboard')}
                                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                                    >
                                        Accéder au panel admin
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
