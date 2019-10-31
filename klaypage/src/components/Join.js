import React from 'react'

import axios from 'axios';

class Join extends React.Component {
    state = {
        name: '',
        pnum: '',
        pw: '',
        ptype: '',
        birth: ''
    }
    Join = async (e) => {
        const {
            data: {
                result
            }
        } = await axios.post('http://70.12.227.203:3000/join', {
            params: {
                name: this.state.name,
                pnum: this.state.pnum,
                pw: this.state.pw,
                ptype: this.state.ptype,
                birth: this.state.birth
            }
        })
        console.log(this.state.name)

        console.log(result)
        return (
            alert(result)
        )
    }
    nameChange = (e) => {
        this.setState({
            name: e.target.value
        })
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
    birthChange = (e) => {
        this.setState({
            birth: e.target.value
        })
    }
    ptypeChange = (e) => {
        console.log("asdasd: ", e.target.value);

        this.setState({
            ptype: e.target.value
        })
    }
    render() {
        return (
            <div>
                <p>이름</p>
                <input type="text" name="" id="" placeholder='이름' value={this.state.name} onChange={this.nameChange} />
                <p>휴대폰 번호</p>
                <input type="text" name="" id="" placeholder='휴대폰 번호' value={this.state.pnum} onChange={this.pnumChange} />
                <p>패스워드</p>
                <input type="text" name="" id="" placeholder='패스워드' value={this.state.pw} onChange={this.pwChange} />
                <p>생일</p>
                <input type="text" name="" id="" placeholder='생일' value={this.state.birth} onChange={this.birthChange} />
                <p>타입</p>
                <input type="radio" name="ptype" id="" value='1' onChange={this.ptypeChange} />
                <span>구직</span>
                <input type="radio" name="ptype" id="" value='2' onChange={this.ptypeChange} />
                <span>구인</span>
                <button onClick={this.Join}>가입하기</button>
            </div >
        )
    }

}

export default Join
