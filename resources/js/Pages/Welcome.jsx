import { Head, Link } from '@inertiajs/react';
import ButtonGradient from '../Components/assets/svg/ButtonGradient';
import Benefits from '../Components/Home-Composants/Benefits';
import Collaboration from '../Components/Home-Composants/Collaboration';
import Footer from '../Components/Home-Composants/Footer';
import Header from '../Components/Home-Composants/Header';
import Hero from '../Components/Home-Composants/Hero';
import Pricing from '../Components/Home-Composants/Pricing';
import Roadmap from '../Components/Home-Composants/Roadmap';
import Services from '../Components/Home-Composants/Services';

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
            <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
                <Header />
                <Hero />
                <Benefits />
                <Collaboration />
                <Services />
                <Pricing />
                <Roadmap />
                <Footer />
            </div>
            <ButtonGradient />
        </>
    );
}
