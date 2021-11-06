module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
  },
  moduleDirectories: ["node_modules", "src"],
  testEnvironment: "jsdom",
};
