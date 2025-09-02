// Import config first to set up AI provider
import "./setupEnv";
import "./g-zero/utils/config";
import server from "./server";

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}: http://localhost:${port}`);
});
