import React from "react";
import useAnimateOnScroll from "../Hooks/useAnimateOnScroll";

const WhyChooseUsSection = () => {
    useAnimateOnScroll();

    return(
        <>
            <div className="section spacious-bottom">
                <div className="hero-container">
                    <div className="d-flex flex-column flex-lg-row gap-4">
                        <div className="whychooseus-image">
                            <div className="image-container">
                                <img src="./assets/images/dummy-img-600x400.jpg" alt="Why Choose Us" className="img-fluid animate-box animated animate__animated" data-animate="animate__fadeInLeft" />
                            </div>
                            <div className="client-rating-card animate-box animated animate__animated" data-animate="animate__zoomIn">
                                <div className="client-rating-card-content">
                                    <span>4.9</span>
                                    <div className="stars">
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                    </div>
                                    <h5 className="secondary-accent">Client Ratings</h5>
                                    <p>Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                                </div>
                            </div>
                        </div>
                        <div className="whychooseus-details">
                            <div className="sub-heading">
                                <i className="fa-solid fa-circle-notch"></i>
                                <h6 className="font-family-1 accent-color">Why Choose Us</h6>
                            </div>
                            <h2 className="animate-box animated animate__animated" data-animate="animate__fadeInUp">Empowering Your Business to Thrive</h2>
                            <p>Scelerisque placerat fames aliquam tortor augue interdum quisque proin. Justo ornare commodo cursus; sodales magnis nam.</p>
                            <div className="d-flex flex-column gspace-2">
                                <div className="whychooseus-box animate-box animated-fast animate__animated" data-animate="animate__fadeInRight">
                                    <div className="icon-circle">
                                        <i className="fa-solid fa-globe"></i>
                                    </div>
                                    <div className="d-flex flex-column gspace-2">
                                        <h4 className="secondary-accent">Proven Expertise</h4>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                                    </div>
                                </div>
                                <div className="whychooseus-box animate-box animated animate__animated" data-animate="animate__fadeInRight">
                                    <div className="icon-circle">
                                        <i className="fa-solid fa-lightbulb"></i>
                                    </div>
                                    <div className="d-flex flex-column gspace-2">
                                        <h4 className="secondary-accent">Innovation and Adaptability</h4>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                                    </div>
                                </div>
                                <div className="whychooseus-box animate-box animated animate__animated" data-animate="animate__fadeInRight">
                                    <div className="icon-circle">
                                        <i className="fa-solid fa-briefcase"></i>
                                    </div>
                                    <div className="d-flex flex-column gspace-2">
                                        <h4 className="secondary-accent">Comprehensive Services</h4>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                                    </div>
                                </div>
                                <div className="whychooseus-box animate-box animated-slow animate__animated" data-animate="animate__fadeInRight">
                                    <div className="icon-circle">
                                        <i className="fa-solid fa-user-tie"></i>
                                    </div>
                                    <div className="d-flex flex-column gspace-2">
                                        <h4 className="secondary-accent">Dedicated Support</h4>
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

export default WhyChooseUsSection;