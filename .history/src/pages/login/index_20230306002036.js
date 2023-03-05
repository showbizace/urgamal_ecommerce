import Image from 'next/image'
const Login = () => {
    return (
        <body className='flex flex-row h-full'>
            <div className='w-7/12'>
                <Image src="/plant.jpg" width={1000} height={1500} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
            </div>
            <div className=''>

            </div>
        </body>
    )
}

export default Login