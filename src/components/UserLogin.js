
import Logomark from './Logomark';
import LoginButton from './LoginButton';

const UserLogin = () => {

    return (

        <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex flex-row ">
                <div className="md:shrink-0 ">
                    <Logomark />
                </div>
                <div className='bg-gray-500 md:flex w-full justify-center items-center '>
                    <LoginButton />
                </div>
            </div>
        </div>

    )
}

export default UserLogin;