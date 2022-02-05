import PcrTestGenerator from "./PcrTestGenerator.js"

await new PcrTestGenerator("pcr_test_template.pdf")
  .generate("pcr_test_result.pdf")