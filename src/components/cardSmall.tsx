import serverUrl from "@/config/config";
import { useRouter } from "next/navigation";
import { BiPencil, BiTrash } from "react-icons/bi";

type CardProps = {
  number: number;
  title: string;
  color: string;
  setOpen: any;
  setData: any
  description: string
};

const CardSmall = ({ number, title, color, setOpen, setData, description }: CardProps) => {
  const router = useRouter()
  async function deleteCategory(title: string) {
    try {
      const response = await fetch(serverUrl + "/menu/deleteCategory/"+title.toLowerCase(), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        
      });
      if (response.ok) {
        setOpen(false)

      } else {
      }

    } catch (err) {
      console.log(err)
    }
    router.refresh()


  }
  return (
    <div className=" w-32 h-32 border border-blue-200 rounded-2xl flex flex-col overflow-hidden m-2 hover:border-[#2442F8] cursor-pointer">
      <button onClick={() => { setOpen(true); setData({ title, description }) }} className=" ml-auto mr-2 mt-2  rounded-lg">
        <BiPencil color="#8f8f8f" />
      </button>
      <div
        className="text-[24px] font-semibold text-center p-2"
        style={{ color: color }}
      >
        {number}
      </div>
      <div className="flex-1 bg-[#ebebeb] rounded-b-2xl flex flex-row">
        <div className=" flex-1  p-3 font-medium overflow-ellipsis text-[11px] text-gray-600">
          {title}
        </div>

        <button onClick={() => deleteCategory(title)} className=" rounded-lg mr-2">
          <BiTrash color="#8f8f8f" />
        </button>
      </div>
    </div>
  );
};
export default CardSmall;
