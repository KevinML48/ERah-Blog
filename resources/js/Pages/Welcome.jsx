import { Head, Link } from '@inertiajs/react';
import Header from '../Components/Header';
import Hello from '../Components/Hello';

export default function Welcome({ auth }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('hidden');
        document.getElementById('docs-card')?.classList.add('row-span-1');
        document.getElementById('docs-card-content')?.classList.add('flex-row');
        document.getElementById('background')?.classList.add('hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div>
                <Header />
                <div>
                    <div>
                        <nav>
                            {auth.user ? (
                                <Link href={route('dashboard')}>
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')}>
                                        Log in
                                    </Link>
                                    <Link href={route('register')}>
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </div>
                <Hello />
            </div>
        </>
    );
}
