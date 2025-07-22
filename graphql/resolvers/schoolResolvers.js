import School from '../../http/models/schoolModel.js';
import { verifyToken } from '../../http/utils/accessToken.js';

const getMySchool = async (_, __, { accessToken }) => {
  const user = await verifyToken(accessToken);

  const school = await School.findById(user.school).populate({ path: 'manager', select: 'name photo' });

  return school;
};

export const schoolQuery = { getMySchool };

export const schoolMutation = {};
