import { BiBed, BiBowlHot, BiBuildingHouse, BiCabinet, BiChart, BiCog, BiCreditCardFront, BiFork, BiMoneyWithdraw, BiWine } from "react-icons/bi";
import { BsGraphDown, BsGraphDownArrow, BsGraphUp, BsGraphUpArrow } from "react-icons/bs";

export const SidebarInfo = {
   0: {
      icon: <BiBed />,
      title: 'Rooms',
      size: 24,
      color: '#2442F8',
      location: '/admin/rooms'
   }
   , 1: {
      icon: <BiFork />,
      title: 'Restaurant',
      size: 24,
      color: '#2442F8',
      location: '/admin/restaurant'
   }
   , 2: {
      icon: <BiBowlHot />,
      title: 'Menu',
      size: 24,
      color: '#2442F8',
      location: '/admin/menu'
   }
   , 3: {
      icon: <BiWine />,
      title: 'Bar',
      size: 24,
      color: '#2442F8',
      location: '/admin/bar'
   }
   , 4: {
      icon: <BiCabinet />,
      title: 'Inventory',
      size: 24,
      color: '#2442F8',
      location: '/admin/inventory'
   }

};
export const SettingSidebarInfo = {

   0: {
      icon: <BiCog />,
      title: 'Settings',
      size: 24,
      color: '#2442F8',
      location: '/admin/setting'
   }
};
export const AdminFinanceInfo = {


   6: {
      icon: <BiMoneyWithdraw />,
      title: 'Day Book',
      size: 22,
      color: '#2442F8',
      location: '/admin/finance'
   }
   , 7: {
      icon: <BsGraphUpArrow />,
      title: 'Sales Account',
      size: 22,
      color: '#2442F8',
      location: '/admin/salesAccount'
   }
   , 8: {
      icon: <BsGraphDownArrow />,
      title: 'Purchase Account',
      size: 22,
      color: '#2442F8',
      location: '/admin/salesCredit'
   }
   , 9: {
      icon: <BsGraphUp />,
      title: 'Sales Credit',
      size: 22,
      color: '#2442F8',
      location: '/admin/salesCredit'
   }
   , 10: {
      icon: <BsGraphDown />,
      title: 'Purchase Credit',
      size: 22,
      color: '#2442F8',
      location: '/admin/salesCredit'
   },


};