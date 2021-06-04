import React from 'react';
import { useHistory } from 'react-router';

import Scene1_fg from '../../../assets/scene1.png';
import Scene2_fg from '../../../assets/scene2.png';
import Scene3_fg from '../../../assets/scene3.png';
import Scene4_fg from '../../../assets/scene4.png';
import Scene5_fg from '../../../assets/scene5.png';
import Layout, { SceneProps } from '../../shared/Layout';
import Scene1_bg from '../../sketches/Scene1_neutral';
import Scene2_bg from '../../sketches/Scene2';
import Scene3_bg from '../../sketches/Scene3';
import Scene4_bg from '../../sketches/Scene4';
import Scene5_bg from '../../sketches/Scene5_happy';

function Story1(): JSX.Element {
  const history = useHistory();

  const content: SceneProps[] = [
    {
      sketch: Scene1_bg,
      expo: [
        {
          text: 'My parents didn’t know much about deafness. They were young.',
          duration: 3000,
        },
        {
          text: 'They were adjusting to life in America.',
          duration: 3000,
        },
        {
          text: 'And they barely spoke English, so they had no way of advocating for me.',
          duration: 3000,
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
      sketch: Scene3_bg,
      expo: [
        {
          text: 'Eventually I just stopped trying to engage, which came with its own set of problems.',
          duration: 3000,
        },
        {
          text: 'I developed a reputation as someone who never spoke.',
          duration: 3000,
        },
        {
          text: 'I got bullied quite a bit.',
          duration: 3000,
        },
      ],
      image: Scene3_fg,
      style: {
        width: '60%',
        margin: '0px 0px 5px 10%',
        border: '0px solid white',
      },
    },
    {
      sketch: Scene4_bg,
      expo: [
        {
          text: 'The majority of my social interaction came from my older brother Brian.',
          duration: 3000,
        },
        {
          text: 'It was just a typical sibling relationship.',
          duration: 3000,
        },
        {
          text: 'We annoyed each other, and got in fights.',
          duration: 3000,
        },
        {
          text: 'I envied how easily he made friends at school.',
          duration: 3000,
        },
        {
          text: 'But he always made a point of saying ‘hi’ to me in the hallway.',
          duration: 3000,
        },
        {
          text: 'He’d even scream it sometimes.',
          duration: 3000,
        },
        {
          text: 'And that meant so much to me. Because people could see, that even if I didn’t mean much to them, I was important to somebody.',
          duration: 3000,
        },
      ],
      image: Scene4_fg,
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
          text: 'Maybe it didn’t mean much to him, because he had so many friends. But it meant a lot to me.',
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