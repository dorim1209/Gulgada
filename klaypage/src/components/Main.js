import React from 'react'
import Card from './Card'
import './../css/Main.css'

import axios from 'axios';

class Main extends React.Component {
    state = {
        article: []
    }
    article = async () => {
        const {
            data: {
                article
            }
        } = await axios.get('http://70.12.227.203:3000/article')
        console.log(article);
        this.setState({ article });
    }

    componentDidMount = () => {
        this.article()
        const pnum = localStorage.getItem('pnum')
        const name = localStorage.getItem('name')
        console.log('****************************');
        console.log("확인 pnum: ", pnum)
        console.log("확인 name: ", name)
        console.log('****************************');
    }

    render() {
        const { article } = this.state;
        return (
            <div className='Main' >
                <input placeholder='검색하세요' />
                <button>검색</button>
                <p>최근 검색 내역</p>
                <p>신규 공고 내역</p>
                <table></table>
                <div className="newRecruit">
                    {article.map(({ db_image, db_title, db_date, db_money, db_address }) => (
                        < Card db_image={db_image} db_title={db_title} db_date={db_date} db_money={db_money} db_address={db_address} />
                    ))}
                </div>
            </div >
        )
    }
}

export default Main
