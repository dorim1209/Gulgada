import React from 'react'
import './../css/Header.css'
import logo from './../logo.png'

const Header = ({ MainMode, LoginMode, JoinMode, LogoutMode, MypageMode, UploadMode }) => {
    return (
        <div className='Header'>
            <div className="left">
                <img src={logo} alt="" onClick={MainMode} />
            </div>
            <div className="right">
                {
                    localStorage.getItem('name') ?
                        <>
                            <p onClick={LogoutMode}>로그아웃</p>
                            <p onClick={MypageMode}>마이페이지</p>
                            <p onClick={UploadMode}>공고올리기 모드</p>
                        </> :
                        <>
                            <p onClick={LoginMode}>로그인</p>
                            <p onClick={JoinMode}>회원가입</p>
                        </>
                }
            </div>
        </div >
    )
}

export default Header
