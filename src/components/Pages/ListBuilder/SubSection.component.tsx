type SubSectionProps = {
  title?: string;
  children: React.ReactNode;
};

const SubSection = (props: SubSectionProps) => {
  return (
    <div>
      {props.title && <div className='mb-2 text-sm'>{props.title}</div>}
      <div className='flex space-x-4'>{props.children}</div>
    </div>
  );
};

export default SubSection;
