import React from 'react'
import Layout from '../components/layout'
import NewCategory from './client/NewCategory'
import { NewCategoryServer } from './server/NewCategoryServer'
import { NewMenuServer } from './server/NewMenuServer'
import { MenuTableServer } from './server/MenuTableServer'
import Server from './server/server'

const server = () => {
  return (
    <Layout>
      <div className="flex flex-col p-6">
        <div className="text-[44px] font-bold text-gray-700 my-auto">
          Bar
        </div>
        <div className="flex flex-row">
          {/* @ts-expect-error Async Server Component */}

          <Server />
        </div>
        <div className="flex">
          <div className=" text-[20px] my-auto font-bold text-gray-600">
            Category
          </div>
          <NewCategory />
        </div>
        <div className="flex flex-row p-8 px-0 flex-wrap">
          {/* @ts-expect-error Async Server Component */}
          <NewCategoryServer />

        </div>
        <div className=" ">
          <div className=" pb-4 text-[20px] font-bold text-gray-600">
            Bar Item List
          </div>
          {/* @ts-expect-error Async Server Component */}
          <NewMenuServer />
          {/* @ts-expect-error Async Server Component */}

          <MenuTableServer />
        </div>
      </div>
    </Layout>
  )
}

export default server