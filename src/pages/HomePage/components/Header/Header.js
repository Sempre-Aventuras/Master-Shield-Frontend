import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

// Images
import Logo from './images/logo.png';

const StyledHeader = styled.header`
    background-color: transparent;
    position: absolute;
    color: #fff;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
`

const StyledSection = styled.div`
  .btnEnter{
    background-color: black;
    color: white;
  }

  .btnRegister{
    background-color: black;
    color: white;
  }
`

const StyledImg = styled.img`
  width: 50px;
  height: 50px;
`

const Header = () => {
    return (
        <StyledHeader className="site-header d-none d-lg-block">
            <div className="container-fluid pl-lg--35 pr-lg--35">
                <StyledSection className="row m-4 justify-content-between align-items-center position-relative">
                    <div class="col">
                        <div className="brand-logo">
                            <a href="/"><StyledImg src={Logo} alt="Master Shield Logo" /></a>
                        </div>
                    </div>

                    <Button className="btnEnter mx-2">Entrar</Button>
                    <Button className="btnRegister mx-2">Registrar</Button>
                </StyledSection>
            </div>
        </StyledHeader>
    )
 
}

export default Header;
