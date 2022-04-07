// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

// module.exports = getDefaultConfig(__dirname);
// module.exports = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false,
//       },
//     }),
//   },
//   resolver: {
//     sourceExts: [
//       "native",
//       "android.ts",
//       "native.ts",
//       "ts",
//       "android.tsx",
//       "native.tsx",
//       "android.js",
//       "native.js",
//       "js",
//       "android.jsx",
//       "native.jsx",
//       "jsx",
//       "android.json",
//       "native.json",
//       "json",
//       "tsx",
//     ], //add here
//   },
// };
module.exports = getDefaultConfig(__dirname);
//.native|.android.ts|.native.ts|.ts|.android.tsx|.native.tsx|.tsx|.android.js|.native.js|.js|.android.jsx|.native.jsx|.jsx|.android.json|.native.json|.json
