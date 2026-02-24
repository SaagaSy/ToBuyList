// Connect to backend
import Parse from "parse";

Parse.initialize(
  "Ci6zulR0FnnJqQNRTuK33N2473lO53B7y7zRvhxN",
  "7M5eBYLxbTFHWMdI54oUYfXImPZvltFTmxVBAMdV"
);

Parse.serverURL = "https://parseapi.back4app.com";

export default Parse;
