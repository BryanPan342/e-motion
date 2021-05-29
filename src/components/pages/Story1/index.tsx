import React from 'react';
import { useHistory } from 'react-router';
import Scene1_fg from '../../../assets/scene1_neutral.png';
import Scene2_fg from '../../../assets/scene2.png';
import Wireframe from '../../../assets/wireframe.png';
import Layout, { SceneProps } from '../../shared/Layout';
import Scene1_bg from '../../sketches/Scene1_neutral';
import Scene2_bg from '../../sketches/Scene2';
import Scene4_bg from '../../sketches/Scene4';
import test2 from '../../sketches/test2';

function Story1(): JSX.Element {
  const history = useHistory();

  const content: SceneProps[] = [
    {
      sketch: Scene4_bg,
      expo: [
        {
          text: 'blah blah blah more text.... asjdfalskdfjlqiwkejflidsf',
          duration: 3000,
        },
      ],
      image: Wireframe,
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
      sketch: Scene2_bg,
      expo: [
        {
          text: 'I didn’t get my first hearing aids until elementary school.',
          duration: 3000,
        },
        {
          text: 'And those helped a lot, but they didn’t actually restore my hearing, they just amplified sound.',
          duration: 3000,
        },
        {
          text: 'It could be hard to pinpoint voices.',
          duration: 3000,
        },
        {
          text: 'And I still had to read lips, so I was constantly asking people to talk slower.',
          duration: 3000,
        },
        {
          text: 'It was exhausting.',
          duration: 3000,
        },
        {
          text: 'And I felt like a burden, like I was constantly pushing my disability on other people.',
          duration: 3000,
        },
      ],
      image: Scene2_fg,
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
      sketch: Scene4_bg,
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