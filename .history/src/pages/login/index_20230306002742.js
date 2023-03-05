import Image from 'next/image'
const Login = () => {
    return (
        <div className='w-full h-full flex flex-row'>
            <div className='w-7/12 ' style={{ height: "200%" }}>
                <Image src="/plant.jpg" fill style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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