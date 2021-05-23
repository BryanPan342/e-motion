import React from 'react';
import { useHistory } from 'react-router';
import Scene4_color from "../../../assets/colorFirework.png";
import Scene1_fg from '../../../assets/Scene1_neutral.png';
import Scene4_fg from '../../../assets/Scene4_cheerful.png';
import Wireframe from '../../../assets/wireframe.png';
import Layout, { SceneProps } from '../../shared/Layout';
import Scene1_bg from '../../sketches/Scene1_neutral';
import Scene4_bg from '../../sketches/Scene4_neutral';
import test from '../../sketches/test';
import test2 from '../../sketches/test2';

function Story1(): JSX.Element {
  const history = useHistory();

  const content: SceneProps[] = [
    {
      sketch: Scene4_bg,
      expo: [
        {
          text: 'forrest test',
          duration: 3000,
        },
        {
          text: 'so slow no wonder u in online school',
          duration: 2000,
        },
      ],
      image: Scene4_color,
    },
    {
      sketch: Scene1_bg,
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
      image: Scene1_fg,
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