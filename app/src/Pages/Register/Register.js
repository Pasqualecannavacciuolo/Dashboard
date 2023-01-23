import "./Register.css";
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";



const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,23}$/;


const Register = () => {

    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const[user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // Si verifica solo quando il componente viene caricato
    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd; // Viene restituito un booleano che ci dice se sono uguali o meno
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Preventing some JS hack if someone somehow enable the submit button
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if(!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        //console.log(user,pwd);
        //setSuccess(true);
        
        try {
            const response = await axios.post('http://localhost:4001/register',
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true 
                }
            );
            // Se c'è un riscontro positivo
            if(response.status == 201) {
                //console.log(JSON.stringify(response))
                setSuccess(true);
                //clear state and controlled inputs
                setUser('');
                setPwd('');
                setMatchPwd('');
                // Dopo aver mostrato il messaggio di Successo faccio redirect verso altra pagina dopo 3 secondi
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }
            
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }


    return (
        <>
        {success ? (
                <section>
                    <div className="px-4 py-5 my-5 text-center">
                        <svg width="64px" height="64px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><title>logo--medium</title><path className="cls-blue" d="M4,4V28H28V4ZM23.9385,9.6865,22.6514,10.92a.3766.3766,0,0,0-.1431.3613v9.0674a.3765.3765,0,0,0,.1431.3613l1.257,1.2339v.271h-6.323v-.271L18.8877,20.68c.1279-.128.1279-.1656.1279-.3609V12.99l-3.62,9.1958H14.906L10.6907,12.99v6.1631a.8505.8505,0,0,0,.2334.7071l1.6936,2.0547v.2709H7.8154v-.2709L9.509,19.86a.82.82,0,0,0,.2183-.7071V12.0264A.6231.6231,0,0,0,9.5239,11.5L8.0186,9.6865v-.271h4.6743l3.613,7.9239,3.1765-7.9239h4.4561Z"></path><path id="inner-path" className="cls-2" d="M9.7273,12.0266A.6246.6246,0,0,0,9.524,11.5L8.0186,9.6863V9.4154H12.693l3.613,7.9238,3.1764-7.9238h4.4561v.2709L22.6513,10.92a.3763.3763,0,0,0-.143.3612v9.0676a.3763.3763,0,0,0,.143.3612l1.2571,1.2341v.2709H17.5856v-.2709L18.8878,20.68c.1279-.1279.1279-.1656.1279-.3612V12.99l-3.62,9.1955h-.4893L10.6907,12.99v6.1629a.8506.8506,0,0,0,.2334.7074l1.6936,2.0543v.2709H7.8154v-.2709L9.509,19.86a.82.82,0,0,0,.2183-.7074Z"></path><rect id="_Transparent_Rectangle_" data-name="<Transparent Rectangle>" className="cls-2" width="32" height="32"></rect></g></svg>                            
                        <h1 className="display-5 fw-bold">Registrazione effettuata con successo</h1>
                        <div className="col-lg-6 mx-auto">
                            <p className="lead mb-4">Ora potrai effettuare il login che ti farà accedere alle risorse desiderate.</p>
                            <p className="text-center">Attendi 3 secondi</p>
                        </div>
                    </div>
                </section>
            ) : (
        <section className="Register">
            <p 
                ref={errRef}
                className={errMsg ? "errMsg" : "offScreen"}
                aria-live="assertive"
            >
                {errMsg}
            </p>
            <div className="form-signin w-100 m-auto">
                <form onSubmit={handleSubmit}>
                    <svg width="64px" height="64px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><title>logo--medium</title><path className="cls-blue" d="M4,4V28H28V4ZM23.9385,9.6865,22.6514,10.92a.3766.3766,0,0,0-.1431.3613v9.0674a.3765.3765,0,0,0,.1431.3613l1.257,1.2339v.271h-6.323v-.271L18.8877,20.68c.1279-.128.1279-.1656.1279-.3609V12.99l-3.62,9.1958H14.906L10.6907,12.99v6.1631a.8505.8505,0,0,0,.2334.7071l1.6936,2.0547v.2709H7.8154v-.2709L9.509,19.86a.82.82,0,0,0,.2183-.7071V12.0264A.6231.6231,0,0,0,9.5239,11.5L8.0186,9.6865v-.271h4.6743l3.613,7.9239,3.1765-7.9239h4.4561Z"></path><path id="inner-path" className="cls-2" d="M9.7273,12.0266A.6246.6246,0,0,0,9.524,11.5L8.0186,9.6863V9.4154H12.693l3.613,7.9238,3.1764-7.9238h4.4561v.2709L22.6513,10.92a.3763.3763,0,0,0-.143.3612v9.0676a.3763.3763,0,0,0,.143.3612l1.2571,1.2341v.2709H17.5856v-.2709L18.8878,20.68c.1279-.1279.1279-.1656.1279-.3612V12.99l-3.62,9.1955h-.4893L10.6907,12.99v6.1629a.8506.8506,0,0,0,.2334.7074l1.6936,2.0543v.2709H7.8154v-.2709L9.509,19.86a.82.82,0,0,0,.2183-.7074Z"></path><rect id="_Transparent_Rectangle_" data-name="<Transparent Rectangle>" className="cls-2" width="32" height="32"></rect></g></svg>                            
                    <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

                    <div className="form-floating">
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            required
                            value={user}
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            className="form-control" 
                        />
                        <p
                            id="uidnote"
                            className={userFocus && user && !validName ? "instructions" : "offscreen"}
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters. <br/>
                            Must begin with a letter. <br/>
                            Letters, numbers, undersocres, hypens allowed.
                        </p>
                        <label htmlFor="username">
                            Username
                            <span className={validName ? "valid": "hide"}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </span>
                            <span className={validName || !user ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </span>
                        </label>
                    </div>
                    <div className="form-floating">
                    <input
                            type="password"
                            id="password"
                            autoComplete="off"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            className="form-control" 
                        />
                        <p
                            id="pwdnote"
                            className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: 
                            <span aria-label="exclamation mark">!</span> 
                            <span aria-label="at symbol">@</span> 
                            <span aria-label="hashtag">#</span> 
                            <span aria-label="dollar sign">$</span> 
                            <span aria-label="percent">%</span>
                        </p>
                        <label htmlFor="password">
                            Password
                            <span className={validPwd ? "valid": "hide"}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </span>
                            <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </span>
                        </label>
                    </div>
                    <div className="form-floating">
                    <input
                            type="password"
                            id="confirm_pwd"
                            autoComplete="off"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            className="form-control" 
                        />
                        <p
                            id="confirmnote"
                            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>
                        <label htmlFor="confirm_pwd">
                            Confirm Password
                            <span className={validMatch && matchPwd ? "valid": "hide"}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </span>
                            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </span>
                        </label>
                    </div>
                    <button 
                        className="w-100 btn btn-lg submit-button mt-3" type="submit"
                        disabled={!validName || !validPwd || !validMatch ? true : false}    
                    >
                        Sign up
                    </button>
                </form>
                <p className="mt-3">
                    Already registered?<br />
                    <span className="line">
                        <Link className="login-link" to="/login">Sign in</Link>
                    </span>
                </p>
            </div>
        </section>
        )}</>
    );
}

export default Register;