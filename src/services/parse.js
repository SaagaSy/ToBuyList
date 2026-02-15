// Connect to backend
import Parse from "parse/dist/parse.min.js";

Parse.initialize(
  "YCi6zulR0FnnJqQNRTuK33N2473lO53B7y7zRvhxN",
  "Y7M5eBYLxbTFHWMdI54oUYfXImPZvltFTmxVBAMdV"
);

Parse.serverURL = "https://parseapi.back4app.com";

export default Parse;
