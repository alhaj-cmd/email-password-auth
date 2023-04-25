import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../../firebaseConfig';

const auth = getAuth(app);


const Register = () => {

    const [email, setEmail] = useState('');
    const [error, setError] =  useState('');

    const handleSubmit =(event) =>{
        event.preventDefault();
        setError('');
        const emailText = event.target.email.value;
        const passwordText = event.target.password.value;
        
        console.log(emailText, passwordText)
        // validation
        if(!/(?=.*[A-Z])/.test(password)){
            setError('Please add at least one uppercase')
            return;
        }
        else if(!/(?=.*[0-9].*[0-9])/.test(password)){
            setError('please add at least two number')
            return;
        }
        else if(password.length<6){
            setError('please add at least 6 character')
            return;
        }
        // create user in fb
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            setError('')
            
          })
        .catch(error => {
            console.error(error);
            setError(error.message)
        })
    }

    const handleEmailChange = (event) =>{
        console.log(event.target.value);
        setEmail(event.target.value)
    }

    const handlePasswordBlur = (event) =>{
        console.log(event.target.value)
    }

    return (
        <div className='w-50 mx-auto'>
            <h3>Please Register !!</h3>
            <form onSubmit={handleSubmit}>
                <input className='w-50 rounded mb-4 p-1' onChange={handleEmailChange
                } type="email" name='email' id='email' placeholder='Your email' />
                <br />
                <input className='w-50 rounded mb-4 p-1' onBlur={handlePasswordBlur}
                 type="password" name='password' id='password'
                placeholder='type your password' />
                <br />
                <input className='btn btn-primary' type="submit" value="Register" />
            </form>
            <p className='text-danger'>{error}</p>
        </div>
    );
};

export default Register;