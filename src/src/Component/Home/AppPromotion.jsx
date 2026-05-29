import React from 'react';
import { Link } from 'react-router';
import AppPromotionBanner from '/assets/img/App Promotion.webp';

function AppPromotion() {
    return (
        <Link to='/home'>
            <img src={AppPromotionBanner} className='h-[85vh] w-full md:h-full object-cover object-[40%_50%]' alt="App Promotion" />
        </Link>
    );
}

export default AppPromotion;
