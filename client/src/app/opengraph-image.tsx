import { ImageResponse } from 'next/og';

//##########################################################################################
// HOME PAGE OPENGRAPH TYPES
//##########################################################################################
type TParams = {
  params: {
    productSlug: string;
  };
};

//##########################################################################################
// HOME PAGE OPENGRAPH DEFAULT VALUES
//##########################################################################################
export const contentType = 'image/png';

export const size = {
  width: 600,
  height: 600,
};

//##########################################################################################
// HOME PAGE OPENGRAPH IMAGE
//##########################################################################################
export default async function og({ params }: TParams) {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'white',
          alignItems: 'center',
          position: 'relative',
          justifyContent: 'center',
        }}
      >
        New App
      </div>
    ),
    {
      ...size,
    }
  );
}
