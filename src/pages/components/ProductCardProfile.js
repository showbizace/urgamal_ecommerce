import Image from 'next/image'
import { Button } from '@mantine/core';
const ProductCardProfile = ({ src, name, count, price }) => {
    return (
        <div className='divide-b-4 divide-slate-700 w-full' style={{ borderBottom: "2px solid #DADEDE" }}>
            <div className='flex flex-row p-4  '>
                <Image src={src} width={100} height={150} />
                <div className='flex flex-col justify-evenly ml-3 '>
                    <p className="text-sm mt-1">{name}</p>
                    <div className='flex flex-row items-center'>
                        <p className='text-grey text-xs'>Нийт : </p>
                        <p className='text-xs font-bold'>150’000₮</p>
                        <p className='text-grey text-xs ml-4'>Ширхэг:</p>
                        <p className='text-xs'>10</p>
                        <p className='text-grey text-xs ml-4'>Нэгж үнэ:</p>
                        <p className='text-xs'>15’000₮</p>
                    </div>
                    <div className='flex flex-row'>
                        <Button variant={"filled"} className="mr-4" style={{ backgroundColor: "#F9BC60", fontWeight: "normal", padding: "6px" }}>
                            Сагсанд хийх
                        </Button>
                        <Button variant={"outline"} color={"red"} style={{ fontWeight: "normal", padding: "6px" }}>
                            Арилгах
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCardProfile