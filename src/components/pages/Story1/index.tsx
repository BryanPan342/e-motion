import React from 'react';
import { useHistory } from 'react-router';
import Wireframe from '../../../assets/wireframe.png';
import Layout, { SceneProps } from '../../shared/Layout';
import test from '../../sketches/test';

function Story1(): JSX.Element {
  const history = useHistory();

  const content: SceneProps[] = [
    {
      sketch: test,
      text: 'My parents didn’t know much about deafness. They were young.',
      image: Wireframe,
      time: 2000,
    },
    {
      sketch: test,
      text: 'Blah blah blah more text.. jdaaksdjflaksdfjlaksd',
      image: Wireframe,
      time: 2000,
    },
    {
      sketch: test,
      text: 'Bryan is so cool he is the best',
      image: Wireframe,
      time: 2000,
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