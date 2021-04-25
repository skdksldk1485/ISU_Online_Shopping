import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { listCurrentProducts } from '../actions/productActions';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {

  const refSlide1 = useRef(null);
  const refSlide2 = useRef(null);
  const revealRef1 = useRef(null);

  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listCurrentProducts());
  }, [dispatch]);


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

        </div>
      </section>

      <section className='section' ref={refSlide2}>
        <div className='section__image section__image--intro2'></div>
        <div className='section__content' ref={revealRef1}>
        <h1 className='section__content__title'>This season's New Trand</h1>
        <div className='intro__container'>
          {loading ? (
            <Loader />
          ) : error ? (
            <div className='error'>
              <Message>{error}</Message>
            </div>
          ) : (
            <div className='intro_products'>
              {products.map(product => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          )}

        </div>
        </div>
      </section>


    </div>
  );
};

export default HomePage;
