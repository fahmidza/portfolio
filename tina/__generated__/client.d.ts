import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'cbbadf728812868542cfab084b8f3d2b2efa5647', queries,  });
export default client;
  