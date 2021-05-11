import React from 'react';
import { useHistory } from 'react-router';
import Wireframe2 from '../../../assets/neutral_wireframe.png';
import Wireframe from '../../../assets/wireframe.png';
import Layout, { SceneProps } from '../../shared/Layout';
import s1s1_neutral from '../../sketches/s1s1_neutral';
import test from '../../sketches/test';
import test2 from '../../sketches/test2';
import test3 from '../../sketches/test3';

function Story1(): JSX.Element {
  const history = useHistory();

  const content: SceneProps[] = [
    {
      sketch: s1s1_neutral,
      expo: [
        {
          text: 'george why so lonely go play ball ',
          duration: 3000,
        },
        {
          text: 'so slow no wonder u in online school',
          duration: 2000,
        },
      ],
      image: Wireframe2,
    },
    {
      sketch: test3,
      expo: [
        {
          text: 'ivan chase ball ',
          duration: 3000,
        },
        {
          text: 'so slow ',
          duration: 2000,
        },
        {
          text: 'yo check the stove ',
          duration: 3000,
        },
        {
          text: 'i think your fried rice is burning ',
          duration: 3000,
        },
        {
          text: 'pls dont tell me u use colander',
          duration: 3000,
        },
      ],
      image: Wireframe,
    },
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