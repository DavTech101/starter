//##########################################################################################
// TRUNCATE TEXT TO A CERTAIN LENGTH
//##########################################################################################
const truncate = (
  sentence: string | undefined | null,
  mark: string = '\u2026',
  minLength: number = 150
) => {
  if (!sentence) {
    return '';
  }

  const length = sentence.length;
  const markOffset = mark.length;

  if (length > minLength) {
    const start = sentence.substring(0, minLength - markOffset);
    return `${start} ${mark}`;
  }

  return sentence;
};

export default truncate;
