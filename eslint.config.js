import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import"; // Asegura que esté importado

export default [
  { ignores: ["dist"] },
  {
    files: ["*/.{js,jsx}"], // Coincide con todos los archivos JS y JSX
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:import/errors", // Asegura que las configuraciones del plugin de import estén aquí
      "plugin:import/warnings",
    ],
    settings: { react: { version: "18.3" } },
    plugins: [
      "react", // Aquí como array
      "react-hooks",
      "react-refresh",
      "import",
    ],
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "import/named": "error", // Reglas que deben marcar error
      "import/default": "error", // Verifica la exportación por defecto
      "import/namespace": "error", // Verifica la exportación de espacio de nombres
      "import/no-unresolved": "error", // Marca error si no se encuentra el módulo
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/react-in-jsx-scope": "off",
    },
  },
];
