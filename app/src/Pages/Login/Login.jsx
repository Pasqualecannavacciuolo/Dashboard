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
                        <svg width="100" height="95" viewBox="0 0 410 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32.4839 87.7742L17 94.4839L1 87.7742V70.2258L17 63L32.4839 70.2258V87.7742Z" fill="#1E1E1E" />
                            <path d="M17 76.4194V94.4839M17 76.4194L32.4839 70.2258M17 76.4194L1 70.2258M17 94.4839L32.4839 87.7742V70.2258M17 94.4839L1 87.7742V70.2258M32.4839 70.2258L17 63L1 70.2258" stroke="white" stroke-width="0.5" />
                            <path d="M32.4839 56.7742L17 63.4839L1 56.7742V39.2258L17 32L32.4839 39.2258V56.7742Z" fill="#1E1E1E" />
                            <path d="M17 45.4194V63.4839M17 45.4194L32.4839 39.2258M17 45.4194L1 39.2258M17 63.4839L32.4839 56.7742V39.2258M17 63.4839L1 56.7742V39.2258M32.4839 39.2258L17 32L1 39.2258" stroke="white" stroke-width="0.5" />
                            <path d="M32.4839 25.7742L17 32.4839L1 25.7742V8.22581L17 1L32.4839 8.22581V25.7742Z" fill="#1E1E1E" />
                            <path d="M17 14.4194V32.4839M17 14.4194L32.4839 8.22581M17 14.4194L1 8.22581M17 32.4839L32.4839 25.7742V8.22581M17 32.4839L1 25.7742V8.22581M32.4839 8.22581L17 1L1 8.22581" stroke="white" stroke-width="0.5" />
                            <path d="M62.64 66.08H72.4C74.9066 66.08 77.2266 65.6533 79.36 64.8C81.5466 63.8933 83.44 62.64 85.04 61.04C86.6933 59.44 87.9466 57.5733 88.8 55.44C89.7066 53.3067 90.16 50.9867 90.16 48.48C90.16 45.9733 89.7066 43.6533 88.8 41.52C87.8933 39.3333 86.64 37.44 85.04 35.84C83.44 34.24 81.5466 32.9867 79.36 32.08C77.2266 31.1733 74.9066 30.72 72.4 30.72H62.64V66.08ZM51.04 76.4V20.4H72.56C76.7733 20.4 80.6666 21.12 84.24 22.56C87.8133 23.9467 90.9333 25.92 93.6 28.48C96.2666 31.04 98.3466 34.0267 99.84 37.44C101.387 40.8533 102.16 44.5333 102.16 48.48C102.16 52.48 101.413 56.16 99.92 59.52C98.4266 62.88 96.32 65.84 93.6 68.4C90.9333 70.9067 87.8133 72.88 84.24 74.32C80.6666 75.7067 76.7733 76.4 72.56 76.4H51.04Z" fill="#1E1E1E" />
                            <path d="M129.782 77.2C125.622 77.2 121.836 76.24 118.422 74.32C115.062 72.4 112.396 69.8133 110.422 66.56C108.449 63.3067 107.462 59.6533 107.462 55.6C107.462 51.5467 108.396 47.8933 110.262 44.64C112.182 41.3867 114.769 38.8 118.022 36.88C121.276 34.96 124.902 34 128.902 34C132.902 34 136.449 34.9867 139.542 36.96C142.636 38.9333 145.062 41.6 146.822 44.96C148.636 48.32 149.542 52.1333 149.542 56.4V59.28H118.662C119.142 60.9333 119.916 62.4267 120.982 63.76C122.102 65.0933 123.462 66.1333 125.062 66.88C126.716 67.6267 128.476 68 130.342 68C132.209 68 133.916 67.7067 135.462 67.12C137.062 66.5333 138.422 65.7067 139.542 64.64L146.742 71.2C144.182 73.28 141.542 74.8 138.822 75.76C136.156 76.72 133.142 77.2 129.782 77.2ZM118.502 51.44H138.742C138.369 49.7867 137.676 48.3467 136.662 47.12C135.702 45.84 134.529 44.8533 133.142 44.16C131.809 43.4133 130.316 43.04 128.662 43.04C126.956 43.04 125.409 43.3867 124.022 44.08C122.636 44.7733 121.462 45.76 120.502 47.04C119.596 48.2667 118.929 49.7333 118.502 51.44Z" fill="#1E1E1E" />
                            <path d="M172.417 77.2C169.217 77.2 166.364 76.5067 163.857 75.12C161.404 73.68 159.457 71.7067 158.017 69.2C156.631 66.6933 155.937 63.8133 155.937 60.56V34.72H166.897V58.96C166.897 61.6267 167.671 63.76 169.217 65.36C170.817 66.96 172.951 67.76 175.617 67.76C177.431 67.76 179.057 67.4133 180.497 66.72C181.991 65.9733 183.217 64.9333 184.177 63.6V34.72H195.137V76.4H184.177V73.04C180.977 75.8133 177.057 77.2 172.417 77.2Z" fill="#1E1E1E" />
                            <path d="M219.279 77.2C215.439 77.2 211.893 76.72 208.639 75.76C205.386 74.7467 202.559 73.3067 200.159 71.44L205.599 64.16C207.999 65.76 210.293 66.96 212.479 67.76C214.719 68.56 216.933 68.96 219.119 68.96C221.573 68.96 223.519 68.56 224.959 67.76C226.453 66.9067 227.199 65.8133 227.199 64.48C227.199 63.4133 226.773 62.56 225.919 61.92C225.119 61.28 223.813 60.8267 221.999 60.56L213.999 59.36C209.839 58.72 206.693 57.3867 204.559 55.36C202.426 53.28 201.359 50.56 201.359 47.2C201.359 44.48 202.053 42.16 203.439 40.24C204.879 38.2667 206.879 36.7467 209.439 35.68C212.053 34.56 215.146 34 218.719 34C221.759 34 224.719 34.4267 227.599 35.28C230.533 36.1333 233.279 37.44 235.839 39.2L230.559 46.32C228.266 44.88 226.079 43.84 223.999 43.2C221.919 42.56 219.813 42.24 217.679 42.24C215.706 42.24 214.106 42.6133 212.879 43.36C211.706 44.1067 211.119 45.0933 211.119 46.32C211.119 47.44 211.546 48.32 212.399 48.96C213.253 49.6 214.719 50.0533 216.799 50.32L224.719 51.52C228.879 52.1067 232.053 53.44 234.239 55.52C236.426 57.5467 237.519 60.1867 237.519 63.44C237.519 66.1067 236.719 68.48 235.119 70.56C233.519 72.5867 231.359 74.2133 228.639 75.44C225.919 76.6133 222.799 77.2 219.279 77.2Z" fill="#1E1E1E" />
                            <path d="M253.742 76.4V30.64H234.862V20.4H284.142V30.64H265.342V76.4H253.742Z" fill="#1E1E1E" />
                            <path d="M300.876 77.2C296.716 77.2 292.93 76.24 289.516 74.32C286.156 72.4 283.49 69.8133 281.516 66.56C279.543 63.3067 278.556 59.6533 278.556 55.6C278.556 51.5467 279.49 47.8933 281.356 44.64C283.276 41.3867 285.863 38.8 289.116 36.88C292.37 34.96 295.996 34 299.996 34C303.996 34 307.543 34.9867 310.636 36.96C313.73 38.9333 316.156 41.6 317.916 44.96C319.73 48.32 320.636 52.1333 320.636 56.4V59.28H289.756C290.236 60.9333 291.01 62.4267 292.076 63.76C293.196 65.0933 294.556 66.1333 296.156 66.88C297.81 67.6267 299.57 68 301.436 68C303.303 68 305.01 67.7067 306.556 67.12C308.156 66.5333 309.516 65.7067 310.636 64.64L317.836 71.2C315.276 73.28 312.636 74.8 309.916 75.76C307.25 76.72 304.236 77.2 300.876 77.2ZM289.596 51.44H309.836C309.463 49.7867 308.77 48.3467 307.756 47.12C306.796 45.84 305.623 44.8533 304.236 44.16C302.903 43.4133 301.41 43.04 299.756 43.04C298.05 43.04 296.503 43.3867 295.116 44.08C293.73 44.7733 292.556 45.76 291.596 47.04C290.69 48.2667 290.023 49.7333 289.596 51.44Z" fill="#1E1E1E" />
                            <path d="M347.584 77.2C343.477 77.2 339.77 76.2667 336.464 74.4C333.157 72.48 330.544 69.8933 328.624 66.64C326.704 63.3333 325.744 59.6533 325.744 55.6C325.744 51.4933 326.704 47.8133 328.624 44.56C330.544 41.3067 333.157 38.72 336.464 36.8C339.77 34.88 343.477 33.92 347.584 33.92C350.89 33.92 354.037 34.56 357.024 35.84C360.064 37.12 362.677 38.96 364.864 41.36L358.144 48.48C356.597 46.7733 354.97 45.52 353.264 44.72C351.61 43.8667 349.797 43.44 347.824 43.44C345.69 43.44 343.77 43.9733 342.064 45.04C340.41 46.1067 339.077 47.5467 338.064 49.36C337.104 51.1733 336.624 53.2533 336.624 55.6C336.624 57.84 337.104 59.8933 338.064 61.76C339.077 63.5733 340.464 65.0133 342.224 66.08C343.984 67.0933 345.93 67.6 348.064 67.6C349.93 67.6 351.664 67.2267 353.264 66.48C354.917 65.68 356.49 64.5067 357.984 62.96L364.544 69.84C362.41 72.1333 359.85 73.9467 356.864 75.28C353.877 76.56 350.784 77.2 347.584 77.2Z" fill="#1E1E1E" />
                            <path d="M370.242 76.4V20.4L381.202 18V38.16C384.349 35.3333 388.242 33.92 392.882 33.92C396.135 33.92 398.989 34.64 401.442 36.08C403.949 37.4667 405.895 39.4133 407.282 41.92C408.669 44.3733 409.362 47.2533 409.362 50.56V76.4H398.402V52.16C398.402 49.44 397.629 47.3067 396.082 45.76C394.535 44.16 392.429 43.36 389.762 43.36C387.895 43.36 386.242 43.7333 384.802 44.48C383.362 45.1733 382.162 46.1867 381.202 47.52V76.4H370.242Z" fill="#1E1E1E" />
                        </svg>

                    </span>
                </div>


            </div>
            
        </section>
    );
}

export default Login;