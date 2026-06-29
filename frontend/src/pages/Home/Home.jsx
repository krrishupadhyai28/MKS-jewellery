import MainLayout from "../../layouts/MainLayout";
import Hero from "../../components/Hero/Hero";
import TrustStrip from "../../components/TrustStrip/TrustStrip";
import Categories from "../../components/Categories/Categories";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import WhyChoose from "../../components/WhyChoose/WhyChoose";
import Testimonials from "../../components/Testimonials/Testimonials";
import InstagramSection from "../../components/InstagramSection/InstagramSection";
import Newsletter from "../../components/Newsletter/Newsletter";
import Footer from "../../components/Footer/Footer";
import OffersBanner from "../../components/OffersBanner/OffersBanner";

function Home() {
  return (
    <MainLayout>
      <Hero />
      <OffersBanner />
      <TrustStrip />
      <Categories />
      <FeaturedProducts />
      <WhyChoose />
      <Testimonials />
      <InstagramSection />
      <Newsletter />
      <Footer />
    </MainLayout>
  );
}

export default Home;