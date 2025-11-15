import React from "react";
import useAnimateOnScroll from "../Hooks/useAnimateOnScroll";

const AboutSection = () => {
    useAnimateOnScroll();
    return(
        <>
            <div className="section">
                <div className="hero-container">
                    <div className="d-flex flex-column gspace-2">
                        <div className="d-flex flex-column flex-md-row h-100 gspace-2">
                            <div className="about-details">
                                <div className="sub-heading">
                                    <i className="fa-solid fa-circle-notch"></i>
                                    <h6 className="font-family-1 accent-color">About Us</h6>
                                </div>
                                <h2 className="animate-box animated animate__animated" data-animate="animate__fadeInUp">Transforming Businesses with Strategic Marketing</h2>
                                <p>Massa habitant accumsan at hendrerit blandit tellus litora euismod justo. Pretium praesent pellentesque enim rhoncus laoreet natoque etiam pharetra. Purus primis pharetra maecenas a nunc feugiat accumsan.</p>
                                <div>
                                    <a href="#" className="btn btn-accent">Learn More</a>
                                </div>
                            </div>
                            <div className="about-image-wrapper">
                                <div className="image-container">
                                    <img src="/assets/images/dummy-img-600x400.jpg" alt="About Image" className="img-fluid animate-box animated animate__animated" data-animate="animate__fadeInRight" />
                                </div>
                                <div className="card about-traffic-card animate-box animated animate__animated" data-animate="animate__zoomIn">
                                    <div className="d-flex flex-column gspace-2 align-self-center text-center">
                                        <i className="fa-solid fa-2x fa-chart-simple"></i>
                                        <p className="secondary-accent mb-0">Montly Trafic</p>
                                        <h2 className="secondary-accent">100 K</h2>
                                    </div>
                                    <div className="d-flex justify-content-center accent-color">
                                        <i className="fa-solid fa-arrow-trend-up"></i>
                                        <p className="description">+70%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="about-spacer"></div>
                        <div className="row row-cols-md-3 row-cols-1 grid-spacer-2">
                            <div className="col">
                                <div className="card card-about animate-box animated-fast animate__animated" data-animate="animate__fadeInUp">
                                    <div className="d-flex flex-column flex-lg-row gspace-2">
                                        <div className="icon-circle align-self-lg-center align-self-start">
                                            <i className="fa-solid fa-lightbulb"></i>
                                        </div>
                                        <div className="d-flex flex-column gspace-2">
                                            <h3 className="secondary-accent">Our Philosophy</h3>
                                            <p className="secondary-accent">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card card-about animate-box animated animate__animated" data-animate="animate__fadeInUp">
                                    <h3 className="secondary-accent">Our Vision</h3>
                                    <p className="secondary-accent">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                                    </p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card card-about animate-box animated-slow animate__animated" data-animate="animate__fadeInUp">
                                    <h3 className="secondary-accent">Our Mission</h3>
                                    <p className="secondary-accent">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutSection;