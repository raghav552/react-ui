import React from "react";
import useAnimateOnScroll from "../Hooks/useAnimateOnScroll";

const ProcessSection = () => {
    useAnimateOnScroll();
    return(
        <>
            <div className="section spacious-top">
                <div className="hero-container">
                    <div className="d-flex flex-column gspace-2">
                        <div className="sub-heading justify-content-center">
                            <i className="fa-solid fa-circle-notch"></i>
                            <h6 className="font-family-1 accent-color">Our Process</h6>
                        </div>
                        <h2 className="text-center animate-box animated animate__animated" data-animate="animate__fadeInUp">Step-by-Step to Achieving Your Goals</h2>

                        <div className="row row-cols-md-3 row-cols-1 grid-spacer-2">
                            <div className="col">
                                <div className="d-flex flex-column gspace-1">
                                    <div className="process-header">
                                        <span className="process-number">01</span>
                                    </div>
                                    
                                    <div className="card card-process animate-box animated animate__animated" data-animate="animate__fadeInUp">
                                        <i className="fa-solid fa-people-arrows"></i>
                                        <h3 className="secondary-accent">Inital Consultation</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex flex-column gspace-1">
                                    <div className="process-header">
                                        <span className="process-number">02</span>
                                    </div>
                                    
                                    <div className="card card-process animate-box animated animate__animated" data-animate="animate__fadeInUp">
                                        <i className="fa-solid fa-file-invoice"></i>
                                        <h3 className="secondary-accent">Market Research</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex flex-column gspace-1">
                                    <div className="process-header">
                                        <span className="process-number">03</span>
                                    </div>
                                    
                                    <div className="card card-process animate-box animated animate__animated" data-animate="animate__fadeInUp">
                                        <i className="fa-solid fa-computer"></i>
                                        <h3 className="secondary-accent">Strategy Development</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProcessSection;