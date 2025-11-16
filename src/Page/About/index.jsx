
import BannerInnerSection from "../../Components/Banner/Inner";
import PartnersipSection from "../../Components/Partnership";
import AboutSection from "../../Components/About";
import TeamSection from "../../Components/Team";
import AchievementSection from "../../Components/Achievement";
import CtaSection from "../../Components/CallToAction";
import ProcessSection from "../../Components/ProcessStep";
import TestimonialSection from "../../Components/Testimonial/TestimonialSection";
import WhyChooseUsSection from "../../Components/ChooseUs";
import HeadTitle from "../../Components/Head/HeadTitle";

const AboutPage = () => {
    return(
        <>
            <HeadTitle title="About Us - WebGrowthSolutions - SEO & Digital Marketing Agency"/>
            <BannerInnerSection title="About Us" currentPage="About Us" />
            <PartnersipSection />
            <AboutSection />
            <AchievementSection />
            <TeamSection />
            <WhyChooseUsSection />
            <CtaSection />
            <ProcessSection />
            <TestimonialSection />
        </>
    );

}

export default AboutPage;