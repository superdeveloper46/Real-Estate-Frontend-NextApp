import style from './style.module.scss';

type HorizontalItemProps = {
  title?: string;
  value: string;
  icon?: string;
  titleClass?: string;
  valueClass?: string;
};

const HorizontalItem = (props: HorizontalItemProps) => {
  return (
    <div className='flex items-center space-x-4 px-2'>
      <div className={`${style.text} w-[200px] text-left ${props?.titleClass}`}>
        {props.title ?? (
          <img src={props?.icon} alt='image icon' className='w-4' />
        )}
      </div>
      <div className={`${style.vSeperator} !h-3`}></div>
      <div className={`${style.text} ${props?.valueClass ?? '!font-medium'}`}>
        {props?.value}
      </div>
    </div>
  );
};

export default HorizontalItem;
