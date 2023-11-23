
import ProductCardProfile from '../../../components/ProductCardProfile'
import Image from 'next/image'
const SavedOrder = () => {
    return (
        <div style={{ width: "72.5%" }} className="flex flex-col">
            <div className='bg-white ml-8 w-full rounded-md py-4 px-12'>
                <p className='text-lg'>Хадгалсан бараа</p>
                <div className="mt-4 flex flex-col w-full">
                    <ProductCardProfile src={"/bundle-1.svg"}
                        name={"Энерген Экстра"}
                        count={"50ш"}
                        price={"15’000₮"} />
                    <ProductCardProfile src={"/bundle-1.svg"}
                        name={"Энерген Экстра"}
                        count={"50ш"}
                        price={"15’000₮"} />
                    <ProductCardProfile src={"/bundle-1.svg"}
                        name={"Энерген Экстра"}
                        count={"50ш"}
                        price={"15’000₮"} />
                    <ProductCardProfile src={"/bundle-1.svg"}
                        name={"Энерген Экстра"}
                        count={"50ш"}
                        price={"15’000₮"} />
                    <div className='mt-4 flex flex-row justify-between items-center'>
                        <div className='flex flex-row items-center'>
                            <Image src={"/icons/trolley.svg"} width={25} height={25} alt='trolley' />
                            <p className='text-xs ml-2'>Бүгдийг сагслах</p>
                        </div>
                        <div className='flex flex-row items-center'>
                            <Image src={"/icons/ph_trash.svg"} width={25} height={25} alt='trash' />
                            <p className='text-xs ml-1 text-red-500'>Бүгдийг устгах</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SavedOrder