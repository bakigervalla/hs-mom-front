import React from 'react';

export const Loading = props => {

    return (
        <div>
            <img src={process.env.PUBLIC_URL + '/assets/images/loading.gif'} alt="...loading" style={{ width: '200px', margin: ' 40px auto', display: 'block' }}/>
        </div>
    )
};