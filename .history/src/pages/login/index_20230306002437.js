import Image from 'next/image'
const Login = () => {
    return (
        <div className='w-full h-full flex flex-row'>
            <div className='w-7/12 h-full'>
                <Image src="/plant.jpg" width={1000} height={1020} style={{ width: "100%", height: "100%" }} />
            </div>
            <div></div>
        </div>
    )
}

export default Login