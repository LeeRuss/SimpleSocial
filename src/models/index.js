// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Users, Comments, Posts } = initSchema(schema);

export {
  Users,
  Comments,
  Posts
};