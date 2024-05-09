//##########################################################################################
// CHECKS IF A STRING IS A VALID UUID
//##########################################################################################
const isUUID = (uuid: string): boolean => {
  const regex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  return regex.test(uuid);
};

export default isUUID;
