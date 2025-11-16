import React from "react";
import BannerInnerSection from "../../Components/Banner/Inner";
import CtaSection from "../../Components/CallToAction";
import WhyChooseUsSection from "../../Components/ChooseUs";
import TestimonialSection from "../../Components/Testimonial/TestimonialSection";
import PortfolioDetailSection from "../../Components/Portfolio/PortfolioDetail";
import HeadTitle from "../../Components/Head/HeadTitle";

const SinglePortfolioPage = () => {
    return(
        <>
            <HeadTitle title="Portfolio Detail - WebGrowthSolutions - SEO & Digital Marketing Agency" />
            <BannerInnerSection title="Visibility Boost" currentPage="Visibility Boost" />
            <PortfolioDetailSection />
            <CtaSection />
            <WhyChooseUsSection />
            <TestimonialSection />
        </>
    );
}

export default SinglePortfolioPage;