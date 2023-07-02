module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["airbnb", "prettier"],
    plugins: ["prettier"],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        "prettier/prettier": "error",
        "import/prefer-default-export": "off",
        "jsx-a11y/label-has-associated-control": "off",
        "no-shadow": "off",
        "react/jsx-no-constructed-context-values": "off",
        "import/no-extraneous-dependencies": "off",
        "jsx-a11y/anchor-is-valid": "off",
    },
};
