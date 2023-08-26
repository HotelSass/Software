import { BiBed, BiBowlHot, BiWine, BiBuildingHouse, BiCabinet, BiChart, BiFork, BiMoneyWithdraw, BiHistory, BiUserCheck, BiReceipt,BiCreditCardFront } from "react-icons/bi";
import { MdFoodBank } from "react-icons/md"

export const UserSidebarInfo = {

   0: {
      icon: <BiBed />,
      title: 'Room',
      size: 24,
      color: '#2442F8',
      location: '/user/rooms'
   }
   , 1: {
      icon: <MdFoodBank />,
      title: 'Orders',
      size: 24,
      color: '#2442F8',
      location: '/user/table'
   }
   , 2: {
      icon: <BiFork />,
      title: 'KOT',
      size: 24,
      color: '#2442F8',
      location: '/user/restaurant'
   }
   , 3: {
      icon: <BiWine />,
      title: 'Bar',
      size: 24,
      color: '#2442F8',
      location: '/user/bar'
   }
   , 4: {
      icon: <BiUserCheck />,
      title: 'CMS',
      size: 24,
      color: '#2442F8',
      location: '/user/cms'
   }
   , 5: {
      icon: <BiMoneyWithdraw />,
      title: 'Finance',
      size: 24,
      color: '#2442F8',
      location: '/user/finance'
   }
   , 6: {
      icon: <BiCreditCardFront />,
      title: 'Credit',
      size: 24,
      color: '#2442F8',
      location: '/user/credit'
   }
   , 7: {
      icon: <BiReceipt />,
      title: 'Purchase',
      size: 24,
      color: '#2442F8',
      location: '/user/purchase'
   }
   , 8: {
      icon: <BiHistory />,
      title: 'History',
      size: 24,
      color: '#2442F8',
      location: '/user/history'
   }
};
