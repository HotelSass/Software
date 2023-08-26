import { BiBed, BiWine, BiFork, BiMoneyWithdraw, BiHistory, BiUserCheck, BiReceipt, BiCreditCardFront,BiListCheck } from "react-icons/bi";
import { MdFoodBank } from "react-icons/md"

export const UserSidebarInfo = {

   0: {
      icon: <BiBed />,
      title: 'Room',
      size: 22,
      color: '#2442F8',
      location: '/user/rooms'
   }
   , 1: {
      icon: <MdFoodBank />,
      title: 'Orders',
      size: 22,
      color: '#2442F8',
      location: '/user/table'
   }
   , 2: {
      icon: <BiFork />,
      title: 'KOT',
      size: 22,
      color: '#2442F8',
      location: '/user/restaurant'
   }
   , 3: {
      icon: <BiWine />,
      title: 'Bar',
      size: 22,
      color: '#2442F8',
      location: '/user/bar'
   }
   , 4: {
      icon: <BiUserCheck />,
      title: 'CMS',
      size: 22,
      color: '#2442F8',
      location: '/user/cms'
   }
   , 5: {
      icon: <BiCreditCardFront />,
      title: 'Credit',
      size: 22,
      color: '#2442F8',
      location: '/user/credit'
   },
   6: {
      icon: <BiMoneyWithdraw />,
      title: 'Day Book',
      size: 22,
      color: '#2442F8',
      location: '/user/finance'
   }

   , 7: {
      icon: <BiReceipt />,
      title: 'Purchase',
      size: 22,
      color: '#2442F8',
      location: '/user/purchase'
   }
   , 8: {
      icon: <BiHistory />,
      title: 'History',
      size: 22,
      color: '#2442F8',
      location: '/user/history'
   }
   , 9: {
      icon: <BiListCheck />,
      title: 'Logs',
      size: 22,
      color: '#2442F8',
      location: '/user/logs'
   }
};
