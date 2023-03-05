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
            <div className='flex flex-col relative items-center ' style={{ width: "35rem" }}>
                <p className='text-xl font-bold'>Нэвтрэх</p>
                <div>
                    <Image src="/logo.png" width={150} height={150} />
                </div>
                dsadasd
            </div>
        </div>
    )
}

export default Login