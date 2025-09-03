// Import config first to set up AI provider
import dotenv from "dotenv";

import "./g-zero/utils/config";
import server from "./server";

dotenv.config();

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`Server listening on port ${port}: http://localhost:${port}`);
});
