// import React from 'react';
// import './App.css';

// const SignIn = (props) => {
//     const {
//         email,
//         setEmail,
//         password,
//         setPassword,
//         handleLogin,
//         handleSignUp,
//         hasAccount,
//         setHasAccount,
//         emailError,
//         passwordError,
//         sighInWithGoogle,
//     } = props;
// }

// return (
//     <section>
//         <div>
//             <label>user name</label>
//         </div>
//         <input
//             type='text'
//             autoFocus
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}>
//         </input>
//         <p>{emailError}</p>
//         <label>password</label>
//         <input
//             type='password'
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)} />
//         <p>{passwordError}</p>
//         <div>
//             {hasAccount ? (
//                 <>
//                     <button onClick={handleLogin}>
//                         Sign In
//                     </button>
//                     <p>
//                         Don't have an account?
//                         <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span>
//                     </p>
//                 </>
//             ): (
//                 <>
//                     <button onClick={handleSignUp}>
//                         Sign Up
//                     </button>
//                     <p>
//                         Have an account?
//                         <span onClick={() => setHasAccount(!hasAccount)}>
//                             Sign In
//                         </span>
//                     </p>
//                 </>    
//             )}
//         </div>
//     </section>
//     )
// }
// export default SignIn;