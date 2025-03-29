import { curve, heroBackground, robot } from "../assets";
import Button from "../Button";
import Section from "./Section";
import { BackgroundCircles, BottomLine, Gradient } from "../design/Hero";
import { heroIcons } from "../constants";
import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";
import Generating from "./Generating";
import Notification from "./Notification";
import CompanyLogos from "./Generating";

const Hero = () => {
    const parallaxRef = useRef(null);

    return (
        <Section
            className="pt-[12rem] -mt-[5.25rem]"
            crosses
            crossesOffset="lg:translate-y-[5.25rem]"
            customPaddings
            id="hero"
        >
            <div className="container relative" ref={parallaxRef}>
                <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
                    <h1 className="h1 mb-6">
                        Vivez l'esport {` `}
                        <span className="inline-block relative">
                            autrement
                            <svg
                                className="absolute left-0 bottom-0 w-full h-[14px]"
                                viewBox="0 0 100 14"
                                preserveAspectRatio="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    <linearGradient
                                        id="waveGradient"
                                        x1="0%"
                                        y1="50%"
                                        x2="100%"
                                        y2="50%"
                                    >
                                        <stop offset="0%" stopColor="black" />
                                        <stop offset="100%" stopColor="red" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M0,7 Q25,14 50,7 T100,7"
                                    fill="none"
                                    stroke="url(#waveGradient)"
                                    strokeWidth="5"
                                />
                            </svg>
                        </span>
                    </h1>
                    <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
                        Explorez l'univers d'ERAH : Plongez au cœur de l'esport
                        et de notre communauté passionnée !
                    </p>
                    <div className="grid place-items-center">
                        <a
                            href="#"
                            className="px-4 py-2 text-sm text-black bg-white rounded-md transition-all ease-in duration-75 border border-white hover:bg-transparent hover:text-white hover:border-white group"
                        >
                            <span className="relative z-10 group-hover:text-white">
                                Découvrir
                            </span>
                        </a>
                    </div>
                </div>
                <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
                    <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
                        <div className="relative bg-n-8 rounded-[1rem]">
                            <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />

                            <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                                <img
                                    src={robot}
                                    className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
                                    width={1024}
                                    height={490}
                                    alt="AI"
                                />

                                <Generating className="absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2" />

                                <ScrollParallax isAbsolutelyPositioned>
                                    <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex">
                                        {heroIcons.map((icon, index) => (
                                            <li className="p-5" key={index}>
                                                <img
                                                    src={icon}
                                                    width={24}
                                                    height={25}
                                                    alt={icon}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </ScrollParallax>

                                <ScrollParallax isAbsolutelyPositioned>
                                    <Notification
                                        className="hidden absolute -right-[5.5rem] bottom-[11rem] w-[18rem] xl:flex"
                                        title="Code generation"
                                    />
                                </ScrollParallax>
                            </div>
                        </div>

                        <Gradient />
                    </div>
                    <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
                        <img
                            src={heroBackground}
                            className="w-full"
                            width={1440}
                            height={1800}
                            alt="hero"
                        />
                    </div>

                    <BackgroundCircles />
                </div>

                <CompanyLogos className="hidden relative z-10 mt-20 lg:block" />
            </div>

            <BottomLine />
        </Section>
    );
};

export default Hero;
