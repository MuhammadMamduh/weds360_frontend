import React from 'react';

const Spinner = (props)=>{
    return  (
                <div>
                    <div class={props.klass} role="status">
                        <span class="sr-only"></span>
                    </div>
                    <h1>{props.message}</h1>
                </div>
            );
}

Spinner.defaultProps = {
    message: '',
};
export default Spinner;