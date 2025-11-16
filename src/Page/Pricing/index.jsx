import React from "react";
import BannerInnerSection from "../../Components/Banner/Inner";
import CtaSection from "../../Components/CallToAction";
import WhyChooseUsSection from "../../Components/ChooseUs";
import ProcessSection from "../../Components/ProcessStep";
import PricingSection from "../../Components/Pricing";
import HeadTitle from "../../Components/Head/HeadTitle";

const PricingPage = () => {
    return(
        <>       
            <HeadTitle title="Pricing Plan - WebGrowthSolutions - SEO & Digital Marketing Agency" />
            <BannerInnerSection title="Pricing Plan" currentPage="Pricing Plan" />
            <PricingSection />
            <CtaSection />
            <WhyChooseUsSection />
            <ProcessSection />
        </>
    );
}

export default PricingPage;