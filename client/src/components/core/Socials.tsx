import Link from 'next/link';
import { BsInstagram, BsFacebook, BsTiktok, BsYoutube } from 'react-icons/bs';

//##########################################################################################
// SOCIALS TYPES
//##########################################################################################
type SocialsProps = {};

const socials = [
  {
    icon: <BsInstagram />,
    href: 'https://www.instagram.com/',
  },
  {
    icon: <BsFacebook />,
    href: 'https://www.facebook.com/',
  },
  {
    icon: <BsTiktok />,
    href: 'https://www.tiktok.com/',
  },
  {
    icon: <BsYoutube />,
    href: 'https://www.youtube.com/',
  },
];

//##########################################################################################
// SOCIALS COMPONENT
//##########################################################################################
const Socials: React.FC<SocialsProps> = () => {
  return (
    <div className='flex w-full items-center justify-evenly'>
      {socials.map((social, idx) => (
        <Link key={`${social.href}-${idx}`} href={social.href} target='_blank'>
          <div className='text-2xl text-cs-blue hover:text-cs-beige'>
            {social.icon}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Socials;
