import Head from 'next/head';
import Layout from '../components/Layout'
import Hero from '../components/Hero';
import Header from '../components/Header';
import About from '../components/About';
import Projects from '../components/Projects';

export default () => (
  <Layout>
    <Head>
      <title>David Costa - Javascript Developer</title>
    </Head>
   <Hero />
   <Header />
   <About />
   <Projects />
  </Layout>
);
