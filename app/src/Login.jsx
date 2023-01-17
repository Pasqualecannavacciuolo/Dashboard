import "./Login.css";
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,23}$/;

const Login = () => {

    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const[user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // Si verifica solo quando il componente viene caricato
    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
    }, [pwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

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
            const response = await axios.post('http://localhost:4001/login',
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true 
                }
            );
            // Se c'è un riscontro positivo setto il cookie
            if(response.status == 201) {
                // Il cookie scadrà tra 15 secondi
                var now = new Date();
                var time = now.getTime();
                var seconds = 15 * 1000;
                var expireTime = time + seconds;
                now.setTime(expireTime);

                //console.log(response.data.token);
                
                // Setto access token con scadenza 15s
                document.cookie = "token="+response.data.token+";path=/;expires="+now.toUTCString()+";secure" ;
                
                // Setto refresh token
                //document.cookie = "Refreshtoken="+response.data.refresh_token+";path=/;secure" ;
                
                // Faccio redirect verso altra pagina dopo 3 secondi
                navigate("/dashboard");

                //console.log(JSON.stringify(response))
                setSuccess(true);
                //clear state and controlled inputs
                setUser('');
                setPwd('');
                setMatchPwd('');
            }
            
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 401) {
                let alert = document.getElementById('alert');
                alert.style.visibility = "visible";
                setErrMsg('Login fallito inserire le credenziali corrette');
                setTimeout(() => {
                    alert.style.visibility = "hidden";
                }, 1500);
            }
             else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <section className="Register">
            <div className="form-signin w-100 m-auto">
                <div className="alert alert-danger" role="alert" id="alert">
                    <p
                        ref={errRef}
                        className={errMsg ? "errMsg" : "offScreen"}
                        aria-live="assertive"
                    >
                        {errMsg}
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <img className="mb-4" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

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
                            4 to 24 characters. <br />
                            Must begin with a letter. <br />
                            Letters, numbers, undersocres, hypens allowed.
                        </p>
                        <label htmlFor="username">
                            Username
                            <span className={validName ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validName || !user ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
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
                            <span className={validPwd ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                    </div>
                    
                    <button
                        className="w-100 btn btn-lg btn-primary mt-3" type="submit"
                        disabled={!validName || !validPwd ? true : false}
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Login;