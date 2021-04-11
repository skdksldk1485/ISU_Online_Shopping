import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Meta from '../components/Meta';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const refSlide1 = useRef(null);
  const refSlide2 = useRef(null);
  const revealRef1 = useRef(null);

  useEffect(() => {
    const sections = [refSlide1, refSlide2].map(
      ref => ref.current
    );

    const triggers = sections.map(panel => {
      return ScrollTrigger.create({
        trigger: panel,
        start: 'top top',
        pin: true,
        pinSpacing: false,
      });
    });

    const snap = ScrollTrigger.create({
      snap: 1 / (sections.length - 1),
    });

    return function cleanup() {
      triggers.map(trigger => trigger.kill());
      snap.kill();
    };
  }, []);

  useEffect(() => {
    const texts = [revealRef1].map(ref => ref.current);

    gsap.from(refSlide1.current, {
      duration: 1,
      autoAlpha: 0,
      ease: 'none',
      delay: 0.7,
    });

    texts.forEach(el => {
      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
        },
        {
          duration: 1,
          autoAlpha: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top center+=100',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);


  return (
    <div>
      <Meta />
      <section className='section' ref={refSlide1}>
        <div className='section__image section__image--intro1'></div>
        <div className='section__content'>
          <h1 className='section__content__title'>INVITE YOU</h1>
          <h3>
            Explore this week's latest collection of the season curated for you
          </h3>
          <Link to='/login'>LOGIN</Link>
        </div>
      </section>

      <section className='section' ref={refSlide2}>
        <div className='section__image section__image--intro2'></div>
        <div className='section__content' ref={revealRef1}>
          <h1 className='section__content__title'>WELCOME</h1>
          <h3>
            Explore this week's latest collection of the season curated for you
          </h3>
          <Link to='/login'>LOGIN</Link>
        </div>
      </section>


    </div>
  );
};

export default HomePage;
