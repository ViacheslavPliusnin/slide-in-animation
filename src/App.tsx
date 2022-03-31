import styled from 'styled-components';
import { white } from './constants/colors';
import NyanCat from './assets/images/nyan-cat.gif';

const Section = styled.div<{ color?: string }>`
  width: 100%;
  min-height: 500px;
  background-color: ${({ color }) => color || white};
`;

function App() {
  return (
    <Section>
      <img src={NyanCat} alt="Nyan Cat gif" />
    </Section>
  );
}

export default App;
