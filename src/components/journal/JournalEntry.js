import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://ninjinanimehome.files.wordpress.com/2019/07/3e8ca-lupin2biii2bpart2bv2b255bsub-espa25c325b1ol255d255bmega-mf-gd255d255bhd-fullhd255d255bonline255d2bsoanimesitehd2.jpg)'
                }}
            ></div>
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    A new day
                </p>
                <p className="journal__entry-content">
                    loremeufndikf
                </p>
            </div>
            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h3>28</h3>
            </div>
        </div>
    )
}
