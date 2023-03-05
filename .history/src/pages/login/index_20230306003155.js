import Image from 'next/image'
import backImage from '../../../public/plant.jpg'
const Login = () => {
    return (
        <div className='w-full h-full flex flex-row'>
            <div className='w-7/12 h-full ' style={{
                backgroundImage: `url(${backImage.src})`,
                width: '100%',
                height: '100%',
            }}>

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