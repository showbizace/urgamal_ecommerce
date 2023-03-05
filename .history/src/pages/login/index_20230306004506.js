import Image from 'next/image'
import backImage from '../../../public/plant.jpg'
const Login = () => {
    return (
        <div className='w-full h-full flex flex-row'>
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <Image
                    alt='Mountains'
                    src='/mountains.jpg'
                    fill
                    style={{ objectFit: "cover" }}
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