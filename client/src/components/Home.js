// src/components/Home.js

import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 4rem;
  margin-bottom: 20px;
  color:white;
`;

const AboutSection = styled.section`
  width: 80%;
  max-width: 2000px;;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
`;

const AboutHeading = styled.h2`
  font-size: 2.8rem;
  margin-bottom: 10px;
  color:white;
`;

const AboutText = styled.p`
  font-size: 1.5rem;
  line-height: 2.6;
  color:white;
  font-weight: bold;
`;

const Home = () => {
  return (
    <HomeContainer>
      <Heading>Building Dreams, one brick at a time</Heading>
      <AboutSection>
        <AboutHeading>About Us</AboutHeading>
        <AboutText>
          Haven Properties is your ultimate destination for finding the perfect land and house. Our vision is to make property searching effortless and enjoyable, bringing you closer to your dream home.
          At Haven Properties, we provide a seamless experience where you can explore a wide range of properties, from cozy homes to sprawling estates. Our user-friendly platform offers detailed listings and up-to-date information to help you make informed decisions.
          Whether you're buying your first home, investing in property, or looking for a plot to build your dream house, Haven Prop is here to guide you every step of the way. Start your journey with us and discover a world of possibilities in real estate. Welcome home!
        </AboutText>
      </AboutSection>
    </HomeContainer>
  );
};

export default Home;
