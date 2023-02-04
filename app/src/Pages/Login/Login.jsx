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
                        <svg width="100" height="60" viewBox="0 0 448 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M62.4 59.36V3.36H86C91.9734 3.36 97.2267 4.53333 101.76 6.88C106.347 9.22667 109.893 12.5067 112.4 16.72C114.96 20.9333 116.24 25.8133 116.24 31.36C116.24 36.9067 114.96 41.7867 112.4 46C109.893 50.2133 106.347 53.4933 101.76 55.84C97.2267 58.1867 91.9734 59.36 86 59.36H62.4ZM70.4 52.4H85.52C90.16 52.4 94.16 51.52 97.52 49.76C100.933 48 103.573 45.5467 105.44 42.4C107.307 39.2 108.24 35.52 108.24 31.36C108.24 27.1467 107.307 23.4667 105.44 20.32C103.573 17.1733 100.933 14.72 97.52 12.96C94.16 11.2 90.16 10.32 85.52 10.32H70.4V52.4Z" fill="#1E1E1E" />
                            <path d="M146.254 59.84C141.72 59.84 137.72 58.9067 134.254 57.04C130.84 55.1733 128.174 52.6133 126.254 49.36C124.387 46.1067 123.454 42.3733 123.454 38.16C123.454 33.9467 124.36 30.2133 126.174 26.96C128.04 23.7067 130.574 21.1733 133.774 19.36C137.027 17.4933 140.68 16.56 144.734 16.56C148.84 16.56 152.467 17.4667 155.614 19.28C158.76 21.0933 161.214 23.6533 162.974 26.96C164.787 30.2133 165.694 34.0267 165.694 38.4C165.694 38.72 165.667 39.0933 165.614 39.52C165.614 39.9467 165.587 40.3467 165.534 40.72H129.454V35.2H161.534L158.414 37.12C158.467 34.4 157.907 31.9733 156.734 29.84C155.56 27.7067 153.934 26.0533 151.854 24.88C149.827 23.6533 147.454 23.04 144.734 23.04C142.067 23.04 139.694 23.6533 137.614 24.88C135.534 26.0533 133.907 27.7333 132.734 29.92C131.56 32.0533 130.974 34.5067 130.974 37.28V38.56C130.974 41.3867 131.614 43.92 132.894 46.16C134.227 48.3467 136.067 50.0533 138.414 51.28C140.76 52.5067 143.454 53.12 146.494 53.12C149 53.12 151.267 52.6933 153.294 51.84C155.374 50.9867 157.187 49.7067 158.734 48L162.974 52.96C161.054 55.2 158.654 56.9067 155.774 58.08C152.947 59.2533 149.774 59.84 146.254 59.84Z" fill="#1E1E1E" />
                            <path d="M194.198 59.84C190.571 59.84 187.371 59.1733 184.598 57.84C181.878 56.5067 179.745 54.48 178.198 51.76C176.705 48.9867 175.958 45.52 175.958 41.36V16.96H183.638V40.48C183.638 44.64 184.625 47.76 186.598 49.84C188.625 51.92 191.451 52.96 195.078 52.96C197.745 52.96 200.065 52.4267 202.038 51.36C204.011 50.24 205.531 48.64 206.598 46.56C207.665 44.4267 208.198 41.8667 208.198 38.88V16.96H215.878V59.36H208.598V47.92L209.798 50.96C208.411 53.7867 206.331 55.9733 203.558 57.52C200.785 59.0667 197.665 59.84 194.198 59.84Z" fill="#1E1E1E" />
                            <path d="M242.659 59.84C239.139 59.84 235.779 59.36 232.579 58.4C229.432 57.44 226.952 56.2667 225.139 54.88L228.339 48.8C230.152 50.0267 232.392 51.0667 235.059 51.92C237.725 52.7733 240.445 53.2 243.219 53.2C246.792 53.2 249.352 52.6933 250.899 51.68C252.499 50.6667 253.299 49.2533 253.299 47.44C253.299 46.1067 252.819 45.0667 251.859 44.32C250.899 43.5733 249.619 43.0133 248.019 42.64C246.472 42.2667 244.739 41.9467 242.819 41.68C240.899 41.36 238.979 40.9867 237.059 40.56C235.139 40.08 233.379 39.44 231.779 38.64C230.179 37.7867 228.899 36.64 227.939 35.2C226.979 33.7067 226.499 31.7333 226.499 29.28C226.499 26.72 227.219 24.48 228.659 22.56C230.099 20.64 232.125 19.1733 234.739 18.16C237.405 17.0933 240.552 16.56 244.179 16.56C246.952 16.56 249.752 16.9067 252.579 17.6C255.459 18.24 257.805 19.1733 259.619 20.4L256.339 26.48C254.419 25.2 252.419 24.32 250.339 23.84C248.259 23.36 246.179 23.12 244.099 23.12C240.739 23.12 238.232 23.68 236.579 24.8C234.925 25.8667 234.099 27.2533 234.099 28.96C234.099 30.4 234.579 31.52 235.539 32.32C236.552 33.0667 237.832 33.6533 239.379 34.08C240.979 34.5067 242.739 34.88 244.659 35.2C246.579 35.4667 248.499 35.84 250.419 36.32C252.339 36.7467 254.072 37.36 255.619 38.16C257.219 38.96 258.499 40.08 259.459 41.52C260.472 42.96 260.979 44.88 260.979 47.28C260.979 49.84 260.232 52.0533 258.739 53.92C257.245 55.7867 255.139 57.2533 252.419 58.32C249.699 59.3333 246.445 59.84 242.659 59.84Z" fill="#1E1E1E" />
                            <path d="M282.817 59.36V10.32H263.617V3.36H309.937V10.32H290.737V59.36H282.817Z" fill="#1E1E1E" />
                            <path d="M332.035 59.84C327.502 59.84 323.502 58.9067 320.035 57.04C316.622 55.1733 313.955 52.6133 312.035 49.36C310.168 46.1067 309.235 42.3733 309.235 38.16C309.235 33.9467 310.142 30.2133 311.955 26.96C313.822 23.7067 316.355 21.1733 319.555 19.36C322.808 17.4933 326.462 16.56 330.515 16.56C334.622 16.56 338.248 17.4667 341.395 19.28C344.542 21.0933 346.995 23.6533 348.755 26.96C350.568 30.2133 351.475 34.0267 351.475 38.4C351.475 38.72 351.448 39.0933 351.395 39.52C351.395 39.9467 351.368 40.3467 351.315 40.72H315.235V35.2H347.315L344.195 37.12C344.248 34.4 343.688 31.9733 342.515 29.84C341.342 27.7067 339.715 26.0533 337.635 24.88C335.608 23.6533 333.235 23.04 330.515 23.04C327.848 23.04 325.475 23.6533 323.395 24.88C321.315 26.0533 319.688 27.7333 318.515 29.92C317.342 32.0533 316.755 34.5067 316.755 37.28V38.56C316.755 41.3867 317.395 43.92 318.675 46.16C320.008 48.3467 321.848 50.0533 324.195 51.28C326.542 52.5067 329.235 53.12 332.275 53.12C334.782 53.12 337.048 52.6933 339.075 51.84C341.155 50.9867 342.968 49.7067 344.515 48L348.755 52.96C346.835 55.2 344.435 56.9067 341.555 58.08C338.728 59.2533 335.555 59.84 332.035 59.84Z" fill="#1E1E1E" />
                            <path d="M380.619 59.84C376.299 59.84 372.433 58.9067 369.019 57.04C365.659 55.1733 363.019 52.6133 361.099 49.36C359.179 46.1067 358.219 42.3733 358.219 38.16C358.219 33.9467 359.179 30.2133 361.099 26.96C363.019 23.7067 365.659 21.1733 369.019 19.36C372.433 17.4933 376.299 16.56 380.619 16.56C384.459 16.56 387.873 17.3333 390.859 18.88C393.899 20.3733 396.246 22.6133 397.899 25.6L392.059 29.36C390.673 27.28 388.966 25.76 386.939 24.8C384.966 23.7867 382.833 23.28 380.539 23.28C377.766 23.28 375.286 23.8933 373.099 25.12C370.913 26.3467 369.179 28.08 367.899 30.32C366.619 32.5067 365.979 35.12 365.979 38.16C365.979 41.2 366.619 43.84 367.899 46.08C369.179 48.32 370.913 50.0533 373.099 51.28C375.286 52.5067 377.766 53.12 380.539 53.12C382.833 53.12 384.966 52.64 386.939 51.68C388.966 50.6667 390.673 49.12 392.059 47.04L397.899 50.72C396.246 53.6533 393.899 55.92 390.859 57.52C387.873 59.0667 384.459 59.84 380.619 59.84Z" fill="#1E1E1E" />
                            <path d="M429.936 16.56C433.402 16.56 436.442 17.2267 439.056 18.56C441.722 19.8933 443.802 21.92 445.296 24.64C446.789 27.36 447.536 30.8 447.536 34.96V59.36H439.856V35.84C439.856 31.7333 438.842 28.64 436.816 26.56C434.842 24.48 432.042 23.44 428.416 23.44C425.696 23.44 423.322 23.9733 421.296 25.04C419.269 26.1067 417.696 27.68 416.576 29.76C415.509 31.84 414.976 34.4267 414.976 37.52V59.36H407.296V0H414.976V28.4L413.456 25.36C414.842 22.5867 416.976 20.4267 419.856 18.88C422.736 17.3333 426.096 16.56 429.936 16.56Z" fill="#1E1E1E" />
                            <path d="M27.5125 25.9748L38.3625 15.2138L22.0875 0H0L27.5125 25.9748Z" fill="#1E1E1E" />
                            <path d="M0 59L27.5125 33.0252L38.3625 43.4151L22.0875 59H0Z" fill="#1E1E1E" />
                            <path d="M62.3308 59.3377L45.725 43.4151L56.9625 33.0252L62.5 38.35V59.2656C62.5 59.3537 62.3944 59.3987 62.3308 59.3377Z" fill="#1E1E1E" />
                            <path d="M52.7 30.0566L41.85 40.0755L31.3875 30.0566L41.85 19.6667L52.7 30.0566Z" fill="#1E1E1E" />
                            <path d="M63 23.5L63.8889 4.38887C63.9301 3.50216 62.8816 3.00529 62.2215 3.5987L46.2181 17.9838L57.1151 28.3019L63 23.5Z" fill="#1E1E1E" />
                        </svg>
                    </span>
                </div>


            </div>
            
        </section>
    );
}

export default Login;