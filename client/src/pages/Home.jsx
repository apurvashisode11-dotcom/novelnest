import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import FeaturedBooks from '../components/FeaturedBooks';
import CategorySection from '../components/CategorySection';
import TrendingBooks from '../components/TrendingBooks';
import WhyChooseUs from '../components/WhyChooseUs';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0 },
};

const Home = () => {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Hero />
      <FeaturedBooks />
      <TrendingBooks />
      <CategorySection />
      <WhyChooseUs />
      <Stats />
      <Testimonials />
      <Newsletter />
    </motion.div>
  );
};

export default Home;
