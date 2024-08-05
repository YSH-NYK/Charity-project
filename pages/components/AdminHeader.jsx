import Head from 'next/head';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const AdminHeader = () => {
    const router = useRouter();
    const [Display, setDisplay] = useState('hidden')
    const [UserEmail, setUserEmail] = useState('Not Found!')

    const handleDisplay = (e) => {
        setDisplay((Display === 'hidden') ? 'block' : 'hidden');
    }

    const logout = (e) => {
        localStorage.removeItem('token');
        router.push('/admin-panel');
    }

    useEffect(() => {
        if (localStorage.getItem('userEmail')) {
            setUserEmail(localStorage.getItem('userEmail'));
        }
    }, [])


    return (
        <div className='flex justify-between p-4 items-center'>
            <Head>
                <link rel="icon" href={'/giftRightLogo.png'} />
            </Head>

            <div>
                <div className='size-[60px]'>
                    <Link href={'/admin-panel/charity'}>
                        <img className='w-full' src="/giftRightLogo.png" alt="logo" />
                    </Link>
                </div>
            </div>

            <div className='flex justify-end items-center space-x-2 relative' onClick={handleDisplay}>
                <p>Admin</p>
                <div className='cursor-pointer size-[40px] rounded-full flex justify-center items-center bg-yellow-500'>
                    <img className='w-1/2' src="/icons/userIcon.png" alt="logo" />
                </div>

                <div className={`rounded-xl p-2 bg-white shadow-2xl absolute overflow-hidden w-[200px] space-y-2 translate-y-[70px] border border-black ${Display}`}>
                    <p className='border-b border-black py-1'>{UserEmail}</p>
                    <p className='font-semibold text-red-500 cursor-pointer py-1' onClick={logout}>Logout</p>
                </div>
            </div>
        </div>
    )
}

export default AdminHeader