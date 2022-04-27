import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import generateId from './helpers/generate-id';
import {
  white,
  black,
  red,
  orange,
  yellow,
  green,
  blue,
  purple,
  darkBlue,
} from './constants/colors';
import NyanCat from './assets/images/nyan-cat.gif';

const letterIdGenerator = generateId();

const Section = styled.div<{ color?: string }>`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color || white};
`;

const SectionHeader = styled.h2`
  font-size: 80px;
  color: ${white};
  text-shadow: 8px 8px ${black};
`;

const Image = styled.img`
  height: 400px;
  width: auto;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
`;

const Letter = styled.span`
  display: inline-block;
  min-width: 80px;
`;

const sections = [red, orange, yellow, green, blue, purple];
const string = 'Nyan Cat';
const stringArray = Array.from(string);

const App: React.FC = (): JSX.Element => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const itemEls = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        scrub: 3,
        pin: true,
      },
    });
    tl.from(imageRef.current, {
      x: '-100%',
      height: '100vh',
      ease: 'power4.out',
    });
    itemEls.current.forEach((element) => {
      tl.from(element, {
        x: '100vw',
        ease: 'power4.out',
      });
    });
    tl.to(imageRef.current, {
      x: '100vw',
      ease: 'power4.in',
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.globalTimeline.getChildren().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {sections.map((color, i) => {
        return (
          <Section color={color} key={color}>
            <SectionHeader>Section {i + 1}</SectionHeader>
          </Section>
        );
      })}
      <Section color={darkBlue} ref={sectionRef}>
        <Image src={NyanCat} alt="Nyan Cat gif" ref={imageRef} />
        <SectionHeader ref={textRef}>
          {stringArray.map((item) => (
            <Letter
              ref={(element) => (element ? itemEls.current.push(element) : null)}
              key={letterIdGenerator.next().value}
            >
              {item}
            </Letter>
          ))}
        </SectionHeader>
      </Section>
    </>
  );
};

export default App;
