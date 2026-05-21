// Import all images from your src/assets folder
import hotel from '../assets/hotel.png';
import managment from '../assets/managment.png';
import limousine from '../assets/limousine.png';
import ship from '../assets/ship.png';
import faq1 from '../assets/faq1.jpg';
import faq2 from '../assets/faq2.jpg';
import faq3 from '../assets/faq3.jpg';
import faq4 from '../assets/faq4.jpg';

import Aviation from '../assets/vip1.jpg';
import Maritime from '../assets/vip2.jpg';
import Private from '../assets/vip3.jpg';

// Map the DB string to the imported variable
export const masterImageMap = {
  "/images/hotel": hotel,
  "/images/limousine": limousine,
  "/images/managment": managment,
  "/images/ship": ship,



};
export const faqImagesMap = {
  "/images/faq1":faq1,
  "/images/faq2":faq2,
  "/images/faq3":faq3,
  "/images/faq4":faq4,



};

export const vipImagesMap = {
  "/images/Aviation":Aviation,
  "/images/Maritime":Maritime,
  "/images/Private":Private ,



};
