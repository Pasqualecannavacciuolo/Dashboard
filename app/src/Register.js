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
                        <img className="d-block mx-auto mb-4" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
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
                    <img className="mb-4" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
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
                        className="w-100 btn btn-lg btn-primary mt-3" type="submit"
                        disabled={!validName || !validPwd || !validMatch ? true : false}    
                    >
                        Sign up
                    </button>
                </form>
                <p className="mt-3">
                    Already registered?<br />
                    <span className="line">
                        <Link to="/login">Sign in</Link>
                    </span>
                </p>
            </div>
        </section>
        )}</>
    );
}

export default Register;