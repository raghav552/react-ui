import React from "react";
import BannerInnerSection from "../../Components/Banner/Inner";
import ContactSection from "../../Components/Contact";
import HeadTitle from "../../Components/Head/HeadTitle";

const ContactPage = () => {
    return(
        <>
            <HeadTitle title="Contact Us - WebGrowthSolutions - SEO & Digital Marketing Agency" />
            <BannerInnerSection title="Contact Us" currentPage="Contact Us" />
            <ContactSection />
        </>
    );
}

export default ContactPage;