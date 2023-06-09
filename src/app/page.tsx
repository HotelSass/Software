'use client'
import React, { useState } from "react";

const Page = () => {
  const [counter,setCounter]=useState<number>(0)
  function buttonClicked(){
    setCounter(counter+1)
  }
  return (
    <div className="">
      <button onClick={buttonClicked}>Click Me to up</button>
      <div className="">{counter}</div>
    </div>
  );
};

export default Page;
