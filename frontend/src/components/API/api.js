import axios from 'axios';

export const getDatas = async () => {
  return await axios.get(`${process.env.REACT_APP_API}`);
};
