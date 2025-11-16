import React from "react";
import BannerInnerSection from "../../Components/Banner/Inner";
import TeamSectionExtend from "../../Components/Team/Extend";
import CtaSection from "../../Components/CallToAction";
import WhyChooseUsSection from "../../Components/ChooseUs";
import ProcessSection from "../../Components/ProcessStep";
import HeadTitle from "../../Components/Head/HeadTitle";

const TeamPage = () => {
    return(
        <>
            <HeadTitle title="Team - WebGrowthSolutions - SEO & Digital Marketing Agency" />
            <BannerInnerSection title="Team" currentPage="Team" />
            <TeamSectionExtend />
            <CtaSection />
            <WhyChooseUsSection />
            <ProcessSection />
        </>
    );
}

export default TeamPage;