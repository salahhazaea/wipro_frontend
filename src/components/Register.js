import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import BASE_URL from '../api_url';
import { ContextApi } from '../App';
import logo from '../images/logo (1).svg'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import applogo from '../images/appLogo.png'
import tradelogo from '../images/logo_g.svg'
import Tradmark from './Tradmark';

const Register = () => {

    const navigate = useNavigate();

    const {
        setLoading,
        toaster,

    } = useContext(ContextApi);

    const [search, setSearch] = useSearchParams();

    const [otpfield, setOTPfield] = useState('');
    const [otp, setOtp] = useState('');
    const [mobno, setMobno] = useState('')
    const [pwd, setPwd] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [invt, setInvt] = useState(search.get('invitation_code'));
    const [secret, setSecret] = useState('password')


    const secrethandel = () => {
        if (secret === 'password') {
            setSecret('text')
        }
        else {
            setSecret('password')
        }
    }

    const validatePassword = password => /[a-zA-Z]/.test(password) && /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);

    const handleRegister = async () => {

        if (mobno.length !== 10) {
            toaster('Invalid Mobile Number');
            return;
        }

        else if (pwd.length < 6) {
            toaster('Password must contain at least 6 characters!');
            return;
        }

        else if (validatePassword(pwd) === false) {
            toaster('Password must contain letters and numbers or special symbols');
            return;
        }

        else if (name.length === 0) {
            toaster('Nick Name Should not be empty')
        }

        setLoading(true);

        await axios.post(`${BASE_URL}/register`, { mobno, pwd, name, email, invt })
            .then(({ data }) => {
                if (data.message === 'Mobile Number already registered!') {
                    toaster('Mobile Number already registered!');
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);
                } else if (data.message === 'invalid invite code') {
                    toaster('invalid invite code!');
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);
                } else {
                    toaster('registration success');
                    // localStorage.setItem('uid', data.user_id);
                    setMobno('');
                    setPwd('');
                    // setInvt('');
                    setEmail('')
                    setName('')
                    setOTPfield('')
                    setOtp('')
                    setTimeout(() => {
                        navigate('/login');
                        setLoading(false);
                    }, 2000);
                }
            })
            .catch((error) => {
                toaster('Something went wrong');
                setLoading(false)
                console.error(error);
            });
    }

    const handleMessage = () => {
        if (mobno.length !== 10) {
            toaster('Invalid Mobile No, please enter a valid number');
            return;
        }
        fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=27b58V4YOqBDMgWvNjapz1k9IHlrJfynC6w0hceRAZGoLimK3PuJC7OoiV4N2B6DjfwWKzb0lhgEetPH&variables_values=${otpfield}&route=otp&numbers=${mobno}`)
            .then((response) => {
                console.log(response);
                toaster('OTP sent successfully');
            })
            .catch(error => toaster('Something went wrong'));
    }

    // console.log("otp",otpfield);

    return (
        <>

            <div className="signupMain bgimg01 after:bg-white">

                <div className="max-w-[800px] mx-auto">

                    <div className="flex relative items-center min-h-[90vh] flex-wrap mx-auto">

                        <div className="w-full">

                            <div className="bg-white mt-5 mb-[50px] mx-[10px] pt-10 px-5 pb-5 relative rounded-lg">

                                <div className="w-full rounded-2xl mb-8">

                                    <img src={applogo} alt="logo" className='max-h-[100px] inline-block relative' />

                                </div>



                                <div className="">

                                    <div className="mb-5 relative">

                                        <div className="px-[10px] relative border-0 border-solid border-[rgba(215, 215, 215, 0.6)] bg-[rgb(246,246,246)] rounded-[7px] flex items-center flex-wrap">
                                            <div className="flex items-center flex-wrap h-full text-center z-10">
                                                <p className='text-sm text-[#818393] mr-1'>+91</p>
                                            </div>
                                            <div className="flex items-center relative flex-1">
                                                <input onChange={e => { setMobno(e.target.value); setOTPfield(String(Math.floor(100000 + Math.random() * 900000))) }}
                                                    type="number"
                                                    name="mobno"
                                                    id="mobno"
                                                    className=' fillArea w-full h-[50px] text-base px-[5px] py-[10px] appearance-none select-text outline-none border-0 border-[#e0e0e0] border-solid text-[#1e2531] font-medium bg-transparent '
                                                    maxLength={11}
                                                    size={11}
                                                    placeholder=''
                                                />
                                                <div className="cut bg-transparent rounded-[10px] h-5 left-[10px] absolute -top-5 translate-y-0 w-[100px] transition-transform delay-0 eas duration-200"></div>
                                                <label className='placeholder text-[#818393] text-sm left-[10px] pointer-events-none absolute origin-[0_50%] transition-all duration-200  '>TEL</label>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-5 relative">

                                        <div className="px-[10px] relative border-0 border-solid border-[rgba(215, 215, 215, 0.6)] bg-[rgb(246,246,246)] rounded-[7px] flex items-center flex-wrap">
                                            <input onChange={e => setPwd(e.target.value)}
                                                type={secret}
                                                name="pwd"
                                                id="pwd"
                                                className='flex-1 fillArea w-full h-[50px] text-base px-[5px] py-[10px] appearance-none select-text outline-none border-0 border-[#e0e0e0] border-solid text-[#1e2531] font-medium bg-transparent '
                                                placeholder=''

                                            />
                                            <div className="cut bg-transparent rounded-[10px] h-5 left-[10px] absolute -top-5 translate-y-0 w-[100px] transition-transform delay-0 eas duration-200"></div>
                                            <label className='placeholder text-[#818393] text-sm left-[10px] pointer-events-none absolute origin-[0_50%] transition-all duration-200  '>Login password</label>
                                            <div className={` right-[10px] h-full text-center bg-no-repeat bg-[center_center]  bg-[length:30px] z-10 `} onClick={secrethandel}>
                                                {
                                                    secret === 'password' ?
                                                        <AiFillEyeInvisible size={22} />
                                                        :
                                                        <AiFillEye size={22} />
                                                }
                                            </div>

                                        </div>
                                    </div>

                                    <div className="mb-5 relative">

                                        <div className="px-[10px] relative border-0 border-solid border-[rgba(215, 215, 215, 0.6)] bg-[rgb(246,246,246)] rounded-[7px] flex items-center flex-wrap">
                                            <input onChange={e => setName(e.target.value)}
                                                type='text'
                                                name="name"
                                                id="name"
                                                className=' fillArea w-full h-[50px] text-base px-[5px] py-[10px] appearance-none select-text outline-none border-0 border-[#e0e0e0] border-solid text-[#1e2531] font-medium bg-transparent flex-1'
                                                placeholder=''
                                                maxLength={20}
                                                size={20}

                                            />
                                            <div className="cut bg-transparent rounded-[10px] h-5 left-[10px] absolute -top-5 translate-y-0 w-[100px] transition-transform delay-0 eas duration-200"></div>
                                            <label className='placeholder text-[#818393] text-sm left-[10px] pointer-events-none absolute origin-[0_50%] transition-all duration-200  '>Nick Name</label>
                                        </div>
                                    </div>

                                    <div className="mb-5 relative">

                                        <div className="px-[10px] relative border-0 border-solid border-[rgba(215, 215, 215, 0.6)] bg-[rgb(246,246,246)] rounded-[7px] flex items-center flex-wrap">
                                            <input onChange={e => setEmail(e.target.value)}
                                                type="email"
                                                name="email"
                                                id="email"
                                                className=' fillArea w-full h-[50px] text-base px-[5px] py-[10px] appearance-none select-text outline-none border-0 border-[#e0e0e0] border-solid text-[#1e2531] font-medium bg-transparent flex-1'
                                                placeholder=''
                                                maxLength={20}
                                                size={20}

                                            />
                                            <div className="cut bg-transparent rounded-[10px] h-5 left-[10px] absolute -top-5 translate-y-0 w-[100px] transition-transform delay-0 eas duration-200"></div>
                                            <label className='placeholder text-[#818393] text-sm left-[10px] pointer-events-none absolute origin-[0_50%] transition-all duration-200  '>E-mail</label>
                                        </div>
                                    </div>

                                    {/* <div className="mb-5 relative">

                                        <div className="px-[10px] relative border-0 border-solid border-[rgba(215,215,215,0.6)] bg-[rgb(246,246,246)] rounded-[7px] flex items-center flex-wrap">
                                            <input onChange={e => setOtp(e.target.value)}
                                                type="text"
                                                name="otp"
                                                id="otp"
                                                className='flex-1 fillArea w-full h-[50px] text-base px-[5px] py-[10px] appearance-none select-text outline-none border-0 border-[#e0e0e0] border-solid text-[#1e2531] font-medium bg-transparent '
                                                placeholder=''

                                            />
                                            <div className="cut bg-transparent rounded-[10px] h-5 left-[10px] absolute -top-5 translate-y-0 w-[100px] transition-transform delay-0 eas duration-200"></div>
                                            <label className='placeholder text-[#818393] text-sm left-[10px] pointer-events-none absolute origin-[0_50%] transition-all duration-200  '>Verification code (OTP)</label>
                                            <div className={` right-[10px] h-full text-center bg-no-repeat bg-[center_center]  bg-[length:30px] z-10 `} onClick={handleMessage}>
                                                <p className='text-sm text-[rgba(52,86,255,0.9)]'>Send</p>
                                            </div>

                                        </div>
                                    </div> */}

                                    <div className="mb-5 relative">

                                        <div className="px-[10px] relative border-0 border-solid border-[rgba(215, 215, 215, 0.6)] bg-[rgb(246,246,246)] rounded-[7px] flex items-center flex-wrap">
                                            <input onChange={e => setInvt(e.target.value)}
                                                type='text'
                                                name="invite"
                                                id="invite"
                                                className=' fillArea w-full h-[50px] text-base px-[5px] py-[10px] appearance-none select-text outline-none border-0 border-[#e0e0e0] border-solid text-[#1e2531] font-medium bg-transparent flex-1'
                                                placeholder=''
                                                maxLength={20}
                                                size={20}
                                                value={invt}

                                            />
                                            <div className="cut bg-transparent rounded-[10px] h-5 left-[10px] absolute -top-5 translate-y-0 w-[100px] transition-transform delay-0 eas duration-200"></div>
                                            <label className='placeholder text-[#818393] text-sm left-[10px] pointer-events-none absolute origin-[0_50%] transition-all duration-200  '>Invitation Code</label>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center my-10 w-full justify-end ">

                                        <Link to={`/login`} className='text-[#1f3d70] bg-white border-[1px] border-[#1f3d70] h-11 leading-10 px-5 text-center text-base block border-solid rounded-[500px] transition-all active:translate-y-1 duration-500 overflow-hidden relative '>SIGN IN</Link>

                                        <button className='ml-[10px] flex-1 text-white bg-[#00aa75] border-0 border-[rgba(215,215,215,0.6)] h-11 leading-10 px-5 text-center text-base block border-solid rounded-[500px] transition-all active:translate-y-1 duration-500 overflow-hidden relative ' onClick={handleRegister}>
                                            SIGN UP
                                        </button>
                                    </div>
                                </div>

                            </div>

                            <div className="flex max-w-lg m-[10px] p-[10px] items-start flex-wrap ">

                                <div className="w-20 p-1 bg-white rounded-2xl ">
                                    <img src={applogo} alt="appLogo" />
                                </div>

                                <Link to={`/download`} className="flex-1 ml-[10px]">
                                    <h3 className='p-0 m-0 text-2xl text-[#3468a3] font-bold'>Sora Machine</h3>
                                    <p className=' p-0 m-0 pb-[10px] text-base leading-none text-[#818393]'>
                                        Rest assured financial management, quality service, low risk investment, 100% return
                                    </p>
                                </Link>

                            </div>

                        </div>


                    </div>


                    <Tradmark />


                </div>
            </div>
        </>
    )
}

export default Register