import React from 'react'
import axios from 'axios'

class Mypage extends React.Component {
    state = {
        ptype: '',
        birth: ''
    }
    Mypage = async (e) => {
        const {
            data: {
                result,
                ptype,
                birth
            }
        } = await axios.post('http://70.12.227.203:3000/mypage', {
            params: {
                pnum: localStorage.getItem('pnum'),
                name: localStorage.getItem('name'),
            }
        })

        console.log('result: ', result);
        console.log('ptype: ', ptype);
        if (result === 1) {
            this.setState({ ptype, birth })
        }
    }
    componentDidMount = async () => {
        await this.Mypage()
    }
    render() {
        return (
            <div>
                <p>타입</p>
                <input type="text" placeholder={this.state.ptype} />
                <p>이름</p>
                <input type="text" placeholder={localStorage.getItem('name')} />
                <p>생년월일</p>
                <input type="text" placeholder={this.state.birth} />
                <p>휴대폰 번호</p>
                <input type="text" placeholder={localStorage.getItem('pnum')} />
            </div>
        )
    }
}

export default Mypage
