import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SidebarLink = styled(Link)`
display:flex ;
color:rgb(255,255,255);
justify-content: space-between ;
align-items:center ;
padding: 20px ;
list-style:none ;
height:60px ;
text-decoration:none ;
font-size:18px ;
&:hover {
    background: #ffffff ;
    color: #0a0a0a;
    border-left: 4px solid #632ce4 ;
    cursor: pointer;
}
`;
const SidebarLabel = styled.span`
margin-left:16px ;
`;
const DropdownLink = styled(Link)`
background: #9a86fd;
height:3rem ;
display:flex ;
align-items:center ;
text-decoration:none ;
color: #ffffff; 
font-size:18px ;
&:hover{    
    cursor: pointer;
}
`;


const Submenu = ({ item }) => {
    const [subnav, setSubnav] = useState(false)
    const showSubnav = () => setSubnav(!subnav);
    const user = sessionStorage.getItem("type");

    if (user !== 'admin' && (item.title === "Dashboard" || item.title === "Patient"))
        return false
    else if (user !== 'guset' && item.title === "Patient Profile")
        return false

    else

        return (
            <>
                <SidebarLink to={item.path} onClick={item.subNav && showSubnav} >
                    <div>
                        {item.icon}
                        <SidebarLabel>{item.title}</SidebarLabel>
                    </div>

                    <div>
                        {item.subNav && subnav
                            ? item.iconOpened
                            : item.subNav
                                ? item.iconClosed
                                : null}
                    </div>

                </SidebarLink>

                {subnav && item.subNav.map((item, index) => {
                    return (
                        <DropdownLink to={item.path} key={index}>
                            {item.icon}
                            <SidebarLabel>{item.title}</SidebarLabel>
                        </DropdownLink>

                    )


                })}
            </>
        )
}
export default Submenu