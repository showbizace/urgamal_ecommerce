import Image from 'next/image'
import backImage from '../../../public/plant.jpg'
const Login = () => {
    return (
        <div className='w-full h-full flex flex-row'>
            <div style={{ position: "relative", height: "100%" }}>
                <Image
                    src="https://picsum.photos/500/952"
                    alt="some pic"
                    layout="fill"
                    objectFit="cover"
                    css={css`
              border-radius: 5px;
              box-shadow: 0 4px 8px 0 rgba(75, 0, 131, 0.2);
            `}
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