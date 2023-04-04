// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Comments, Posts } = initSchema(schema);

export {
  Comments,
  Posts
};