import Image from 'next/image'
import backImage from '../../../public/plant.jpg'
const Login = () => {
    return (
        <div className='w-full h-full flex flex-row'>
            <div style={{ position: "relative", height: "100%" }}>
                <Image
                    src="https://picsum.photos/500/952"
                    alt="some pic"
                    fo;;
                objectFit="cover"

                />
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