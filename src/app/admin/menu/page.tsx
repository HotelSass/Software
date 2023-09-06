import React from 'react'
import Layout from '../components/layout'
import Card from '@/components/card'
import NewCategory from './client/NewCategory'
import { NewCategoryServer } from './server/NewCategoryServer'
import { NewMenuServer } from './server/NewMenuServer'
import { MenuTableServer } from './server/MenuTableServer'
import Server from './server/server'

const server = () => {
  return (
    <Layout>
      <div className="flex flex-col p-6 ">
        <div className="text-[44px] font-bold text-gray-700 my-auto">
          Menu
        </div>        <div className="flex flex-row">
          {/* @ts-expect-error Async Server Component */}
          <Server />
        </div>
        <div className="flex mt-8">
          <div className="pl-2 text-[28px] my-auto font-bold text-gray-600">
            Category
          </div>
          <NewCategory />
        </div>
        <div className="flex flex-row p-8 flex-wrap">
          {/* @ts-expect-error Async Server Component */}
          <NewCategoryServer />

        </div>
        <div className="px-8 ">
          <div className="pl-2 pb-4 text-[20px] font-bold text-gray-600">
            Menu List
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