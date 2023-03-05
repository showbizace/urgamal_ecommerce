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
            <div className='flex flex-col relative justify-center ' style={{ width: "35rem" }}>
                <Image src="/logo.png" width={100} height={100} />
                <p className='text-xl font-bold mt-4'>Нэвтрэх</p>
                <div style={{ width: "80%" }}>
                    <input placeholder='Утасны дугаар' style={{ width: "100%", }} className="px-4 py-2" />
                </div>
            </div>
        </div>
    )
}

export default Login