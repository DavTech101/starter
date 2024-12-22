//##########################################################################################
// JSON SHOW TYPES
//##########################################################################################
type JsonShowProps = {
  data: any;
};

//##########################################################################################
// JSON SHOW COMPONENT
//##########################################################################################
const JsonShow: React.FC<JsonShowProps> = ({ data }) => {
  return (
    <pre className='text-gray-800 text-left whitespace-pre-wrap break-words'>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};

export default JsonShow;
