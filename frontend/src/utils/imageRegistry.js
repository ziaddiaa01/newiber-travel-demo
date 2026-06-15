// Import all images from your src/assets folder
import hotel from '../assets/hotel.png';
import managment from '../assets/managment.png';
import limousine from '../assets/limousine.png';
import ship from 'https://ymvejvzrljpnnwfautji.supabase.co/storage/v1/object/public/NEWIBER/ship.png';
import faq1 from 'https://ymvejvzrljpnnwfautji.supabase.co/storage/v1/object/public/NEWIBER/faq1.jpg';
import faq2 from 'https://ymvejvzrljpnnwfautji.supabase.co/storage/v1/object/public/NEWIBER/faq2.jpg';
import faq3 from 'https://ymvejvzrljpnnwfautji.supabase.co/storage/v1/object/public/NEWIBER/faq3.jpg';
import faq4 from 'https://ymvejvzrljpnnwfautji.supabase.co/storage/v1/object/public/NEWIBER/faq4.jpg';

import Aviation from 'https://ymvejvzrljpnnwfautji.supabase.co/storage/v1/object/public/NEWIBER/vip1.jpg';
import Maritime from 'https://ymvejvzrljpnnwfautji.supabase.co/storage/v1/object/public/NEWIBER/vip2.jpg';
import Private from 'https://ymvejvzrljpnnwfautji.supabase.co/storage/v1/object/public/NEWIBER/vip3.jpg';

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
