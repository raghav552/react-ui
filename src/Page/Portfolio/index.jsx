import React from "react";
import BannerInnerSection from "../../Components/Banner/Inner";
import PortfolioSection from "../../Components/Portfolio";
import CtaSection from "../../Components/CallToAction";
import WhyChooseUsSection from "../../Components/ChooseUs";
import TeamSection from "../../Components/Team";
import TestimonialSection from "../../Components/Testimonial/TestimonialSection";
import HeadTitle from "../../Components/Head/HeadTitle";

const PortfolioPage = () => {
    return(
        <>
            <HeadTitle title="Portfolio - WebGrowthSolutions - SEO & Digital Marketing Agency" />
            <BannerInnerSection title="Portfolio" currentPage="Portfolio" />
            <PortfolioSection />
            <CtaSection />
            <WhyChooseUsSection />
            <TeamSection />
            <TestimonialSection />
        </>
    );
}

export default PortfolioPage;