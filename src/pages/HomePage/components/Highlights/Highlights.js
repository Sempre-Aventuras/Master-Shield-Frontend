import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const Highlights = () => {

    return (
      <section className="hero-area">
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
      </section>
    );

}

export default Highlights;
