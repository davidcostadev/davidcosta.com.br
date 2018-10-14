import style from './hero.css'

const Hero = () => (
  <div className={style.hero}>
    <div className={style.hero__text}>
      <h1 className={style.hero__title}>Hello I'm David Costa</h1>
      <p className={style.hero__subtitle}>Javascript Developer</p>
    </div>
  </div>
);

export default Hero;
