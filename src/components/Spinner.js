import React from 'react';

const Spinner = (props)=>{
    return  (
                <div class="spinner-grow spinner-grow-sm" role="status">
                    <span class="sr-only"></span>
                </div>
            );
}

Spinner.defaultProps = {
    message: ''
};
export default Spinner;