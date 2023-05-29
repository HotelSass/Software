type CardProps = {
  number: number;
  title: string;
  color:string
};
const CardSmall = ({ number, title,color }: CardProps) => {
  return (
    <div className=" w-36 h-36 border border-blue-200 rounded-2xl flex flex-col overflow-hidden m-2 hover:border-[#2442F8] cursor-pointer">
      <div className="text-[36px] font-semibold text-center p-5" style={{color:color}}>{number}</div>

      <div className=" flex-1 bg-[#ebebeb] rounded-b-2xl p-3 font-medium overflow-ellipsis text-[13px] text-gray-600">{title}</div>
    </div>
  );
};
export default CardSmall;
