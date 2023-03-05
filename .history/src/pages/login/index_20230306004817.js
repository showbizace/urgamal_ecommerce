import Image from 'next/image'
import backImage from '../../../public/plant.jpg'
const Login = () => {
    return (
        <div className='w-full h-full flex flex-row'>
            <div style={{ width: '50%', height: '100%', }}>
                <Image
                    width={1500}
                    height={1500}
                    style={{ height: "100%" }}
                    sizes=""
                    src="/plant.jpg"
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