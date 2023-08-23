import { BiBed, BiBowlHot, BiWine, BiBuildingHouse, BiCabinet, BiChart, BiFork, BiMoneyWithdraw, BiHistory, BiUserCheck, BiReceipt } from "react-icons/bi";
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
      title: 'Table',
      size: 24,
      color: '#2442F8',
      location: '/user/table'
   }
   , 2: {
      icon: <BiFork />,
      title: 'Restaurant',
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
      icon: <BiReceipt />,
      title: 'Purchase',
      size: 24,
      color: '#2442F8',
      location: '/user/purchase'
   }
   , 7: {
      icon: <BiHistory />,
      title: 'History',
      size: 24,
      color: '#2442F8',
      location: '/user/history'
   }
};
