import { background } from "../assets";
import { getNavigation } from "../constants";

export const Rings = () => {
  return (
    <div className="absolute top-1/2 left-1/2 w-[51.375rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2">
      <div className="absolute top-1/2 left-1/2 w-[36.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/2 left-1/2 w-[23.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
};

export const SideLines = () => {
  return (
    <>
      <div className="absolute top-0 left-5 w-0.25 h-full bg-n-6"></div>
      <div className="absolute top-0 right-5 w-0.25 h-full bg-n-6"></div>
    </>
  );
};

export const BackgroundCircles = () => {
  return (
    <>
      <div className="absolute top-[4.4rem] left-16 w-3 h-3 bg-gradient-to-b from-[#DD734F] to-[#1A1A32] rounded-full"></div>
      <div className="absolute top-[12.6rem] right-16 w-3 h-3 bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full"></div>
      <div className="absolute top-[26.8rem] left-12 w-6 h-6 bg-gradient-to-b from-[#88E5BE] to-[#1A1A32] rounded-full"></div>
    </>
  );
};

export const HamburgerMenu = ({ user, onNavigate }) => {
  const isLoggedIn = !!user;
  const isAdmin = user?.is_admin;
  const navigation = getNavigation(isLoggedIn, isAdmin);

  return (
    <div className="absolute inset-0 lg:hidden">
      <div className="absolute inset-0 opacity-[.03]">
        <img
          className="w-full h-full object-cover"
          src={background}
          width={688}
          height={953}
          alt="Background"
        />
      </div>

      <Rings />
      <SideLines />
      <BackgroundCircles />

      <nav className="relative z-10 flex flex-col items-center justify-center h-full">
        {navigation.map((item) => (
          <a
            key={item.id}
            href={item.url}
            onClick={() => onNavigate && onNavigate()}
            className="py-2 text-2xl text-white hover:text-gray-300 transition-colors"
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
};

export const ButtonStyle = ({ href, children }) => (
  <a
    href={href}
    className="hidden lg:flex px-4 py-2 text-sm text-black bg-white rounded-md transition-all ease-in duration-75 border border-white hover:bg-transparent hover:text-white"
  >
    {children}
  </a>
);
