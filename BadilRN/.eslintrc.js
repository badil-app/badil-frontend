module.exports = {
    root: true,
    extends: ["@react-native", "prettier"],
    rules: {
        // suppress errors for missing 'import React' in files
        "react/react-in-jsx-scope": "off",
        // allow jsx syntax in js files (for next.js project)
        "react/jsx-filename-extension": [
            1,
            { extensions: [".js", ".jsx", ".tsx"] },
        ], //should add ".ts" if typescript project
        "react-native/no-inline-styles": "off",
    },
    parserOptions: {
        parser: "@babel/eslint-parser",
        requireConfigFile: false, // <== ADD THIS
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
    },
};
