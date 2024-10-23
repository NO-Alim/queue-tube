import { MongoDBAdapter } from "@auth/mongodb-adapter";
import mongoClientPromise from "./queries/mongoClientPromise";

export const authConfig = {
  adapter: MongoDBAdapter(mongoClientPromise),
  session: {
    strategy: "jwt",
  },
  providers: [],
};
