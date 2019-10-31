import React from 'react'
import './../css/Card.css'

const Card = ({ db_title, db_date, db_money, db_address }) => {
    return (
        <div className='Card'>
            <p>{db_title}</p>
            <p>{db_date}</p>
            <p>{db_money}</p>
            <p>{db_address}</p>
        </div>
    )
}

export default Card
