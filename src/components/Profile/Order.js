
import { Button, TextInput, Collapse } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import CollapseItem from './CollapseItem';

const Order = ({ orderNumber, price }) => {

    const [opened, { toggle }] = useDisclosure(false);

    return (
        <div>
            <div className='flex flex-row justify-between items-center p-2 hover:bg-grey-back' onClick={toggle} style={{ borderBottom: "1px solid rgba(0, 30, 29, 0.23)" }}>
                <div className='flex flex-col'>
                    <div className='flex flex-row'>
                        <p className='text-base text-grey'>Захиалгын дугаар :</p>
                        <p className='text-base ml-1'>{orderNumber}</p>
                    </div>
                    <div className='flex flex-row'>
                        <p className='text-base text-grey'>Баталгаажсан : </p>
                        <p className='text-base ml-1'>{price}</p>
                    </div>
                </div>
                <div className='flex flex-row gap-2'>
                    <Button variant="outline" color={"red"}>Захиалга цуцлах</Button>
                    <Button variant="outline" color={"dark"}>Захиалга дэлгэрэнгүй</Button>
                </div>
            </div>
            <Collapse in={opened}>
                <CollapseItem src={"/bundle-1.svg"}
                    name={"Энерген Экстра"}
                    count={"50ш"}
                    price={"15’000₮"} />
                <CollapseItem src={"/bundle-1.svg"}
                    name={"Энерген Экстра"}
                    count={"50ш"}
                    price={"15’000₮"} />
                <div className='w-full py-2 flex flex-row justify-end items-center'>
                    <p className='text-grey'>Нийт үнийн дүн :</p>
                    <p className='ml-1'>60000₮</p>
                </div>
            </Collapse>
        </div>
    )
}

export default Order