import Image from 'next/image'
import backImage from '../../../public/plant.jpg'
const Login = () => {
    return (
        <div className='w-full h-full flex flex-row'>
            <div className="h-screen">
                <div className="absolute -z-10">
                    <Image
                        src="/some.jpeg"
                        fill
                        objectFit="cover"
                        quality={100}
                    />
                </div>
                <div> Some overlay things go in here </div>
            </div>
            <div className='flex flex-col'>
                <div>
                    dasdas
                </div>
            </div>
        </div>
    )
}

export default Login