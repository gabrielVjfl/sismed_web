import React from "react";

import {
  TitleLogo,
  ContainerNav,
  Hello,
  BtnSide,
  TemplateProfile,
  Nav,
} from "./styled/styled.js";

import "./styled/styled.css";

import { FaBars, FaUser } from "react-icons/fa";

const Navbar = (props) => {
  return (
  
      <nav style={{maxHeight: '8vh'}} className="navbar navbar-light bg-dark">
      
          <TitleLogo>Sismed</TitleLogo>

       
            
           <Hello>Olá {props.name}</Hello>
            
            
        
      
      </nav>
    
  
  );
};
export default Navbar;
