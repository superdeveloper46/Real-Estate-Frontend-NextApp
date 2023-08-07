import { useSelector } from 'react-redux';

import Logo from '../Logo/Logo.component';

const Loading = () => {
  const { loading } = useSelector((state: any) => state.global);
  return (
    loading && (
      <div>
        <div className='fixed right-0 bottom-0 z-[99999] flex h-full w-full items-center justify-center '>
          <div className='fixed inset-0 bg-black/50'></div>
          <div className='relative'>
            <Logo variant='large' color='light' />
            <div className='flex justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='120px'
                height='120px'
                viewBox='0 0 100 100'
                preserveAspectRatio='xMidYMid'
              >
                <g transform='rotate(0 50 50)'>
                  <rect
                    x='48'
                    y='22.5'
                    rx='2'
                    ry='2.25'
                    width='4'
                    height='15'
                    fill='#ffffff'
                  >
                    <animate
                      attributeName='opacity'
                      values='1;0'
                      keyTimes='0;1'
                      dur='1.1111111111111112s'
                      begin='-1.0185185185185184s'
                      repeatCount='indefinite'
                    ></animate>
                  </rect>
                </g>
                <g transform='rotate(30 50 50)'>
                  <rect
                    x='48'
                    y='22.5'
                    rx='2'
                    ry='2.25'
                    width='4'
                    height='15'
                    fill='#ffffff'
                  >
                    <animate
                      attributeName='opacity'
                      values='1;0'
                      keyTimes='0;1'
                      dur='1.1111111111111112s'
                      begin='-0.9259259259259258s'
                      repeatCount='indefinite'
                    ></animate>
                  </rect>
                </g>
                <g transform='rotate(60 50 50)'>
                  <rect
                    x='48'
                    y='22.5'
                    rx='2'
                    ry='2.25'
                    width='4'
                    height='15'
                    fill='#ffffff'
                  >
                    <animate
                      attributeName='opacity'
                      values='1;0'
                      keyTimes='0;1'
                      dur='1.1111111111111112s'
                      begin='-0.8333333333333333s'
                      repeatCount='indefinite'
                    ></animate>
                  </rect>
                </g>
                <g transform='rotate(90 50 50)'>
                  <rect
                    x='48'
                    y='22.5'
                    rx='2'
                    ry='2.25'
                    width='4'
                    height='15'
                    fill='#ffffff'
                  >
                    <animate
                      attributeName='opacity'
                      values='1;0'
                      keyTimes='0;1'
                      dur='1.1111111111111112s'
                      begin='-0.7407407407407407s'
                      repeatCount='indefinite'
                    ></animate>
                  </rect>
                </g>
                <g transform='rotate(120 50 50)'>
                  <rect
                    x='48'
                    y='22.5'
                    rx='2'
                    ry='2.25'
                    width='4'
                    height='15'
                    fill='#ffffff'
                  >
                    <animate
                      attributeName='opacity'
                      values='1;0'
                      keyTimes='0;1'
                      dur='1.1111111111111112s'
                      begin='-0.6481481481481481s'
                      repeatCount='indefinite'
                    ></animate>
                  </rect>
                </g>
                <g transform='rotate(150 50 50)'>
                  <rect
                    x='48'
                    y='22.5'
                    rx='2'
                    ry='2.25'
                    width='4'
                    height='15'
                    fill='#ffffff'
                  >
                    <animate
                      attributeName='opacity'
                      values='1;0'
                      keyTimes='0;1'
                      dur='1.1111111111111112s'
                      begin='-0.5555555555555555s'
                      repeatCount='indefinite'
                    ></animate>
                  </rect>
                </g>
                <g transform='rotate(180 50 50)'>
                  <rect
                    x='48'
                    y='22.5'
                    rx='2'
                    ry='2.25'
                    width='4'
                    height='15'
                    fill='#ffffff'
                  >
                    <animate
                      attributeName='opacity'
                      values='1;0'
                      keyTimes='0;1'
                      dur='1.1111111111111112s'
                      begin='-0.4629629629629629s'
                      repeatCount='indefinite'
                    ></animate>
                  </rect>
                </g>
                <g transform='rotate(210 50 50)'>
                  <rect
                    x='48'
                    y='22.5'
                    rx='2'
                    ry='2.25'
                    width='4'
                    height='15'
                    fill='#ffffff'
                  >
                    <animate
                      attributeName='opacity'
                      values='1;0'
                      keyTimes='0;1'
                      dur='1.1111111111111112s'
                      begin='-0.37037037037037035s'
                      repeatCount='indefinite'
                    ></animate>
                  </rect>
                </g>
                <g transform='rotate(240 50 50)'>
                  <rect
                    x='48'
                    y='22.5'
                    rx='2'
                    ry='2.25'
                    width='4'
                    height='15'
                    fill='#ffffff'
                  >
                    <animate
                      attributeName='opacity'
                      values='1;0'
                      keyTimes='0;1'
                      dur='1.1111111111111112s'
                      begin='-0.27777777777777773s'
                      repeatCount='indefinite'
                    ></animate>
                  </rect>
                </g>
                <g transform='rotate(270 50 50)'>
                  <rect
                    x='48'
                    y='22.5'
                    rx='2'
                    ry='2.25'
                    width='4'
                    height='15'
                    fill='#ffffff'
                  >
                    <animate
                      attributeName='opacity'
                      values='1;0'
                      keyTimes='0;1'
                      dur='1.1111111111111112s'
                      begin='-0.18518518518518517s'
                      repeatCount='indefinite'
                    ></animate>
                  </rect>
                </g>
                <g transform='rotate(300 50 50)'>
                  <rect
                    x='48'
                    y='22.5'
                    rx='2'
                    ry='2.25'
                    width='4'
                    height='15'
                    fill='#ffffff'
                  >
                    <animate
                      attributeName='opacity'
                      values='1;0'
                      keyTimes='0;1'
                      dur='1.1111111111111112s'
                      begin='-0.09259259259259259s'
                      repeatCount='indefinite'
                    ></animate>
                  </rect>
                </g>
                <g transform='rotate(330 50 50)'>
                  <rect
                    x='48'
                    y='22.5'
                    rx='2'
                    ry='2.25'
                    width='4'
                    height='15'
                    fill='#ffffff'
                  >
                    <animate
                      attributeName='opacity'
                      values='1;0'
                      keyTimes='0;1'
                      dur='1.1111111111111112s'
                      begin='0s'
                      repeatCount='indefinite'
                    ></animate>
                  </rect>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Loading;
