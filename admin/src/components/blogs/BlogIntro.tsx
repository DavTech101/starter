import { useState } from 'react';
import cn from '@utils/styleMerger';
import { Input } from '@components/ui/Input';
import { Label } from '@components/ui/Label';
import { Button } from '@components/ui/Button';
import { TBlogIntro, TParagraph } from '@Types/blogTypes';

//##########################################################################################
// INTRO SECTION TYPES
//##########################################################################################
type IntroSectionProps = {
  disabled: boolean;
  initialValue: any;
  onChange: (value: string) => void;
};

type IntroParagraphProps = {
  index: number;
  disabled: boolean;
  paragraph: TParagraph;
  removeParagraph: (index: number) => void;
  updateIntroData: (index: number, key: string, value: string) => void;
};

//##########################################################################################
// INTRO PARAGRAPH TYPES
//##########################################################################################
const IntroParagraph: React.FC<IntroParagraphProps> = ({
  index,
  disabled,
  paragraph,
  removeParagraph,
  updateIntroData,
}) => {
  const [data, setData] = useState(paragraph);

  const onChange = (key: string, value: string) => {
    setData({ ...data, [key]: value });
    updateIntroData(index, key, value);
  };

  return (
    <div className='flex flex-col gap-4 py-4'>
      <div className='flex justify-between'>
        <h2 className='font-medium underline text-lg text-blue-500'>
          Intro Paragraph {index + 1}
        </h2>
        {index !== 0 && (
          <Button
            type='button'
            disabled={disabled}
            className='bg-red-700'
            onClick={() => removeParagraph(index)}
          >
            Delete Paragraph {index + 1}
          </Button>
        )}
      </div>
      <div className='flex flex-col gap-2'>
        <Label htmlFor='title'>Title (Optional)</Label>
        <Input
          name='title'
          disabled={disabled}
          value={data.title}
          placeholder='Leave blank if no title'
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <Label htmlFor='content'>Content</Label>
        <textarea
          name='content'
          disabled={disabled}
          value={data.content}
          placeholder='Enter content here...'
          onChange={(e) => onChange(e.target.name, e.target.value)}
          className={cn(
            `w-full min-h-[10rem] px-3 py-2  border-2 rounded`,
            `focus:outline-none focus:border-cs-blue transition-colors`
          )}
        />
      </div>
    </div>
  );
};

//##########################################################################################
// INTRO SECTION COMPONENT
//##########################################################################################
const IntroSection: React.FC<IntroSectionProps> = ({
  disabled,
  onChange,
  initialValue,
}) => {
  const [introData, setIntroData] = useState<TBlogIntro>(
    JSON.parse(initialValue)
  );

  const updateIntroData = () => {
    onChange(JSON.stringify(introData));
  };

  const addParagraph = () => {
    setIntroData([...introData, { title: '', content: '' }]);
    updateIntroData();
  };

  const removeParagraph = (index: number) => {
    if (introData.length === 1) return;
    const newIntroData = introData.filter((_, i) => i !== index);
    setIntroData(newIntroData);
    updateIntroData();
  };

  const updateParagraph = (index: number, key: string, value: string) => {
    const newIntroData = introData.map((paragraph, i) =>
      i === index ? { ...paragraph, [key]: value } : paragraph
    );
    setIntroData(newIntroData);
    updateIntroData();
  };

  return (
    <div className='flex flex-col w-1/2 gap-8 divide-y-4 divide-blue-800'>
      <div className='flex justify-between'>
        <h2 className='font-medium text-lg text-blue-700'>Intro Section</h2>
        <Button
          type='button'
          disabled={disabled}
          onClick={addParagraph}
          className='bg-green-700'
        >
          + Add Paragraph
        </Button>
      </div>
      {introData.map((paragraph, index) => (
        <IntroParagraph
          key={index}
          index={index}
          disabled={disabled}
          paragraph={paragraph}
          removeParagraph={removeParagraph}
          updateIntroData={updateParagraph}
        />
      ))}
    </div>
  );
};

export default IntroSection;
