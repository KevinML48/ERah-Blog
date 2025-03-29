import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import brainwave from "../assets/hero/logo_sans_texte.png";
import { getNavigation } from "../constants";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu, ButtonStyle } from "../design/Header";
import { useState } from "react";

const Header = ({ user }) => {
    const pathname = useLocation();
    const [openNavigation, setOpenNavigation] = useState(false);
    const isLoggedIn = !!user;
    const isAdmin = user?.is_admin;
    const navigation = getNavigation(isLoggedIn, isAdmin);

    const toggleNavigation = () => {
        if (openNavigation) {
            setOpenNavigation(false);
            enablePageScroll();
        } else {
            setOpenNavigation(true);
            disablePageScroll();
        }
    };

    const handleClick = () => {
        if (!openNavigation) return;
        enablePageScroll();
        setOpenNavigation(false);
    };

    return (
        <div
            className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
                openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
            }`}
        >
            <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
                <a
                    className="flex items-center w-[12rem] xl:mr-8 text-white transition-colors hover:text-n-1"
                    href="#hero"
                >
                    <img
                        src={brainwave}
                        width={60}
                        height={50}
                        alt="Brainwave"
                    />
                    <span className="ml-2 font-bold text-lg">ERAH ESPORT</span>
                </a>

                {/* Navigation pour desktop */}
                <nav className="hidden lg:flex mx-auto">
                    {navigation.filter(item => !item.onlyMobile).map((item) => (
                        <a
                            key={item.id}
                            href={item.url}
                            className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
                        >
                            {item.title}
                        </a>
                    ))}
                </nav>

                {/* Navigation pour mobile */}
                <div className={`${openNavigation ? 'flex' : 'hidden'} lg:hidden fixed inset-0 top-[5rem] bg-n-8`}>
                    <HamburgerMenu user={user} onNavigate={handleClick} />
                </div>

                <div className="hidden lg:flex items-center">
                    {isLoggedIn ? (
                        <>
                            {isAdmin && (
  <a
  href="/dashboard"
  className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
>
    Dashboard
</a>
                            )}
                            <ButtonStyle href="/profile">
                                Mon Profil
                            </ButtonStyle>
                        </>
                    ) : (
                        <>
  <a
     href="/register"
     className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
   >
       Nouveau compte
   </a>
                            <ButtonStyle href="/login">
                                Connexion
                            </ButtonStyle>
                        </>
                    )}
                </div>

                <button
                    className="ml-auto lg:hidden px-3"
                    onClick={toggleNavigation}
                >
                    <MenuSvg openNavigation={openNavigation} />
                </button>
            </div>
        </div>
    );
};

export default Header;
