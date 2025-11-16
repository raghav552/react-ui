import React from "react";
import BannerInnerSection from "../../Components/Banner/Inner";
import SingleServiceSection from "../../Components/Service/SingleService";
import AchievementSection from "../../Components/Achievement";
import TeamSection from "../../Components/Team";
import WhyChooseUsSection from "../../Components/ChooseUs";
import HeadTitle from "../../Components/Head/HeadTitle";

const SingleServicePage = () => {
    return(
        <>
            <HeadTitle title="Service Detail - WebGrowthSolutions - SEO & Digital Marketing Agency" />
            <BannerInnerSection title="On-Page SEO" currentPage="On page SEO" />
            <SingleServiceSection />
            <AchievementSection/>
            <TeamSection />
            <WhyChooseUsSection />
        </>
    );
}

export default SingleServicePage;