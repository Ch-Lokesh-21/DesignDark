"use client"
import React, { useEffect } from 'react'
import ImageUpload from './_components/imageUpload'
function Dashboard() {
    return (
        <div className='flex justify-center items-center flex-col gap-8'>
            <h2 className='font-bold text-3xl text-center text-primary'>Convert Wire Frame to code</h2> 
            <ImageUpload/>  
        </div>
    )
}

export default Dashboard;