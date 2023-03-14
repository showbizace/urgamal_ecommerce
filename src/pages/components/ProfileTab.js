
import Image from 'next/image'
const ProfileTabs = ({ image, text, id, onClickTabs, first }) => {
    return (
        <div className='tab'>
            <div className='flex flex-row items-center py-3 pl-14 hover:bg-grey-back' key={id} onClick={(values) => onClickTabs(id)}
                style={first === true ? { "backgroundColor": "#F9BC60", color: "white" } : {}}>
                <Image width={30} height={30} src={image} color={"black"} />
                <p className='ml-4 text-base'>{text}</p>
            </div>
        </div>
    )
}

export default ProfileTabs