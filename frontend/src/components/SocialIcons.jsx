import React from 'react';
import { 
  FaWhatsapp, 
  FaFacebookF, 
  FaInstagram, 
  FaTiktok, 
  FaYoutube, 
  FaXTwitter,
  FaPinterestP,
  FaSnapchatGhost,
  FaThreads
} from 'react-icons/fa6';

const SocialIcons = ({ variant }) => {
  const isBlue = variant === 'blue';

  const circleBase = "flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 cursor-pointer";
  const lightCircle = "border-white/30 text-white hover:bg-white hover:text-black hover:border-white";
  const blueCircle = "border-[#00adef] text-[#00adef] hover:bg-[#00adef] hover:text-white";

  const icons = [
    { 
      Icon: FaWhatsapp, 
      link: "https://wa.me/201111471565" 
    },
    { 
      Icon: FaFacebookF, 
      link: "https://www.facebook.com/Newiber" 
    },
    { 
      Icon: FaInstagram, 
      link: "https://www.instagram.com/newiber.travel" 
    },
    { 
      Icon: FaTiktok, 
      link: "https://www.tiktok.com/@newiber.travel" 
    },
    { 
      Icon: FaYoutube, 
      link: "https://www.youtube.com/@Newiber.travel" 
    },
    { 
      Icon: FaXTwitter, 
      link: "https://x.com/Newiber" 
    },
    { 
      Icon: FaPinterestP, 
      link: "https://www.pinterest.com/newiber/" 
    },
    { 
      Icon: FaSnapchatGhost, 
      link: "https://www.snapchat.com/@newiber" 
    },
    { 
      Icon: FaThreads, 
      link: "https://www.threads.com/@Newiber.travel" 
    },
  ];

  return (
    <div className="flex gap-2 md:gap-3 flex-wrap justify-center lg:justify-start">
      {icons.map(({ Icon, link }, index) => (
        <a
          key={index}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${circleBase} ${isBlue ? blueCircle : lightCircle}`}
          title={Icon.name.replace('Fa', '')} 
        >
          <Icon className="text-sm" />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
