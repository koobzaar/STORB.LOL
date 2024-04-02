'use client'
import React from "react";
import Image from "next/image";
import menuItems from "./menuItems";

import twitterLogo from "../../../public/icons/twitter.svg";
import discordLogo from "../../../public/icons/discord.svg";

import "./LeftMenu.css";

export default function LeftMenu() {
    return (
    
        <div className="left-menu">
            <div className="left-menu-header">
            </div>
            <div className="left-menu-content">
            {menuItems.map((item, index) => (
                    <div className="menu-item" key={index} id={item.name}>
                        <Image src={item.icon} className="left-menu-navigation-icon" alt={`${item.name} Icon`} width={20} height={20} />
                        <h1 className="menu-option-label">{item.name}</h1>
                    </div>
                ))}
            </div>
            <div className="left-menu-footer-info">
                <div >
                    <p className="advisory">
                        STORB.LOL works based on an exploit available in League of Legends, So our product can stop working anytime soon. For any stats update,
                    </p>
                    <h2 className="social-media-call">follow us on social media!</h2>
                    <div className="icons">
                        <Image src={twitterLogo} alt="Twitter Logo" width={30} height={30} />
                        <Image src={discordLogo} alt="Twitter Logo" width={30} height={30} />
                    </div>
                </div>

            </div>
    </div>
    );
    }
