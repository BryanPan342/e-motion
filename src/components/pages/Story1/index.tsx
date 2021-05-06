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
      expo: [
        {
          text: 'My parents didn’t know much about deafness. They were young.',
          duration: 3000,
        },
        {
          text: 'bryan is so cool he is amazing',
          duration: 3000,
        },
      ],
      image: Wireframe,
    },
    {
      sketch: test2,
      expo: [
        {
          text: 'blah blah blah more text.... asjdfalskdfjlqiwkejflidsf',
          duration: 3000,
        },
      ],
      image: Wireframe,
    },
    {
      sketch: test,
      expo: [
        {
          text: 'bryan is so cool he is amazing',
          duration: 3000,
        },
      ],
      image: Wireframe,
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