import React from 'react';
import { useHistory } from 'react-router';
import Wireframe from '../../../assets/wireframe.png';
import Layout, { SceneProps } from '../../shared/Layout';
import test from '../../sketches/test';
import test2 from '../../sketches/test2';

function Story1(): JSX.Element {
  const history = useHistory();

  const content: SceneProps[] = [
    {
      sketch: test,
      text: 'My parents didn’t know much about deafness. They were young.',
      image: Wireframe,
      duration: 3000,
    },
    {
      sketch: test2,
      text: 'Blah blah blah more text.. jdaaksdjflaksdfjlaksd',
      image: Wireframe,
      duration: 3000,
    },
    {
      sketch: test,
      text: 'Bryan is so cool he is the best',
      image: Wireframe,
      duration: 3000,
    },
  ];

  const exit = () => {
    history.push('/');
  };

  return (
    <Layout exit={exit}>
      {content}
    </Layout>
  );
}

export default Story1;