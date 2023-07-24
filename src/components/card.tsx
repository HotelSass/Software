type CardProps = {
  number: number;
  title: string;
};
const Card = ({ number,title }: CardProps) => {
  return (
    <div className=" w-40 h-40 border border-blue-200 rounded-2xl flex flex-col overflow-hidden m-2 hover:border-[#2442F8] cursor-pointer">
      <div className="text-[36px] font-semibold text-[#2442F8] text-center p-5">{number}</div>

      <div className=" flex-1 bg-[#ebebeb] rounded-b-2xl p-3 font-medium overflow-ellipsis text-[16px] text-gray-600">{title}</div>
    </div>
  );
};
export default Card;
