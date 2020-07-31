import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import Background from './images/background.jpg';

const BackgroundArea = styled.section`
    background: url(${Background}) no-repeat top center;
    top: 0;
    background-size: cover;
    padding: 145px 0;
    min-height: 110vh;
    position: relative;

    ::before{
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: linear-gradient(-45deg, #152649 0%, #4f525c 100%);
      opacity: .9;
    }
`

const Highlights = () => {

    return (
      <BackgroundArea>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-7 col-lg-8 col-md-10">
                    <div className="hero-content">
                        <h1 className="title h2 text-center">Master Shield</h1>
                        <p className="text-center">Crie sua ficha de personagem do seu sistema favorito de forma mais fácil e baixe em PDF.</p>
                        <div className="">
                            <Button href="#" className="mx-auto">Começar a Jornada</Button>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="dashboard-img" data-aos="fade-up" data-aos-duration='1500' data-aos-once="true">
                        <img src="./images" alt=""/>
                    </div>
                </div>
            </div>
        </div>      
      </BackgroundArea>
    );

}

export default Highlights;
