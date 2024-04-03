'use client'
import React, {useEffect, useState} from 'react';
import Image from 'next/image';

import './login.css'
import Button from '../../components/Button/Button';
import loginIcon from '../../../public/icons/login.svg'
import twitterIcon from '../../../public/icons/twitter.svg'
import dicordIcon from '../../../public/icons/discord.svg'
import ireliaBackground from '../../../public/images/irelia.png'
import squareIcon from '../../../public/icons/square.svg'

import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie';



/**
 * Renders the login page component.
 * @returns {JSX.Element} The login page component.
 */
export default function LoginPage() {
    const router = useRouter();
    const [cookies, setCookie] = useCookies(['user', 'pass']);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        if(username === '' || password === '') {
            alert('Please fill in all fields.');
            event.preventDefault();
            return;
        }
        setCookie('user', username, { path: '/' });
        setCookie('pass', password, { path: '/' });
    }
    useEffect(() => {
        if (cookies.user && cookies.pass) {
            router.push('/');
        }
    }, []);
    return (
        <body>
            <div className="login-body">
                {/* TODO: Add the form class that sends the information to a middleware and therefore the backend */}
                <div className="login-form">
                    <div className="form-container">
                        <div className="login-form-header">
                            <h1 className="login-form-header-sign-in">Storb.lol</h1>
                            <p className="login-form-header-desc">Send any type of gift to another League of Legends account, bypassing any restrictions.</p>
                        </div>
                        <form onSubmit={handleLogin}>
                        <div className="login-form-input">
                            <h1 className="sign-in-label">Sign In</h1>
                            <label>Username</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <label>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <div className="login-button">
                                <div className="button-container">
                                    <Button icon={loginIcon} text={"Login"} type="submit" />
                                </div>
                            </div>
                        </div>
                        </form>
                    </div>
                    <div className="login-footer">
                        <h1>Follow us for any future updates!</h1>
                        <div className="footer-icons">
                            <Image src={twitterIcon} className="footer-icon" width={30} alt="twitter" />
                            <Image src={dicordIcon} className="footer-icon" width={30} alt="discord" />
                        </div>
                        <p>PAGAMENTO.LOL isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.</p>
                    </div>
                </div>
                <div className="champion-background-container">
                    {/* TODO: Add the floating squares */}
                    <Image src={ireliaBackground} width={3000} className="irelia-image" alt="background" />
                </div>
            </div>
        </body>
    );
}