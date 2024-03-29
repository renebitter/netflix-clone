import { useState, useCallback, useEffect } from 'react';
import {
  BsChevronDown,
  BsCaretDownFill,
  BsSearch,
  BsBell,
} from 'react-icons/bs';
import NavbarItem from './NavbarItem';
import MobileMenu from './MobileMenu';
import AccountMenu from './AccountMenu';

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  //TODO: Alternative for addEventListener
  //   function fixNavbar() {
  //     if (window.pageYOffset >= 100) {
  //       setSticky(true);
  //     } else {
  //       setSticky(false);
  //     }
  //   }

  //   useEffect(() => {
  //     window.onscroll = fixNavbar;
  //   }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);
  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className='w-full fixed z-40'>
      <div
        className={`
        px-4
        md:px-16
        py-6
        flex
        flex-row
        items-center
        transition
        duration-500
        ${showBackground ? 'bg-zinc-900/90' : ''}
      `}>
        <h1 className='h-12 text-red-600 text-5xl font-bold'>FLIXNET</h1>
        <div
          className='
            flex-row
            ml-8
            gap-7
            hidden
            lg:flex
        '>
          <NavbarItem label='Home' />
          <NavbarItem label='TV Shows' />
          <NavbarItem label='Movies' />
          <NavbarItem label='New & Popular' />
          <NavbarItem label='My List' />
          <NavbarItem label='Browse by languages' />
        </div>

        <div
          onClick={toggleMobileMenu} //TODO: should be onHover onMouseEnter/onMouseLeave or just CSS
          className='lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative'>
          <p className='text-white text-sm'>Browse</p>
          <BsChevronDown className='text-white transition' />
          <MobileMenu visible={showMobileMenu} />
        </div>

        <div className='flex flex-row ml-auto gap-7 items-center'>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
            <BsSearch />
          </div>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu} //TODO: should be onHover onMouseEnter/onMouseLeave or just CSS
            className='flex flex-row items-center gap-2 cursor-pointer relative'>
            <div className='w-6 h-6 lg:w-7 lg:h-7 rounded-md overflow-hidden'>
              <img src='/images/profile-pic.jpg' alt='profile-pic' />
            </div>
            <BsCaretDownFill
              size={11}
              className={`text-white transition ${
                showAccountMenu ? 'rotate-180' : 'rotate-0'
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
