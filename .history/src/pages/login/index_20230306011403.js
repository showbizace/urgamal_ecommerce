import Image from 'next/image'
import backImage from '../../../public/plant.jpg'
const Login = () => {
    return (
        <div className='w-full h-full flex flex-row absolute'>
            <div style={{ width: "65%", height: "100%", position: "relative" }}>
                <Image
                    fill
                    src={"/plant.jpg"}
                />
            </div>
            <div className='flex flex-col relative items-center justify-center ' style={{ width: "35rem" }}>
                <p className='text-xl font-bold mt-8'>Нэвтрэх</p>

                <Image src="/logo.png" width={100} height={100} />

            </div>
        </div>
    )
}

export default Login