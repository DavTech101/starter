import { Img, Row, Column } from '@react-email/components';

//##########################################################################################
// EMAILBANNER TYPES
//##########################################################################################
type TBrandLogo = {
  src: string;
  alt: string;
};

type EmailBannerProps = {
  brandLogos?: TBrandLogo[];
};

//##########################################################################################
// EMAILBANNER COMPONENT bg-[#]
// className={}
//##########################################################################################
const EmailBanner: React.FC<EmailBannerProps> = ({ brandLogos }) => {
  const spacing = 20; // Space between logos
  const logoWidth = 75; // Set a fixed width for all logos
  const totalLogos = brandLogos ? brandLogos.length : 1;

  const totalLogoWidth = totalLogos * logoWidth;
  const totalSpacingWidth = (totalLogos - 1) * spacing;
  const totalContentWidth = totalLogoWidth + totalSpacingWidth;
  const widthPercentage = Math.floor((logoWidth / totalContentWidth) * 100);

  return (
    <Row className='bg-[#168984] p-2'>
      {brandLogos &&
        brandLogos.map((logo, index) => (
          <Column
            key={logo.src + index}
            style={{
              width: `${widthPercentage}%`,
              textAlign:
                index === 0
                  ? 'right'
                  : index === brandLogos.length - 1
                    ? 'left'
                    : 'center',
            }}
          >
            <Img
              src={logo.src}
              height='auto'
              width={logoWidth}
              alt={`${logo.alt} Logo`}
              style={{ display: 'inline-block' }}
            />
          </Column>
        ))}
    </Row>
  );
};

export default EmailBanner;
