import Image from 'next/image'
import backImage from '../../../public/plant.jpg'
const Login = () => {
    return (
        <div className='w-full h-full flex flex-row'>
            <div>
                <div style={{ width: '100px', height: '100px', position: 'relative' }}>
                    <Image src={"/plant.png"} layout='fill' />
                </div>
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