import React from 'react'
import axios from 'axios';

class Login extends React.Component {
    state = {
        pnum: '',
        pw: ''
    }
    Join = async (e) => {
        const {
            data: {
                result,
                pnum,
                name
            }
        } = await axios.post('http://70.12.227.203:3000/login', {
            params: {
                pnum: this.state.pnum,
                pw: this.state.pw,
            }
        })
        console.log('this.state.pnum: ', this.state.pnum)

        console.log('result: ', result);
        if (result === 1) {
            localStorage.setItem('pnum', pnum)
            localStorage.setItem('name', name)
            return (alert(`${name}님 로그인되었습니다.`))
        }
    }
    pnumChange = (e) => {
        this.setState({
            pnum: e.target.value
        })
    }
    pwChange = (e) => {
        this.setState({
            pw: e.target.value
        })
    }
    onSubmit = async (e) => {
        e.preventDefault()
        await this.Join()
    }
    render() {
        return (
            <div>
                <form action="" onSubmit={this.onSubmit}>
                    <p>휴대폰번호</p>
                    <input type="text" placeholder='휴대폰번호' value={this.state.pnum} onChange={this.pnumChange} />
                    <p>패스워드</p>
                    <input type="password" placeholder='패스워드' value={this.state.pw} onChange={this.pwChange} />
                    <button type='submit'>로그인</button>
                </form>
            </div >
        )
    }
}

export default Login
