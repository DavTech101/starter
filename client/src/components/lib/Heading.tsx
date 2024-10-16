//##########################################################################################
// HEADDING TYPES
//##########################################################################################
type HeadingProps = {
  title: string;
  description?: string;
};

//##########################################################################################
// HEADDING COMPONENT
//##########################################################################################
const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div>
      <h2 className='text-3xl font-bold tracking-tight'>{title}</h2>
      <p className='text-sm text-muted-foreground'>{description}</p>
    </div>
  );
};

export default Heading;
