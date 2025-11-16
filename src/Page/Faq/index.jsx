import React from "react";
import BannerInnerSection from "../../Components/Banner/Inner";
import FaqSection from "../../Components/Faq";
import HeadTitle from "../../Components/Head/HeadTitle";

const FaqPage = () => {
    return(
        <>
            <HeadTitle title="FAQs - WebGrowthSolutions - SEO & Digital Marketing Agency" />
            <BannerInnerSection title="Frequently Asked Questions" currentPage="Frequently Asked Questions" />
            <FaqSection />
        </>
    );
}

export default FaqPage;