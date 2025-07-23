import { useParams, Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';

const CardPage = () => {
  const { id } = useParams();

  // Redirect to /simulator if card10 is accessed
  if (id === 'card10') {
    return <Navigate to="/simulator" replace />;
  }

  const cardData = {
    card1: { title: 'COSMIC VOYAGE', description: 'Embark on an epic journey through the vastness of space, discovering new galaxies and uncharted territories.' },
    card2: { title: 'ASTRAL NEBULA', description: 'Dive into the colorful clouds of cosmic dust, where stars are born and mysteries abound.' },
    card3: { title: 'STELLAR DRIFT', description: 'Float among the stars, experiencing the serene beauty of the cosmos in motion.' },
    card4: { title: 'ORBITAL PATH', description: 'Trace the orbits of celestial bodies, exploring the gravitational dance of planets and moons.' },
    card5: { title: 'CELESTIAL FLOW', description: 'Feel the harmony of the universe, where every element moves in perfect synchronicity.' },
    card6: { title: 'GALACTIC CORE', description: 'Explore the heart of the galaxy, where massive black holes and dense star clusters reside.' },
    card7: { title: 'NEBULA PULSE', description: 'Experience the rhythmic pulsations of a nebula, emitting waves of cosmic energy.' },
    card8: { title: 'STARFIELD', description: 'Wander through a vast field of stars, each a story waiting to be discovered.' },
    card9: { title: 'COSMIC DRIFT', description: 'Drift through the cosmos, guided by the gentle currents of interstellar winds.' },
    // card10 is handled by the redirect above
  };

  const { title, description } = cardData[id] || { title: 'Unknown Card', description: 'No data available.' };

  return (
    <PageContainer>
      <h1>{title}</h1>
      <p>{description}</p>
      <BackLink to="/">Back to Gallery</BackLink>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #111;
  color: #f0f0f0;
  font-family: 'PP Neue Montreal', sans-serif;
  text-align: center;
  padding: 2em;

  h1 {
    font-size: 3em;
    text-transform: uppercase;
    margin-bottom: 1em;
  }

  p {
    font-size: 1.2em;
    max-width: 600px;
    margin-bottom: 2em;
  }
`;

const BackLink = styled(Link)`
  color: #ffe600;
  text-decoration: none;
  font-family: 'TheGoodMonolith', monospace;
  font-size: 1em;
  text-transform: uppercase;
  padding: 0.5em 1em;
  border: 2px solid #ffe600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffe600;
    color: #111;
  }
`;

export default CardPage;