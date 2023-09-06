'use client'
import React from 'react'
import PurchaseBill from '../components/PurchaseBill';

const Client = ({ vendorList, location, unit, bankDetail }: any) => {

    return (
        <PurchaseBill vendorList={vendorList} location={location} unit={unit} />
    )
}

export default Client