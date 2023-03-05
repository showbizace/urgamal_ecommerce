import Image from 'next/image'
import backImage from '../../../public/plant.jpg'
const Login = () => {
    return (
        <div className='w-full h-full flex flex-row'>
            <div className='w-7/12 h-full'>
                <div style={{ height: '100%', }} className="w-full h-full">
                    <Image src={"/plant.jpg"} fill />
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