// create a page in react
import React from 'react';
import Image from 'next/image';

import './login.css'
import Button from '../../components/Button/Button';
import loginIcon from '../../../public/icons/login.svg'
import twitterIcon from '../../../public/icons/twitter.svg'
import dicordIcon from '../../../public/icons/discord.svg'
import ireliaBackground from '../../../public/images/irelia.png'

export default function LoginPage() {
    return (
        
    <body>
    <div className="login-body">
    
    <div className="login-form">
      <div className="form-container" >
      <div className="login-form-header">
        <h1 className="login-form-header-sign-in">Storb.lol</h1>
        <p className="login-form-header-desc">Send any type of gift to another League of Legends account, bypassing any restrictions.</p>
      </div>

      <div className="login-form-input">
        <h1 className="sign-in-label">Sign In</h1>
        <label>Username</label>
        <input type="text" />
        <label>Password</label>
        <input type="password" />
        <div className="login-button">
          <div className="button-container">
            <Button icon={loginIcon} text={"Login"}/>
          </div>
          </div>
      </div>
      </div>
      <div className="login-footer">
      <h1>Follow us for any future updates!</h1>
      <div className="footer-icons">
        <Image src={twitterIcon} className="footer-icon" width={30} alt="twitter"/>
        <Image src={dicordIcon} className="footer-icon" width={30} alt="discord"/>
      </div>
      <p>PAGAMENTO.LOL isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.</p>
    </div>
    </div>
    <div className="champion-background-container">
      <Image src={ireliaBackground} className="irelia-image" alt="background"/>
    </div>
    </div>
    
  </body>

    );
    }
