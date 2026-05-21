import { FaWhatsapp, FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa6';


const SocialIcons = ({ variant }) => {
  // Define styles based on the variant (Header vs Header2)
  const isBlue = variant === 'blue';

  const circleBase = "flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 cursor-pointer";
  
  // Style for the Transparent/Dark Header (Light grey/white circles)
  const lightCircle = "border-white/30 text-white hover:bg-white hover:text-black hover:border-white";
  
  // Style for the White Header (Blue circles as seen in Header2.png)
  const blueCircle = "border-[#00adef] text-[#00adef] hover:bg-[#00adef] hover:text-white";

  const icons = [
    { Icon: FaWhatsapp, link: "#" },
    { Icon: FaFacebookF, link: "#" },
    { Icon: FaInstagram, link: "#" },
    { Icon: FaTiktok, link: "#" },
  ];

  return (
    <div className="flex gap-3">
      {icons.map(({ Icon, link }, index) => (
        <a
          key={index}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${circleBase} ${isBlue ? blueCircle : lightCircle}`}
        >
          <Icon className="text-sm" />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;

