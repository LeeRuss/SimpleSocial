// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Comments, Posts, Users } = initSchema(schema);

export {
  Comments,
  Posts,
  Users
};