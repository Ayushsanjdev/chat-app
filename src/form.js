import React from 'react';

function FormComponent() {
    return (
        <main className='formComponent'>
            <input className='userName' placeholder='username' type='username' />
            <input className='passWord' placeholder='password' type='password' />
            <button className='formBtn'>
                Sign In
            </button>
        </main>
    )    
}

export default FormComponent;