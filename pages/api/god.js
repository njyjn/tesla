// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Tesla API documentation: https://tesla-api.timdorr.com/
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { getVehicleData } from '../../src/api/vehicle';

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const { user } = getSession(req, res);
    const data = await getVehicleData(false);
    res.status(200).json({ protected: data, id: user.sub} );
  } catch (error) {
    res.status(400).json(error);
  }
});
