import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Sidebardata } from './Sidebardata';
import { FaViber } from 'react-icons/fa';

import { BsFacebook, BsTwitter, BsYoutube, BsWhatsapp } from "react-icons/bs";
import Submenu from './Submenu'
import useSession, { UseSessionProvider } from 'react-session-hook';
import '../App.css'
const Nav = styled.div`
height: 80px;
display: flex;
position: fixed; 
z-index:100;
`;

const NavIcon = styled(Link)`
margin-left: 2rem;
font-size: 2rem;
height: 80px;
display:flex;
justify-content: flex-start;
align-items: center;
color:rgb(255,255,255);

&:hover {
    color:#1de607;
    cursor: pointer;
}
`;
const SidebarNav = styled.nav`
background-image: linear-gradient(to bottom, #2504f8, rgb(154, 134, 253));
color:rgb(255,255,255);
width: 250px ;
height: 100vh;
display: flex;
justify-content:center ;
position:fixed ;
top:0;
left: ${({ sidebar }) => (sidebar ? '0' : '-100%')} ;
transition:350ms ;
z-index:99;
opacity:1

`;

const SidebarWrap = styled.div`
width:100%;
z-index:100;
`;
const TopNav = styled.div`
float:right;
display:block;

`;

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
    const session = useSession();
    const username = sessionStorage.getItem("name");
    const handleLogout = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
    }
    const token = sessionStorage.getItem("token");
    return (
        <>
            <Nav>
                <NavIcon to='/'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </NavIcon>

                <div className='d-flex justify-content-end topNav' >
                    <a href='https://www.facebook.com/' className='socialIcon'> <BsFacebook className='socialIcons' /></a>
                    <a href='https://www.twitter.com/' className='socialIcon'><BsTwitter className='socialIcons' /></a>
                    <a href='https://www.viber.com/' className='socialIcon'><FaViber className='socialIcons' /></a>
                    <a href='https://www.whatsapp.com/' className='socialIcon'> <BsWhatsapp className='socialIcons' /></a>
                    <a href='https://www.youtube.com/' className='socialIcon'> <BsYoutube className='socialIcons' /></a>
                    {/*                     
                    {token && (
                    <div id='logout' className='col d-flex justify-content-end'>
                        <h5 className='text-center mr-4' id='greeting'>Hello {username} </h5>
                        <button type="button" className="btn btn-secondary ml-3 " onClick={handleLogout}>Logout</button>
                    </div>
                )} */}
                    {token && <button type="button" className="btn btn-secondary ml-3 " onClick={handleLogout} style={{ height: 'fit-content' }}>Logout</button>
                    }
                </div>


                <SidebarNav sidebar={sidebar}>
                    <SidebarWrap>
                        <NavIcon to='#'>
                            <AiIcons.AiOutlineClose onClick={showSidebar} />
                        </NavIcon>
                        {Sidebardata.map((item, index) => {

                            return <Submenu item={item} key={index} />;
                        })}
                    </SidebarWrap>
                </SidebarNav>
            </Nav>
        </>
    );
};

export default Sidebar;
