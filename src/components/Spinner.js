import React from 'react';

const Spinner = (props)=>{
    return  (
                <div className={props.klass} role="status">
                    <span className="visually-hidden"></span>
                </div>
                
            );
}

Spinner.defaultProps = {
    klass: 'spinner-border text-secondary',
};
export default Spinner;