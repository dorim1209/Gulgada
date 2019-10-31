import React, { Component } from 'react'
import axios from 'axios'


class Upload extends Component {
    state = {
        title: '',
        date: '',
        money: '',
        address: ''
    }
    Upload = async (e) => {
        const formData = new FormData();
        await formData.append('file', this.state.file);
        const {
            data: {
                result
            }
        } = await axios.post('http://70.12.227.203:3000/upload', {
            params: {
                title: this.state.title,
                date: this.state.date,
                money: this.state.money,
                address: this.state.address,
            }
        })
        if (result) {
            return (alert(`${result}`))
        }
    }
    titleChange = (e) => {
        console.log("asdasd: ", e.target.value);

        this.setState({
            title: e.target.value
        })
    }
    dateChange = (e) => {
        console.log("asdasd: ", e.target.value);

        this.setState({
            date: e.target.value
        })
    }
    moneyChange = (e) => {
        console.log("asdasd: ", e.target.value);

        this.setState({
            money: e.target.value
        })
    }
    addressChange = (e) => {
        console.log("asdasd: ", e.target.value);

        this.setState({
            address: e.target.value
        })
    }

    render() {
        return (
            <div className='Upload'>
                <p>업무</p>
                <input type="text" name="" id="" placeholder='상호명' value={this.state.title} onChange={this.titleChange} />
                <p>날짜</p>
                <input type="text" name="" id="" placeholder='날짜' value={this.state.date} onChange={this.dateChange} />
                <p>시급</p>
                <input type="text" name="" id="" placeholder='시급' value={this.state.money} onChange={this.moneyChange} />
                <p>주소</p>
                <input type="text" name="" id="" placeholder='주소' value={this.state.address} onChange={this.addressChange} />
                <button onClick={this.Upload}>공고올리기</button>
            </div>
        )
    }
}

export default Upload