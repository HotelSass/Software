'use client'
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter()
  return (
    <div className="">
      <button className="m-5" onClick={() => router.replace('/user/rooms')}>User Section</button>
      <button className="m-5" onClick={() => router.replace('/admin/rooms')}>Admin Section</button>
    </div>
  );
};

export default Page;
