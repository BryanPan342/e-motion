import React from 'react';
import { useHistory } from 'react-router';
import Scene1_fg from '../../../assets/scene1.png';
import Scene5_fg from '../../../assets/scene5.png';
// import Scene4_fgBW from '../../../assets/Scene5_cheerful.png';
import Wireframe from '../../../assets/wireframe.png';
import Layout, { SceneProps } from '../../shared/Layout';
import Scene1_bg from '../../sketches/Scene1_neutral';
import Scene5_bg from '../../sketches/Scene4_neutral';
import test from '../../sketches/test';
import test2 from '../../sketches/test2';

function Story1(): JSX.Element {
  const history = useHistory();

  const content: SceneProps[] = [
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
      sketch: Scene5_bg,
      expo: [
        {
          text: 'After school Brian and I would watch a lot of TV together. ',
          duration: 3000,
        },
        {
          text: 'It was a safe space for me.',
          duration: 3000,
        },
        {
          text: 'He was the one person that I never had to ask to turn on subtitles. ',
          duration: 3000,
        },
        {
          text: 'There was no obligation to socialize, or interact, or anything else I struggled with.',
          duration: 3000,
        },
        {
          text: 'We’d just sit there. And be together. ',
          duration: 3000,
        },
        {
          text: 'Maybe it didn’t mean much to him, because he had so many friends. But it meant a lot to me [joy].',
          duration: 3000,
        },
        {
          text: 'Both of us are grown now. We’ve matured a lot. And we understand each other better. ',
          duration: 3000,
        },
      ],
      image: Scene5_fg,
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