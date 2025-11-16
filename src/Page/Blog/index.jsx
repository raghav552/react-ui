import React from "react";
import BannerInnerSection from "../../Components/Banner/Inner";
import BlogSectionExtend from "../../Components/Blog/Extend";
import HeadTitle from "../../Components/Head/HeadTitle";

const BlogPage = () => {
    return(
        <>
            <HeadTitle title="Blog Archive - WebGrowthSolutions - SEO & Digital Marketing Agency" />
            <BannerInnerSection title="Blog Archive" currentPage="Blog Archive" />
            <BlogSectionExtend/>
        </>
    );
}

export default BlogPage;