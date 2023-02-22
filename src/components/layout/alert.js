import React from "react";

export const Alert = props => {
    return (
        props?.length > 0 && props.map(alert => (
            <div key={ alert.id } className={ `alert alert-${alert.type}` }>
                <i className="fas fa-info-circle"></i> { alert.message }
            </div>
        ))
    );

};
