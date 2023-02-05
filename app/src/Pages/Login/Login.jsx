import "./Login.css";
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";
import { isExpired, decodeToken } from "react-jwt";

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
            // SVILUPPO
            const response = await axios.post('http://localhost:4001/login',
            // PRODUZIONE
            //const response = await axios.post('https://dashboard-backend-la3z.onrender.com/login',
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true 
                }
            );
            // Se c'è un riscontro positivo setto il cookie
            if(response.status == 201) {
                // Setto access token 
                const decoded_token = decodeToken(response.data.token);
                const expiration = new Date(decoded_token.exp*1000);
                document.cookie = "token="+response.data.token+";path=/;expires="+expiration+";secure" ;
                // Setto refresh token
                //document.cookie = "Refreshtoken="+response.data.refresh_token+";path=/;secure" ;
                
                // Faccio redirect verso altra pagina dopo 3 secondi
                navigate("/dashboard");

                //console.log(JSON.stringify(response))
                setSuccess(true);
                //clear state and controlled inputs
                setUser('');
                setPwd('');
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

                <svg width="64px" height="64px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg" fill="#0E79B2"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><title>logo--medium</title><path className="cls-blue" d="M4,4V28H28V4ZM23.9385,9.6865,22.6514,10.92a.3766.3766,0,0,0-.1431.3613v9.0674a.3765.3765,0,0,0,.1431.3613l1.257,1.2339v.271h-6.323v-.271L18.8877,20.68c.1279-.128.1279-.1656.1279-.3609V12.99l-3.62,9.1958H14.906L10.6907,12.99v6.1631a.8505.8505,0,0,0,.2334.7071l1.6936,2.0547v.2709H7.8154v-.2709L9.509,19.86a.82.82,0,0,0,.2183-.7071V12.0264A.6231.6231,0,0,0,9.5239,11.5L8.0186,9.6865v-.271h4.6743l3.613,7.9239,3.1765-7.9239h4.4561Z"></path><path id="inner-path" className="cls-2" d="M9.7273,12.0266A.6246.6246,0,0,0,9.524,11.5L8.0186,9.6863V9.4154H12.693l3.613,7.9238,3.1764-7.9238h4.4561v.2709L22.6513,10.92a.3763.3763,0,0,0-.143.3612v9.0676a.3763.3763,0,0,0,.143.3612l1.2571,1.2341v.2709H17.5856v-.2709L18.8878,20.68c.1279-.1279.1279-.1656.1279-.3612V12.99l-3.62,9.1955h-.4893L10.6907,12.99v6.1629a.8506.8506,0,0,0,.2334.7074l1.6936,2.0543v.2709H7.8154v-.2709L9.509,19.86a.82.82,0,0,0,.2183-.7074Z"></path><rect id="_Transparent_Rectangle_" data-name="<Transparent Rectangle>" className="cls-2" width="32" height="32"></rect></g></svg>                            
                    <h1 className="h3 mb-3 fw-normal">Effettua il Login</h1>

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
                        className="w-100 btn btn-lg submit-button mt-3" type="submit"
                        disabled={!validName || !validPwd ? true : false}
                    >
                        Sign in
                    </button>
                </form>

                <div className="card-header  mt-3">
                    <span className="d-inline-block align-middle me-2">
                        Sviluppato da
                    </span>
                    <span className="d-inline-block align-middle">
                        <svg width="100" height="60" viewBox="0 0 423 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27.5125 24.9748L38.3625 14.2138L22.0875 3H0L27.5125 24.9748Z" fill="#1E1E1E" />
                            <path d="M0 58L27.5125 32.0252L38.3625 42.4151L22.0875 58H0Z" fill="#1E1E1E" />
                            <path d="M62 59L45.725 42.4151L56.9625 32.0252L62 37.5V59Z" fill="#1E1E1E" />
                            <path d="M52.7 29.0566L41.85 39.0755L31.3875 29.0566L41.85 18.6667L52.7 29.0566Z" fill="#1E1E1E" />
                            <path d="M62 22.5V3L46.2181 16.9838L57.1151 27.3019L62 22.5Z" fill="#1E1E1E" />
                            <path d="M61.96 59H83.8C100.52 59 113.4 46.76 113.4 31.16C113.4 15.24 100.44 2.99999 83.8 2.99999H61.96V59ZM74.2 48.12V13.88H83.64C93.24 13.88 100.76 21.4 100.76 31.16C100.76 40.68 93.24 48.12 83.64 48.12H74.2Z" fill="#1E1E1E" />
                            <path d="M141.099 59.8C147.899 59.8 153.019 57.96 158.219 53.64L150.619 46.84C148.459 48.92 145.259 50.12 141.659 50.12C136.139 50.12 131.819 46.76 130.299 41.96H161.019V39.08C161.019 26.04 152.219 16.44 140.139 16.44C127.979 16.44 118.539 25.96 118.539 38.12C118.539 50.28 128.379 59.8 141.099 59.8ZM130.139 33.8C131.419 28.92 135.099 25.88 139.899 25.88C144.539 25.88 148.379 29.08 149.659 33.8H130.139Z" fill="#1E1E1E" />
                            <path d="M183.888 59.8C188.368 59.8 192.368 58.44 195.488 55.8V59H207.008V17.16H195.488V45.96C193.568 48.44 190.768 49.88 187.168 49.88C182.048 49.88 178.768 46.52 178.768 41.4V17.16H167.248V43.08C167.248 52.92 174.048 59.8 183.888 59.8Z" fill="#1E1E1E" />
                            <path d="M231.379 59.8C241.939 59.8 249.859 53.88 249.859 45.88C249.859 39.32 245.299 35 236.979 33.88L228.899 32.6C224.979 32.04 223.459 31 223.459 28.84C223.459 26.6 225.939 25.08 229.699 25.08C233.939 25.08 238.019 26.36 242.579 29.08L248.099 21.64C242.899 18.2 236.899 16.44 230.819 16.44C219.939 16.44 213.219 21.64 213.219 29.8C213.219 36.6 217.619 40.84 225.939 42.12L234.019 43.32C237.459 43.88 238.979 45 238.979 47C238.979 49.48 235.939 51.08 231.219 51.08C226.819 51.08 222.659 49.64 217.619 46.36L212.019 54.12C216.819 57.8 223.619 59.8 231.379 59.8Z" fill="#1E1E1E" />
                            <path d="M265.832 59H278.072V13.8H296.712V2.99999H247.112V13.8H265.832V59Z" fill="#1E1E1E" />
                            <path d="M313.521 59.8C320.321 59.8 325.441 57.96 330.641 53.64L323.041 46.84C320.881 48.92 317.681 50.12 314.081 50.12C308.561 50.12 304.241 46.76 302.721 41.96H333.441V39.08C333.441 26.04 324.641 16.44 312.561 16.44C300.401 16.44 290.961 25.96 290.961 38.12C290.961 50.28 300.801 59.8 313.521 59.8ZM302.561 33.8C303.841 28.92 307.521 25.88 312.321 25.88C316.961 25.88 320.801 29.08 322.081 33.8H302.561Z" fill="#1E1E1E" />
                            <path d="M360.382 59.8C366.862 59.8 373.182 57 377.502 52.28L370.622 45.08C367.662 48.28 364.622 49.72 360.942 49.72C354.622 49.72 349.822 44.76 349.822 38.12C349.822 31.48 354.542 26.36 360.622 26.36C364.542 26.36 367.742 27.96 370.782 31.32L377.822 23.88C373.502 19.08 367.102 16.36 360.382 16.36C347.982 16.36 338.382 25.88 338.382 38.12C338.382 50.36 347.982 59.8 360.382 59.8Z" fill="#1E1E1E" />
                            <path d="M383.037 59H394.557V30.2C396.477 27.64 399.277 26.28 402.877 26.28C407.917 26.28 411.197 29.56 411.197 34.68V59H422.797V33.08C422.797 23.24 415.917 16.36 406.157 16.36C401.677 16.36 397.677 17.72 394.557 20.36V0.519989L383.037 2.99999V59Z" fill="#1E1E1E" />
                        </svg>


                    </span>
                </div>


            </div>
            
        </section>
    );
}

export default Login;