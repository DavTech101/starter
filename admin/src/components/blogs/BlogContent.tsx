import { useState } from 'react';
import cn from '@utils/styleMerger';
import { Input } from '@components/ui/Input';
import { Label } from '@components/ui/Label';
import { Button } from '@components/ui/Button';
import { TBlogContents, TContent } from '@Types/blogTypes';

//##########################################################################################
// CONTENTS CONTENT TYPES
//##########################################################################################
type ToggleButtonProps = {
  contentType: boolean;
  setContentType: (value: boolean) => void;
};

type ContentsContentProps = {
  disabled: boolean;
  initialValue: any;
  onChange: (value: string) => void;
};

type ContentProps = {
  index: number;
  disabled: boolean;
  content: TContent;
  removeContent: (index: number) => void;
  updateContentData: (index: number, key: string, value: string) => void;
};

//##########################################################################################
// TOGGLE BUTTON COMPONENT
//##########################################################################################
const ToggleButton: React.FC<ToggleButtonProps> = ({
  contentType,
  setContentType,
}) => {
  return (
    <div className='flex gap-2'>
      <button
        type='button'
        className={cn(
          'py-2 px-4 rounded-lg',
          contentType
            ? 'bg-cyan-600 text-white'
            : 'bg-white border-black border-2'
        )}
        onClick={() => setContentType(true)}
      >
        Image
      </button>
      <button
        type='button'
        className={cn(
          'py-2 px-4 rounded-lg',
          !contentType
            ? 'bg-cyan-600 text-white'
            : 'bg-white border-black border-2'
        )}
        onClick={() => setContentType(false)}
      >
        Content
      </button>
    </div>
  );
};

//##########################################################################################
// CONTENTS CONTENT COMPONENT
//##########################################################################################
const Content: React.FC<ContentProps> = ({
  index,
  disabled,
  content,
  removeContent,
  updateContentData,
}) => {
  const [data, setData] = useState(content);
  const [contentType, setContentType] = useState<boolean>(data.image !== '');

  const onChange = (key: string, value: string) => {
    setData({ ...data, [key]: value });
    updateContentData(index, key, value);
  };

  return (
    <div className='flex flex-col gap-4 py-4'>
      <div className='flex justify-between'>
        <h2 className='font-medium underline text-lg text-blue-500'>
          Content {index + 1}
        </h2>
        <ToggleButton
          contentType={contentType}
          setContentType={setContentType}
        />
        {index !== 0 && (
          <Button
            type='button'
            disabled={disabled}
            className='bg-red-700'
            onClick={() => removeContent(index)}
          >
            Delete Content {index + 1}
          </Button>
        )}
      </div>
      {contentType ? (
        <div className='flex flex-col gap-2'>
          <Label htmlFor='image'>Image</Label>
          <Input
            type='text'
            name='image'
            value={data.image}
            disabled={disabled}
            placeholder='Enter image URL here...'
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />

          <img
            src={data.image}
            alt='Content Image'
            className='w-60 aspect-square object-cover rounded-lg my-5'
          />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

//##########################################################################################
// CONTENTS CONTENT COMPONENT
//##########################################################################################
const ContentsContent: React.FC<ContentsContentProps> = ({
  disabled,
  initialValue,
  onChange,
}) => {
  const [contentData, setContentData] = useState<TBlogContents>(
    JSON.parse(initialValue)
  );

  const updateContentData = () => {
    onChange(JSON.stringify(contentData));
  };

  const addContent = () => {
    setContentData([
      ...contentData,
      {
        step: contentData.length + 1,
        image: '',
        title: '',
        content: '',
      },
    ]);
    updateContentData();
  };

  const removeContent = (index: number) => {
    if (contentData.length === 1) return;
    const newContentData = contentData.filter((_, i) => i !== index);
    setContentData(newContentData);
    updateContentData();
  };

  const updateContent = (index: number, key: string, value: string) => {
    const newContentData = contentData.map((content, i) =>
      i === index ? { ...content, [key]: value } : content
    );
    setContentData(newContentData);
    updateContentData();
  };

  return (
    <div className='flex flex-col w-1/2 gap-8 divide-y-4 divide-cyan-800'>
      <div className='flex justify-between'>
        <h2 className='font-medium text-lg text-cyan-700'>Blog Content</h2>
        <Button
          type='button'
          disabled={disabled}
          onClick={addContent}
          className='bg-green-700'
        >
          + Add Content
        </Button>
      </div>
      {contentData.map((content, index) => (
        <Content
          key={index}
          index={index}
          content={content}
          disabled={disabled}
          removeContent={removeContent}
          updateContentData={updateContent}
        />
      ))}
    </div>
  );
};

export default ContentsContent;
