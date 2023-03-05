import Image from 'next/image'
const Login = () => {
    return (
        <body className='flex flex-row h-full'>
            <div className='w-7/12 h-full relative'>
                <Image src="/plant.jpg" fill style={{ objectFit: "cover", width: "100%", height: "100%" }} />
            </div>
            <div className=''>

            </div>
        </body>
    )
}

export default Login