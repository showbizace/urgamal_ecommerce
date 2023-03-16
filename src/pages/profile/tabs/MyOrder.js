import Image from 'next/image'
import { useState } from 'react'

import { Button, TextInput } from '@mantine/core';
import Order from '../../components/Profile/Order';
const MyOrder = () => {

    const [tabs, setTabs] = useState(1)

    const clickTabs = (id) => {
        setTabs(id)
    }
    return (
        <div style={{ width: "72.5%" }} className="flex flex-col">
            <div className='bg-white ml-8 w-full rounded-md py-4 px-6'>
                <p className='text-lg'>Хувийн мэдээлэл</p>
            </div>
            <div className='bg-white ml-8 w-full rounded-md px-6 mt-4 py-2'>
                <div className='flex flex-row justify-around items-center '>
                    {tabs === 1 ? <p className='text-base py-2 w-full text-center border-b-2 border-background-sort' id={1} onClick={() => clickTabs(1)}>Баталгаажсан</p> : <p className='text-base text-grey hover:bg-button-yellow hover:text-black w-full py-2 text-center' id={1} onClick={() => clickTabs(1)}>Баталгаажсан</p>}
                    {tabs === 2 ? <p className='text-base w-full py-2 text-center border-b-2 border-background-sort' id={2} onClick={() => clickTabs(2)}>Цуцлагдсан</p> : <p className='text-base text-grey hover:bg-button-yellow w-full py-2 text-center  hover:text-black' id={2} onClick={() => clickTabs(2)}>Цуцлагдсан</p>}
                    {tabs === 3 ? <p className='text-base  w-full py-2 text-center border-b-2 border-background-sort' id={3} onClick={() => clickTabs(3)} >Хүргэгдсэн</p> : <p className='text-base text-grey hover:bg-button-yellow w-full py-2 text-center  hover:text-black' id={3} onClick={() => clickTabs(3)}>Хүргэгдсэн</p>}
                    {tabs === 4 ? <p className='text-base w-full py-2 text-center border-b-2 border-background-sort' id={4} onClick={() => clickTabs(4)}>Баталгаажаагүй</p> : <p className='text-base text-grey hover:bg-button-yellow w-full py-2 text-center  hover:text-black' id={4} onClick={() => clickTabs(4)}>Баталгаажаагүй</p>}
                </div>
                {tabs === 1 && <div>
                    <Order orderNumber={"№SM1234567"} price={"150000₮"} />
                    <Order orderNumber={"№SM1234567"} price={"150000₮"} />
                </div>}
            </div>
        </div>
    )
}

export default MyOrder