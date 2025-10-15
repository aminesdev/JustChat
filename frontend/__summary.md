# Project: .

## File: README.md
```md
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```

## File: components.json
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": false,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {}
}

```

## File: eslint.config.js
```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])

```

## File: index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Chat App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## File: jsconfig.json
```json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["./src/*"]
        }
    }
}

```

## File: package-lock.json
```json
{
  "name": "frontend",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "frontend",
      "version": "0.0.0",
      "dependencies": {
        "@fontsource/jetbrains-mono": "^5.2.8",
        "@hookform/resolvers": "^5.2.2",
        "@radix-ui/react-label": "^2.1.7",
        "@radix-ui/react-slot": "^1.2.3",
        "axios": "^1.12.2",
        "class-variance-authority": "^0.7.1",
        "clsx": "^2.1.1",
        "lucide-react": "^0.545.0",
        "react": "^19.1.1",
        "react-dom": "^19.1.1",
        "react-hook-form": "^7.64.0",
        "react-router-dom": "^7.9.4",
        "tailwind-merge": "^3.3.1",
        "tailwindcss-animate": "^1.0.7",
        "zod": "^4.1.12",
        "zustand": "^5.0.8"
      },
      "devDependencies": {
        "@eslint/js": "^9.36.0",
        "@types/react": "^19.1.16",
        "@types/react-dom": "^19.1.9",
        "@vitejs/plugin-react": "^5.0.4",
        "autoprefixer": "^10.4.21",
        "eslint": "^9.36.0",
        "eslint-plugin-react-hooks": "^5.2.0",
        "eslint-plugin-react-refresh": "^0.4.22",
        "globals": "^16.4.0",
        "postcss": "^8.5.6",
        "tailwindcss": "^3.4.18",
        "vite": "^7.1.7"
      }
    },
    "node_modules/@alloc/quick-lru": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.2.0.tgz",
      "integrity": "sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.27.1.tgz",
      "integrity": "sha512-cjQ7ZlQ0Mv3b47hABuTevyTuYN4i+loJKGeV9flcCgIK37cCXRh+L1bd3iBHlynerhQ7BhCkn2BPbQUL+rGqFg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.27.1",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.28.4",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.28.4.tgz",
      "integrity": "sha512-YsmSKC29MJwf0gF8Rjjrg5LQCmyh+j/nD8/eP7f+BeoQTKYqs9RoWbjGOdy0+1Ekr68RJZMUOPVQaQisnIo4Rw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.28.4",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.28.4.tgz",
      "integrity": "sha512-2BCOP7TN8M+gVDj7/ht3hsaO/B/n5oDbiAyyvnRlNOs+u1o+JWNYTQrmpuNp1/Wq2gcFrI01JAW+paEKDMx/CA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.27.1",
        "@babel/generator": "^7.28.3",
        "@babel/helper-compilation-targets": "^7.27.2",
        "@babel/helper-module-transforms": "^7.28.3",
        "@babel/helpers": "^7.28.4",
        "@babel/parser": "^7.28.4",
        "@babel/template": "^7.27.2",
        "@babel/traverse": "^7.28.4",
        "@babel/types": "^7.28.4",
        "@jridgewell/remapping": "^2.3.5",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.28.3",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.28.3.tgz",
      "integrity": "sha512-3lSpxGgvnmZznmBkCRnVREPUFJv2wrv9iAoFDvADJc0ypmdOxdUtcLeBgBJ6zE0PMeTKnxeQzyk0xTBq4Ep7zw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.28.3",
        "@babel/types": "^7.28.2",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.27.2",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.27.2.tgz",
      "integrity": "sha512-2+1thGUUWWjLTYTHZWK1n8Yga0ijBz1XAhUXcKy81rd5g6yh7hGqMp45v7cadSbEHc9G3OTv45SyneRN3ps4DQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.27.2",
        "@babel/helper-validator-option": "^7.27.1",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.28.0.tgz",
      "integrity": "sha512-+W6cISkXFa1jXsDEdYA8HeevQT/FULhxzR99pxphltZcVaugps53THCeiWA8SguxxpSp3gKPiuYfSWopkLQ4hw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.27.1.tgz",
      "integrity": "sha512-0gSFWUPNXNopqtIPQvlD5WgXYI5GY2kP2cCvoT8kczjbfcfuIljTbcWrulD1CIPIX2gt1wghbDy08yE1p+/r3w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.27.1",
        "@babel/types": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.28.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.28.3.tgz",
      "integrity": "sha512-gytXUbs8k2sXS9PnQptz5o0QnpLL51SwASIORY6XaBKF88nsOT0Zw9szLqlSGQDP/4TljBAD5y98p2U1fqkdsw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.27.1",
        "@babel/helper-validator-identifier": "^7.27.1",
        "@babel/traverse": "^7.28.3"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-plugin-utils": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.27.1.tgz",
      "integrity": "sha512-1gn1Up5YXka3YYAHGKpbideQ5Yjf1tDa9qYcgysz+cNCXukyLl6DjPXhD3VRwSb8c0J9tA4b2+rHEZtc6R0tlw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.27.1.tgz",
      "integrity": "sha512-qMlSxKbpRlAridDExk92nSobyDdpPijUq2DW6oDnUqd0iOGxmQjyqhMIihI9+zv4LPyZdRje2cavWPbCbWm3eA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.27.1.tgz",
      "integrity": "sha512-D2hP9eA+Sqx1kBZgzxZh0y1trbuU+JoDkiEwqhQ36nodYqJwyEIhPSdMNd7lOm/4io72luTPWH20Yda0xOuUow==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.27.1.tgz",
      "integrity": "sha512-YvjJow9FxbhFFKDSuFnVCe2WxXk1zWc22fFePVNEaWJEu8IrZVlda6N0uHwzZrUM1il7NC9Mlp4MaJYbYd9JSg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.28.4",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.28.4.tgz",
      "integrity": "sha512-HFN59MmQXGHVyYadKLVumYsA9dBFun/ldYxipEjzA4196jpLZd8UjEEBLkbEkvfYreDqJhZxYAWFPtrfhNpj4w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.27.2",
        "@babel/types": "^7.28.4"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.28.4",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.28.4.tgz",
      "integrity": "sha512-yZbBqeM6TkpP9du/I2pUZnJsRMGGvOuIrhjzC1AwHwW+6he4mni6Bp/m8ijn0iOuZuPI2BfkCoSRunpyjnrQKg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.28.4"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-self": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-self/-/plugin-transform-react-jsx-self-7.27.1.tgz",
      "integrity": "sha512-6UzkCs+ejGdZ5mFFC/OCUrv028ab2fp1znZmCZjAOBKiBK2jXD1O+BPSfX8X2qjJ75fZBMSnQn3Rq2mrBJK2mw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-source": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-source/-/plugin-transform-react-jsx-source-7.27.1.tgz",
      "integrity": "sha512-zbwoTsBruTeKB9hSq73ha66iFeJHuaFkUbwvqElnygoNbj/jHRsSeokowZFN3CZ64IvEqcmmkVe89OPXc7ldAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.27.2",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.27.2.tgz",
      "integrity": "sha512-LPDZ85aEJyYSd18/DkjNh4/y1ntkE5KwUHWTiqgRxruuZL2F1yuHligVHLvcHY2vMHXttKFpJn6LwfI7cw7ODw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.27.1",
        "@babel/parser": "^7.27.2",
        "@babel/types": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.28.4",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.28.4.tgz",
      "integrity": "sha512-YEzuboP2qvQavAcjgQNVgsvHIDv6ZpwXvcvjmyySP2DIMuByS/6ioU5G9pYrWHM6T2YDfc7xga9iNzYOs12CFQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.27.1",
        "@babel/generator": "^7.28.3",
        "@babel/helper-globals": "^7.28.0",
        "@babel/parser": "^7.28.4",
        "@babel/template": "^7.27.2",
        "@babel/types": "^7.28.4",
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.28.4",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.28.4.tgz",
      "integrity": "sha512-bkFqkLhh3pMBUQQkpVgWDWq/lqzc2678eUyDlTBhRqhCHFguYYGM0Efga7tYk4TogG/3x0EEl66/OQ+WGbWB/Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.27.1",
        "@babel/helper-validator-identifier": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@esbuild/aix-ppc64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.25.10.tgz",
      "integrity": "sha512-0NFWnA+7l41irNuaSVlLfgNT12caWJVLzp5eAVhZ0z1qpxbockccEt3s+149rE64VUI3Ml2zt8Nv5JVc4QXTsw==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "aix"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.25.10.tgz",
      "integrity": "sha512-dQAxF1dW1C3zpeCDc5KqIYuZ1tgAdRXNoZP7vkBIRtKZPYe2xVr/d3SkirklCHudW1B45tGiUlz2pUWDfbDD4w==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.25.10.tgz",
      "integrity": "sha512-LSQa7eDahypv/VO6WKohZGPSJDq5OVOo3UoFR1E4t4Gj1W7zEQMUhI+lo81H+DtB+kP+tDgBp+M4oNCwp6kffg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-x64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.25.10.tgz",
      "integrity": "sha512-MiC9CWdPrfhibcXwr39p9ha1x0lZJ9KaVfvzA0Wxwz9ETX4v5CHfF09bx935nHlhi+MxhA63dKRRQLiVgSUtEg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-arm64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.25.10.tgz",
      "integrity": "sha512-JC74bdXcQEpW9KkV326WpZZjLguSZ3DfS8wrrvPMHgQOIEIG/sPXEN/V8IssoJhbefLRcRqw6RQH2NnpdprtMA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-x64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.25.10.tgz",
      "integrity": "sha512-tguWg1olF6DGqzws97pKZ8G2L7Ig1vjDmGTwcTuYHbuU6TTjJe5FXbgs5C1BBzHbJ2bo1m3WkQDbWO2PvamRcg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-arm64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.25.10.tgz",
      "integrity": "sha512-3ZioSQSg1HT2N05YxeJWYR+Libe3bREVSdWhEEgExWaDtyFbbXWb49QgPvFH8u03vUPX10JhJPcz7s9t9+boWg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-x64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.25.10.tgz",
      "integrity": "sha512-LLgJfHJk014Aa4anGDbh8bmI5Lk+QidDmGzuC2D+vP7mv/GeSN+H39zOf7pN5N8p059FcOfs2bVlrRr4SK9WxA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.25.10.tgz",
      "integrity": "sha512-oR31GtBTFYCqEBALI9r6WxoU/ZofZl962pouZRTEYECvNF/dtXKku8YXcJkhgK/beU+zedXfIzHijSRapJY3vg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.25.10.tgz",
      "integrity": "sha512-5luJWN6YKBsawd5f9i4+c+geYiVEw20FVW5x0v1kEMWNq8UctFjDiMATBxLvmmHA4bf7F6hTRaJgtghFr9iziQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ia32": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.25.10.tgz",
      "integrity": "sha512-NrSCx2Kim3EnnWgS4Txn0QGt0Xipoumb6z6sUtl5bOEZIVKhzfyp/Lyw4C1DIYvzeW/5mWYPBFJU3a/8Yr75DQ==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-loong64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.25.10.tgz",
      "integrity": "sha512-xoSphrd4AZda8+rUDDfD9J6FUMjrkTz8itpTITM4/xgerAZZcFW7Dv+sun7333IfKxGG8gAq+3NbfEMJfiY+Eg==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-mips64el": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.25.10.tgz",
      "integrity": "sha512-ab6eiuCwoMmYDyTnyptoKkVS3k8fy/1Uvq7Dj5czXI6DF2GqD2ToInBI0SHOp5/X1BdZ26RKc5+qjQNGRBelRA==",
      "cpu": [
        "mips64el"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ppc64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.25.10.tgz",
      "integrity": "sha512-NLinzzOgZQsGpsTkEbdJTCanwA5/wozN9dSgEl12haXJBzMTpssebuXR42bthOF3z7zXFWH1AmvWunUCkBE4EA==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-riscv64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.25.10.tgz",
      "integrity": "sha512-FE557XdZDrtX8NMIeA8LBJX3dC2M8VGXwfrQWU7LB5SLOajfJIxmSdyL/gU1m64Zs9CBKvm4UAuBp5aJ8OgnrA==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-s390x": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.25.10.tgz",
      "integrity": "sha512-3BBSbgzuB9ajLoVZk0mGu+EHlBwkusRmeNYdqmznmMc9zGASFjSsxgkNsqmXugpPk00gJ0JNKh/97nxmjctdew==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-x64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.25.10.tgz",
      "integrity": "sha512-QSX81KhFoZGwenVyPoberggdW1nrQZSvfVDAIUXr3WqLRZGZqWk/P4T8p2SP+de2Sr5HPcvjhcJzEiulKgnxtA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-arm64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-arm64/-/netbsd-arm64-0.25.10.tgz",
      "integrity": "sha512-AKQM3gfYfSW8XRk8DdMCzaLUFB15dTrZfnX8WXQoOUpUBQ+NaAFCP1kPS/ykbbGYz7rxn0WS48/81l9hFl3u4A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-x64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.25.10.tgz",
      "integrity": "sha512-7RTytDPGU6fek/hWuN9qQpeGPBZFfB4zZgcz2VK2Z5VpdUxEI8JKYsg3JfO0n/Z1E/6l05n0unDCNc4HnhQGig==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-arm64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-arm64/-/openbsd-arm64-0.25.10.tgz",
      "integrity": "sha512-5Se0VM9Wtq797YFn+dLimf2Zx6McttsH2olUBsDml+lm0GOCRVebRWUvDtkY4BWYv/3NgzS8b/UM3jQNh5hYyw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-x64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.25.10.tgz",
      "integrity": "sha512-XkA4frq1TLj4bEMB+2HnI0+4RnjbuGZfet2gs/LNs5Hc7D89ZQBHQ0gL2ND6Lzu1+QVkjp3x1gIcPKzRNP8bXw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openharmony-arm64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/openharmony-arm64/-/openharmony-arm64-0.25.10.tgz",
      "integrity": "sha512-AVTSBhTX8Y/Fz6OmIVBip9tJzZEUcY8WLh7I59+upa5/GPhh2/aM6bvOMQySspnCCHvFi79kMtdJS1w0DXAeag==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/sunos-x64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.25.10.tgz",
      "integrity": "sha512-fswk3XT0Uf2pGJmOpDB7yknqhVkJQkAQOcW/ccVOtfx05LkbWOaRAtn5SaqXypeKQra1QaEa841PgrSL9ubSPQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-arm64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.25.10.tgz",
      "integrity": "sha512-ah+9b59KDTSfpaCg6VdJoOQvKjI33nTaQr4UluQwW7aEwZQsbMCfTmfEO4VyewOxx4RaDT/xCy9ra2GPWmO7Kw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-ia32": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.25.10.tgz",
      "integrity": "sha512-QHPDbKkrGO8/cz9LKVnJU22HOi4pxZnZhhA2HYHez5Pz4JeffhDjf85E57Oyco163GnzNCVkZK0b/n4Y0UHcSw==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-x64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.25.10.tgz",
      "integrity": "sha512-9KpxSVFCu0iK1owoez6aC/s/EdUQLDN3adTxGCqxMVhrPDj6bt5dbrHDXUuq+Bs2vATFBBrQS5vdQ/Ed2P+nbw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@eslint-community/eslint-utils": {
      "version": "4.9.0",
      "resolved": "https://registry.npmjs.org/@eslint-community/eslint-utils/-/eslint-utils-4.9.0.tgz",
      "integrity": "sha512-ayVFHdtZ+hsq1t2Dy24wCmGXGe4q9Gu3smhLYALJrr473ZH27MsnSL+LKUlimp4BWJqMDMLmPpx/Q9R3OAlL4g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "eslint-visitor-keys": "^3.4.3"
      },
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      },
      "peerDependencies": {
        "eslint": "^6.0.0 || ^7.0.0 || >=8.0.0"
      }
    },
    "node_modules/@eslint-community/eslint-utils/node_modules/eslint-visitor-keys": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-3.4.3.tgz",
      "integrity": "sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint-community/regexpp": {
      "version": "4.12.1",
      "resolved": "https://registry.npmjs.org/@eslint-community/regexpp/-/regexpp-4.12.1.tgz",
      "integrity": "sha512-CCZCDJuduB9OUkFkY2IgppNZMi2lBQgD2qzwXkEia16cge2pijY/aXi96CJMquDMn3nJdlPV1A5KrJEXwfLNzQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^12.0.0 || ^14.0.0 || >=16.0.0"
      }
    },
    "node_modules/@eslint/config-array": {
      "version": "0.21.0",
      "resolved": "https://registry.npmjs.org/@eslint/config-array/-/config-array-0.21.0.tgz",
      "integrity": "sha512-ENIdc4iLu0d93HeYirvKmrzshzofPw6VkZRKQGe9Nv46ZnWUzcF1xV01dcvEg/1wXUR61OmmlSfyeyO7EvjLxQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/object-schema": "^2.1.6",
        "debug": "^4.3.1",
        "minimatch": "^3.1.2"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/config-helpers": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/@eslint/config-helpers/-/config-helpers-0.4.0.tgz",
      "integrity": "sha512-WUFvV4WoIwW8Bv0KeKCIIEgdSiFOsulyN0xrMu+7z43q/hkOLXjvb5u7UC9jDxvRzcrbEmuZBX5yJZz1741jog==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^0.16.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/core": {
      "version": "0.16.0",
      "resolved": "https://registry.npmjs.org/@eslint/core/-/core-0.16.0.tgz",
      "integrity": "sha512-nmC8/totwobIiFcGkDza3GIKfAw1+hLiYVrh3I1nIomQ8PEr5cxg34jnkmGawul/ep52wGRAcyeDCNtWKSOj4Q==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@types/json-schema": "^7.0.15"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/eslintrc": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/@eslint/eslintrc/-/eslintrc-3.3.1.tgz",
      "integrity": "sha512-gtF186CXhIl1p4pJNGZw8Yc6RlshoePRvE0X91oPGb3vZ8pM3qOS9W9NGPat9LziaBV7XrJWGylNQXkGcnM3IQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ajv": "^6.12.4",
        "debug": "^4.3.2",
        "espree": "^10.0.1",
        "globals": "^14.0.0",
        "ignore": "^5.2.0",
        "import-fresh": "^3.2.1",
        "js-yaml": "^4.1.0",
        "minimatch": "^3.1.2",
        "strip-json-comments": "^3.1.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint/eslintrc/node_modules/globals": {
      "version": "14.0.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-14.0.0.tgz",
      "integrity": "sha512-oahGvuMGQlPw/ivIYBjVSrWAfWLBeku5tpPE2fOPLi+WHffIWbuh2tCjhyQhTBPMf5E9jDEH4FOmTYgYwbKwtQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@eslint/js": {
      "version": "9.37.0",
      "resolved": "https://registry.npmjs.org/@eslint/js/-/js-9.37.0.tgz",
      "integrity": "sha512-jaS+NJ+hximswBG6pjNX0uEJZkrT0zwpVi3BA3vX22aFGjJjmgSTSmPpZCRKmoBL5VY/M6p0xsSJx7rk7sy5gg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      }
    },
    "node_modules/@eslint/object-schema": {
      "version": "2.1.6",
      "resolved": "https://registry.npmjs.org/@eslint/object-schema/-/object-schema-2.1.6.tgz",
      "integrity": "sha512-RBMg5FRL0I0gs51M/guSAj5/e14VQ4tpZnQNWwuDT66P14I43ItmPfIZRhO9fUVIPOAQXU47atlywZ/czoqFPA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/plugin-kit": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/@eslint/plugin-kit/-/plugin-kit-0.4.0.tgz",
      "integrity": "sha512-sB5uyeq+dwCWyPi31B2gQlVlo+j5brPlWx4yZBrEaRo/nhdDE8Xke1gsGgtiBdaBTxuTkceLVuVt/pclrasb0A==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^0.16.0",
        "levn": "^0.4.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@fontsource/jetbrains-mono": {
      "version": "5.2.8",
      "resolved": "https://registry.npmjs.org/@fontsource/jetbrains-mono/-/jetbrains-mono-5.2.8.tgz",
      "integrity": "sha512-6w8/SG4kqvIMu7xd7wt6x3idn1Qux3p9N62s6G3rfldOUYHpWcc2FKrqf+Vo44jRvqWj2oAtTHrZXEP23oSKwQ==",
      "license": "OFL-1.1",
      "funding": {
        "url": "https://github.com/sponsors/ayuhito"
      }
    },
    "node_modules/@hookform/resolvers": {
      "version": "5.2.2",
      "resolved": "https://registry.npmjs.org/@hookform/resolvers/-/resolvers-5.2.2.tgz",
      "integrity": "sha512-A/IxlMLShx3KjV/HeTcTfaMxdwy690+L/ZADoeaTltLx+CVuzkeVIPuybK3jrRfw7YZnmdKsVVHAlEPIAEUNlA==",
      "license": "MIT",
      "dependencies": {
        "@standard-schema/utils": "^0.3.0"
      },
      "peerDependencies": {
        "react-hook-form": "^7.55.0"
      }
    },
    "node_modules/@humanfs/core": {
      "version": "0.19.1",
      "resolved": "https://registry.npmjs.org/@humanfs/core/-/core-0.19.1.tgz",
      "integrity": "sha512-5DyQ4+1JEUzejeK1JGICcideyfUbGixgS9jNgex5nqkW+cY7WZhxBigmieN5Qnw9ZosSNVC9KQKyb+GUaGyKUA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanfs/node": {
      "version": "0.16.7",
      "resolved": "https://registry.npmjs.org/@humanfs/node/-/node-0.16.7.tgz",
      "integrity": "sha512-/zUx+yOsIrG4Y43Eh2peDeKCxlRt/gET6aHfaKpuq267qXdYDFViVHfMaLyygZOnl0kGWxFIgsBy8QFuTLUXEQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@humanfs/core": "^0.19.1",
        "@humanwhocodes/retry": "^0.4.0"
      },
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanwhocodes/module-importer": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/module-importer/-/module-importer-1.0.1.tgz",
      "integrity": "sha512-bxveV4V8v5Yb4ncFTT3rPSgZBOpCkjfK0y4oVVVJwIuDVBRMDXrPyXRL988i5ap9m9bnyEEjWfm5WkBmtffLfA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=12.22"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@humanwhocodes/retry": {
      "version": "0.4.3",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/retry/-/retry-0.4.3.tgz",
      "integrity": "sha512-bV0Tgo9K4hfPCek+aMAn81RppFKv2ySDQeMoSZuvTASywNTnVJCArCZE2FWqpvIatKu7VMRLWlR1EazvVhDyhQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@isaacs/cliui": {
      "version": "8.0.2",
      "resolved": "https://registry.npmjs.org/@isaacs/cliui/-/cliui-8.0.2.tgz",
      "integrity": "sha512-O8jcjabXaleOG9DQ0+ARXWZBTfnP4WNAqzuiJK7ll44AmxGKv/J2M4TPjxjY3znBCfvBXFzucm1twdyFybFqEA==",
      "license": "ISC",
      "dependencies": {
        "string-width": "^5.1.2",
        "string-width-cjs": "npm:string-width@^4.2.0",
        "strip-ansi": "^7.0.1",
        "strip-ansi-cjs": "npm:strip-ansi@^6.0.1",
        "wrap-ansi": "^8.1.0",
        "wrap-ansi-cjs": "npm:wrap-ansi@^7.0.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.5.tgz",
      "integrity": "sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og==",
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@nodelib/fs.scandir": {
      "version": "2.1.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",
      "integrity": "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==",
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "2.0.5",
        "run-parallel": "^1.1.9"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.stat": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz",
      "integrity": "sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A==",
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.walk": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz",
      "integrity": "sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg==",
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.scandir": "2.1.5",
        "fastq": "^1.6.0"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@pkgjs/parseargs": {
      "version": "0.11.0",
      "resolved": "https://registry.npmjs.org/@pkgjs/parseargs/-/parseargs-0.11.0.tgz",
      "integrity": "sha512-+1VkjdD0QBLPodGrJUeqarH8VAIvQODIbwh9XpP5Syisf7YoQgsJKPNFoqqLQlu+VQ/tVSshMR6loPMn8U+dPg==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=14"
      }
    },
    "node_modules/@radix-ui/react-compose-refs": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-compose-refs/-/react-compose-refs-1.1.2.tgz",
      "integrity": "sha512-z4eqJvfiNnFMHIIvXP3CY57y2WJs5g2v3X0zm9mEJkrkNv4rDxu+sg9Jh8EkXyeqBkB7SOcboo9dMVqhyrACIg==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-label": {
      "version": "2.1.7",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-label/-/react-label-2.1.7.tgz",
      "integrity": "sha512-YT1GqPSL8kJn20djelMX7/cTRp/Y9w5IZHvfxQTVHrOqa2yMl7i/UfMqKRU5V7mEyKTrUVgJXhNQPVCG8PBLoQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-primitive": "2.1.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-primitive": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-primitive/-/react-primitive-2.1.3.tgz",
      "integrity": "sha512-m9gTwRkhy2lvCPe6QJp4d3G1TYEUHn/FzJUtq9MjH46an1wJU+GdoGC5VLof8RX8Ft/DlpshApkhswDLZzHIcQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-slot": "1.2.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-slot": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-slot/-/react-slot-1.2.3.tgz",
      "integrity": "sha512-aeNmHnBxbi2St0au6VBVC7JXFlhLlOnvIIlePNniyUNAClzmtAUEY8/pBiK3iHjufOlwA+c20/8jngo7xcrg8A==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@rolldown/pluginutils": {
      "version": "1.0.0-beta.38",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.0-beta.38.tgz",
      "integrity": "sha512-N/ICGKleNhA5nc9XXQG/kkKHJ7S55u0x0XUJbbkmdCnFuoRkM1Il12q9q0eX19+M7KKUEPw/daUPIRnxhcxAIw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@rollup/rollup-android-arm-eabi": {
      "version": "4.52.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.52.4.tgz",
      "integrity": "sha512-BTm2qKNnWIQ5auf4deoetINJm2JzvihvGb9R6K/ETwKLql/Bb3Eg2H1FBp1gUb4YGbydMA3jcmQTR73q7J+GAA==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-android-arm64": {
      "version": "4.52.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm64/-/rollup-android-arm64-4.52.4.tgz",
      "integrity": "sha512-P9LDQiC5vpgGFgz7GSM6dKPCiqR3XYN1WwJKA4/BUVDjHpYsf3iBEmVz62uyq20NGYbiGPR5cNHI7T1HqxNs2w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-darwin-arm64": {
      "version": "4.52.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-arm64/-/rollup-darwin-arm64-4.52.4.tgz",
      "integrity": "sha512-QRWSW+bVccAvZF6cbNZBJwAehmvG9NwfWHwMy4GbWi/BQIA/laTIktebT2ipVjNncqE6GLPxOok5hsECgAxGZg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-darwin-x64": {
      "version": "4.52.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-x64/-/rollup-darwin-x64-4.52.4.tgz",
      "integrity": "sha512-hZgP05pResAkRJxL1b+7yxCnXPGsXU0fG9Yfd6dUaoGk+FhdPKCJ5L1Sumyxn8kvw8Qi5PvQ8ulenUbRjzeCTw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-arm64": {
      "version": "4.52.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-arm64/-/rollup-freebsd-arm64-4.52.4.tgz",
      "integrity": "sha512-xmc30VshuBNUd58Xk4TKAEcRZHaXlV+tCxIXELiE9sQuK3kG8ZFgSPi57UBJt8/ogfhAF5Oz4ZSUBN77weM+mQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-x64": {
      "version": "4.52.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-x64/-/rollup-freebsd-x64-4.52.4.tgz",
      "integrity": "sha512-WdSLpZFjOEqNZGmHflxyifolwAiZmDQzuOzIq9L27ButpCVpD7KzTRtEG1I0wMPFyiyUdOO+4t8GvrnBLQSwpw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-gnueabihf": {
      "version": "4.52.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-gnueabihf/-/rollup-linux-arm-gnueabihf-4.52.4.tgz",
      "integrity": "sha512-xRiOu9Of1FZ4SxVbB0iEDXc4ddIcjCv2aj03dmW8UrZIW7aIQ9jVJdLBIhxBI+MaTnGAKyvMwPwQnoOEvP7FgQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-musleabihf": {
      "version": "4.52.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-musleabihf/-/rollup-linux-arm-musleabihf-4.52.4.tgz",
      "integrity": "sha512-FbhM2p9TJAmEIEhIgzR4soUcsW49e9veAQCziwbR+XWB2zqJ12b4i/+hel9yLiD8pLncDH4fKIPIbt5238341Q==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-gnu": {
      "version": "4.52.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.52.4.tgz",
      "integrity": "sha512-4n4gVwhPHR9q/g8lKCyz0yuaD0MvDf7dV4f9tHt0C73Mp8h38UCtSCSE6R9iBlTbXlmA8CjpsZoujhszefqueg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-musl": {
      "version": "4.52.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.52.4.tgz",
      "integrity": "sha512-u0n17nGA0nvi/11gcZKsjkLj1QIpAuPFQbR48Subo7SmZJnGxDpspyw2kbpuoQnyK+9pwf3pAoEXerJs/8Mi9g==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-gnu": {
      "version": "4.52.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-gnu/-/rollup-linux-loong64-gnu-4.52.4.tgz",
      "integrity": "sha512-0G2c2lpYtbTuXo8KEJkDkClE/+/2AFPdPAbmaHoE870foRFs4pBrDehilMcrSScrN/fB/1HTaWO4bqw+ewBzMQ==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-gnu": {
      "version": "4.52.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-gnu/-/rollup-linux-ppc64-gnu-4.52.4.tgz",
      "integrity": "sha512-teSACug1GyZHmPDv14VNbvZFX779UqWTsd7KtTM9JIZRDI5NUwYSIS30kzI8m06gOPB//jtpqlhmraQ68b5X2g==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-gnu": {
      "version": "4.52.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-gnu/-/rollup-linux-riscv64-gnu-4.52.4.tgz",
      "integrity": "sha512-/MOEW3aHjjs1p4Pw1Xk4+3egRevx8Ji9N6HUIA1Ifh8Q+cg9dremvFCUbOX2Zebz80BwJIgCBUemjqhU5XI5Eg==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-musl": {
      "version": "4.52.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-musl/-/rollup-linux-riscv64-musl-4.52.4.tgz",
      "integrity": "sha512-1HHmsRyh845QDpEWzOFtMCph5Ts+9+yllCrREuBR/vg2RogAQGGBRC8lDPrPOMnrdOJ+mt1WLMOC2Kao/UwcvA==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-s390x-gnu": {
      "version": "4.52.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-s390x-gnu/-/rollup-linux-s390x-gnu-4.52.4.tgz",
      "integrity": "sha512-seoeZp4L/6D1MUyjWkOMRU6/iLmCU2EjbMTyAG4oIOs1/I82Y5lTeaxW0KBfkUdHAWN7j25bpkt0rjnOgAcQcA==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-gnu": {
      "version": "4.52.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.52.4.tgz",
      "integrity": "sha512-Wi6AXf0k0L7E2gteNsNHUs7UMwCIhsCTs6+tqQ5GPwVRWMaflqGec4Sd8n6+FNFDw9vGcReqk2KzBDhCa1DLYg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-musl": {
      "version": "4.52.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.52.4.tgz",
      "integrity": "sha512-dtBZYjDmCQ9hW+WgEkaffvRRCKm767wWhxsFW3Lw86VXz/uJRuD438/XvbZT//B96Vs8oTA8Q4A0AfHbrxP9zw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-openharmony-arm64": {
      "version": "4.52.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openharmony-arm64/-/rollup-openharmony-arm64-4.52.4.tgz",
      "integrity": "sha512-1ox+GqgRWqaB1RnyZXL8PD6E5f7YyRUJYnCqKpNzxzP0TkaUh112NDrR9Tt+C8rJ4x5G9Mk8PQR3o7Ku2RKqKA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ]
    },
    "node_modules/@rollup/rollup-win32-arm64-msvc": {
      "version": "4.52.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-arm64-msvc/-/rollup-win32-arm64-msvc-4.52.4.tgz",
      "integrity": "sha512-8GKr640PdFNXwzIE0IrkMWUNUomILLkfeHjXBi/nUvFlpZP+FA8BKGKpacjW6OUUHaNI6sUURxR2U2g78FOHWQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-ia32-msvc": {
      "version": "4.52.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-ia32-msvc/-/rollup-win32-ia32-msvc-4.52.4.tgz",
      "integrity": "sha512-AIy/jdJ7WtJ/F6EcfOb2GjR9UweO0n43jNObQMb6oGxkYTfLcnN7vYYpG+CN3lLxrQkzWnMOoNSHTW54pgbVxw==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-gnu": {
      "version": "4.52.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-gnu/-/rollup-win32-x64-gnu-4.52.4.tgz",
      "integrity": "sha512-UF9KfsH9yEam0UjTwAgdK0anlQ7c8/pWPU2yVjyWcF1I1thABt6WXE47cI71pGiZ8wGvxohBoLnxM04L/wj8mQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-msvc": {
      "version": "4.52.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.52.4.tgz",
      "integrity": "sha512-bf9PtUa0u8IXDVxzRToFQKsNCRz9qLYfR/MpECxl4mRoWYjAeFjgxj1XdZr2M/GNVpT05p+LgQOHopYDlUu6/w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@standard-schema/utils": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/@standard-schema/utils/-/utils-0.3.0.tgz",
      "integrity": "sha512-e7Mew686owMaPJVNNLs55PUvgz371nKgwsc4vxE49zsODpJEnxgxRo2y/OKrqueavXgZNMDVj3DdHFlaSAeU8g==",
      "license": "MIT"
    },
    "node_modules/@types/babel__core": {
      "version": "7.20.5",
      "resolved": "https://registry.npmjs.org/@types/babel__core/-/babel__core-7.20.5.tgz",
      "integrity": "sha512-qoQprZvz5wQFJwMDqeseRXWv3rqMvhgpbXFfVyWhbx9X47POIA6i/+dXefEmZKoAgOaTdaIgNSMqMIU61yRyzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.20.7",
        "@babel/types": "^7.20.7",
        "@types/babel__generator": "*",
        "@types/babel__template": "*",
        "@types/babel__traverse": "*"
      }
    },
    "node_modules/@types/babel__generator": {
      "version": "7.27.0",
      "resolved": "https://registry.npmjs.org/@types/babel__generator/-/babel__generator-7.27.0.tgz",
      "integrity": "sha512-ufFd2Xi92OAVPYsy+P4n7/U7e68fex0+Ee8gSG9KX7eo084CWiQ4sdxktvdl0bOPupXtVJPY19zk6EwWqUQ8lg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__template": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@types/babel__template/-/babel__template-7.4.4.tgz",
      "integrity": "sha512-h/NUaSyG5EyxBIp8YRxo4RMe2/qQgvyowRwVMzhYhBCONbW8PUsg4lkFMrhgZhUe5z3L3MiLDuvyJ/CaPa2A8A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__traverse": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@types/babel__traverse/-/babel__traverse-7.28.0.tgz",
      "integrity": "sha512-8PvcXf70gTDZBgt9ptxJ8elBeBjcLOAcOtoO/mPJjtji1+CdGbHgm77om1GrsPxsiE+uXIpNSK64UYaIwQXd4Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.28.2"
      }
    },
    "node_modules/@types/estree": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.8.tgz",
      "integrity": "sha512-dWHzHa2WqEXI/O1E9OjrocMTKJl2mSrEolh1Iomrv6U+JuNwaHXsXx9bLu5gG7BUWFIN0skIQJQ/L1rIex4X6w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/json-schema": {
      "version": "7.0.15",
      "resolved": "https://registry.npmjs.org/@types/json-schema/-/json-schema-7.0.15.tgz",
      "integrity": "sha512-5+fP8P8MFNC+AyZCDxrB2pkZFPGzqQWUzpSeuuVLvm8VMcorNYavBqoFcxK8bQz4Qsbn4oUEEem4wDLfcysGHA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/react": {
      "version": "19.2.0",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-19.2.0.tgz",
      "integrity": "sha512-1LOH8xovvsKsCBq1wnT4ntDUdCJKmnEakhsuoUSy6ExlHCkGP2hqnatagYTgFk6oeL0VU31u7SNjunPN+GchtA==",
      "devOptional": true,
      "license": "MIT",
      "dependencies": {
        "csstype": "^3.0.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "19.2.0",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-19.2.0.tgz",
      "integrity": "sha512-brtBs0MnE9SMx7px208g39lRmC5uHZs96caOJfTjFcYSLHNamvaSMfJNagChVNkup2SdtOxKX1FDBkRSJe1ZAg==",
      "devOptional": true,
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "^19.2.0"
      }
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "5.0.4",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-5.0.4.tgz",
      "integrity": "sha512-La0KD0vGkVkSk6K+piWDKRUyg8Rl5iAIKRMH0vMJI0Eg47bq1eOxmoObAaQG37WMW9MSyk7Cs8EIWwJC1PtzKA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.28.4",
        "@babel/plugin-transform-react-jsx-self": "^7.27.1",
        "@babel/plugin-transform-react-jsx-source": "^7.27.1",
        "@rolldown/pluginutils": "1.0.0-beta.38",
        "@types/babel__core": "^7.20.5",
        "react-refresh": "^0.17.0"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "peerDependencies": {
        "vite": "^4.2.0 || ^5.0.0 || ^6.0.0 || ^7.0.0"
      }
    },
    "node_modules/acorn": {
      "version": "8.15.0",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.15.0.tgz",
      "integrity": "sha512-NZyJarBfL7nWwIq+FDL6Zp/yHEhePMNnnJ0y3qfieCrmNvYct8uvtiV41UvlSe6apAfk0fY1FbWx+NwfmpvtTg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "acorn": "bin/acorn"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/acorn-jsx": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-5.3.2.tgz",
      "integrity": "sha512-rq9s+JNhf0IChjtDXxllJ7g41oZk5SlXtp0LHwyA5cejwn7vKmKp4pPri6YEePv2PU65sAsegbXtIinmDFDXgQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "acorn": "^6.0.0 || ^7.0.0 || ^8.0.0"
      }
    },
    "node_modules/ajv": {
      "version": "6.12.6",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.12.6.tgz",
      "integrity": "sha512-j3fVLgvTo527anyYyJOGTYJbG+vnnQYvE0m5mmkc1TK+nxAppkCLMIL0aZ4dblVCNoGShhm+kzE4ZUykBoMg4g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-deep-equal": "^3.1.1",
        "fast-json-stable-stringify": "^2.0.0",
        "json-schema-traverse": "^0.4.1",
        "uri-js": "^4.2.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/epoberezkin"
      }
    },
    "node_modules/ansi-regex": {
      "version": "6.2.2",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-6.2.2.tgz",
      "integrity": "sha512-Bq3SmSpyFHaWjPk8If9yc6svM8c56dB5BAtW4Qbw5jHTwwXXcTLoRMkpDJp6VL0XzlWaCHTXrkFURMYmD0sLqg==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-regex?sponsor=1"
      }
    },
    "node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "license": "MIT",
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/any-promise": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/any-promise/-/any-promise-1.3.0.tgz",
      "integrity": "sha512-7UvmKalWRt1wgjL1RrGxoSJW/0QZFIegpeGvZG9kjp8vrRu55XTHbwnqq2GpXm9uLbcuhxm3IqX9OB4MZR1b2A==",
      "license": "MIT"
    },
    "node_modules/anymatch": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz",
      "integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
      "license": "ISC",
      "dependencies": {
        "normalize-path": "^3.0.0",
        "picomatch": "^2.0.4"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/anymatch/node_modules/picomatch": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.1.tgz",
      "integrity": "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA==",
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/arg": {
      "version": "5.0.2",
      "resolved": "https://registry.npmjs.org/arg/-/arg-5.0.2.tgz",
      "integrity": "sha512-PYjyFOLKQ9y57JvQ6QLo8dAgNqswh8M1RMJYdQduT6xbWSgK36P/Z/v+p888pM69jMMfS8Xd8F6I1kQ/I9HUGg==",
      "license": "MIT"
    },
    "node_modules/argparse": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/argparse/-/argparse-2.0.1.tgz",
      "integrity": "sha512-8+9WqebbFzpX9OR+Wa6O29asIogeRMzcGtAINdpMHHyAg10f05aSFVBbcEqGf/PXw1EjAZ+q2/bEBg3DvurK3Q==",
      "dev": true,
      "license": "Python-2.0"
    },
    "node_modules/asynckit": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/asynckit/-/asynckit-0.4.0.tgz",
      "integrity": "sha512-Oei9OH4tRh0YqU3GxhX79dM/mwVgvbZJaSNaRk+bshkj0S5cfHcgYakreBjrHwatXKbz+IoIdYLxrKim2MjW0Q==",
      "license": "MIT"
    },
    "node_modules/autoprefixer": {
      "version": "10.4.21",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.4.21.tgz",
      "integrity": "sha512-O+A6LWV5LDHSJD3LjHYoNi4VLsj/Whi7k6zG12xTYaU4cQ8oxQGckXNX8cRHK5yOZ/ppVHe0ZBXGzSV9jXdVbQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/autoprefixer"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "browserslist": "^4.24.4",
        "caniuse-lite": "^1.0.30001702",
        "fraction.js": "^4.3.7",
        "normalize-range": "^0.1.2",
        "picocolors": "^1.1.1",
        "postcss-value-parser": "^4.2.0"
      },
      "bin": {
        "autoprefixer": "bin/autoprefixer"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      },
      "peerDependencies": {
        "postcss": "^8.1.0"
      }
    },
    "node_modules/axios": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/axios/-/axios-1.12.2.tgz",
      "integrity": "sha512-vMJzPewAlRyOgxV2dU0Cuz2O8zzzx9VYtbJOaBgXFeLc4IV/Eg50n4LowmehOOR61S8ZMpc2K5Sa7g6A4jfkUw==",
      "license": "MIT",
      "dependencies": {
        "follow-redirects": "^1.15.6",
        "form-data": "^4.0.4",
        "proxy-from-env": "^1.1.0"
      }
    },
    "node_modules/balanced-match": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
      "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
      "license": "MIT"
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.8.12",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.8.12.tgz",
      "integrity": "sha512-vAPMQdnyKCBtkmQA6FMCBvU9qFIppS3nzyXnEM+Lo2IAhG4Mpjv9cCxMudhgV3YdNNJv6TNqXy97dfRVL2LmaQ==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.js"
      }
    },
    "node_modules/binary-extensions": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.3.0.tgz",
      "integrity": "sha512-Ceh+7ox5qe7LJuLHoY0feh3pHuUDHAcRUeyL2VYghZwfpkNIy/+8Ocg0a3UuSoYzavmylwuLWQOf3hl0jjMMIw==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/brace-expansion": {
      "version": "1.1.12",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.12.tgz",
      "integrity": "sha512-9T9UjW3r0UW5c1Q7GTwllptXwhvYmEzFhzMfZ9H7FQWt+uZePjZPjBP/W1ZEyZ1twGWom5/56TF4lPcqjnDHcg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
      "license": "MIT",
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/browserslist": {
      "version": "4.26.3",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.26.3.tgz",
      "integrity": "sha512-lAUU+02RFBuCKQPj/P6NgjlbCnLBMp4UtgTx7vNHd3XSIJF87s9a5rA3aH2yw3GS9DqZAUbOtZdCCiZeVRqt0w==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "baseline-browser-mapping": "^2.8.9",
        "caniuse-lite": "^1.0.30001746",
        "electron-to-chromium": "^1.5.227",
        "node-releases": "^2.0.21",
        "update-browserslist-db": "^1.1.3"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/call-bind-apply-helpers": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",
      "integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/callsites": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
      "integrity": "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/camelcase-css": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/camelcase-css/-/camelcase-css-2.0.1.tgz",
      "integrity": "sha512-QOSvevhslijgYwRx6Rv7zKdMF8lbRmx+uQGx2+vDc+KI/eBnsy9kit5aj23AgGu3pa4t9AgwbnXWqS+iOY+2aA==",
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001747",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001747.tgz",
      "integrity": "sha512-mzFa2DGIhuc5490Nd/G31xN1pnBnYMadtkyTjefPI7wzypqgCEpeWu9bJr0OnDsyKrW75zA9ZAt7pbQFmwLsQg==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/chalk": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
      "integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.1.0",
        "supports-color": "^7.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/chokidar": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
      "integrity": "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw==",
      "license": "MIT",
      "dependencies": {
        "anymatch": "~3.1.2",
        "braces": "~3.0.2",
        "glob-parent": "~5.1.2",
        "is-binary-path": "~2.1.0",
        "is-glob": "~4.0.1",
        "normalize-path": "~3.0.0",
        "readdirp": "~3.6.0"
      },
      "engines": {
        "node": ">= 8.10.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/chokidar/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/class-variance-authority": {
      "version": "0.7.1",
      "resolved": "https://registry.npmjs.org/class-variance-authority/-/class-variance-authority-0.7.1.tgz",
      "integrity": "sha512-Ka+9Trutv7G8M6WT6SeiRWz792K5qEqIGEGzXKhAE6xOWAY6pPH8U+9IY3oCMv6kqTmLsv7Xh/2w2RigkePMsg==",
      "license": "Apache-2.0",
      "dependencies": {
        "clsx": "^2.1.1"
      },
      "funding": {
        "url": "https://polar.sh/cva"
      }
    },
    "node_modules/clsx": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz",
      "integrity": "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "license": "MIT",
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
      "license": "MIT"
    },
    "node_modules/combined-stream": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/combined-stream/-/combined-stream-1.0.8.tgz",
      "integrity": "sha512-FQN4MRfuJeHf7cBbBMJFXhKSDq+2kAArBlmRBvcvFE5BB1HZKXtSFASDhdlz9zOYwxh8lDdnvmMOe/+5cdoEdg==",
      "license": "MIT",
      "dependencies": {
        "delayed-stream": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/commander": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/commander/-/commander-4.1.1.tgz",
      "integrity": "sha512-NOKm8xhkzAjzFx8B2v5OAHT+u5pRQc2UCa2Vq9jYL/31o2wi9mxBA7LIFs3sV5VSC49z6pEhfbMULvShKj26WA==",
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/concat-map": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
      "integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/cookie": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-1.0.2.tgz",
      "integrity": "sha512-9Kr/j4O16ISv8zBBhJoi4bXOYNTkFLOqSL3UDB0njXxCXNezjeyVrJyGOWtgfs/q2km1gwBcfH8q1yEGoMYunA==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/cross-spawn": {
      "version": "7.0.6",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.6.tgz",
      "integrity": "sha512-uV2QOWP2nWzsy2aMp8aRibhi9dlzF5Hgh5SHaB9OiTGEyDTiJJyx0uy51QXdyWbtAHNua4XJzUKca3OzKUd3vA==",
      "license": "MIT",
      "dependencies": {
        "path-key": "^3.1.0",
        "shebang-command": "^2.0.0",
        "which": "^2.0.1"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/cssesc": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",
      "integrity": "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg==",
      "license": "MIT",
      "bin": {
        "cssesc": "bin/cssesc"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/csstype": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.1.3.tgz",
      "integrity": "sha512-M1uQkMl8rQK/szD0LNhtqxIPLpimGm8sOBwU7lLnCpSbTyY3yeU1Vc7l4KT5zT4s/yOxHH5O7tIuuLOCnLADRw==",
      "devOptional": true,
      "license": "MIT"
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/deep-is": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.4.tgz",
      "integrity": "sha512-oIPzksmTg4/MriiaYGO+okXDT7ztn/w3Eptv/+gSIdMdKsJo0u4CfYNFJPy+4SKMuCqGw2wxnA+URMg3t8a/bQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/delayed-stream": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/delayed-stream/-/delayed-stream-1.0.0.tgz",
      "integrity": "sha512-ZySD7Nf91aLB0RxL4KGrKHBXl7Eds1DAmEdcoVawXnLD7SDhpNgtuII2aAkg7a7QS41jxPSZ17p4VdGnMHk3MQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "dev": true,
      "license": "Apache-2.0",
      "optional": true,
      "peer": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/didyoumean": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/didyoumean/-/didyoumean-1.2.2.tgz",
      "integrity": "sha512-gxtyfqMg7GKyhQmb056K7M3xszy/myH8w+B4RT+QXBQsvAOdc3XymqDDPHx1BgPgsdAA5SIifona89YtRATDzw==",
      "license": "Apache-2.0"
    },
    "node_modules/dlv": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/dlv/-/dlv-1.1.3.tgz",
      "integrity": "sha512-+HlytyjlPKnIG8XuRG8WvmBP8xs8P71y+SKKS6ZXWoEgLuePxtDoUEiH7WkdePWrQ5JBpE6aoVqfZfJUQkjXwA==",
      "license": "MIT"
    },
    "node_modules/dunder-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",
      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "es-errors": "^1.3.0",
        "gopd": "^1.2.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/eastasianwidth": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/eastasianwidth/-/eastasianwidth-0.2.0.tgz",
      "integrity": "sha512-I88TYZWc9XiYHRQ4/3c5rjjfgkjhLyW2luGIheGERbNQ6OY7yTybanSpDXZa8y7VUP9YmDcYa+eyq4ca7iLqWA==",
      "license": "MIT"
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.230",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.230.tgz",
      "integrity": "sha512-A6A6Fd3+gMdaed9wX83CvHYJb4UuapPD5X5SLq72VZJzxHSY0/LUweGXRWmQlh2ln7KV7iw7jnwXK7dlPoOnHQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/emoji-regex": {
      "version": "9.2.2",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-9.2.2.tgz",
      "integrity": "sha512-L18DaJsXSUk2+42pv8mLs5jJT2hqFkFE4j21wOmgbUqsZ2hL72NsUU785g9RXgo3s0ZNgVl42TiHp3ZtOv/Vyg==",
      "license": "MIT"
    },
    "node_modules/es-define-property": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/es-define-property/-/es-define-property-1.0.1.tgz",
      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-object-atoms": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.1.tgz",
      "integrity": "sha512-FGgH2h8zKNim9ljj7dankFPcICIK9Cp5bm+c2gQSYePhpaG5+esrLODihIorn+Pe6FGJzWhXQotPv73jTaldXA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-set-tostringtag": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/es-set-tostringtag/-/es-set-tostringtag-2.1.0.tgz",
      "integrity": "sha512-j6vWzfrGVfyXxge+O0x5sh6cvxAog0a/4Rdd2K36zCMV5eJ+/+tOAngRO8cODMNWbVRdVlmGZQL2YS3yR8bIUA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.6",
        "has-tostringtag": "^1.0.2",
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/esbuild": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.25.10.tgz",
      "integrity": "sha512-9RiGKvCwaqxO2owP61uQ4BgNborAQskMR6QusfWzQqv7AZOg5oGehdY2pRJMTKuwxd1IDBP4rSbI5lHzU7SMsQ==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=18"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.25.10",
        "@esbuild/android-arm": "0.25.10",
        "@esbuild/android-arm64": "0.25.10",
        "@esbuild/android-x64": "0.25.10",
        "@esbuild/darwin-arm64": "0.25.10",
        "@esbuild/darwin-x64": "0.25.10",
        "@esbuild/freebsd-arm64": "0.25.10",
        "@esbuild/freebsd-x64": "0.25.10",
        "@esbuild/linux-arm": "0.25.10",
        "@esbuild/linux-arm64": "0.25.10",
        "@esbuild/linux-ia32": "0.25.10",
        "@esbuild/linux-loong64": "0.25.10",
        "@esbuild/linux-mips64el": "0.25.10",
        "@esbuild/linux-ppc64": "0.25.10",
        "@esbuild/linux-riscv64": "0.25.10",
        "@esbuild/linux-s390x": "0.25.10",
        "@esbuild/linux-x64": "0.25.10",
        "@esbuild/netbsd-arm64": "0.25.10",
        "@esbuild/netbsd-x64": "0.25.10",
        "@esbuild/openbsd-arm64": "0.25.10",
        "@esbuild/openbsd-x64": "0.25.10",
        "@esbuild/openharmony-arm64": "0.25.10",
        "@esbuild/sunos-x64": "0.25.10",
        "@esbuild/win32-arm64": "0.25.10",
        "@esbuild/win32-ia32": "0.25.10",
        "@esbuild/win32-x64": "0.25.10"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/escape-string-regexp": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
      "integrity": "sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/eslint": {
      "version": "9.37.0",
      "resolved": "https://registry.npmjs.org/eslint/-/eslint-9.37.0.tgz",
      "integrity": "sha512-XyLmROnACWqSxiGYArdef1fItQd47weqB7iwtfr9JHwRrqIXZdcFMvvEcL9xHCmL0SNsOvF0c42lWyM1U5dgig==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.8.0",
        "@eslint-community/regexpp": "^4.12.1",
        "@eslint/config-array": "^0.21.0",
        "@eslint/config-helpers": "^0.4.0",
        "@eslint/core": "^0.16.0",
        "@eslint/eslintrc": "^3.3.1",
        "@eslint/js": "9.37.0",
        "@eslint/plugin-kit": "^0.4.0",
        "@humanfs/node": "^0.16.6",
        "@humanwhocodes/module-importer": "^1.0.1",
        "@humanwhocodes/retry": "^0.4.2",
        "@types/estree": "^1.0.6",
        "@types/json-schema": "^7.0.15",
        "ajv": "^6.12.4",
        "chalk": "^4.0.0",
        "cross-spawn": "^7.0.6",
        "debug": "^4.3.2",
        "escape-string-regexp": "^4.0.0",
        "eslint-scope": "^8.4.0",
        "eslint-visitor-keys": "^4.2.1",
        "espree": "^10.4.0",
        "esquery": "^1.5.0",
        "esutils": "^2.0.2",
        "fast-deep-equal": "^3.1.3",
        "file-entry-cache": "^8.0.0",
        "find-up": "^5.0.0",
        "glob-parent": "^6.0.2",
        "ignore": "^5.2.0",
        "imurmurhash": "^0.1.4",
        "is-glob": "^4.0.0",
        "json-stable-stringify-without-jsonify": "^1.0.1",
        "lodash.merge": "^4.6.2",
        "minimatch": "^3.1.2",
        "natural-compare": "^1.4.0",
        "optionator": "^0.9.3"
      },
      "bin": {
        "eslint": "bin/eslint.js"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      },
      "peerDependencies": {
        "jiti": "*"
      },
      "peerDependenciesMeta": {
        "jiti": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-plugin-react-hooks": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-hooks/-/eslint-plugin-react-hooks-5.2.0.tgz",
      "integrity": "sha512-+f15FfK64YQwZdJNELETdn5ibXEUQmW1DZL6KXhNnc2heoy/sg9VJJeT7n8TlMWouzWqSWavFkIhHyIbIAEapg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "eslint": "^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0-0 || ^9.0.0"
      }
    },
    "node_modules/eslint-plugin-react-refresh": {
      "version": "0.4.23",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-refresh/-/eslint-plugin-react-refresh-0.4.23.tgz",
      "integrity": "sha512-G4j+rv0NmbIR45kni5xJOrYvCtyD3/7LjpVH8MPPcudXDcNu8gv+4ATTDXTtbRR8rTCM5HxECvCSsRmxKnWDsA==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "eslint": ">=8.40"
      }
    },
    "node_modules/eslint-scope": {
      "version": "8.4.0",
      "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-8.4.0.tgz",
      "integrity": "sha512-sNXOfKCn74rt8RICKMvJS7XKV/Xk9kA7DyJr8mJik3S7Cwgy3qlkkmyS2uQB3jiJg6VNdZd/pDBJu0nvG2NlTg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "esrecurse": "^4.3.0",
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/eslint-visitor-keys": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-4.2.1.tgz",
      "integrity": "sha512-Uhdk5sfqcee/9H/rCOJikYz67o0a2Tw2hGRPOG2Y1R2dg7brRe1uG0yaNQDHu+TO/uQPF/5eCapvYSmHUjt7JQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/espree": {
      "version": "10.4.0",
      "resolved": "https://registry.npmjs.org/espree/-/espree-10.4.0.tgz",
      "integrity": "sha512-j6PAQ2uUr79PZhBjP5C5fhl8e39FmRnOjsD5lGnWrFU8i2G776tBK7+nP8KuQUTTyAZUwfQqXAgrVH5MbH9CYQ==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "acorn": "^8.15.0",
        "acorn-jsx": "^5.3.2",
        "eslint-visitor-keys": "^4.2.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/esquery": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/esquery/-/esquery-1.6.0.tgz",
      "integrity": "sha512-ca9pw9fomFcKPvFLXhBKUK90ZvGibiGOvRJNbjljY7s7uq/5YO4BOzcYtJqExdx99rF6aAcnRxHmcUHcz6sQsg==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "estraverse": "^5.1.0"
      },
      "engines": {
        "node": ">=0.10"
      }
    },
    "node_modules/esrecurse": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-4.3.0.tgz",
      "integrity": "sha512-KmfKL3b6G+RXvP8N1vr3Tq1kL/oCFgn2NYXEtqP8/L3pKapUA4G8cFVaoF3SU323CD4XypR/ffioHmkti6/Tag==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/estraverse": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-5.3.0.tgz",
      "integrity": "sha512-MMdARuVEQziNTeJD8DgMqmhwR11BRQ/cBP+pLtYdSTnf3MIO8fFeiINEbX36ZdNlfU/7A9f3gUw49B3oQsvwBA==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/esutils": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
      "integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/fast-deep-equal": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
      "integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-glob": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.3.tgz",
      "integrity": "sha512-7MptL8U0cqcFdzIzwOTHoilX9x5BrNqye7Z/LuC7kCMRio1EMSyqRK3BEAUD7sXRq4iT4AzTVuZdhgQ2TCvYLg==",
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.8"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/fast-glob/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/fast-json-stable-stringify": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
      "integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-levenshtein": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
      "integrity": "sha512-DCXu6Ifhqcks7TZKY3Hxp3y6qphY5SJZmrWMDrKcERSOXWQdMhU9Ig/PYrzyw/ul9jOIyh0N4M0tbC5hodg8dw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fastq": {
      "version": "1.19.1",
      "resolved": "https://registry.npmjs.org/fastq/-/fastq-1.19.1.tgz",
      "integrity": "sha512-GwLTyxkCXjXbxqIhTsMI2Nui8huMPtnxg7krajPJAjnEG/iiOS7i+zCtWGZR9G0NBKbXKh6X9m9UIsYX/N6vvQ==",
      "license": "ISC",
      "dependencies": {
        "reusify": "^1.0.4"
      }
    },
    "node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/file-entry-cache": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-8.0.0.tgz",
      "integrity": "sha512-XXTUwCvisa5oacNGRP9SfNtYBNAMi+RPwBFmblZEF7N7swHYQS6/Zfk7SRwx4D5j3CH211YNRco1DEMNVfZCnQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flat-cache": "^4.0.0"
      },
      "engines": {
        "node": ">=16.0.0"
      }
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
      "license": "MIT",
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/find-up": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-5.0.0.tgz",
      "integrity": "sha512-78/PXT1wlLLDgTzDs7sjq9hzz0vXD+zn+7wypEe4fXQxCmdmqfGsEPQxmiCSQI3ajFV91bVSsvNtrJRiW6nGng==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "locate-path": "^6.0.0",
        "path-exists": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/flat-cache": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-4.0.1.tgz",
      "integrity": "sha512-f7ccFPK3SXFHpx15UIGyRJ/FJQctuKZ0zVuN3frBo4HnK3cay9VEW0R6yPYFHC0AgqhukPzKjq22t5DmAyqGyw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flatted": "^3.2.9",
        "keyv": "^4.5.4"
      },
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/flatted": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/flatted/-/flatted-3.3.3.tgz",
      "integrity": "sha512-GX+ysw4PBCz0PzosHDepZGANEuFCMLrnRTiEy9McGjmkCQYwRq4A/X786G/fjM/+OjsWSU1ZrY5qyARZmO/uwg==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/follow-redirects": {
      "version": "1.15.11",
      "resolved": "https://registry.npmjs.org/follow-redirects/-/follow-redirects-1.15.11.tgz",
      "integrity": "sha512-deG2P0JfjrTxl50XGCDyfI97ZGVCxIpfKYmfyrQ54n5FO/0gfIES8C/Psl6kWVDolizcaaxZJnTS0QSMxvnsBQ==",
      "funding": [
        {
          "type": "individual",
          "url": "https://github.com/sponsors/RubenVerborgh"
        }
      ],
      "license": "MIT",
      "engines": {
        "node": ">=4.0"
      },
      "peerDependenciesMeta": {
        "debug": {
          "optional": true
        }
      }
    },
    "node_modules/foreground-child": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/foreground-child/-/foreground-child-3.3.1.tgz",
      "integrity": "sha512-gIXjKqtFuWEgzFRJA9WCQeSJLZDjgJUOMCMzxtvFq/37KojM1BFGufqsCy0r4qSQmYLsZYMeyRqzIWOMup03sw==",
      "license": "ISC",
      "dependencies": {
        "cross-spawn": "^7.0.6",
        "signal-exit": "^4.0.1"
      },
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/form-data": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/form-data/-/form-data-4.0.4.tgz",
      "integrity": "sha512-KrGhL9Q4zjj0kiUt5OO4Mr/A/jlI2jDYs5eHBpYHPcBEVSiipAvn2Ko2HnPe20rmcuuvMHNdZFp+4IlGTMF0Ow==",
      "license": "MIT",
      "dependencies": {
        "asynckit": "^0.4.0",
        "combined-stream": "^1.0.8",
        "es-set-tostringtag": "^2.1.0",
        "hasown": "^2.0.2",
        "mime-types": "^2.1.12"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/fraction.js": {
      "version": "4.3.7",
      "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-4.3.7.tgz",
      "integrity": "sha512-ZsDfxO51wGAXREY55a7la9LScWpwv9RxIrYABrlvOFBlH/ShPnrtsXeuUIfXKKOVicNxQ+o8JTbJvjS4M89yew==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "*"
      },
      "funding": {
        "type": "patreon",
        "url": "https://github.com/sponsors/rawify"
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/get-intrinsic": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
      "integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "function-bind": "^1.1.2",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-proto/-/get-proto-1.0.1.tgz",
      "integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/glob": {
      "version": "10.4.5",
      "resolved": "https://registry.npmjs.org/glob/-/glob-10.4.5.tgz",
      "integrity": "sha512-7Bv8RF0k6xjo7d4A/PxYLbUCfb6c+Vpd2/mB2yRDlew7Jb5hEXiCD9ibfO7wpk8i4sevK6DFny9h7EYbM3/sHg==",
      "license": "ISC",
      "dependencies": {
        "foreground-child": "^3.1.0",
        "jackspeak": "^3.1.2",
        "minimatch": "^9.0.4",
        "minipass": "^7.1.2",
        "package-json-from-dist": "^1.0.0",
        "path-scurry": "^1.11.1"
      },
      "bin": {
        "glob": "dist/esm/bin.mjs"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/glob/node_modules/brace-expansion": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-2.0.2.tgz",
      "integrity": "sha512-Jt0vHyM+jmUBqojB7E1NIYadt0vI0Qxjxd2TErW94wDz+E2LAm5vKMXXwg6ZZBTHPuUlDgQHKXvjGBdfcF1ZDQ==",
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0"
      }
    },
    "node_modules/glob/node_modules/minimatch": {
      "version": "9.0.5",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-9.0.5.tgz",
      "integrity": "sha512-G6T0ZX48xgozx7587koeX9Ys2NYy6Gmv//P89sEte9V9whIapMNF4idKxnW2QtCcLiTWlb/wfCabAtAFWhhBow==",
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^2.0.1"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/globals": {
      "version": "16.4.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-16.4.0.tgz",
      "integrity": "sha512-ob/2LcVVaVGCYN+r14cnwnoDPUufjiYgSqRhiFD0Q1iI4Odora5RE8Iv1D24hAz5oMophRGkGz+yuvQmmUMnMw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/gopd": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.2.0.tgz",
      "integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-flag": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
      "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/has-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.1.0.tgz",
      "integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-tostringtag": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/has-tostringtag/-/has-tostringtag-1.0.2.tgz",
      "integrity": "sha512-NqADB8VjPFLM2V0VvHUewwwsw0ZWBaIdgo+ieHtK3hasLz4qeCRjYcqfB6AQrBggRKppKF8L52/VqdVsO47Dlw==",
      "license": "MIT",
      "dependencies": {
        "has-symbols": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.2.tgz",
      "integrity": "sha512-0hJU9SCPvmMzIBdZFqNPXWa6dqh7WdH0cII9y+CyS8rG3nL48Bclra9HmKhVVUHyPWNH5Y7xDwAB7bfgSjkUMQ==",
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/ignore": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-5.3.2.tgz",
      "integrity": "sha512-hsBTNUqQTDwkWtcdYI2i06Y/nUBEsNEDJKjWdigLvegy8kDuJAS8uRlpkkcQpyEXL0Z/pjDy5HBmMjRCJ2gq+g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/import-fresh": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-3.3.1.tgz",
      "integrity": "sha512-TR3KfrTZTYLPB6jUjfx6MF9WcWrHL9su5TObK4ZkYgBdWKPOFoSoQIdEuTuR82pmtxH2spWG9h6etwfr1pLBqQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "parent-module": "^1.0.0",
        "resolve-from": "^4.0.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/imurmurhash": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
      "integrity": "sha512-JmXMZ6wuvDmLiHEml9ykzqO6lwFbof0GG4IkcGaENdCRDDmMVnny7s5HsIgHCbaq0w2MyPhDqkhTUgS2LU2PHA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.8.19"
      }
    },
    "node_modules/is-binary-path": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
      "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
      "license": "MIT",
      "dependencies": {
        "binary-extensions": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-core-module": {
      "version": "2.16.1",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.16.1.tgz",
      "integrity": "sha512-UfoeMA6fIJ8wTYFEUjelnaGI67v6+N7qXJEvQuIGa99l4xsCruSYOVSQ0uPANn4dAzm8lkYPaKLrrijLq7x23w==",
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-fullwidth-code-point": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
      "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
      "license": "MIT",
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw==",
      "license": "ISC"
    },
    "node_modules/jackspeak": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/jackspeak/-/jackspeak-3.4.3.tgz",
      "integrity": "sha512-OGlZQpz2yfahA/Rd1Y8Cd9SIEsqvXkLVoSw/cgwhnhFMDbsQFeZYoJJ7bIZBS9BcamUW96asq/npPWugM+RQBw==",
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "@isaacs/cliui": "^8.0.2"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      },
      "optionalDependencies": {
        "@pkgjs/parseargs": "^0.11.0"
      }
    },
    "node_modules/jiti": {
      "version": "2.6.1",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-2.6.1.tgz",
      "integrity": "sha512-ekilCSN1jwRvIbgeg/57YFh8qQDNbwDb9xT/qu2DAHbFFZUicIl4ygVaAvzveMhMVr3LnpSKTNnwt8PoOfmKhQ==",
      "license": "MIT",
      "optional": true,
      "peer": true,
      "bin": {
        "jiti": "lib/jiti-cli.mjs"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/js-yaml": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-4.1.0.tgz",
      "integrity": "sha512-wpxZs9NoxZaJESJGIZTyDEaYpl0FKSA+FB9aJiyemKhMwkxQg63h4T1KJgUGHpTqPDNRcmmYLugrRjJlBtWvRA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "argparse": "^2.0.1"
      },
      "bin": {
        "js-yaml": "bin/js-yaml.js"
      }
    },
    "node_modules/jsesc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
      "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json-buffer": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/json-buffer/-/json-buffer-3.0.1.tgz",
      "integrity": "sha512-4bV5BfR2mqfQTJm+V5tPPdf+ZpuhiIvTuAB5g8kcrXOZpTT/QwwVRWBywX1ozr6lEuPdbHxwaJlm9G6mI2sfSQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-schema-traverse": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
      "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-stable-stringify-without-jsonify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/json-stable-stringify-without-jsonify/-/json-stable-stringify-without-jsonify-1.0.1.tgz",
      "integrity": "sha512-Bdboy+l7tA3OGW6FjyFHWkP5LuByj1Tk33Ljyq0axyzdk9//JSi2u3fP1QSmd1KNwq6VOKYGlAu87CisVir6Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/keyv": {
      "version": "4.5.4",
      "resolved": "https://registry.npmjs.org/keyv/-/keyv-4.5.4.tgz",
      "integrity": "sha512-oxVHkHR/EJf2CNXnWxRLW6mg7JyCCUcG0DtEGmL2ctUo1PNTin1PUil+r/+4r5MpVgC/fn1kjsx7mjSujKqIpw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "json-buffer": "3.0.1"
      }
    },
    "node_modules/levn": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/levn/-/levn-0.4.1.tgz",
      "integrity": "sha512-+bT2uH4E5LGE7h/n3evcS/sQlJXCpIp6ym8OWJ5eV6+67Dsql/LaaT7qJBAt2rzfoa/5QBGBhxDix1dMt2kQKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1",
        "type-check": "~0.4.0"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/lightningcss": {
      "version": "1.30.1",
      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.30.1.tgz",
      "integrity": "sha512-xi6IyHML+c9+Q3W0S4fCQJOym42pyurFiJUHEcEyHS0CeKzia4yZDEsLlqOFykxOdHpNy0NmvVO31vcSqAxJCg==",
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "peer": true,
      "dependencies": {
        "detect-libc": "^2.0.3"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "lightningcss-darwin-arm64": "1.30.1",
        "lightningcss-darwin-x64": "1.30.1",
        "lightningcss-freebsd-x64": "1.30.1",
        "lightningcss-linux-arm-gnueabihf": "1.30.1",
        "lightningcss-linux-arm64-gnu": "1.30.1",
        "lightningcss-linux-arm64-musl": "1.30.1",
        "lightningcss-linux-x64-gnu": "1.30.1",
        "lightningcss-linux-x64-musl": "1.30.1",
        "lightningcss-win32-arm64-msvc": "1.30.1",
        "lightningcss-win32-x64-msvc": "1.30.1"
      }
    },
    "node_modules/lightningcss-darwin-arm64": {
      "version": "1.30.1",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.30.1.tgz",
      "integrity": "sha512-c8JK7hyE65X1MHMN+Viq9n11RRC7hgin3HhYKhrMyaXflk5GVplZ60IxyoVtzILeKr+xAJwg6zK6sjTBJ0FKYQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "peer": true,
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-x64": {
      "version": "1.30.1",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.30.1.tgz",
      "integrity": "sha512-k1EvjakfumAQoTfcXUcHQZhSpLlkAuEkdMBsI/ivWw9hL+7FtilQc0Cy3hrx0AAQrVtQAbMI7YjCgYgvn37PzA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "peer": true,
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-freebsd-x64": {
      "version": "1.30.1",
      "resolved": "https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.30.1.tgz",
      "integrity": "sha512-kmW6UGCGg2PcyUE59K5r0kWfKPAVy4SltVeut+umLCFoJ53RdCUWxcRDzO1eTaxf/7Q2H7LTquFHPL5R+Gjyig==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "peer": true,
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm-gnueabihf": {
      "version": "1.30.1",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.30.1.tgz",
      "integrity": "sha512-MjxUShl1v8pit+6D/zSPq9S9dQ2NPFSQwGvxBCYaBYLPlCWuPh9/t1MRS8iUaR8i+a6w7aps+B4N0S1TYP/R+Q==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "peer": true,
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-gnu": {
      "version": "1.30.1",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.30.1.tgz",
      "integrity": "sha512-gB72maP8rmrKsnKYy8XUuXi/4OctJiuQjcuqWNlJQ6jZiWqtPvqFziskH3hnajfvKB27ynbVCucKSm2rkQp4Bw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "peer": true,
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-musl": {
      "version": "1.30.1",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.30.1.tgz",
      "integrity": "sha512-jmUQVx4331m6LIX+0wUhBbmMX7TCfjF5FoOH6SD1CttzuYlGNVpA7QnrmLxrsub43ClTINfGSYyHe2HWeLl5CQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "peer": true,
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-gnu": {
      "version": "1.30.1",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.30.1.tgz",
      "integrity": "sha512-piWx3z4wN8J8z3+O5kO74+yr6ze/dKmPnI7vLqfSqI8bccaTGY5xiSGVIJBDd5K5BHlvVLpUB3S2YCfelyJ1bw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "peer": true,
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-musl": {
      "version": "1.30.1",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.30.1.tgz",
      "integrity": "sha512-rRomAK7eIkL+tHY0YPxbc5Dra2gXlI63HL+v1Pdi1a3sC+tJTcFrHX+E86sulgAXeI7rSzDYhPSeHHjqFhqfeQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "peer": true,
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-arm64-msvc": {
      "version": "1.30.1",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.30.1.tgz",
      "integrity": "sha512-mSL4rqPi4iXq5YVqzSsJgMVFENoa4nGTT/GjO2c0Yl9OuQfPsIfncvLrEW6RbbB24WtZ3xP/2CCmI3tNkNV4oA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "peer": true,
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-x64-msvc": {
      "version": "1.30.1",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.30.1.tgz",
      "integrity": "sha512-PVqXh48wh4T53F/1CCu8PIPCxLzWyCnn/9T5W1Jpmdy5h9Cwd+0YQS6/LwhHXSafuc61/xg9Lv5OrCby6a++jg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "peer": true,
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lilconfig": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/lilconfig/-/lilconfig-3.1.3.tgz",
      "integrity": "sha512-/vlFKAoH5Cgt3Ie+JLhRbwOsCQePABiU3tJ1egGvyQ+33R/vcwM2Zl2QR/LzjsBeItPt3oSVXapn+m4nQDvpzw==",
      "license": "MIT",
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/antonk52"
      }
    },
    "node_modules/lines-and-columns": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
      "integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==",
      "license": "MIT"
    },
    "node_modules/locate-path": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-6.0.0.tgz",
      "integrity": "sha512-iPZK6eYjbxRu3uB4/WZ3EsEIMJFMqAoopl3R+zuq0UjcAm/MO6KCweDgPfP3elTztoKP3KtnVHxTn2NHBSDVUw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-locate": "^5.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/lodash.merge": {
      "version": "4.6.2",
      "resolved": "https://registry.npmjs.org/lodash.merge/-/lodash.merge-4.6.2.tgz",
      "integrity": "sha512-0KpjqXRVvrYyCsX1swR/XTK0va6VQkQM6MNo7PqW77ByjAhoARA8EfrP1N4+KlKj8YS0ZUCtRT/YUuhyYDujIQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/lucide-react": {
      "version": "0.545.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-0.545.0.tgz",
      "integrity": "sha512-7r1/yUuflQDSt4f1bpn5ZAocyIxcTyVyBBChSVtBKn5M+392cPmI5YJMWOJKk/HUWGm5wg83chlAZtCcGbEZtw==",
      "license": "ISC",
      "peerDependencies": {
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/math-intrinsics": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
      "integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/merge2": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
      "integrity": "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==",
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/micromatch": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.8.tgz",
      "integrity": "sha512-PXwfBhYu0hBCPw8Dn0E+WDYb7af3dSLVWKi3HGv84IdF4TyFoC0ysxFd0Goxw7nSv4T/PzEJQxsYsEiFCKo2BA==",
      "license": "MIT",
      "dependencies": {
        "braces": "^3.0.3",
        "picomatch": "^2.3.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/micromatch/node_modules/picomatch": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.1.tgz",
      "integrity": "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA==",
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/mime-db": {
      "version": "1.52.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
      "integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mime-types": {
      "version": "2.1.35",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
      "integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "1.52.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/minimatch": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.2.tgz",
      "integrity": "sha512-J7p63hRiAjw1NDEww1W7i37+ByIrOWO5XQQAzZ3VOcL0PNybwpfmV/N05zFAzwQ9USyEcX6t3UO+K5aqBQOIHw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^1.1.7"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/minipass": {
      "version": "7.1.2",
      "resolved": "https://registry.npmjs.org/minipass/-/minipass-7.1.2.tgz",
      "integrity": "sha512-qOOzS1cBTWYF4BH8fVePDBOO9iptMnGUEZwNc/cMWnTV2nVLZ7VoNWEPHkYczZA0pdoA7dl6e7FL659nX9S2aw==",
      "license": "ISC",
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/mz": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/mz/-/mz-2.7.0.tgz",
      "integrity": "sha512-z81GNO7nnYMEhrGh9LeymoE4+Yr0Wn5McHIZMK5cfQCl+NDX08sCZgUc9/6MHni9IWuFLm1Z3HTCXu2z9fN62Q==",
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0",
        "object-assign": "^4.0.1",
        "thenify-all": "^1.0.0"
      }
    },
    "node_modules/nanoid": {
      "version": "3.3.11",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.11.tgz",
      "integrity": "sha512-N8SpfPUnUp1bK+PMYW8qSWdl9U+wwNWI4QKxOYDy9JAro3WMX7p2OeVRF9v+347pnakNevPmiHhNmZ2HbFA76w==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/natural-compare": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/natural-compare/-/natural-compare-1.4.0.tgz",
      "integrity": "sha512-OWND8ei3VtNC9h7V60qff3SVobHr996CTwgxubgyQYEpg290h9J0buyECNNJexkFm5sOajh5G116RYA1c8ZMSw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/node-releases": {
      "version": "2.0.23",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.23.tgz",
      "integrity": "sha512-cCmFDMSm26S6tQSDpBCg/NR8NENrVPhAJSf+XbxBG4rPFaaonlEoE9wHQmun+cls499TQGSb7ZyPBRlzgKfpeg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/normalize-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
      "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/normalize-range": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/normalize-range/-/normalize-range-0.1.2.tgz",
      "integrity": "sha512-bdok/XvKII3nUpklnV6P2hxtMNrCboOjAcyBuQnWEhO665FwrSNRxU+AqpsyvO6LgGYPspN+lu5CLtw4jPRKNA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-hash": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/object-hash/-/object-hash-3.0.0.tgz",
      "integrity": "sha512-RSn9F68PjH9HqtltsSnqYC1XXoWe9Bju5+213R98cNGttag9q9yAOTzdbsqvIa7aNm5WffBZFpWYr2aWrklWAw==",
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/optionator": {
      "version": "0.9.4",
      "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.9.4.tgz",
      "integrity": "sha512-6IpQ7mKUxRcZNLIObR0hz7lxsapSSIYNZJwXPGeF0mTVqGKFIXj1DQcMoT22S3ROcLyY/rz0PWaWZ9ayWmad9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "deep-is": "^0.1.3",
        "fast-levenshtein": "^2.0.6",
        "levn": "^0.4.1",
        "prelude-ls": "^1.2.1",
        "type-check": "^0.4.0",
        "word-wrap": "^1.2.5"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/p-limit": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-3.1.0.tgz",
      "integrity": "sha512-TYOanM3wGwNGsZN2cVTYPArw454xnXj5qmWF1bEoAc4+cU/ol7GVh7odevjp1FNHduHc3KZMcFduxU5Xc6uJRQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "yocto-queue": "^0.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-locate": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-5.0.0.tgz",
      "integrity": "sha512-LaNjtRWUBY++zB5nE/NwcaoMylSPk+S+ZHNB1TzdbMJMny6dynpAGt7X/tl/QYq3TIeE6nxHppbo2LGymrG5Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-limit": "^3.0.2"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/package-json-from-dist": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/package-json-from-dist/-/package-json-from-dist-1.0.1.tgz",
      "integrity": "sha512-UEZIS3/by4OC8vL3P2dTXRETpebLI2NiI5vIrjaD/5UtrkFX/tNbwjTSRAGC/+7CAo2pIcBaRgWmcBBHcsaCIw==",
      "license": "BlueOak-1.0.0"
    },
    "node_modules/parent-module": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/parent-module/-/parent-module-1.0.1.tgz",
      "integrity": "sha512-GQ2EWRpQV8/o+Aw8YqtfZZPfNRWZYkbidE9k5rpl/hC3vtHHBfGm2Ifi6qWV+coDGkrUKZAxE3Lot5kcsRlh+g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "callsites": "^3.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/path-exists": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-4.0.0.tgz",
      "integrity": "sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-key": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
      "integrity": "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
      "license": "MIT"
    },
    "node_modules/path-scurry": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/path-scurry/-/path-scurry-1.11.1.tgz",
      "integrity": "sha512-Xa4Nw17FS9ApQFJ9umLiJS4orGjm7ZzwUrwamcGQuHSzDyth9boKDaycYdDcZDuqYATXw4HFXgaqWTctW/v1HA==",
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "lru-cache": "^10.2.0",
        "minipass": "^5.0.0 || ^6.0.2 || ^7.0.0"
      },
      "engines": {
        "node": ">=16 || 14 >=14.18"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/path-scurry/node_modules/lru-cache": {
      "version": "10.4.3",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-10.4.3.tgz",
      "integrity": "sha512-JNAzZcXrCt42VGLuYz0zfAzDfAvJWW6AfYlDBQyDV5DClI2m5sAmK+OIO7s59XfsRsWHp02jAJrRadPRGTt6SQ==",
      "license": "ISC"
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.3.tgz",
      "integrity": "sha512-5gTmgEY/sqK6gFXLIsQNH19lWb4ebPDLA4SdLP7dsWkIXHWlG66oPuVvXSGFPppYZz8ZDZq0dYYrbHfBCVUb1Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/pify": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
      "integrity": "sha512-udgsAY+fTnvv7kI7aaxbqwWNb0AHiB0qBO89PZKPkoTmGOgdbrHDKD+0B2X4uTfJ/FT1R09r9gTsjUjNJotuog==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/pirates": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/pirates/-/pirates-4.0.7.tgz",
      "integrity": "sha512-TfySrs/5nm8fQJDcBDuUng3VOUKsd7S+zqvbOTiGXHfxX4wK31ard+hoNuvkicM/2YFzlpDgABOevKSsB4G/FA==",
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.6",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.6.tgz",
      "integrity": "sha512-3Ybi1tAuwAP9s0r1UQ2J4n5Y0G05bJkpUIO0/bI9MhwmD70S5aTWbXGBwxHrelT+XM1k6dM0pk+SwNkpTRN7Pg==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.11",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/postcss-import": {
      "version": "15.1.0",
      "resolved": "https://registry.npmjs.org/postcss-import/-/postcss-import-15.1.0.tgz",
      "integrity": "sha512-hpr+J05B2FVYUAXHeK1YyI267J/dDDhMU6B6civm8hSY1jYJnBXxzKDKDswzJmtLHryrjhnDjqqp/49t8FALew==",
      "license": "MIT",
      "dependencies": {
        "postcss-value-parser": "^4.0.0",
        "read-cache": "^1.0.0",
        "resolve": "^1.1.7"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "postcss": "^8.0.0"
      }
    },
    "node_modules/postcss-js": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/postcss-js/-/postcss-js-4.1.0.tgz",
      "integrity": "sha512-oIAOTqgIo7q2EOwbhb8UalYePMvYoIeRY2YKntdpFQXNosSu3vLrniGgmH9OKs/qAkfoj5oB3le/7mINW1LCfw==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "camelcase-css": "^2.0.1"
      },
      "engines": {
        "node": "^12 || ^14 || >= 16"
      },
      "peerDependencies": {
        "postcss": "^8.4.21"
      }
    },
    "node_modules/postcss-load-config": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/postcss-load-config/-/postcss-load-config-6.0.1.tgz",
      "integrity": "sha512-oPtTM4oerL+UXmx+93ytZVN82RrlY/wPUV8IeDxFrzIjXOLF1pN+EmKPLbubvKHT2HC20xXsCAH2Z+CKV6Oz/g==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "lilconfig": "^3.1.1"
      },
      "engines": {
        "node": ">= 18"
      },
      "peerDependencies": {
        "jiti": ">=1.21.0",
        "postcss": ">=8.0.9",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "jiti": {
          "optional": true
        },
        "postcss": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/postcss-nested": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/postcss-nested/-/postcss-nested-6.2.0.tgz",
      "integrity": "sha512-HQbt28KulC5AJzG+cZtj9kvKB93CFCdLvog1WFLf1D+xmMvPGlBstkpTEZfK5+AN9hfJocyBFCNiqyS48bpgzQ==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "postcss-selector-parser": "^6.1.1"
      },
      "engines": {
        "node": ">=12.0"
      },
      "peerDependencies": {
        "postcss": "^8.2.14"
      }
    },
    "node_modules/postcss-selector-parser": {
      "version": "6.1.2",
      "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.1.2.tgz",
      "integrity": "sha512-Q8qQfPiZ+THO/3ZrOrO0cJJKfpYCagtMUkXbnEfmgUjwXg6z/WBeOyS9APBBPCTSiDV+s4SwQGu8yFsiMRIudg==",
      "license": "MIT",
      "dependencies": {
        "cssesc": "^3.0.0",
        "util-deprecate": "^1.0.2"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/postcss-value-parser": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz",
      "integrity": "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==",
      "license": "MIT"
    },
    "node_modules/prelude-ls": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.2.1.tgz",
      "integrity": "sha512-vkcDPrRZo1QZLbn5RLGPpg/WmIQ65qoWWhcGKf/b5eplkkarX0m9z8ppCat4mlOqUsWpyNuYgO3VRyrYHSzX5g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/proxy-from-env": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/proxy-from-env/-/proxy-from-env-1.1.0.tgz",
      "integrity": "sha512-D+zkORCbA9f1tdWRK0RaCR3GPv50cMxcrz4X8k5LTSUD1Dkw47mKJEZQNunItRTkWwgtaUSo1RVFRIG9ZXiFYg==",
      "license": "MIT"
    },
    "node_modules/punycode": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",
      "integrity": "sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/queue-microtask": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
      "integrity": "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/react": {
      "version": "19.2.0",
      "resolved": "https://registry.npmjs.org/react/-/react-19.2.0.tgz",
      "integrity": "sha512-tmbWg6W31tQLeB5cdIBOicJDJRR2KzXsV7uSK9iNfLWQ5bIZfxuPEHp7M8wiHyHnn0DD1i7w3Zmin0FtkrwoCQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.2.0",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.2.0.tgz",
      "integrity": "sha512-UlbRu4cAiGaIewkPyiRGJk0imDN2T3JjieT6spoL2UeSf5od4n5LB/mQ4ejmxhCFT1tYe8IvaFulzynWovsEFQ==",
      "license": "MIT",
      "dependencies": {
        "scheduler": "^0.27.0"
      },
      "peerDependencies": {
        "react": "^19.2.0"
      }
    },
    "node_modules/react-hook-form": {
      "version": "7.64.0",
      "resolved": "https://registry.npmjs.org/react-hook-form/-/react-hook-form-7.64.0.tgz",
      "integrity": "sha512-fnN+vvTiMLnRqKNTVhDysdrUay0kUUAymQnFIznmgDvapjveUWOOPqMNzPg+A+0yf9DuE2h6xzBjN1s+Qx8wcg==",
      "license": "MIT",
      "engines": {
        "node": ">=18.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/react-hook-form"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17 || ^18 || ^19"
      }
    },
    "node_modules/react-refresh": {
      "version": "0.17.0",
      "resolved": "https://registry.npmjs.org/react-refresh/-/react-refresh-0.17.0.tgz",
      "integrity": "sha512-z6F7K9bV85EfseRCp2bzrpyQ0Gkw1uLoCel9XBVWPg/TjRj94SkJzUTGfOa4bs7iJvBWtQG0Wq7wnI0syw3EBQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-router": {
      "version": "7.9.4",
      "resolved": "https://registry.npmjs.org/react-router/-/react-router-7.9.4.tgz",
      "integrity": "sha512-SD3G8HKviFHg9xj7dNODUKDFgpG4xqD5nhyd0mYoB5iISepuZAvzSr8ywxgxKJ52yRzf/HWtVHc9AWwoTbljvA==",
      "license": "MIT",
      "dependencies": {
        "cookie": "^1.0.1",
        "set-cookie-parser": "^2.6.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "react": ">=18",
        "react-dom": ">=18"
      },
      "peerDependenciesMeta": {
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/react-router-dom": {
      "version": "7.9.4",
      "resolved": "https://registry.npmjs.org/react-router-dom/-/react-router-dom-7.9.4.tgz",
      "integrity": "sha512-f30P6bIkmYvnHHa5Gcu65deIXoA2+r3Eb6PJIAddvsT9aGlchMatJ51GgpU470aSqRRbFX22T70yQNUGuW3DfA==",
      "license": "MIT",
      "dependencies": {
        "react-router": "7.9.4"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "react": ">=18",
        "react-dom": ">=18"
      }
    },
    "node_modules/read-cache": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/read-cache/-/read-cache-1.0.0.tgz",
      "integrity": "sha512-Owdv/Ft7IjOgm/i0xvNDZ1LrRANRfew4b2prF3OWMQLxLfu3bS8FVhCsrSCMK4lR56Y9ya+AThoTpDCTxCmpRA==",
      "license": "MIT",
      "dependencies": {
        "pify": "^2.3.0"
      }
    },
    "node_modules/readdirp": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
      "integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
      "license": "MIT",
      "dependencies": {
        "picomatch": "^2.2.1"
      },
      "engines": {
        "node": ">=8.10.0"
      }
    },
    "node_modules/readdirp/node_modules/picomatch": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.1.tgz",
      "integrity": "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA==",
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/resolve": {
      "version": "1.22.10",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.10.tgz",
      "integrity": "sha512-NPRy+/ncIMeDlTAsuqwKIiferiawhefFJtkNSW0qZJEqMEb+qBt/77B/jGeeek+F0uOeN05CDa6HXbbIgtVX4w==",
      "license": "MIT",
      "dependencies": {
        "is-core-module": "^2.16.0",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/resolve-from": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz",
      "integrity": "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/reusify": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.1.0.tgz",
      "integrity": "sha512-g6QUff04oZpHs0eG5p83rFLhHeV00ug/Yf9nZM6fLeUrPguBTkTQOdpAWWspMh55TZfVQDPaN3NQJfbVRAxdIw==",
      "license": "MIT",
      "engines": {
        "iojs": ">=1.0.0",
        "node": ">=0.10.0"
      }
    },
    "node_modules/rollup": {
      "version": "4.52.4",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-4.52.4.tgz",
      "integrity": "sha512-CLEVl+MnPAiKh5pl4dEWSyMTpuflgNQiLGhMv8ezD5W/qP8AKvmYpCOKRRNOh7oRKnauBZ4SyeYkMS+1VSyKwQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/estree": "1.0.8"
      },
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=18.0.0",
        "npm": ">=8.0.0"
      },
      "optionalDependencies": {
        "@rollup/rollup-android-arm-eabi": "4.52.4",
        "@rollup/rollup-android-arm64": "4.52.4",
        "@rollup/rollup-darwin-arm64": "4.52.4",
        "@rollup/rollup-darwin-x64": "4.52.4",
        "@rollup/rollup-freebsd-arm64": "4.52.4",
        "@rollup/rollup-freebsd-x64": "4.52.4",
        "@rollup/rollup-linux-arm-gnueabihf": "4.52.4",
        "@rollup/rollup-linux-arm-musleabihf": "4.52.4",
        "@rollup/rollup-linux-arm64-gnu": "4.52.4",
        "@rollup/rollup-linux-arm64-musl": "4.52.4",
        "@rollup/rollup-linux-loong64-gnu": "4.52.4",
        "@rollup/rollup-linux-ppc64-gnu": "4.52.4",
        "@rollup/rollup-linux-riscv64-gnu": "4.52.4",
        "@rollup/rollup-linux-riscv64-musl": "4.52.4",
        "@rollup/rollup-linux-s390x-gnu": "4.52.4",
        "@rollup/rollup-linux-x64-gnu": "4.52.4",
        "@rollup/rollup-linux-x64-musl": "4.52.4",
        "@rollup/rollup-openharmony-arm64": "4.52.4",
        "@rollup/rollup-win32-arm64-msvc": "4.52.4",
        "@rollup/rollup-win32-ia32-msvc": "4.52.4",
        "@rollup/rollup-win32-x64-gnu": "4.52.4",
        "@rollup/rollup-win32-x64-msvc": "4.52.4",
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/run-parallel": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
      "integrity": "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "queue-microtask": "^1.2.2"
      }
    },
    "node_modules/scheduler": {
      "version": "0.27.0",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.27.0.tgz",
      "integrity": "sha512-eNv+WrVbKu1f3vbYJT/xtiF5syA5HPIMtf9IgY/nKg0sWqzAUEvqY/xm7OcZc/qafLx/iO9FgOmeSAp4v5ti/Q==",
      "license": "MIT"
    },
    "node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/set-cookie-parser": {
      "version": "2.7.1",
      "resolved": "https://registry.npmjs.org/set-cookie-parser/-/set-cookie-parser-2.7.1.tgz",
      "integrity": "sha512-IOc8uWeOZgnb3ptbCURJWNjWUPcO3ZnTTdzsurqERrP6nPyv+paC55vJM0LpOlT2ne+Ix+9+CRG1MNLlyZ4GjQ==",
      "license": "MIT"
    },
    "node_modules/shebang-command": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
      "integrity": "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==",
      "license": "MIT",
      "dependencies": {
        "shebang-regex": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shebang-regex": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-3.0.0.tgz",
      "integrity": "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/signal-exit": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-4.1.0.tgz",
      "integrity": "sha512-bzyZ1e88w9O1iNJbKnOlvYTrWPDl46O1bG0D3XInv+9tkPrxrN8jUUTiFlDkkmKWgn1M6CfIA13SuGqOa9Korw==",
      "license": "ISC",
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/string-width": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-5.1.2.tgz",
      "integrity": "sha512-HnLOCR3vjcY8beoNLtcjZ5/nxn2afmME6lhrDrebokqMap+XbeW8n9TXpPDOqdGK5qcI3oT0GKTW6wC7EMiVqA==",
      "license": "MIT",
      "dependencies": {
        "eastasianwidth": "^0.2.0",
        "emoji-regex": "^9.2.2",
        "strip-ansi": "^7.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/string-width-cjs": {
      "name": "string-width",
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/string-width-cjs/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/string-width-cjs/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "license": "MIT"
    },
    "node_modules/string-width-cjs/node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-ansi": {
      "version": "7.1.2",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-7.1.2.tgz",
      "integrity": "sha512-gmBGslpoQJtgnMAvOVqGZpEz9dyoKTCzy2nfz/n8aIFhN/jCE/rCmcxabB6jOOHV+0WNnylOxaxBQPSvcWklhA==",
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^6.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/strip-ansi?sponsor=1"
      }
    },
    "node_modules/strip-ansi-cjs": {
      "name": "strip-ansi",
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-ansi-cjs/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-json-comments": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-3.1.1.tgz",
      "integrity": "sha512-6fPc+R4ihwqP6N/aIv2f1gMH8lOVtWQHoqC4yK6oSDVVocumAsfCqjkXnqiYMhmMwS/mEHLp7Vehlt3ql6lEig==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/sucrase": {
      "version": "3.35.0",
      "resolved": "https://registry.npmjs.org/sucrase/-/sucrase-3.35.0.tgz",
      "integrity": "sha512-8EbVDiu9iN/nESwxeSxDKe0dunta1GOlHufmSSXxMD2z2/tMZpDMpvXQGsc+ajGo8y2uYUmixaSRUc/QPoQ0GA==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.2",
        "commander": "^4.0.0",
        "glob": "^10.3.10",
        "lines-and-columns": "^1.1.6",
        "mz": "^2.7.0",
        "pirates": "^4.0.1",
        "ts-interface-checker": "^0.1.9"
      },
      "bin": {
        "sucrase": "bin/sucrase",
        "sucrase-node": "bin/sucrase-node"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/supports-color": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
      "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/tailwind-merge": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/tailwind-merge/-/tailwind-merge-3.3.1.tgz",
      "integrity": "sha512-gBXpgUm/3rp1lMZZrM/w7D8GKqshif0zAymAhbCyIt8KMe+0v9DQ7cdYLR4FHH/cKpdTXb+A/tKKU3eolfsI+g==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/dcastil"
      }
    },
    "node_modules/tailwindcss": {
      "version": "3.4.18",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-3.4.18.tgz",
      "integrity": "sha512-6A2rnmW5xZMdw11LYjhcI5846rt9pbLSabY5XPxo+XWdxwZaFEn47Go4NzFiHu9sNNmr/kXivP1vStfvMaK1GQ==",
      "license": "MIT",
      "dependencies": {
        "@alloc/quick-lru": "^5.2.0",
        "arg": "^5.0.2",
        "chokidar": "^3.6.0",
        "didyoumean": "^1.2.2",
        "dlv": "^1.1.3",
        "fast-glob": "^3.3.2",
        "glob-parent": "^6.0.2",
        "is-glob": "^4.0.3",
        "jiti": "^1.21.7",
        "lilconfig": "^3.1.3",
        "micromatch": "^4.0.8",
        "normalize-path": "^3.0.0",
        "object-hash": "^3.0.0",
        "picocolors": "^1.1.1",
        "postcss": "^8.4.47",
        "postcss-import": "^15.1.0",
        "postcss-js": "^4.0.1",
        "postcss-load-config": "^4.0.2 || ^5.0 || ^6.0",
        "postcss-nested": "^6.2.0",
        "postcss-selector-parser": "^6.1.2",
        "resolve": "^1.22.8",
        "sucrase": "^3.35.0"
      },
      "bin": {
        "tailwind": "lib/cli.js",
        "tailwindcss": "lib/cli.js"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/tailwindcss-animate": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/tailwindcss-animate/-/tailwindcss-animate-1.0.7.tgz",
      "integrity": "sha512-bl6mpH3T7I3UFxuvDEXLxy/VuFxBk5bbzplh7tXI68mwMokNYd1t9qPBHlnyTwfa4JGC4zP516I1hYYtQ/vspA==",
      "license": "MIT",
      "peerDependencies": {
        "tailwindcss": ">=3.0.0 || insiders"
      }
    },
    "node_modules/tailwindcss/node_modules/jiti": {
      "version": "1.21.7",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-1.21.7.tgz",
      "integrity": "sha512-/imKNG4EbWNrVjoNC/1H5/9GFy+tqjGBHCaSsN+P2RnPqjsLmv6UD3Ej+Kj8nBWaRAwyk7kK5ZUc+OEatnTR3A==",
      "license": "MIT",
      "bin": {
        "jiti": "bin/jiti.js"
      }
    },
    "node_modules/thenify": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/thenify/-/thenify-3.3.1.tgz",
      "integrity": "sha512-RVZSIV5IG10Hk3enotrhvz0T9em6cyHBLkH/YAZuKqd8hRkKhSfCGIcP2KUY0EPxndzANBmNllzWPwak+bheSw==",
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0"
      }
    },
    "node_modules/thenify-all": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/thenify-all/-/thenify-all-1.6.0.tgz",
      "integrity": "sha512-RNxQH/qI8/t3thXJDwcstUO4zeqo64+Uy/+sNVRBx4Xn2OX+OZ9oP+iJnNFqplFra2ZUVeKCSa2oVWi3T4uVmA==",
      "license": "MIT",
      "dependencies": {
        "thenify": ">= 3.1.0 < 4"
      },
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/tinyglobby": {
      "version": "0.2.15",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.15.tgz",
      "integrity": "sha512-j2Zq4NyQYG5XMST4cbs02Ak8iJUdxRM0XI5QyxXuZOzKOINmWurp3smXu3y5wDcJrptwpSjgXHzIQxR0omXljQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.3"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
      "license": "MIT",
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/ts-interface-checker": {
      "version": "0.1.13",
      "resolved": "https://registry.npmjs.org/ts-interface-checker/-/ts-interface-checker-0.1.13.tgz",
      "integrity": "sha512-Y/arvbn+rrz3JCKl9C4kVNfTfSm2/mEp5FSz5EsZSANGPSlQrpRI5M4PKF+mJnE52jOO90PnPSc3Ur3bTQw0gA==",
      "license": "Apache-2.0"
    },
    "node_modules/type-check": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.4.0.tgz",
      "integrity": "sha512-XleUoc9uwGXqjWwXaUTZAmzMcFZ5858QA2vvx1Ur5xIcixXIP+8LnFDgRplU30us6teqdlskFfu+ae4K79Ooew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/update-browserslist-db": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.1.3.tgz",
      "integrity": "sha512-UxhIZQ+QInVdunkDAaiazvvT/+fXL5Osr0JZlJulepYu6Jd7qJtDZjlur0emRlT71EN3ScPoE7gvsuIKKNavKw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/uri-js": {
      "version": "4.4.1",
      "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.4.1.tgz",
      "integrity": "sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "punycode": "^2.1.0"
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
      "license": "MIT"
    },
    "node_modules/vite": {
      "version": "7.1.9",
      "resolved": "https://registry.npmjs.org/vite/-/vite-7.1.9.tgz",
      "integrity": "sha512-4nVGliEpxmhCL8DslSAUdxlB6+SMrhB0a1v5ijlh1xB1nEPuy1mxaHxysVucLHuWryAxLWg6a5ei+U4TLn/rFg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "esbuild": "^0.25.0",
        "fdir": "^6.5.0",
        "picomatch": "^4.0.3",
        "postcss": "^8.5.6",
        "rollup": "^4.43.0",
        "tinyglobby": "^0.2.15"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^20.19.0 || >=22.12.0",
        "jiti": ">=1.21.0",
        "less": "^4.0.0",
        "lightningcss": "^1.21.0",
        "sass": "^1.70.0",
        "sass-embedded": "^1.70.0",
        "stylus": ">=0.54.8",
        "sugarss": "^5.0.0",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "lightningcss": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/which": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
      "integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
      "license": "ISC",
      "dependencies": {
        "isexe": "^2.0.0"
      },
      "bin": {
        "node-which": "bin/node-which"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/word-wrap": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/word-wrap/-/word-wrap-1.2.5.tgz",
      "integrity": "sha512-BN22B5eaMMI9UMtjrGd5g5eCYPpCPDUy0FJXbYsaT5zYxjFOckS53SQDE3pWkVoWpHXVb3BrYcEN4Twa55B5cA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/wrap-ansi": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-8.1.0.tgz",
      "integrity": "sha512-si7QWI6zUMq56bESFvagtmzMdGOtoxfR+Sez11Mobfc7tm+VkUckk9bW2UeffTGVUbOksxmSw0AA2gs8g71NCQ==",
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^6.1.0",
        "string-width": "^5.0.1",
        "strip-ansi": "^7.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/wrap-ansi-cjs": {
      "name": "wrap-ansi",
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
      "integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.0.0",
        "string-width": "^4.1.0",
        "strip-ansi": "^6.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "license": "MIT"
    },
    "node_modules/wrap-ansi-cjs/node_modules/string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi/node_modules/ansi-styles": {
      "version": "6.2.3",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-6.2.3.tgz",
      "integrity": "sha512-4Dj6M28JB+oAH8kFkTLUo+a2jwOFkuqb3yucU0CANcRRUbxS0cP0nZYCGjcc3BNXwRIsUVmDGgzawme7zvJHvg==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/yocto-queue": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
      "integrity": "sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/zod": {
      "version": "4.1.12",
      "resolved": "https://registry.npmjs.org/zod/-/zod-4.1.12.tgz",
      "integrity": "sha512-JInaHOamG8pt5+Ey8kGmdcAcg3OL9reK8ltczgHTAwNhMys/6ThXHityHxVV2p3fkw/c+MAvBHFVYHFZDmjMCQ==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/colinhacks"
      }
    },
    "node_modules/zustand": {
      "version": "5.0.8",
      "resolved": "https://registry.npmjs.org/zustand/-/zustand-5.0.8.tgz",
      "integrity": "sha512-gyPKpIaxY9XcO2vSMrLbiER7QMAMGOQZVRdJ6Zi782jkbzZygq5GI9nG8g+sMgitRtndwaBSl7uiqC49o1SSiw==",
      "license": "MIT",
      "engines": {
        "node": ">=12.20.0"
      },
      "peerDependencies": {
        "@types/react": ">=18.0.0",
        "immer": ">=9.0.6",
        "react": ">=18.0.0",
        "use-sync-external-store": ">=1.2.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "immer": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "use-sync-external-store": {
          "optional": true
        }
      }
    }
  }
}

```

## File: package.json
```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@fontsource/jetbrains-mono": "^5.2.8",
    "@hookform/resolvers": "^5.2.2",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-slot": "^1.2.3",
    "axios": "^1.12.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.545.0",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-hook-form": "^7.64.0",
    "react-router-dom": "^7.9.4",
    "tailwind-merge": "^3.3.1",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^4.1.12",
    "zustand": "^5.0.8"
  },
  "devDependencies": {
    "@eslint/js": "^9.36.0",
    "@types/react": "^19.1.16",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.0.4",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.36.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.22",
    "globals": "^16.4.0",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.18",
    "vite": "^7.1.7"
  }
}

```

## File: postcss.config.js
```js
export default {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
};


```

## File: public/Login.svg
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><g id="freepik--Floor--inject-148"><ellipse id="freepik--floor--inject-148" cx="249.05" cy="350.02" rx="235.61" ry="136.03" style="fill:#f0f0f0"></ellipse></g><g id="freepik--Shadow--inject-148"><path id="freepik--shadow--inject-148" d="M384.36,397.22c-15.45-8.92-15.45-23.38,0-32.3s40.5-8.92,55.95,0,15.45,23.38,0,32.3S399.81,406.14,384.36,397.22Z" style="fill:#e0e0e0"></path><path id="freepik--shadow--inject-148" d="M70.12,398.46,29.48,375c-2.29-1.32-2.29-3.47,0-4.79L265.87,233.73a9.17,9.17,0,0,1,8.29,0l40.65,23.46c2.29,1.32,2.29,3.47,0,4.79L78.42,398.46A9.19,9.19,0,0,1,70.12,398.46Z" style="fill:#e0e0e0"></path></g><g id="freepik--Device--inject-148"><g id="freepik--device--inject-148"><path d="M216.2,356.64l34.94-20.2c3.6-2.08,5.4-4.8,5.4-7.53s0-4.86,0-4.86l-36.24-20.44a7.64,7.64,0,0,1-3.48-6V254.52l-61,35.26v43.07a7.7,7.7,0,0,0,3.48,6l30.84,17.76C197.32,360.8,209,360.8,216.2,356.64Z" style="fill:#E11D48"></path><g style="opacity:0.6000000000000001"><path d="M216.2,356.64l34.94-20.2c3.6-2.08,5.4-4.8,5.4-7.53s0-4.86,0-4.86l-36.24-20.44a7.64,7.64,0,0,1-3.48-6V254.52l-61,35.26v43.07a7.7,7.7,0,0,0,3.48,6l30.84,17.76C197.32,360.8,209,360.8,216.2,356.64Z"></path></g><path d="M170.45,340.48v4.84l-11.18-6.45a7.67,7.67,0,0,1-3.47-6V289.78l11.62-6.71c.24,2.95.5,6,.75,9L160,296.77v33.65a7.63,7.63,0,0,0,3.48,6Z" style="opacity:0.30000000000000004"></path><path d="M160,330.43a7.68,7.68,0,0,0,3.48,6l26.62,15.34c7.2,4.15,18.88,4.16,26.09,0l35-20.2c7.21-4.16,7.21-10.9,0-15.06l-26.64-15.34a7.69,7.69,0,0,1-3.47-6V261.51l-61,35.26Z" style="fill:#E11D48"></path><path d="M160,330.43a7.68,7.68,0,0,0,3.48,6l26.62,15.34c7.2,4.15,18.88,4.16,26.09,0l35-20.2c7.21-4.16,7.21-10.9,0-15.06l-26.64-15.34a7.69,7.69,0,0,1-3.47-6V261.51l-61,35.26Z" style="opacity:0.30000000000000004"></path><path d="M231.6,305.28h0l-7.09-4.09a7.69,7.69,0,0,1-3.47-6V261.51l-61,35.26v33.66a7.68,7.68,0,0,0,3.48,6l7,4Z" style="opacity:0.5"></path><path d="M256.55,324.06v4.86c0,2.73-1.81,5.44-5.4,7.53l-35,20.19a26.23,26.23,0,0,1-12.45,3.09v-4.84a26.23,26.23,0,0,0,12.45-3.09l35-20.21C254.74,329.52,256.55,326.79,256.55,324.06Z" style="fill:#E11D48"></path><path d="M256.55,324.06v4.86c0,2.73-1.81,5.44-5.4,7.53l-35,20.19a26.23,26.23,0,0,1-12.45,3.09v-4.84a26.23,26.23,0,0,0,12.45-3.09l35-20.21C254.74,329.52,256.55,326.79,256.55,324.06Z" style="opacity:0.5"></path><path d="M62,372.26a9.35,9.35,0,0,0,8.43-.15l236-136.25a9.62,9.62,0,0,0,4.35-7.53V37.41A9.32,9.32,0,0,0,306.72,30a9.3,9.3,0,0,0-8.42.16L62.3,166.45A9.58,9.58,0,0,0,58,174V364.89A9.32,9.32,0,0,0,62,372.26Z" style="fill:#E11D48"></path><path d="M70.46,372.1l236-136.25a9.59,9.59,0,0,0,4.35-7.53V37.41c0-2.77-1.95-3.9-4.35-2.51l-236,136.25a9.61,9.61,0,0,0-4.35,7.53V369.59C66.11,372.36,68.06,373.49,70.46,372.1Z" style="fill:#E11D48"></path><path d="M70.46,372.1l236-136.25a9.59,9.59,0,0,0,4.35-7.53V37.41c0-2.77-1.95-3.9-4.35-2.51l-236,136.25a9.61,9.61,0,0,0-4.35,7.53V369.59C66.11,372.36,68.06,373.49,70.46,372.1Z" style="opacity:0.5"></path><path d="M69.82,377.06A9.34,9.34,0,0,1,62,376.9,9.32,9.32,0,0,1,58,369.51V352.13l8.15,4.72v17.38C66.1,376.76,67.71,377.91,69.82,377.06Z" style="fill:#E11D48"></path><path d="M69.82,377.06A9.34,9.34,0,0,1,62,376.9,9.32,9.32,0,0,1,58,369.51V352.13l8.15,4.72v17.38C66.1,376.76,67.71,377.91,69.82,377.06Z" style="opacity:0.5"></path><path d="M66.1,356.85v17.38c0,2.77,2,3.89,4.35,2.51l236-136.25A9.62,9.62,0,0,0,310.8,233V215.54Z" style="fill:#E11D48"></path><path d="M66.11,356.81v17.42c0,2.77,2,3.89,4.35,2.51l236-136.25A9.62,9.62,0,0,0,310.8,233V215.54Z" style="opacity:0.30000000000000004"></path><path d="M74.26,335V181.39a5.75,5.75,0,0,1,2.6-4.52L300,48c1.44-.83,2.61-.16,2.61,1.5V203.19a5.76,5.76,0,0,1-2.61,4.52L76.87,336.55C75.43,337.38,74.26,336.7,74.26,335Z" style="fill:#E11D48"></path><path d="M74.26,335V181.39a5.75,5.75,0,0,1,2.6-4.52L300,48c1.44-.83,2.61-.16,2.61,1.5V203.19a5.76,5.76,0,0,1-2.61,4.52L76.87,336.55C75.43,337.38,74.26,336.7,74.26,335Z" style="fill:#263238"></path><path d="M188.45,291.73a9,9,0,0,0-4.08,7.06c0,2.6,1.83,3.66,4.08,2.36a9,9,0,0,0,4.08-7.07C192.53,291.48,190.7,290.43,188.45,291.73Z" style="fill:#E11D48"></path><path d="M67.39,174.38a9.25,9.25,0,0,0-1.29,4.29V356.85L58,352.13V174a8.9,8.9,0,0,1,1.28-4.3Z" style="opacity:0.7000000000000001"></path><path d="M310.76,36.69c-.31-2.24-2.12-3-4.31-1.79l-236,136.25a8.94,8.94,0,0,0-3.07,3.23l-8.16-4.71a9,9,0,0,1,3.08-3.23L298.3,30.2a9.32,9.32,0,0,1,8.43-.16A9.37,9.37,0,0,1,310.76,36.69Z" style="opacity:0.30000000000000004"></path></g></g><g id="freepik--Window--inject-148"><g id="freepik--window--inject-148"><g id="freepik--window--inject-148"><g id="freepik--window--inject-148"><path d="M323.49,60.19a2.16,2.16,0,0,0-2.22.17L98.59,189a6.71,6.71,0,0,0-3,5.27V346.94a3,3,0,0,0,1.29,2.65c.49.27,3.11,1.79,3.89,2.21a1.75,1.75,0,0,0,1.76-.1L325.16,223.06a6.71,6.71,0,0,0,3-5.27V64.33a2.1,2.1,0,0,0-.94-2C326.72,62,324.05,60.52,323.49,60.19Z" style="fill:#E11D48"></path><path d="M102.48,191.16,325.17,62.57c1.68-1,3-.18,3,1.76V217.79a6.71,6.71,0,0,1-3,5.27L102.48,351.7c-1.68,1-3-.61-3-2.55V196.43A6.73,6.73,0,0,1,102.48,191.16Z" style="fill:#fafafa"></path><path d="M326.53,63.15h0c.59,0,.68.74.68,1.18V217.79a5.68,5.68,0,0,1-2.55,4.4L102,350.83a1,1,0,0,1-.5.16c-.56,0-1-.86-1-1.84V196.43A5.74,5.74,0,0,1,103,192L325.67,63.43a1.77,1.77,0,0,1,.86-.28m0-1a2.8,2.8,0,0,0-1.36.42L102.48,191.16a6.73,6.73,0,0,0-3,5.27V349.15c0,1.54.86,2.84,2,2.84a2,2,0,0,0,1-.29L325.16,223.06a6.71,6.71,0,0,0,3-5.27V64.33c0-1.38-.68-2.18-1.68-2.18Z" style="fill:#e0e0e0"></path><path d="M96.82,349.59c.33.17,2.7,1.52,3.74,2.12a3.11,3.11,0,0,1-1.12-2.56V206.4l-3.9-2.28V346.94A3,3,0,0,0,96.82,349.59Z" style="fill:#f0f0f0"></path><path d="M328.21,64.3c0-1.92-1.37-2.7-3-1.73L102.48,191.16a6.73,6.73,0,0,0-3,5.27v10L328.21,74.3Z" style="fill:#E11D48"></path><g style="opacity:0.4"><path d="M325.17,62.57,102.48,191.15a6.25,6.25,0,0,0-2.14,2.27l-3.87-2.25A6,6,0,0,1,98.59,189L321.27,60.36a2.16,2.16,0,0,1,2.22-.18c.54.34,3.07,1.77,3.72,2.12A2.2,2.2,0,0,0,325.17,62.57Z" style="fill:#fff"></path></g><path d="M95.54,204.13v-9.91a6.25,6.25,0,0,1,.93-3.05l3.88,2.24a6.08,6.08,0,0,0-.91,3v10Z" style="opacity:0.15"></path></g></g><path d="M281.25,179.42l-133.37,77a4.91,4.91,0,0,0-2.23,3.85v38.24a4.91,4.91,0,0,0,2.23,3.85l3.89,2.24a4.94,4.94,0,0,0,4.46,0l133.35-77a4.93,4.93,0,0,0,2.23-3.86l0-38.25a4.91,4.91,0,0,0-2.23-3.85l-3.9-2.24A4.91,4.91,0,0,0,281.25,179.42Z" style="fill:#E11D48"></path><path d="M291.81,185.15c-.16-1.15-1.09-1.57-2.21-.92l-133.37,77a4.49,4.49,0,0,0-1.57,1.66l-8.35-4.82a4.57,4.57,0,0,1,1.56-1.64l133.38-77a4.91,4.91,0,0,1,4.45,0l3.9,2.24A5,5,0,0,1,291.81,185.15Z" style="fill:#fff;opacity:0.5"></path><path d="M155.85,304.79a5,5,0,0,1-4.07-.18l-3.9-2.24a4.93,4.93,0,0,1-2.23-3.85V260.28a4.63,4.63,0,0,1,.66-2.21l8.35,4.82a4.48,4.48,0,0,0-.66,2.19v38.25C154,304.6,154.8,305.19,155.85,304.79Z" style="fill:#263238"></path><path d="M156.23,261.23l133.37-77c1.23-.71,2.23-.14,2.23,1.28l0,38.25a4.93,4.93,0,0,1-2.23,3.86l-133.35,77c-1.23.71-2.23.13-2.23-1.29V265.09A4.93,4.93,0,0,1,156.23,261.23Z" style="fill:#E11D48"></path><path d="M245.89,199.84l-98,56.59a4.57,4.57,0,0,0-1.56,1.64l8.35,4.82a4.49,4.49,0,0,1,1.57-1.66l98-56.58Z" style="fill:#455a64"></path><path d="M254.23,204.65l-98,56.58a4.93,4.93,0,0,0-2.23,3.86v38.23c0,1.42,1,2,2.23,1.29l98-56.58Z" style="fill:#37474f"></path><path d="M178.83,256.57l50.57-29.19c2.09-1.21,3.79-.35,3.79,1.92a8.13,8.13,0,0,1-3.8,6.3l-50.56,29.2c-2.09,1.21-3.8.35-3.8-1.92A8.16,8.16,0,0,1,178.83,256.57Z" style="fill:#E11D48"></path><path d="M189.19,266.24a.1.1,0,0,1,.15,0,.37.37,0,0,1,.06.23v5.69a9.54,9.54,0,0,1-.14,1.64,6.35,6.35,0,0,1-.42,1.44,5.11,5.11,0,0,1-.7,1.18,3.67,3.67,0,0,1-1,.83,1.85,1.85,0,0,1-1,.3,1,1,0,0,1-.7-.37,2.25,2.25,0,0,1-.42-1,6.91,6.91,0,0,1-.13-1.47v-5.7a.72.72,0,0,1,.06-.29.36.36,0,0,1,.15-.2l.63-.37a.11.11,0,0,1,.15,0,.35.35,0,0,1,.06.23v5.62a3.79,3.79,0,0,0,.09.92,1,1,0,0,0,.24.52.45.45,0,0,0,.37.16,1,1,0,0,0,.48-.16,2.16,2.16,0,0,0,.48-.39,2.37,2.37,0,0,0,.38-.6,3.77,3.77,0,0,0,.25-.8,5.28,5.28,0,0,0,.08-1v-5.63a.73.73,0,0,1,.07-.29.36.36,0,0,1,.15-.2Z" style="fill:#fafafa"></path><path d="M193.11,271.62a.36.36,0,0,0-.05-.21.22.22,0,0,0-.19-.07,1.37,1.37,0,0,0-.37,0l-.58.11a1.18,1.18,0,0,1-.57,0,.69.69,0,0,1-.36-.27,1.43,1.43,0,0,1-.19-.53,4.52,4.52,0,0,1,0-1.62,4.49,4.49,0,0,1,.32-.89,4.32,4.32,0,0,1,.5-.8,2.51,2.51,0,0,1,.68-.59,1.73,1.73,0,0,1,.69-.24.84.84,0,0,1,.51.11.83.83,0,0,1,.33.38,1.59,1.59,0,0,1,.13.59.49.49,0,0,1-.06.29.36.36,0,0,1-.15.2l-.6.35a.18.18,0,0,1-.18,0l-.13-.1a.33.33,0,0,0-.18-.07.82.82,0,0,0-.36.13,1.54,1.54,0,0,0-.41.36.87.87,0,0,0-.18.55.63.63,0,0,0,0,.23.23.23,0,0,0,.17.1,1,1,0,0,0,.33,0l.56-.1c.47-.09.79,0,1,.26a2.1,2.1,0,0,1,.29,1.23,3.51,3.51,0,0,1-.12.88,4.27,4.27,0,0,1-.34.9,3.8,3.8,0,0,1-.55.82,2.83,2.83,0,0,1-.73.61,1.63,1.63,0,0,1-.73.25.9.9,0,0,1-.53-.15.92.92,0,0,1-.34-.43,1.5,1.5,0,0,1-.12-.6.54.54,0,0,1,.06-.3.36.36,0,0,1,.15-.2l.6-.35c.08,0,.14-.05.18,0l.13.14a.3.3,0,0,0,.21.1.64.64,0,0,0,.39-.13,1.87,1.87,0,0,0,.48-.39,1.24,1.24,0,0,0,.17-.27A.6.6,0,0,0,193.11,271.62Z" style="fill:#fafafa"></path><path d="M195.15,268.91a8.93,8.93,0,0,1,.13-1.55,7.46,7.46,0,0,1,.39-1.41,4.8,4.8,0,0,1,.6-1.15,2.57,2.57,0,0,1,.8-.75,1.09,1.09,0,0,1,.79-.17,1,1,0,0,1,.6.41,2.5,2.5,0,0,1,.39.9,5.58,5.58,0,0,1,.14,1.28v.62a.6.6,0,0,1-.07.3.36.36,0,0,1-.15.2l-2.6,1.51a1.56,1.56,0,0,0,.07.52.65.65,0,0,0,.2.29.42.42,0,0,0,.29.09.82.82,0,0,0,.34-.12,1.45,1.45,0,0,0,.4-.32,1.83,1.83,0,0,0,.26-.38,2.65,2.65,0,0,1,.14-.23.64.64,0,0,1,.15-.13l.62-.36a.12.12,0,0,1,.15,0,.28.28,0,0,1,.06.23,1.93,1.93,0,0,1-.12.57,4.34,4.34,0,0,1-.34.8,4.59,4.59,0,0,1-.56.82,3,3,0,0,1-.76.65,1.21,1.21,0,0,1-.8.19,1,1,0,0,1-.6-.42,2.65,2.65,0,0,1-.39-1A6.8,6.8,0,0,1,195.15,268.91Zm1.92-3.19a1.17,1.17,0,0,0-.39.34,1.92,1.92,0,0,0-.27.46,3.39,3.39,0,0,0-.17.51,3.27,3.27,0,0,0-.07.48l1.76-1a2.9,2.9,0,0,0-.06-.41.66.66,0,0,0-.14-.33.38.38,0,0,0-.26-.16A.6.6,0,0,0,197.07,265.72Z" style="fill:#fafafa"></path><path d="M202.13,262.93a1.61,1.61,0,0,0-.68.76,3.44,3.44,0,0,0-.21,1.32v3.61a.73.73,0,0,1-.06.3.36.36,0,0,1-.15.2l-.59.34a.1.1,0,0,1-.15,0,.37.37,0,0,1-.06-.23v-6.47a.8.8,0,0,1,.06-.3.41.41,0,0,1,.15-.2l.59-.34a.11.11,0,0,1,.15,0,.32.32,0,0,1,.06.22v.32a4.12,4.12,0,0,1,.44-.76,1.82,1.82,0,0,1,.6-.53l.36-.21a.1.1,0,0,1,.14,0,.37.37,0,0,1,.07.23v.91a.73.73,0,0,1-.07.3.41.41,0,0,1-.14.2Z" style="fill:#fafafa"></path><path d="M209.59,262.45a.1.1,0,0,1,.15,0,.37.37,0,0,1,.06.23v1a.8.8,0,0,1-.06.3.52.52,0,0,1-.15.19l-3.42,2a.11.11,0,0,1-.15,0,.34.34,0,0,1-.06-.22v-9a.8.8,0,0,1,.06-.3.38.38,0,0,1,.15-.19l.63-.37a.11.11,0,0,1,.15,0,.34.34,0,0,1,.06.22v7.61Z" style="fill:#fafafa"></path><path d="M212.66,255.05a1.2,1.2,0,0,1,.77-.21.92.92,0,0,1,.61.3,1.92,1.92,0,0,1,.4.74,4.28,4.28,0,0,1,.18,1.09c0,.08,0,.19,0,.32v.77c0,.12,0,.23,0,.32a7,7,0,0,1-.18,1.29,6.26,6.26,0,0,1-.4,1.2,4.46,4.46,0,0,1-.61,1,2.76,2.76,0,0,1-.77.69,1.31,1.31,0,0,1-.78.21.91.91,0,0,1-.6-.3,1.7,1.7,0,0,1-.4-.73,4.28,4.28,0,0,1-.18-1.09c0-.08,0-.18,0-.31v-.77c0-.13,0-.24,0-.32a6.35,6.35,0,0,1,.17-1.3,6.62,6.62,0,0,1,.41-1.21,4.83,4.83,0,0,1,.6-1A2.66,2.66,0,0,1,212.66,255.05Zm.94,2.58a2,2,0,0,0-.11-.65.62.62,0,0,0-.22-.32.43.43,0,0,0-.29-.07.87.87,0,0,0-.32.13,1.41,1.41,0,0,0-.32.24,1.79,1.79,0,0,0-.29.4,2.19,2.19,0,0,0-.22.58,4,4,0,0,0-.12.78c0,.08,0,.17,0,.28v.71c0,.11,0,.2,0,.26a2.36,2.36,0,0,0,.12.65.61.61,0,0,0,.22.32.37.37,0,0,0,.29.06.9.9,0,0,0,.32-.12,1.67,1.67,0,0,0,.32-.24,2.17,2.17,0,0,0,.29-.4,2.6,2.6,0,0,0,.22-.58,3.57,3.57,0,0,0,.11-.78,2.18,2.18,0,0,0,0-.28v-.7A2.1,2.1,0,0,0,213.6,257.63Z" style="fill:#fafafa"></path><path d="M217.68,260.9a1.42,1.42,0,0,0,.34-.29,2.45,2.45,0,0,0,.31-.46,3.08,3.08,0,0,0,.23-.63,3,3,0,0,0,.09-.75v-.51c0,.1-.1.22-.17.36a3,3,0,0,1-.24.42,4,4,0,0,1-.34.4,1.76,1.76,0,0,1-.43.33.92.92,0,0,1-.71.14,1,1,0,0,1-.54-.41,2.72,2.72,0,0,1-.35-.84,5.75,5.75,0,0,1-.14-1.15c0-.13,0-.29,0-.48s0-.35,0-.49a8.45,8.45,0,0,1,.14-1.31,7.89,7.89,0,0,1,.35-1.25,5,5,0,0,1,.54-1,2.28,2.28,0,0,1,.71-.68,1.41,1.41,0,0,1,.43-.17.93.93,0,0,1,.34,0,.62.62,0,0,1,.24.13.91.91,0,0,1,.17.17v-.32a.8.8,0,0,1,.06-.3.38.38,0,0,1,.15-.19l.59-.35a.11.11,0,0,1,.15,0,.37.37,0,0,1,.07.23V258a6.86,6.86,0,0,1-.53,2.84,3.63,3.63,0,0,1-1.46,1.7,1.54,1.54,0,0,1-.74.23,1,1,0,0,1-.59-.15,1.35,1.35,0,0,1-.4-.48,2,2,0,0,1-.16-.72.54.54,0,0,1,.06-.3.36.36,0,0,1,.15-.2l.53-.3a.13.13,0,0,1,.19,0,1,1,0,0,1,.13.17.47.47,0,0,0,.28.22C217.25,261.1,217.43,261,217.68,260.9Zm-.94-4.85q0,.4,0,.78a1.7,1.7,0,0,0,.32,1.12.49.49,0,0,0,.64,0,1.72,1.72,0,0,0,.65-.78,3.62,3.62,0,0,0,.3-1.32c0-.15,0-.33,0-.54s0-.39,0-.52a1.53,1.53,0,0,0-.3-1,.48.48,0,0,0-.65,0,1.73,1.73,0,0,0-.64.77A3.83,3.83,0,0,0,216.74,256.05Z" style="fill:#fafafa"></path><path d="M222,247.17a.11.11,0,0,1,.14,0,.32.32,0,0,1,.07.23v1.09a.66.66,0,0,1-.07.3.43.43,0,0,1-.14.19l-.67.39a.1.1,0,0,1-.15,0,.29.29,0,0,1-.07-.22v-1.09a.66.66,0,0,1,.07-.3.38.38,0,0,1,.15-.19Zm.17,9.39a.72.72,0,0,1-.06.29.49.49,0,0,1-.15.2l-.6.34a.09.09,0,0,1-.14,0,.32.32,0,0,1-.07-.23v-6.47a.66.66,0,0,1,.07-.3.47.47,0,0,1,.14-.2l.6-.34a.11.11,0,0,1,.15,0,.34.34,0,0,1,.06.22Z" style="fill:#fafafa"></path><path d="M227.43,253.51a.8.8,0,0,1-.06.3.38.38,0,0,1-.15.19l-.6.35a.1.1,0,0,1-.14,0,.32.32,0,0,1-.07-.23v-3.52a2.45,2.45,0,0,0-.22-1.21c-.14-.25-.36-.29-.67-.11a1.64,1.64,0,0,0-.65.87,4.2,4.2,0,0,0-.24,1.47v3.53a.8.8,0,0,1-.06.3.36.36,0,0,1-.15.2l-.59.34a.1.1,0,0,1-.15,0,.32.32,0,0,1-.06-.22v-6.47a.73.73,0,0,1,.06-.3.36.36,0,0,1,.15-.2l.59-.34a.1.1,0,0,1,.15,0,.37.37,0,0,1,.06.23V249a5.15,5.15,0,0,1,.48-.87,1.88,1.88,0,0,1,.65-.61,1.09,1.09,0,0,1,.79-.2.81.81,0,0,1,.52.41,2.54,2.54,0,0,1,.28.87,9,9,0,0,1,.08,1.2Z" style="fill:#fafafa"></path><path d="M277.87,224.4,268.16,230l1.51-13.62c-1.17-.62-1.91-2.13-1.91-4.3,0-3.87,2.36-8.36,5.26-10s5.25.1,5.25,4a13.26,13.26,0,0,1-1.9,6.5Z" style="fill:#455a64"></path><polygon points="277.88 224.4 269.33 219.47 268.16 230.01 277.88 224.4" style="fill:#37474f"></polygon><path d="M273,202.05a11.45,11.45,0,0,0-4.48,5.95l7.83,4.52h0a13.26,13.26,0,0,0,1.9-6.5C278.27,202.15,275.92,200.38,273,202.05Z" style="fill:#37474f"></path><path d="M225.8,156.7c-3.33-1.92-7.92-1.65-13,1.28-10.14,5.86-18.36,20.09-18.36,31.8,0,5.88,2.08,10,5.42,11.9l6.47,3.76c3.32,1.92,7.91,1.64,13-1.29,10.14-5.85,18.36-20.09,18.36-31.8,0-5.85-2.06-10-5.38-11.87" style="fill:#E11D48"></path><path d="M219.32,161.75c-10.14,5.86-18.36,20.1-18.36,31.8s8.22,16.46,18.36,10.6,18.37-20.09,18.36-31.8S229.45,155.9,219.32,161.75Z" style="fill:#E11D48"></path><path d="M229.45,187.73v1.34a29.53,29.53,0,0,1-10.13,10.62c-3.95,2.27-7.52,2.52-10.14,1.07V198a18,18,0,0,1,8.26-14.31l2.67-1.54c2.36-1.36,4.66-1.54,6.46-.49S229.45,184.92,229.45,187.73Z" style="fill:#E11D48"></path><path d="M225.8,156.7l6.5,3.78c-3.32-1.93-7.91-1.66-13,1.27-6.64,3.84-12.46,11.27-15.68,19.23l-6.51-3.77c3.23-8,9-15.39,15.68-19.23C217.89,155.06,222.48,154.78,225.8,156.7Z" style="fill:#fff;opacity:0.4"></path><path d="M206.1,205.29l-6.23-3.61c-3.34-1.9-5.42-6-5.42-11.9l6.51,3.78C201,199.26,202.92,203.32,206.1,205.29Z" style="opacity:0.2"></path><path d="M197.13,177.21l6.51,3.77A34.11,34.11,0,0,0,201,193.55h0l-6.51-3.78A34.23,34.23,0,0,1,197.13,177.21Z" style="opacity:0.1"></path><path d="M217,181.52a3.49,3.49,0,0,1-1.77-.46,4.33,4.33,0,0,1-1.91-4,11.42,11.42,0,0,1,5.24-9.08h0a3.92,3.92,0,0,1,6.32,3.66,11.44,11.44,0,0,1-5.24,9.08A5.29,5.29,0,0,1,217,181.52Z" style="fill:#fff"></path><path d="M226.57,181.65c-1.8-1.05-4.1-.87-6.46.49l-2.67,1.54A18,18,0,0,0,209.18,198v2.77c2.62,1.45,6.19,1.2,10.14-1.07a29.53,29.53,0,0,0,10.13-10.62v-1.34C229.45,184.92,228.41,182.71,226.57,181.65Z" style="fill:#fff"></path></g></g><g id="freepik--Plants--inject-148"><g id="freepik--plants--inject-148"><path d="M432.15,354.65s1.33-11.68,7.14-20.75,13.79-14.72,21.24-15.31,13.47,6.27,5.5,11-22.13,9.51-28.65,27.11Z" style="fill:#E11D48"></path><path d="M432.15,354.65s1.33-11.68,7.14-20.75,13.79-14.72,21.24-15.31,13.47,6.27,5.5,11-22.13,9.51-28.65,27.11Z" style="opacity:0.1"></path><path d="M434.34,351.61l-.08,0a.4.4,0,0,1-.22-.52c7.86-19.35,22.82-27.44,29.64-29a.4.4,0,0,1,.18.78c-6.68,1.54-21.35,9.48-29.08,28.53A.39.39,0,0,1,434.34,351.61Z" style="fill:#fff"></path><path d="M474.12,351.84c-.67,1.52-2.33,2.32-3.87,2.94s-3.22,1.29-4.06,2.73c-1.68,2.9,1.08,7-.72,9.81a5.24,5.24,0,0,1-3.56,2.06c-1.15.21-2.32.21-3.48.31a12.82,12.82,0,0,1-1.66-.13,7.57,7.57,0,0,0-4.81.51c-2.31,1.3-3,4.21-4.42,6.46a11,11,0,0,1-7.77,4.88c-1,.13-3,.32-4-.27a1.18,1.18,0,0,1-.22-.14l0,0c-.15-.16-.33-.37-.41-.48a.16.16,0,0,1,0-.07c-.41-1.51.26-3.07.29-4.63v-.28c-.07-1.81-.12-3.61-.16-5.41q-.13-5-.1-10c0-2.16-.24-4.52.68-6.55,1-2.24,3.52-2.29,4.47-4.48.38-.88.58-1.81.95-2.7a7.73,7.73,0,0,1,6.58-4.59c4.39-.22,8.32,3.33,12.71,3,1.13-.09,2.24-.44,3.36-.64,3.55-.67,7.66.34,9.66,3.35A4.61,4.61,0,0,1,474.12,351.84Z" style="fill:#E11D48"></path><path d="M434.7,373.52h0a.38.38,0,0,1-.26-.46c6.06-22.74,30-26,35.63-25.62a.37.37,0,0,1,.35.4.38.38,0,0,1-.4.34c-5.49-.39-28.93,2.82-34.86,25.08A.38.38,0,0,1,434.7,373.52Z" style="fill:#fff"></path><path d="M461.33,362a.35.35,0,0,1-.2-.1,19.9,19.9,0,0,0-16.31-4.59.39.39,0,0,1-.42-.32.38.38,0,0,1,.31-.43,20.71,20.71,0,0,1,17,4.81.37.37,0,0,1,0,.53A.34.34,0,0,1,461.33,362Z" style="fill:#fff"></path></g></g><g id="freepik--Clouds--inject-148"><g id="freepik--clouds--inject-148"><path d="M377.12,80l3.18,1.22v-7c0-5.56,4.43-6.89,9.24-4.11h0c4.82,2.78,8.72,9.53,8.72,15.09v1a4.65,4.65,0,0,1,4,.62h0a13.86,13.86,0,0,1,6.27,10.87v.46l4.44,2.56a9.14,9.14,0,0,1,4.13,7.15c0,2.64-1.85,3.71-4.13,2.39L377.12,89.54A9.09,9.09,0,0,1,373,82.39C373,79.76,374.83,78.69,377.12,80Z" style="fill:#e6e6e6"></path><path d="M419.71,74.46l5.77,3.33a6.47,6.47,0,0,1-.05-.76V75.36c0-3,2.08-4.18,4.66-2.69a9,9,0,0,1,2.78,2.67c.42-3.74,3.36-5.13,6.92-3.08a15.45,15.45,0,0,1,7,12.09v2.5a6.59,6.59,0,0,1-.59,2.9L451,92.51A5.74,5.74,0,0,1,453.56,97c0,1.65-1.16,2.32-2.59,1.5l-31.26-18A5.72,5.72,0,0,1,417.12,76C417.12,74.31,418.28,73.64,419.71,74.46Z" style="fill:#e6e6e6"></path></g></g><g id="freepik--Character--inject-148"><g id="freepik--character--inject-148"><path d="M397.37,226.23c-4.2,7.1-8.24,13.27-11.08,16.23-5.39,2.5-18.05,6.36-23,7a3.65,3.65,0,0,1-2.48-.58c-1.95-1.28-3.46-1.49-5.51-2.2-1.61-.55-2.29-1.32-2.59-1a1.83,1.83,0,0,0,.17,2.55,13.52,13.52,0,0,0,2.54,1.9,15,15,0,0,1-6.7.12c-4.29-1.13-6.31.93-3.41,5.59,1,1.66,5.12,4.33,13.4,3.61a75,75,0,0,0,8.81-1c7.94-1.7,16.77-3.34,22.2-5a14,14,0,0,0,5.28-3.66c9.13-10.41,12.16-17.83,16.16-24.57l-.34-11C404.34,214,400.88,220.29,397.37,226.23Z" style="fill:#ffa8a7"></path><path d="M411.93,214a10.41,10.41,0,0,0-9.9,4.23c-4.44,5.69-12.3,19.35-12.3,19.35s2.57,6.85,9.51,8l11.15-15.06S415.67,220.06,411.93,214Z" style="fill:#455a64"></path><rect x="428.77" y="367.54" width="7.27" height="12.96" style="fill:#ffa8a7"></rect><polygon points="410.84 366.85 403.58 367.11 403.21 353.39 410.84 353.13 410.84 366.85" style="fill:#ffa8a7"></polygon><path d="M437.06,255.35c0,7.22-1.06,65.39-1.06,65.39.16,2.08,2,5.92,1.63,13.91-.55,10.85-1.28,39.37-1.28,39.37a9.24,9.24,0,0,1-8.09.16s-5.9-40-7.2-50.71C419.92,314.08,417,283,417,283l-3.93,36.74a45.23,45.23,0,0,1,.9,12c-.34,5-2.68,30.88-2.68,30.88a9.61,9.61,0,0,1-8.39.67s-4.14-39-4.22-43.58c-.1-5.2,2.42-64.42,2.42-64.42Z" style="fill:#37474f"></path><path d="M428.77,376.76v-1.08c-.7.31-2.31,6.73-5.2,9.47-2.29,2.18-5.41,4.69-6.21,7.12s4.35,3.92,6.5,3.53c2.48-.46,6.8-2.29,7.88-4s1.59-4.19,2.47-5.43,2.91-2.62,3.38-4.06a9.62,9.62,0,0,0-.41-4c-.34-1.34-.7-2.81-1.14-2.68v.82a5.64,5.64,0,0,1-3.64,1.28C431.34,377.82,428.76,377.6,428.77,376.76Z" style="fill:#263238"></path><path d="M403.5,364.77c-.38,0-.69.57-1.52,1.51a16,16,0,0,1-4.27,3.2c-2.72,1.42-8,3.6-10.41,4.73-1.5.7-1.43,2.58.12,3.65s5.28,1.84,9.76.8c2.44-.57,5.62-2.92,7.64-2.79s5.77.09,7.26-1,.89-3.35.47-5.3c-.46-2.14-1-5.47-1.71-5.32V365c-.87,1.38-5.38,1.94-7.3.93Z" style="fill:#263238"></path><path d="M417,283a26.72,26.72,0,0,1-10.12-6.05s2,3.81,7.76,7.36l-1.24,32.81Z" style="fill:#263238"></path><path d="M433,215.06s6,1.38,5.57,12.22l-1.25,17.25,0,25.9c-5.34,6.06-29,5.62-37.15-.48,0,0,.92-30.65,1.47-42.45.39-8.38,2.32-12.6,10.56-13.52l10.13.44Z" style="fill:#E11D48"></path><path d="M425.36,192.54a11,11,0,0,1-10.82,11.26c-6,0-9.52-5.18-10.82-11.26-2.4-11.13,4.84-11.27,10.82-11.27A11.05,11.05,0,0,1,425.36,192.54Z" style="fill:#263238"></path><path d="M430.88,197.09s-1.66,8.12-2.33,9.46a3.53,3.53,0,0,1-2,1.71l.12-5.71Z" style="fill:#263238"></path><path d="M428.79,185.46s1.19-.3,2.46,1.68c1.08,1.69,1.33,5.49-.37,10l-3.13.38Z" style="fill:#263238"></path><path d="M429.94,187.11l3.84.07a1.81,1.81,0,0,0-1.75-2A2.13,2.13,0,0,0,429.94,187.11Z" style="fill:#263238"></path><path d="M430.41,186.2l2.84-2.73a1.83,1.83,0,0,0-2.69-.11A2.1,2.1,0,0,0,430.41,186.2Z" style="fill:#263238"></path><path d="M426.81,197.47c.63.39,1.52-.86,2.3-1.71s3.2-1.63,4.46,1.13-.89,5.49-2.69,6.39c-3.23,1.6-4.25-.73-4.25-.73l-.27,12.86c-4.54,7-14.84,6.78-11.13-.34v-3.91a20.54,20.54,0,0,1-4.62.24c-2.52-.4-4.1-2.47-4.87-5.31-1.22-4.56-1.69-8.24-.65-17.21,1.14-9.82,12.12-9.93,18-6S426.81,197.47,426.81,197.47Z" style="fill:#ffa8a7"></path><path d="M413.13,187.35c2.62-.26,5.21-.8,7.84-1a5.1,5.1,0,0,1,1.7.08c2,.55,1.76,2.89,2.08,4.52.55,2.82,1,7.59,2.06,7.61.32,0,1.52-2.07,2.3-2.81a4.13,4.13,0,0,0,.7-2.15c.2-1.16.3-2.35.39-3.53.08-1,.18-2,.18-3a14.08,14.08,0,0,0-.27-3.37,5.89,5.89,0,0,0-1.4-2.52l-.2-.22a13.27,13.27,0,0,0-4.69-3.16,28.33,28.33,0,0,0-7.94-1.73,78,78,0,0,1-8.09-1,.84.84,0,0,0-.47,0,.74.74,0,0,0-.38.6,3.34,3.34,0,0,0,1.35,3.3c-1.81.14-3.89-.8-5.63-1.28a1.14,1.14,0,0,0-.89,0,.88.88,0,0,0-.35.51,3.18,3.18,0,0,0-.05,1.44,8.28,8.28,0,0,0,1.56,4,9.76,9.76,0,0,0,5.4,3.53A15.76,15.76,0,0,0,413.13,187.35Z" style="fill:#263238"></path><path d="M415.24,211.16s5.62-1.18,7.58-2.27a6.62,6.62,0,0,0,2.72-2.8,9.35,9.35,0,0,1-1.55,3.3c-1.43,1.92-8.75,3.32-8.75,3.32Z" style="fill:#f28f8f"></path><path d="M416.59,196a1.17,1.17,0,0,0,1.12,1.21,1.22,1.22,0,1,0-1.12-1.21Z" style="fill:#263238"></path><path d="M418.39,191.15l2.41,1.39a1.53,1.53,0,0,0-.56-2A1.32,1.32,0,0,0,418.39,191.15Z" style="fill:#263238"></path><path d="M415.74,204.11l-2.57,1a1.34,1.34,0,0,0,1.75.88A1.5,1.5,0,0,0,415.74,204.11Z" style="fill:#f28f8f"></path><path d="M406.25,192.18l2.2-1.76a1.3,1.3,0,0,0-1.91-.31A1.57,1.57,0,0,0,406.25,192.18Z" style="fill:#263238"></path><path d="M407.22,195.67a1.13,1.13,0,1,0,1.13-1.22A1.17,1.17,0,0,0,407.22,195.67Z" style="fill:#263238"></path><polygon points="413.25 194.73 413.12 201.84 409.08 200.92 413.25 194.73" style="fill:#f28f8f"></polygon><polyline points="317.31 254.28 323.58 250.66 326.06 247.65 319.8 251.27 317.31 254.28" style="fill:#E11D48"></polyline><polyline points="317.31 254.28 323.58 250.66 326.06 247.65 319.8 251.27 317.31 254.28" style="opacity:0.4"></polyline><polyline points="334.36 264.12 340.63 260.5 345.86 255.87 339.6 259.48 334.36 264.12" style="fill:#E11D48"></polyline><polyline points="334.36 264.12 340.63 260.5 345.86 255.87 339.6 259.48 334.36 264.12" style="opacity:0.4"></polyline><path d="M387.62,276.61a13.29,13.29,0,0,1,2.59,6.82A13.43,13.43,0,0,1,387.62,276.61Zm14.57.19c-2.11-14.35-9.82-28.54-19-33.85-4.41-2.55-8.49-2.64-11.76-.73l-5.9,3.4-.33.2a7.48,7.48,0,0,0-.76.48,10.24,10.24,0,0,0-1.36,1.12l-.2.19c-.18.18-.37.39-.54.59s-.43.51-.63.78a14.83,14.83,0,0,0-1.15,1.76c-.18.31-.35.64-.51,1L308.52,222l-6.26,3.61v4l.53.3.5.29V231l-1,.59v2.32l7.57,16,7.48,4.33,2.49-3,6.6,3.95,3.79,6.49,4.18,2.41,5.23-4.64,6.42,3.71,2.16,8.91L359,278.31a58.69,58.69,0,0,0,2,6.69c.07.22.16.45.25.7,3.58,9.4,9.27,17.45,15.69,21.16a16.09,16.09,0,0,0,2.41,1.17,12.56,12.56,0,0,0,1.35.45q.6.16,1.2.27a10.65,10.65,0,0,0,3.82,0l.52-.13a4.68,4.68,0,0,0,.73-.21l.56-.22a3.29,3.29,0,0,0,.57-.27,5.44,5.44,0,0,0,.54-.27l.26-.16a.42.42,0,0,0,.13-.07c1.43-.82,4.95-2.86,5.91-3.4,4.76-2.76,7.84-9.74,7.84-19.61A51.47,51.47,0,0,0,402.19,276.8Z" style="fill:#E11D48"></path><path d="M385.79,288.72c-2.48-1.43-4.48-5.67-4.48-9.47s2-5.73,4.48-4.31,4.47,5.67,4.47,9.48S388.26,290.15,385.79,288.72Zm10.13-8.31c-2.1-14.34-9.81-28.54-19-33.84-4.26-2.46-8.2-2.64-11.4-.95l-.33.2a7.48,7.48,0,0,0-.76.48,10.24,10.24,0,0,0-1.36,1.12l-.2.19c-.18.18-.37.39-.54.59s-.43.51-.63.78a14.83,14.83,0,0,0-1.15,1.76c-.18.31-.35.64-.51,1a24.33,24.33,0,0,0-2,6.09l-55.79-32.22v4l.53.3.5.29V231l-1,.59v2.32l7.57,16,7.48,4.33,2.49-3,6.6,3.95,3.79,6.49,4.18,2.41,5.23-4.64,6.42,3.71,2.16,8.91L359,278.31a58.69,58.69,0,0,0,2,6.69c.07.22.16.45.25.7,3.58,9.4,9.27,17.45,15.69,21.16a16.09,16.09,0,0,0,2.41,1.17,12.56,12.56,0,0,0,1.35.45q.6.16,1.2.27a10.65,10.65,0,0,0,3.82,0l.52-.13a4.68,4.68,0,0,0,.73-.21l.56-.22a3.29,3.29,0,0,0,.57-.27,5.44,5.44,0,0,0,.54-.27l.26-.16a.42.42,0,0,0,.13-.07c4.56-2.88,7.49-9.76,7.49-19.39A53.13,53.13,0,0,0,395.92,280.41Z" style="fill:#E11D48"></path><path d="M390.26,284.41c0,3.81-2,5.74-4.47,4.31s-4.48-5.66-4.48-9.47,2-5.74,4.48-4.31a6.38,6.38,0,0,1,1.83,1.68,13.38,13.38,0,0,0,2.59,6.82A7.88,7.88,0,0,1,390.26,284.41Z" style="opacity:0.4"></path><path d="M402.76,284.4c0,9.87-3.08,16.85-7.84,19.61-1,.54-4.48,2.58-5.91,3.4,4.56-2.88,7.49-9.76,7.49-19.39a53.13,53.13,0,0,0-.58-7.61c-2.1-14.34-9.81-28.54-19-33.84-4.26-2.46-8.2-2.64-11.4-.95l5.9-3.4c3.27-1.91,7.35-1.82,11.76.73,9.19,5.31,16.9,19.5,19,33.85A51.47,51.47,0,0,1,402.76,284.4Z" style="fill:#fff;opacity:0.4"></path><path d="M396.5,288c0,9.63-2.93,16.51-7.49,19.39,1.43-.82,4.95-2.86,5.91-3.4,4.76-2.76,7.84-9.74,7.84-19.61,0-.36,0-.73,0-1.1l-6.26,3.62C396.49,287.29,396.5,287.65,396.5,288Z" style="fill:#E11D48"></path><path d="M396.5,288c0,9.63-2.93,16.51-7.49,19.39,1.43-.82,4.95-2.86,5.91-3.4,4.76-2.76,7.84-9.74,7.84-19.61,0-.36,0-.73,0-1.1l-6.26,3.62C396.49,287.29,396.5,287.65,396.5,288Z" style="opacity:0.1"></path><polygon points="358.28 261.92 358.28 263.95 302.26 231.61 303.29 231.01 303.29 230.17 358.28 261.92" style="opacity:0.15"></polygon><polygon points="358.28 262.76 358.28 263.95 302.26 231.61 303.29 231.01 303.29 231 358.28 262.76" style="opacity:0.15"></polygon><path d="M382.64,304a12,12,0,0,1-6-1.79c-9.13-5.27-16.56-20.95-16.56-34.95,0-8.17,2.47-14.27,6.78-16.76,3-1.74,6.55-1.52,10.28.63,9.12,5.27,16.55,21,16.55,35,0,8.16-2.47,14.27-6.78,16.75A8.51,8.51,0,0,1,382.64,304Zm-11.45-53.65a7.56,7.56,0,0,0-3.8,1c-3.93,2.27-6.28,8.22-6.28,15.9,0,13.68,7.2,29,16.06,34.08,3.39,2,6.6,2.18,9.27.64,3.93-2.27,6.28-8.21,6.28-15.89,0-13.69-7.2-29-16.05-34.09A11,11,0,0,0,371.19,250.39Z" style="opacity:0.15"></path><path d="M360,251.72a24.33,24.33,0,0,0-2,6.09l-55.79-32.22,6.26-3.61Z" style="fill:#fff;opacity:0.4"></path><path d="M432.51,254.85c2.92-5.53,6.26-17.95,7.92-24.22,2.36-8.9-1.46-14.5-5.8-14.73-2.71.42-11.64,32.89-11.64,32.89-1,.79-14.57,7.68-18.93,9.41a3.42,3.42,0,0,1-2.42,0c-2.09-.76-3.52-.62-5.57-.82-1.61-.16-2.42-.73-2.63-.39a1.84,1.84,0,0,0,.79,2.37,13.14,13.14,0,0,0,2.8,1.22,17.09,17.09,0,0,1-5.41.73c-4.2-.09-5.71,1.73-2.45,6,2,2.66,5.31,3.5,12.7.95,2.12-.74,5-2.17,7.69-3.14,5.54-2,7-2.24,11.22-3.67C426.93,259.37,431.21,257.31,432.51,254.85Z" style="fill:#ffa8a7"></path><path d="M433,215.06c2.55.35,5,.92,6.51,3s2.72,5,1.24,12.95a124.3,124.3,0,0,1-4.54,16.48s-5.94,2.54-12.25-3.9l4.34-16.78S429,215.9,433,215.06Z" style="fill:#455a64"></path></g></g></svg>
```

## File: public/SignUp.svg
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><g id="freepik--Floor--inject-197"><path id="freepik--floor--inject-197" d="M77.66,250.21c-95.18,55-95.17,144,0,199s249.49,55,344.67,0,95.17-144,0-199S172.84,195.26,77.66,250.21Z" style="fill:#fafafa"></path></g><g id="freepik--Shadows--inject-197"><path id="freepik--Shadow--inject-197" d="M113.77,459.17,17.2,404c-1.27-.73-1.27-1.92,0-2.65l277-159.94a5.08,5.08,0,0,1,4.59,0l96.57,55.17c1.27.73,1.27,1.92,0,2.65l-277,159.93A5.08,5.08,0,0,1,113.77,459.17Z" style="fill:#e0e0e0"></path><path id="freepik--shadow--inject-197" d="M68.63,430c9.94,5.8,9.94,15.22,0,21s-26.07,5.81-36,0-9.95-15.22,0-21S58.68,424.21,68.63,430Z" style="fill:#e0e0e0"></path><path id="freepik--shadow--inject-197" d="M211.83,480.61,169,455.86c-2-1.18-2-3.1,0-4.28l121.61-70.23a8.22,8.22,0,0,1,7.42,0l42.89,24.76c2.05,1.18,2.05,3.1,0,4.28L219.25,480.61A8.22,8.22,0,0,1,211.83,480.61Z" style="fill:#e0e0e0"></path><ellipse id="freepik--shadow--inject-197" cx="432.01" cy="339.41" rx="52.91" ry="30.55" style="fill:#e0e0e0"></ellipse></g><g id="freepik--Tab--inject-197"><g id="freepik--check-mark--inject-197"><path d="M177.19,455.27l36.55,21.12a5.23,5.23,0,0,0,4.75,0l116.38-67.08a5.22,5.22,0,0,0,2.36-4.11v-1.71a5.27,5.27,0,0,0-2.38-4.12L298.2,378.3a5.3,5.3,0,0,0-4.75,0l-116.29,67a5.19,5.19,0,0,0-2.36,4.11v1.71A5.29,5.29,0,0,0,177.19,455.27Z" style="fill:#f0f0f0"></path><path d="M293.6,378.22c1.81-1.05,3.69-.44,5.51.61l34.81,20c1.81,1,1.81,2.74,0,3.79l-114.57,66h0a6.51,6.51,0,0,1-6.53,0l-34.85-20a2.19,2.19,0,0,1,0-3.79h0Z" style="fill:#fafafa"></path><path d="M178,447.41a1.28,1.28,0,0,1,.47-1.75L294.06,379c1.22-.71,2.64-.52,4.59.61l34.81,20a2.14,2.14,0,0,1,.79.71c.4.7-.42,1.28-.79,1.5l-114.56,66a5.66,5.66,0,0,1-5.63,0l-34.84-20a1.3,1.3,0,0,1-.47-.46m-.79.45a2.12,2.12,0,0,0,.8.8l34.85,20a6.51,6.51,0,0,0,6.53,0l114.57-66c1.28-.75,1.66-1.82,1.12-2.75a3,3,0,0,0-1.12-1l-34.81-20c-1.82-1.05-3.7-1.66-5.51-.61L178,444.87a2.19,2.19,0,0,0-.8,3Z" style="fill:#e0e0e0"></path><path d="M177.16,445.33l.81-.46a2.19,2.19,0,0,0,0,3.79l34.84,20a6.33,6.33,0,0,0,3.26.87h.08V477a4.82,4.82,0,0,1-2.42-.58l-36.55-21.11a5.27,5.27,0,0,1-2.39-4.11v-1.71A5.23,5.23,0,0,1,177.16,445.33Z" style="fill:#e6e6e6"></path><polygon points="220.56 453.26 209.36 453.73 209.33 450.17 216.39 449.88 215.71 434.69 219.64 434.53 220.56 453.26" style="fill:#E11D48"></polygon><path d="M216.78,430.13l27.09,15.64-27.09,15.64-27.09-15.64,27.09-15.64m0-1.09-29,16.73,29,16.73,29-16.73-29-16.73Z" style="fill:#E11D48"></path><path d="M296,387l-69.15,39.89c-.36.21-.43.5-.16.66l1.18.68.7.39a1.27,1.27,0,0,0,1.14-.09l69.16-39.89c.36-.21.43-.5.16-.66l-1.89-1.07A1.27,1.27,0,0,0,296,387Z" style="fill:#e0e0e0"></path><path d="M302.31,390.64l-69.15,39.89c-.36.21-.44.51-.17.66l1.19.68.7.39a1.27,1.27,0,0,0,1.14-.09l69.15-39.89c.36-.21.44-.5.17-.66l-1.89-1.07A1.27,1.27,0,0,0,302.31,390.64Z" style="fill:#e0e0e0"></path><path d="M308.66,394.29,239.5,434.18c-.36.21-.43.51-.16.66l1.18.68.71.39a1.27,1.27,0,0,0,1.14-.09l69.15-39.89c.36-.21.43-.5.16-.66l-1.88-1.07A1.3,1.3,0,0,0,308.66,394.29Z" style="fill:#e0e0e0"></path><path d="M315,397.94l-69.15,39.89c-.36.21-.43.51-.16.66l1.18.69.7.39a1.3,1.3,0,0,0,1.14-.1l69.16-39.89c.36-.21.43-.5.16-.66l-1.89-1.07A1.3,1.3,0,0,0,315,397.94Z" style="fill:#e0e0e0"></path></g></g><g id="freepik--Padlock--inject-197"><path id="freepik--Lock--inject-197" d="M361.14,359.8l-2.9,1.68L350,356.73c-6.11-3.53-16.81-3.09-23.86,1s-7.82,10.25-1.72,13.77l8.23,4.75-2.91,1.68c-2.55,1.47-2.82,3.7-.62,5L351.81,396a9.45,9.45,0,0,0,7.47.18c13.22-5.09,24.67-11.7,33.47-19.33a2.8,2.8,0,0,0,1.16-2.29,2.62,2.62,0,0,0-1.48-2l-22.68-13.1C367.55,358.17,363.69,358.33,361.14,359.8Zm12.12,20.4-8.17,4.72-6.45-5.38a9.57,9.57,0,0,1-6.13-.76c-2.43-1.4-2.13-3.84.66-5.46s7-1.79,9.47-.39c1.57.91,2,2.26,1.31,3.54ZM353,364.51l-15.08,8.7-8.23-4.75c-3.6-2.08-3.14-5.72,1-8.12s10.47-2.66,14.07-.58Z" style="fill:#e0e0e0"></path></g><g id="freepik--Device--inject-197"><g id="freepik--device--inject-197"><g id="freepik--Case--inject-197"><path d="M295.61,250.06l5.06-2.92s37.88-81.45,40.38-86.54-2-7.68-6.87-4.88L81.6,301.36c-4.85,2.8-6.37,6.64-10.68,15s-39.24,82-39.24,82a4.64,4.64,0,0,0,1.83,5.44L102,443.45,366.18,290.92Z" style="fill:#455a64"></path><path d="M74.09,318.4c-3.27,6.35-39.54,82.38-39.54,82.38L303.87,245.29s37.68-77.39,40.35-82.66-2-7.68-6.87-4.89L84.77,303.39C79.92,306.18,77.37,312.06,74.09,318.4Z" style="fill:#263238"></path><polygon points="298.75 248.26 34.55 400.78 104.02 440.9 368.22 288.38 298.75 248.26" style="fill:#37474f"></polygon><path d="M328.1,62.23,73.57,208.91c-5.58,3.23-7.32,8.44-6.34,15.32L97.35,435.62c1,6.87,6.46,10.89,12,7.67L361.67,297.7c5.58-3.22,9.31-11.41,8.33-18.28L340,68.84C339,62,333.69,59,328.1,62.23Z" style="fill:#E11D48"></path></g><g id="freepik--Tablet--inject-197"><path d="M345.26,66.71a7.85,7.85,0,0,0-6.86.86L86.11,213.17a17,17,0,0,0-6.44,7.39l-8.14-3.46c1.79-3.9,4.91-5.33,7.59-6.89L331.39,64.61a7.77,7.77,0,0,1,7.12-.73h0Z" style="fill:#37474f"></path><path d="M105.54,445.42v0c-2.5-1-4.36-3.62-4.9-7.4L70.79,228.49c-.62-4.29-.82-8.14.74-11.39l8.14,3.45q-.32.67-.6,1.38c-.15.38-.28.76-.4,1.14a1.09,1.09,0,0,0,0,.17,12.44,12.44,0,0,0-.39,1.32c-.12.46-.22.93-.29,1.38a7.67,7.67,0,0,0-.15,1,16.32,16.32,0,0,0,0,4.47L107.8,442c.54,3.82,2.44,6.44,5,7.45Z" style="fill:#263238"></path><path d="M338.39,67.58,83.86,214.27c-5.58,3.22-7.32,8.44-6.34,15.31L107.79,442c1,6.87,6.31,9.83,11.89,6.61L372,303.05c5.58-3.22,9.31-11.41,8.32-18.28l-30-210.58C349.3,67.32,344,64.36,338.39,67.58Z" style="fill:#455a64"></path><path d="M356.47,302.08,131.28,432c-2.89,1.67-5.65.14-6.16-3.43L95.42,220.21c-.51-3.56,1.42-7.81,4.31-9.48L324.92,80.78c2.89-1.67,5.65-.13,6.16,3.43l29.7,208.4C361.29,296.17,359.36,300.41,356.47,302.08Z" style="fill:#37474f"></path><path d="M359.64,298.59a8.62,8.62,0,0,1-3.17,3.49L131.29,432c-2.77,1.61-5.43.25-6.08-3L350.39,299.07a8.76,8.76,0,0,0,3.35-3.85Z" style="fill:#263238"></path><path d="M95.42,220.21l29.7,208.39c0,.15,0,.28.08.42L350.39,299.07c2.89-1.67,4.82-5.92,4.31-9.48L324.92,80.78l-225.19,130C96.84,212.4,94.91,216.65,95.42,220.21Z" style="fill:#fafafa"></path><path d="M106.9,349.25a5,5,0,0,1-2.16,4.76c-1.46.84-2.85.07-3.1-1.72a5,5,0,0,1,2.17-4.76C105.26,346.69,106.65,347.46,106.9,349.25Z" style="fill:#263238"></path><path d="M97.06,300.45h0a3.93,3.93,0,0,0-1.69,3.71l4.92,34.31c.2,1.39,1.28,2,2.41,1.34h0a3.93,3.93,0,0,0,1.69-3.71l-4.92-34.31C99.27,300.4,98.19,299.8,97.06,300.45Z" style="fill:#263238"></path></g></g></g><g id="freepik--Screen--inject-197"><g id="freepik--Window--inject-197"><g id="freepik--window--inject-197"><path d="M336.17,91.67a1.82,1.82,0,0,0-.14-.39s0,0,0-.08a1.38,1.38,0,0,0-.16-.37,2.4,2.4,0,0,0-.37-.53,1.24,1.24,0,0,0-.19-.21,1.22,1.22,0,0,0-.17-.15,2,2,0,0,0-.36-.26l0,0a2.53,2.53,0,0,0-.45-.19A4,4,0,0,0,331,90L111.84,216.15c-2.52,1.45-4.26,4.83-3.59,9.53l28.29,197.58c-.29-2,.11.72.11.73l.13.92a3.25,3.25,0,0,0,2.13,2.47l.23.11a1.82,1.82,0,0,0,.28.11,1.94,1.94,0,0,0,.43.11,3.49,3.49,0,0,0,.64,0,3.24,3.24,0,0,0,1.58-.46l.12-.07h0l4.35-2.51L361.22,301a8.13,8.13,0,0,0,3.88-7.51L336.27,92.19A4,4,0,0,0,336.17,91.67Z" style="fill:#fafafa"></path><path d="M333.25,90.61a1.86,1.86,0,0,1,.61.1l.16.06h0l.07,0,.1.07.12.12,0,0h0l0,0,.12.13.07.07,0,0,.22.41v0l.05.06,0,0a.62.62,0,0,0,0,.1,4,4,0,0,1,.08.4L363.8,293.7a6.85,6.85,0,0,1-3.23,6.19L145.9,423.56,141.66,426l-.06,0-.11.08-.07,0a2.09,2.09,0,0,1-.94.3h-.09l-.35,0-.17,0-.18-.08-.12-.06-.08,0-.05,0,0,0a1.93,1.93,0,0,1-1.32-1.43l-.14-.93v-.05c-.05-.28-.08-.53-.12-.76v0h0L109.55,225.49c-.64-4.43,1.1-7.14,2.94-8.21L331.65,91.09a3.32,3.32,0,0,1,1.6-.48m0-1.31A4.56,4.56,0,0,0,331,90L111.84,216.15c-2.52,1.45-4.26,4.83-3.59,9.53l28.27,197.46c-.06-.45-.09-.61-.09-.61s.22,1.45.22,1.46l.13.92a3.25,3.25,0,0,0,2.13,2.47l.23.11a1.82,1.82,0,0,0,.28.11,1.94,1.94,0,0,0,.43.11,3.39,3.39,0,0,0,.54.05h.1a3.24,3.24,0,0,0,1.58-.46l.12-.07h0l4.35-2.51L361.22,301a8.13,8.13,0,0,0,3.88-7.51L336.27,92.19a4,4,0,0,0-.1-.52,1.82,1.82,0,0,0-.14-.39s0,0,0-.08a1.38,1.38,0,0,0-.16-.37,2.4,2.4,0,0,0-.37-.53,1.24,1.24,0,0,0-.19-.21,1.22,1.22,0,0,0-.17-.15,2,2,0,0,0-.36-.26l0,0a2.53,2.53,0,0,0-.45-.19,3.1,3.1,0,0,0-1-.16ZM136.52,423.14l0,.12,0-.12Z" style="fill:#E11D48"></path><path d="M334.26,89.46A4,4,0,0,0,331,90L111.84,216.15a8.17,8.17,0,0,0-3.88,7.51l1.17,8.19L102.4,229l-1.15-8.09a8.12,8.12,0,0,1,3.86-7.5L324.29,87.17a3.83,3.83,0,0,1,3.53-.4C328.77,87.19,333.14,89,334.26,89.46Z" style="fill:#E11D48"></path><path d="M336.26,92.17c-.4-2.67-2.75-3.66-5.26-2.21L111.83,216.15a8.16,8.16,0,0,0-3.87,7.51l1.18,8.19L337.44,100.4Z" style="fill:#E11D48"></path><g style="opacity:0.2"><path d="M331,90,111.84,216.15a8.25,8.25,0,0,0-3,3.28l-6.69-2.85a7.94,7.94,0,0,1,3-3.22L324.29,87.17a3.83,3.83,0,0,1,3.53-.4c.95.43,5.32,2.25,6.42,2.69A3.92,3.92,0,0,0,331,90Z" style="fill:#fff"></path></g><path d="M102.4,229l-1.16-8.11a7.31,7.31,0,0,1,.89-4.28l6.71,2.83a7.15,7.15,0,0,0-.87,4.26l1.17,8.18Z" style="opacity:0.15"></path><path d="M316.33,102.94a3.71,3.71,0,0,0-1.6,3.5c.19,1.32,1.21,1.89,2.28,1.27a3.71,3.71,0,0,0,1.6-3.5C318.42,102.89,317.4,102.32,316.33,102.94Z" style="fill:#fafafa"></path><path d="M323.31,98.9a3.72,3.72,0,0,0-1.6,3.51c.19,1.32,1.21,1.89,2.28,1.27a3.72,3.72,0,0,0,1.6-3.51C325.4,98.85,324.38,98.28,323.31,98.9Z" style="fill:#fafafa"></path><path d="M330.29,94.86a3.72,3.72,0,0,0-1.6,3.51c.19,1.32,1.21,1.89,2.28,1.27a3.72,3.72,0,0,0,1.6-3.51C332.38,94.81,331.36,94.25,330.29,94.86Z" style="fill:#fafafa"></path><path d="M138.93,427.39l-.29-.11-5.55-2.36a5.2,5.2,0,0,1-3-3.16,4.61,4.61,0,0,1-.14-.62L102.4,229l6.73,2.9,27.64,193.06a3.13,3.13,0,0,0,1.88,2.35Z" style="fill:#E11D48"></path><path d="M138.93,427.39l-.29-.11-5.55-2.36a5.2,5.2,0,0,1-3-3.16,4.61,4.61,0,0,1-.14-.62L102.4,229l6.73,2.9,27.64,193.06a3.13,3.13,0,0,0,1.87,2.35Z" style="fill:#fff;opacity:0.5"></path></g><polygon points="228.24 192.8 127.93 250.71 125.46 233.45 225.77 175.54 228.24 192.8" style="fill:#e0e0e0"></polygon><path d="M125.46,264.92a1.14,1.14,0,0,1-.57-2.13L331.55,143.47a1.15,1.15,0,0,1,1.56.42,1.13,1.13,0,0,1-.42,1.56L126,264.77A1.18,1.18,0,0,1,125.46,264.92Z" style="fill:#e0e0e0"></path><path d="M175.78,251.68,136.3,274.47c-1.44.83-2.81.06-3.07-1.71l-.07-.48a5,5,0,0,1,2.15-4.71l39.48-22.79c1.44-.84,2.81-.07,3.06,1.7l.07.48A5,5,0,0,1,175.78,251.68Z" style="fill:#e0e0e0"></path><path d="M250.77,208.38l-39.48,22.79c-1.44.83-2.81.07-3.06-1.7l-.07-.48a5,5,0,0,1,2.14-4.72l39.48-22.79c1.44-.83,2.81-.07,3.07,1.7l.06.48A5,5,0,0,1,250.77,208.38Z" style="fill:#e0e0e0"></path><path d="M325.76,165.08l-39.48,22.79c-1.44.83-2.81.07-3.06-1.7l-.07-.48A5,5,0,0,1,285.3,181l39.47-22.79c1.44-.83,2.81-.06,3.07,1.71l.07.48A5,5,0,0,1,325.76,165.08Z" style="fill:#e0e0e0"></path><polygon points="238.8 302.86 143.65 357.79 134.5 293.93 229.65 238.99 238.8 302.86" style="fill:#e0e0e0"></polygon><path d="M198.65,289.2l-20.1-4.39a2.26,2.26,0,0,0-2.71,2.53l4.23,29.53a2.25,2.25,0,0,0,4.13.88l15.88-25.15A2.25,2.25,0,0,0,198.65,289.2Z" style="fill:#fafafa"></path><path d="M291.86,211l-49.8,28.75c-1.52.88-3,.07-3.25-1.81l-.07-.5a5.3,5.3,0,0,1,2.27-5l49.8-28.75c1.53-.88,3-.07,3.25,1.81l.07.5A5.3,5.3,0,0,1,291.86,211Z" style="fill:#e0e0e0"></path><path d="M240.49,250.76a1.14,1.14,0,0,1-.58-2.13l94.18-54.38a1.14,1.14,0,1,1,1.14,2L241.06,250.6A1.1,1.1,0,0,1,240.49,250.76Z" style="fill:#e0e0e0"></path><path d="M241.8,259.92a1.12,1.12,0,0,1-1-.57,1.14,1.14,0,0,1,.42-1.56l94.17-54.37a1.14,1.14,0,1,1,1.14,2l-94.17,54.37A1.18,1.18,0,0,1,241.8,259.92Z" style="fill:#e0e0e0"></path><path d="M243.11,269.09a1.16,1.16,0,0,1-1-.57,1.13,1.13,0,0,1,.42-1.56L307,229.75a1.14,1.14,0,0,1,1.15,2l-64.45,37.21A1.18,1.18,0,0,1,243.11,269.09Z" style="fill:#e0e0e0"></path><path d="M244.42,278.26a1.15,1.15,0,0,1-.57-2.14L338,221.75a1.16,1.16,0,0,1,1.57.42,1.15,1.15,0,0,1-.42,1.56L245,278.1A1.07,1.07,0,0,1,244.42,278.26Z" style="fill:#e0e0e0"></path><path d="M245.73,287.42a1.14,1.14,0,0,1-.57-2.13l94.18-54.37a1.14,1.14,0,1,1,1.14,2l-94.17,54.37A1.19,1.19,0,0,1,245.73,287.42Z" style="fill:#e0e0e0"></path><path d="M247.05,296.59a1.14,1.14,0,0,1-.58-2.13l39.68-22.91a1.14,1.14,0,1,1,1.14,2l-39.67,22.91A1.18,1.18,0,0,1,247.05,296.59Z" style="fill:#e0e0e0"></path><polygon points="247.67 364.81 242.13 326.1 146.98 381.03 152.52 419.75 247.67 364.81" style="fill:#e0e0e0"></polygon><path d="M212.55,379.71a2.26,2.26,0,0,0-1.43-3.41L191,371.92a2.25,2.25,0,0,0-2.71,2.52l3.26,22.76,15.63-9Z" style="fill:#fafafa"></path><path d="M304.33,298.09l-49.8,28.76c-1.52.88-3,.07-3.25-1.81l-.07-.51a5.27,5.27,0,0,1,2.28-5l49.79-28.76c1.53-.88,3-.07,3.25,1.81l.08.51A5.29,5.29,0,0,1,304.33,298.09Z" style="fill:#e0e0e0"></path><path d="M253,337.86a1.12,1.12,0,0,1-1-.57,1.14,1.14,0,0,1,.41-1.56l94.18-54.37a1.14,1.14,0,1,1,1.14,2l-94.17,54.37A1.18,1.18,0,0,1,253,337.86Z" style="fill:#e0e0e0"></path><path d="M254.27,347a1.15,1.15,0,0,1-1-.57,1.13,1.13,0,0,1,.42-1.56l94.17-54.38a1.15,1.15,0,0,1,1.56.42,1.14,1.14,0,0,1-.41,1.56l-94.18,54.38A1.18,1.18,0,0,1,254.27,347Z" style="fill:#e0e0e0"></path><path d="M255.58,356.19a1.14,1.14,0,0,1-.57-2.13l64.44-37.21a1.16,1.16,0,0,1,1.57.42,1.15,1.15,0,0,1-.42,1.56L256.15,356A1.06,1.06,0,0,1,255.58,356.19Z" style="fill:#e0e0e0"></path><path d="M258,157.23a1.14,1.14,0,0,1-.58-2.13L316.57,121a1.14,1.14,0,0,1,1.14,2l-59.12,34.12A1.1,1.1,0,0,1,258,157.23Z" style="fill:#e0e0e0"></path><path d="M259.33,166.39a1.12,1.12,0,0,1-1-.57,1.14,1.14,0,0,1,.42-1.56l59.12-34.12a1.14,1.14,0,1,1,1.14,2L259.9,166.24A1.18,1.18,0,0,1,259.33,166.39Z" style="fill:#e0e0e0"></path><path d="M260.64,175.56a1.16,1.16,0,0,1-1-.57,1.14,1.14,0,0,1,.42-1.56l59.11-34.13a1.14,1.14,0,0,1,1.15,2l-59.12,34.13A1.16,1.16,0,0,1,260.64,175.56Z" style="fill:#e0e0e0"></path></g></g><g id="freepik--window--inject-197"><g id="freepik--tab--inject-197"><g id="freepik--screen--inject-197"><path d="M126.6,243.15a3.9,3.9,0,0,1,.2-.47h0A4,4,0,0,0,126.6,243.15Z" style="fill:#ebebeb"></path><path d="M331.86,125.31a1.3,1.3,0,0,0-1.23-.74,2.2,2.2,0,0,0-1,.31L128.17,241.2a3.7,3.7,0,0,0-1.37,1.48l-7.07-3a3.72,3.72,0,0,1,1.31-1.41l201.5-116.32a5.61,5.61,0,0,1,4.43-.19l2.38,1A4.75,4.75,0,0,1,331.86,125.31Z" style="fill:#37474f;opacity:0.5"></path><g style="opacity:0.9"><path d="M152,407.91a5.76,5.76,0,0,1-4.43.21L145.21,407a4.71,4.71,0,0,1-2.69-3.17L119.3,241.63a3.3,3.3,0,0,1,.43-2l7.09,3a3.18,3.18,0,0,0-.39,1.89l23.24,162.34A1.44,1.44,0,0,0,152,407.91Z" style="fill:#263238"></path></g><g style="opacity:0.85"><path d="M330.62,124.58a2.06,2.06,0,0,0-.95.3L128.17,241.2a3.68,3.68,0,0,0-1.74,3.37l23.24,162.34a1.35,1.35,0,0,0,1.41,1.3,2.06,2.06,0,0,0,.95-.3l201.5-116.32a3.66,3.66,0,0,0,1.74-3.37L332,125.88a1.36,1.36,0,0,0-1.41-1.3Z" style="fill:#37474f"></path></g><path d="M330.49,126.08l23.22,162.2a2.53,2.53,0,0,1-1.13,2.19L151.21,406.72,128,244.51a2.5,2.5,0,0,1,1.13-2.18L330.49,126.08m.13-1.5a2.06,2.06,0,0,0-.95.3L128.17,241.2a3.68,3.68,0,0,0-1.74,3.37l23.24,162.34a1.35,1.35,0,0,0,1.41,1.3,2.06,2.06,0,0,0,.95-.3l201.5-116.32a3.66,3.66,0,0,0,1.74-3.37L332,125.88a1.36,1.36,0,0,0-1.41-1.3Z" style="fill:#455a64"></path></g><path d="M198.66,221.79a6.85,6.85,0,0,1,2.47-.92,4.8,4.8,0,0,1,2.06.1,3.26,3.26,0,0,1,1.48.89,2.7,2.7,0,0,1,.71,1.42.84.84,0,0,1-.07.46.7.7,0,0,1-.28.34l-2.68,1.55a.84.84,0,0,1-.87.07l-.23-.14a1.14,1.14,0,0,0-.43-.15,1.9,1.9,0,0,0-.66,0,2.9,2.9,0,0,0-.92.38,6.32,6.32,0,0,0-.74.49,4.19,4.19,0,0,0-.61.57,2.29,2.29,0,0,0-.39.65,1.4,1.4,0,0,0-.08.73.69.69,0,0,0,.28.52,1.25,1.25,0,0,0,.72.09,7.77,7.77,0,0,0,1.28-.29l2-.61a8.63,8.63,0,0,1,2.06-.43,3.21,3.21,0,0,1,1.56.26,2.48,2.48,0,0,1,1,1,5.35,5.35,0,0,1,.57,1.89,6.56,6.56,0,0,1-.14,2.57,9,9,0,0,1-1.07,2.49,11.77,11.77,0,0,1-1.85,2.25,13,13,0,0,1-2.47,1.84,8.21,8.21,0,0,1-2.6,1,5.1,5.1,0,0,1-2.15-.06,3.32,3.32,0,0,1-1.54-.93,3.11,3.11,0,0,1-.76-1.6.89.89,0,0,1,.08-.47.66.66,0,0,1,.27-.33l2.68-1.55a1,1,0,0,1,.46-.17.84.84,0,0,1,.37.07l.29.19a1.51,1.51,0,0,0,.51.21,1.86,1.86,0,0,0,.75,0,3,3,0,0,0,1.06-.42,8,8,0,0,0,1.77-1.33,1.72,1.72,0,0,0,.58-1.46.53.53,0,0,0-.36-.48,1.85,1.85,0,0,0-.86,0,12.13,12.13,0,0,0-1.42.37c-.58.19-1.25.4-2,.63a4,4,0,0,1-3.34-.08,3.88,3.88,0,0,1-1.47-2.9,6.62,6.62,0,0,1,.1-2.29,9.22,9.22,0,0,1,.91-2.41,10.37,10.37,0,0,1,1.66-2.25A10.09,10.09,0,0,1,198.66,221.79Z" style="fill:#fafafa"></path><path d="M210.24,234.46a.4.4,0,0,1-.42,0,.49.49,0,0,1-.23-.39l-2.33-16.27a1,1,0,0,1,.1-.57.82.82,0,0,1,.36-.43l2.67-1.55a.42.42,0,0,1,.42,0,.47.47,0,0,1,.23.39l2.33,16.27a1,1,0,0,1-.09.57.92.92,0,0,1-.36.43Z" style="fill:#fafafa"></path><path d="M220.22,213.7a4.1,4.1,0,0,0-1.81,2,4.43,4.43,0,0,0-.3,1.19,8.24,8.24,0,0,0-.05,1.22c0,.24,0,.55.08.94s.1.79.16,1.2.13.81.2,1.2.12.68.17.89a4.06,4.06,0,0,0,.35,1,1.75,1.75,0,0,0,.58.67,1.38,1.38,0,0,0,.87.2,2.93,2.93,0,0,0,1.19-.43,5.1,5.1,0,0,0,1-.73,4,4,0,0,0,.75-1,3.54,3.54,0,0,0,.43-1.18,4.07,4.07,0,0,0,0-1.4l-1.72,1a.4.4,0,0,1-.42,0,.46.46,0,0,1-.23-.38l-.39-2.67a1.07,1.07,0,0,1,.1-.57.92.92,0,0,1,.36-.43l4.95-2.86a.42.42,0,0,1,.42,0,.49.49,0,0,1,.23.38l.46,3.23a9.43,9.43,0,0,1-.08,3.18,11,11,0,0,1-1,3,11.61,11.61,0,0,1-1.82,2.53,10.76,10.76,0,0,1-2.44,1.93,6.77,6.77,0,0,1-2.7,1,3.92,3.92,0,0,1-2.19-.33,3.82,3.82,0,0,1-1.57-1.45,7.13,7.13,0,0,1-.88-2.35c-.12-.67-.24-1.4-.35-2.19s-.21-1.55-.29-2.29a9.89,9.89,0,0,1,.12-2.91,11.13,11.13,0,0,1,.94-2.91,11.41,11.41,0,0,1,1.76-2.61,10.57,10.57,0,0,1,2.56-2.07,7.16,7.16,0,0,1,2.66-1,4.58,4.58,0,0,1,2.13.19,3.49,3.49,0,0,1,1.49,1,3.26,3.26,0,0,1,.75,1.51.67.67,0,0,1-.07.47.81.81,0,0,1-.3.35l-2.72,1.57a.48.48,0,0,1-.51.05l-.41-.26a1.86,1.86,0,0,0-.89-.38A2.63,2.63,0,0,0,220.22,213.7Z" style="fill:#fafafa"></path><path d="M240.18,217.18a.66.66,0,0,1-.59.09.79.79,0,0,1-.33-.19l-5.91-5.91,1.21,8.51a1,1,0,0,1-.09.58.84.84,0,0,1-.36.42l-2.68,1.55a.38.38,0,0,1-.42,0,.49.49,0,0,1-.23-.38l-2.33-16.27a1,1,0,0,1,.1-.58.84.84,0,0,1,.36-.42l2.12-1.23a.69.69,0,0,1,.6-.1,1.14,1.14,0,0,1,.32.19l5.92,5.91-1.22-8.51a1.08,1.08,0,0,1,.1-.57.92.92,0,0,1,.36-.43l2.68-1.54a.39.39,0,0,1,.41,0,.51.51,0,0,1,.24.39L242.77,215a1.07,1.07,0,0,1-.1.57.92.92,0,0,1-.36.43Z" style="fill:#fafafa"></path><path d="M259.28,187.06a.42.42,0,0,1,.42,0,.51.51,0,0,1,.23.38l1.44,10.05a11.32,11.32,0,0,1,0,3.34,10.72,10.72,0,0,1-1,3,10.5,10.5,0,0,1-1.78,2.51,11,11,0,0,1-2.45,1.92,7.78,7.78,0,0,1-2.6,1,3.42,3.42,0,0,1-3.75-1.75,7.68,7.68,0,0,1-.89-2.82l-1.44-10.05a1.08,1.08,0,0,1,.1-.57.92.92,0,0,1,.36-.43l2.68-1.54a.39.39,0,0,1,.41,0,.51.51,0,0,1,.24.39l1.42,10a2.85,2.85,0,0,0,.94,2c.49.34,1.14.27,2-.2a3.81,3.81,0,0,0,1.7-1.92,5.25,5.25,0,0,0,.27-2.71l-1.43-9.95a1.1,1.1,0,0,1,.1-.58.94.94,0,0,1,.36-.42Z" style="fill:#fafafa"></path><path d="M269,181.48a8.42,8.42,0,0,1,2.41-1,3.36,3.36,0,0,1,1.93.09,2.87,2.87,0,0,1,1.41,1.19,6,6,0,0,1,.76,2.34,8.92,8.92,0,0,1,0,2.83,8.19,8.19,0,0,1-.87,2.49,9.1,9.1,0,0,1-1.62,2.13,10.69,10.69,0,0,1-2.3,1.74L268,194.8l.73,5.14a1,1,0,0,1-.09.57.92.92,0,0,1-.36.43l-2.68,1.55a.42.42,0,0,1-.42,0,.47.47,0,0,1-.23-.39l-2.33-16.27a1,1,0,0,1,.09-.57.92.92,0,0,1,.36-.43Zm-1.49,9.39,2.52-1.45a3.8,3.8,0,0,0,1.35-1.29,2.65,2.65,0,0,0,.35-1.84q-.15-1.06-.78-1.2a2.08,2.08,0,0,0-1.49.35l-2.52,1.45Z" style="fill:#fafafa"></path><path d="M173.76,270.11c0,.36.08.7.13,1s.1.64.16,1a1.81,1.81,0,0,0,.72,1.32,1.32,1.32,0,0,0,1.4-.15,3.13,3.13,0,0,0,.76-.59,2.69,2.69,0,0,0,.72-1.37,4.3,4.3,0,0,0,.08-.69.52.52,0,0,1,.07-.25.42.42,0,0,1,.15-.15l.44-.26a.16.16,0,0,1,.16,0,.2.2,0,0,1,.09.15,3.52,3.52,0,0,1,0,.95,5,5,0,0,1-.35,1.15,5.13,5.13,0,0,1-.74,1.16,4.16,4.16,0,0,1-1.19,1,2.65,2.65,0,0,1-1.15.4,1.64,1.64,0,0,1-.94-.18,1.79,1.79,0,0,1-.69-.7,3.43,3.43,0,0,1-.4-1.17c-.12-.69-.22-1.39-.3-2.11a5.55,5.55,0,0,1,0-1.41,4.93,4.93,0,0,1,1.15-2.49,4.08,4.08,0,0,1,1.08-.89,2.92,2.92,0,0,1,1.27-.44,1.73,1.73,0,0,1,.93.21,1.7,1.7,0,0,1,.6.59,2.14,2.14,0,0,1,.28.76.47.47,0,0,1,0,.23.44.44,0,0,1-.14.16l-.44.26a.33.33,0,0,1-.17,0,.18.18,0,0,1-.12-.14A2.09,2.09,0,0,0,177,267a.89.89,0,0,0-.39-.33,1,1,0,0,0-.58-.07,2.27,2.27,0,0,0-.8.31,2.86,2.86,0,0,0-1.23,1.37A3.82,3.82,0,0,0,173.76,270.11Z" style="fill:#fafafa"></path><path d="M181.83,264.35a.17.17,0,0,1,.19,0,.21.21,0,0,1,.11.18l.06.38a.44.44,0,0,1-.05.27.42.42,0,0,1-.17.2l-.56.32a1.82,1.82,0,0,0-.91,2l.5,3.47a.52.52,0,0,1-.05.27.42.42,0,0,1-.17.2l-.35.21a.21.21,0,0,1-.2,0,.25.25,0,0,1-.11-.18l-.79-5.54a.43.43,0,0,1,0-.27.42.42,0,0,1,.17-.2l.36-.21a.2.2,0,0,1,.2,0,.25.25,0,0,1,.1.18l.06.37a2.34,2.34,0,0,1,.39-.79,2.31,2.31,0,0,1,.68-.57Z" style="fill:#fafafa"></path><path d="M183,266.4a4.37,4.37,0,0,1,.06-1.14,4.46,4.46,0,0,1,.34-1.09,3.88,3.88,0,0,1,.59-.95,3.37,3.37,0,0,1,.84-.71,2.29,2.29,0,0,1,1-.33,1.32,1.32,0,0,1,.79.2,1.72,1.72,0,0,1,.58.7,4,4,0,0,1,.33,1.15l0,.32a.43.43,0,0,1,0,.27.45.45,0,0,1-.17.21L184,266.94V267a1.27,1.27,0,0,0,.58,1,1,1,0,0,0,1-.11,2.46,2.46,0,0,0,.77-.64,3.18,3.18,0,0,0,.37-.66.9.9,0,0,1,.12-.21.63.63,0,0,1,.17-.14l.29-.16a.21.21,0,0,1,.2,0,.17.17,0,0,1,.1.18,2.22,2.22,0,0,1-.09.57,3.13,3.13,0,0,1-.33.7,4.06,4.06,0,0,1-.58.74,4.32,4.32,0,0,1-.87.66,1.89,1.89,0,0,1-.9.29,1.37,1.37,0,0,1-.75-.18,1.73,1.73,0,0,1-.58-.59,3,3,0,0,1-.37-.95A6.34,6.34,0,0,1,183,266.4Zm.86-.46,2.71-1.56v0a1.16,1.16,0,0,0-.54-.94,1.07,1.07,0,0,0-1,.14,1.81,1.81,0,0,0-.51.41,2.83,2.83,0,0,0-.38.57,2.49,2.49,0,0,0-.21.67,2.18,2.18,0,0,0,0,.72Z" style="fill:#fafafa"></path><path d="M188.5,265.5a2.57,2.57,0,0,1,0-.92,3.29,3.29,0,0,1,.34-.85,4.2,4.2,0,0,1,.58-.77,6.75,6.75,0,0,1,.73-.68l1.32-1.06,0-.15c-.06-.41-.21-.65-.46-.73a1.06,1.06,0,0,0-.84.17,1.63,1.63,0,0,0-.62.56,2.8,2.8,0,0,0-.3.66,1,1,0,0,1-.11.21,1,1,0,0,1-.18.14l-.29.16a.19.19,0,0,1-.2,0,.21.21,0,0,1-.11-.19,1.71,1.71,0,0,1,.1-.63,2.89,2.89,0,0,1,.33-.72,4.31,4.31,0,0,1,.54-.69,3.27,3.27,0,0,1,.69-.55,2.5,2.5,0,0,1,.83-.31,1.25,1.25,0,0,1,.7.09,1.18,1.18,0,0,1,.52.5,2.37,2.37,0,0,1,.29.92l.52,3.62a.51.51,0,0,1,0,.27.43.43,0,0,1-.17.2l-.36.21a.21.21,0,0,1-.2,0,.26.26,0,0,1-.11-.18l-.07-.49a1.6,1.6,0,0,1-.21.56,3.7,3.7,0,0,1-.38.53,4,4,0,0,1-.46.46,4.87,4.87,0,0,1-.47.34,2.06,2.06,0,0,1-.71.26,1.1,1.1,0,0,1-.58,0,.81.81,0,0,1-.42-.34A1.25,1.25,0,0,1,188.5,265.5Zm1.87-.37a2.47,2.47,0,0,0,.61-.5,2.61,2.61,0,0,0,.45-.65,2.41,2.41,0,0,0,.24-.73,2.55,2.55,0,0,0,0-.78l0-.3-1.11.89a4.39,4.39,0,0,0-.91.93,1.26,1.26,0,0,0-.26.88.62.62,0,0,0,.08.24.46.46,0,0,0,.2.16.48.48,0,0,0,.3,0A1.26,1.26,0,0,0,190.37,265.13Z" style="fill:#fafafa"></path><path d="M195.3,261a2.15,2.15,0,0,0,.09.4.7.7,0,0,0,.17.27.39.39,0,0,0,.28.08,1.17,1.17,0,0,0,.42-.16l.51-.3a.21.21,0,0,1,.2,0,.21.21,0,0,1,.11.18l0,.38a.43.43,0,0,1,0,.27.38.38,0,0,1-.17.2l-.61.35c-.56.33-1,.38-1.29.17a1.9,1.9,0,0,1-.6-1.33l-.44-3.07-.71.41a.21.21,0,0,1-.2,0,.21.21,0,0,1-.11-.18l-.05-.38a.49.49,0,0,1,.21-.47l.72-.41-.28-1.94a.51.51,0,0,1,0-.27.49.49,0,0,1,.17-.2l.36-.21a.21.21,0,0,1,.2,0,.23.23,0,0,1,.11.18l.27,1.94,1.23-.71a.21.21,0,0,1,.2,0,.22.22,0,0,1,.1.18l.06.38a.51.51,0,0,1,0,.27.49.49,0,0,1-.17.2l-1.23.71Z" style="fill:#fafafa"></path><path d="M197.39,258.07a4.59,4.59,0,0,1,.4-2.24,3.88,3.88,0,0,1,.59-1,3.14,3.14,0,0,1,.84-.7,2.29,2.29,0,0,1,1-.33,1.26,1.26,0,0,1,.79.19,1.79,1.79,0,0,1,.58.7,4.11,4.11,0,0,1,.33,1.16l0,.32a.44.44,0,0,1,0,.27.42.42,0,0,1-.17.2l-3.32,1.91v.08a1.29,1.29,0,0,0,.58,1,1.05,1.05,0,0,0,1-.12,2.33,2.33,0,0,0,.77-.64,3.18,3.18,0,0,0,.37-.66,1.72,1.72,0,0,1,.12-.21.5.5,0,0,1,.17-.13l.29-.17a.21.21,0,0,1,.2,0c.07,0,.1.09.1.19a2.21,2.21,0,0,1-.09.56,2.94,2.94,0,0,1-.33.7,4.17,4.17,0,0,1-.58.74,4,4,0,0,1-.87.66,1.92,1.92,0,0,1-.9.3,1.28,1.28,0,0,1-.75-.19,1.64,1.64,0,0,1-.58-.59,3,3,0,0,1-.37-.95A6.36,6.36,0,0,1,197.39,258.07Zm.86-.46L201,256v0a1.16,1.16,0,0,0-.54-.95,1.09,1.09,0,0,0-1,.14,2.24,2.24,0,0,0-.51.41,2.83,2.83,0,0,0-.38.57,2.72,2.72,0,0,0-.24,1.39Z" style="fill:#fafafa"></path><path d="M205.29,255.8a2.58,2.58,0,0,1,0-.92,3.06,3.06,0,0,1,.33-.85,4.14,4.14,0,0,1,.58-.76,7.94,7.94,0,0,1,.73-.69l1.32-1.05,0-.16q-.09-.6-.45-.72a1.06,1.06,0,0,0-.85.16,1.71,1.71,0,0,0-.62.56,3.11,3.11,0,0,0-.3.67.75.75,0,0,1-.11.2.54.54,0,0,1-.18.14l-.29.17a.21.21,0,0,1-.2,0,.19.19,0,0,1-.1-.18,1.68,1.68,0,0,1,.09-.63,2.89,2.89,0,0,1,.33-.72,3.9,3.9,0,0,1,.54-.69,3,3,0,0,1,.69-.55,2.36,2.36,0,0,1,.83-.31,1.24,1.24,0,0,1,.7.08,1.19,1.19,0,0,1,.52.5,2.43,2.43,0,0,1,.29.92l.52,3.63a.45.45,0,0,1,0,.27.42.42,0,0,1-.17.2l-.36.2a.17.17,0,0,1-.19,0,.19.19,0,0,1-.11-.18l-.07-.48a1.92,1.92,0,0,1-.22.55,2.72,2.72,0,0,1-.38.53,4.09,4.09,0,0,1-.46.47,3.73,3.73,0,0,1-.47.33,2.1,2.1,0,0,1-.71.27,1.1,1.1,0,0,1-.58,0,.82.82,0,0,1-.41-.33A1.47,1.47,0,0,1,205.29,255.8Zm1.87-.37a2.48,2.48,0,0,0,.62-.5,2.52,2.52,0,0,0,.44-.64,2.47,2.47,0,0,0,.24-.74,2.27,2.27,0,0,0,0-.78l0-.29-1.11.88a4.43,4.43,0,0,0-.91.94,1.25,1.25,0,0,0-.26.88.46.46,0,0,0,.09.23.43.43,0,0,0,.19.16.48.48,0,0,0,.3,0A1.09,1.09,0,0,0,207.16,255.43Z" style="fill:#fafafa"></path><path d="M218,250.13a.23.23,0,0,1-.24,0,.7.7,0,0,1-.19-.15l-4-4,.84,5.84a.44.44,0,0,1-.05.27.38.38,0,0,1-.17.2l-.39.23a.21.21,0,0,1-.2,0,.25.25,0,0,1-.11-.19l-1.1-7.67a.44.44,0,0,1,.05-.27.42.42,0,0,1,.17-.2l.34-.2a.23.23,0,0,1,.24,0,.9.9,0,0,1,.19.15l4,4-.84-5.85a.44.44,0,0,1,.05-.27.42.42,0,0,1,.17-.2l.39-.23a.21.21,0,0,1,.2,0,.26.26,0,0,1,.11.18l1.1,7.68a.56.56,0,0,1-.05.27.42.42,0,0,1-.17.2Z" style="fill:#fafafa"></path><path d="M219.43,245.34a4.37,4.37,0,0,1,.06-1.14,4.54,4.54,0,0,1,.34-1.1,3.82,3.82,0,0,1,.59-.94,3.17,3.17,0,0,1,.84-.71,2.29,2.29,0,0,1,1-.33,1.27,1.27,0,0,1,.79.2,1.75,1.75,0,0,1,.58.69,4.21,4.21,0,0,1,.33,1.16l.05.32a.52.52,0,0,1-.05.27.38.38,0,0,1-.17.2l-3.32,1.92V246a1.27,1.27,0,0,0,.58,1,1.07,1.07,0,0,0,1-.11,2.35,2.35,0,0,0,.77-.65,2.89,2.89,0,0,0,.37-.65.9.9,0,0,1,.12-.21.51.51,0,0,1,.17-.14l.29-.17a.21.21,0,0,1,.2,0,.17.17,0,0,1,.1.18,1.85,1.85,0,0,1-.09.57,3.86,3.86,0,0,1-.32.7,4.72,4.72,0,0,1-.59.73,4,4,0,0,1-.87.67,2,2,0,0,1-.9.29,1.37,1.37,0,0,1-.75-.18,1.73,1.73,0,0,1-.58-.59,3.1,3.1,0,0,1-.37-1A6.1,6.1,0,0,1,219.43,245.34Zm.86-.46,2.71-1.56v0a1.14,1.14,0,0,0-.54-.94,1.07,1.07,0,0,0-1.05.14,1.81,1.81,0,0,0-.51.41,2.76,2.76,0,0,0-.38.56,2.56,2.56,0,0,0-.21.68,2.16,2.16,0,0,0,0,.72Z" style="fill:#fafafa"></path><path d="M229.86,241.22l.51-4.59a.79.79,0,0,1,.08-.25.47.47,0,0,1,.2-.22L231,236a.17.17,0,0,1,.18,0,.22.22,0,0,1,.09.17.31.31,0,0,1,0,.1l-.69,6.31a2.21,2.21,0,0,1-.07.3.39.39,0,0,1-.18.2l-.3.18c-.08,0-.15.05-.2,0a.73.73,0,0,1-.14-.16L228,239.77l-.59,4.61a1.32,1.32,0,0,1-.08.3.39.39,0,0,1-.17.21l-.3.17a.17.17,0,0,1-.2,0,.54.54,0,0,1-.14-.18l-2.25-4.61,0-.09a.51.51,0,0,1,0-.24.45.45,0,0,1,.15-.18l.32-.18q.15-.09.24,0a.3.3,0,0,1,.13.12l1.65,3.35.59-4.64a1.4,1.4,0,0,1,.06-.24.41.41,0,0,1,.2-.21l.21-.13c.1-.05.17-.06.22,0a.41.41,0,0,1,.12.14Z" style="fill:#fafafa"></path><path d="M239,236l-3.35,1.93-.28,1.87a1.13,1.13,0,0,1-.07.26.63.63,0,0,1-.26.25l-.36.21a.15.15,0,0,1-.16,0,.2.2,0,0,1-.09-.15.8.8,0,0,1,0-.19l1.29-8.86a1.33,1.33,0,0,1,.11-.34.56.56,0,0,1,.27-.3l.58-.33a.27.27,0,0,1,.3,0,.52.52,0,0,1,.18.18l3.43,6.14a.37.37,0,0,1,.07.14.6.6,0,0,1,0,.22.37.37,0,0,1-.14.16l-.36.21c-.13.07-.22.09-.28,0a.35.35,0,0,1-.14-.13Zm-3.17.67,2.68-1.55-1.94-3.47Z" style="fill:#fafafa"></path><path d="M241.81,233.51a2.12,2.12,0,0,0,.28.72,1,1,0,0,0,.4.36.8.8,0,0,0,.46.07,1.3,1.3,0,0,0,.49-.17,2.47,2.47,0,0,0,.76-.67,2.5,2.5,0,0,0,.41-1,1.06,1.06,0,0,1,.1-.34.44.44,0,0,1,.17-.16l.29-.17a.18.18,0,0,1,.2,0,.21.21,0,0,1,.11.18,2.34,2.34,0,0,1-.06.71,3.75,3.75,0,0,1-.33.87,4.74,4.74,0,0,1-.6.88,3.32,3.32,0,0,1-.91.74,2.28,2.28,0,0,1-1,.33,1.32,1.32,0,0,1-.77-.18,1.6,1.6,0,0,1-.57-.61,2.78,2.78,0,0,1-.33-1c0-.12-.06-.28-.09-.46s0-.35,0-.49a5.8,5.8,0,0,1,0-1.18,4.53,4.53,0,0,1,.32-1.12,3.8,3.8,0,0,1,.6-1,3.18,3.18,0,0,1,.91-.75,2.19,2.19,0,0,1,1-.34,1.73,1.73,0,0,1,.74.1,1.25,1.25,0,0,1,.51.39,1.52,1.52,0,0,1,.24.54.54.54,0,0,1,0,.27.51.51,0,0,1-.18.2l-.29.17a.28.28,0,0,1-.19,0,.42.42,0,0,1-.17-.18.83.83,0,0,0-.62-.42,1.53,1.53,0,0,0-.82.25,2.14,2.14,0,0,0-.84.93,3.13,3.13,0,0,0-.24.73,3,3,0,0,0,0,.9A4.86,4.86,0,0,0,241.81,233.51Z" style="fill:#fafafa"></path><path d="M247.16,230.42a2.12,2.12,0,0,0,.28.72,1,1,0,0,0,.4.36.82.82,0,0,0,.47.07,1.32,1.32,0,0,0,.48-.17,2.6,2.6,0,0,0,.76-.67,2.36,2.36,0,0,0,.41-1,1.28,1.28,0,0,1,.1-.34.52.52,0,0,1,.17-.16l.29-.17a.21.21,0,0,1,.2,0,.22.22,0,0,1,.11.19,2.34,2.34,0,0,1-.06.71,3.35,3.35,0,0,1-.33.87,4.3,4.3,0,0,1-.6.88,3.43,3.43,0,0,1-.9.74,2.38,2.38,0,0,1-1,.33,1.41,1.41,0,0,1-.78-.18,1.6,1.6,0,0,1-.57-.61,3.35,3.35,0,0,1-.33-1c0-.12,0-.28-.08-.46s-.05-.35-.06-.49a5.8,5.8,0,0,1,0-1.18,4.52,4.52,0,0,1,.31-1.12,3.8,3.8,0,0,1,.6-1A3.54,3.54,0,0,1,248,226a2.29,2.29,0,0,1,1-.33,1.59,1.59,0,0,1,.74.1,1.18,1.18,0,0,1,.51.39,1.45,1.45,0,0,1,.24.54.45.45,0,0,1,0,.27.51.51,0,0,1-.18.2l-.28.17a.3.3,0,0,1-.19,0,.38.38,0,0,1-.18-.18.81.81,0,0,0-.61-.42,1.51,1.51,0,0,0-.82.25,2,2,0,0,0-.47.37,2.89,2.89,0,0,0-.38.56,3.68,3.68,0,0,0-.24.73,3.3,3.3,0,0,0,0,.9A4.86,4.86,0,0,0,247.16,230.42Z" style="fill:#fafafa"></path><path d="M253.4,222.9a2.32,2.32,0,0,1,1-.34,1.33,1.33,0,0,1,.77.14,1.58,1.58,0,0,1,.58.57,3.7,3.7,0,0,1,.36,1c0,.06,0,.15,0,.25s0,.2.05.3,0,.21,0,.31,0,.19,0,.25a6,6,0,0,1-.06,1.21,4,4,0,0,1-.33,1.09,4.14,4.14,0,0,1-.62.94,3.39,3.39,0,0,1-.9.73,2.33,2.33,0,0,1-.95.34,1.35,1.35,0,0,1-.78-.14,1.55,1.55,0,0,1-.57-.57,3,3,0,0,1-.36-1,1.14,1.14,0,0,1,0-.23,2.87,2.87,0,0,1-.05-.31c0-.11,0-.21,0-.31s0-.19,0-.26a4.36,4.36,0,0,1,.05-1.2,4,4,0,0,1,.34-1.1,3.89,3.89,0,0,1,.61-.94A3.39,3.39,0,0,1,253.4,222.9Zm1.94,2.89c0-.14,0-.31-.05-.5s-.06-.36-.09-.5a2.69,2.69,0,0,0-.22-.59,1,1,0,0,0-.35-.38.83.83,0,0,0-.48-.11,1.4,1.4,0,0,0-.6.21,2,2,0,0,0-.57.47,2.35,2.35,0,0,0-.38.6,3.2,3.2,0,0,0-.19.69,4.54,4.54,0,0,0,0,.74c0,.15,0,.32.05.51s.06.36.09.49a2.42,2.42,0,0,0,.23.59,1,1,0,0,0,.34.38.85.85,0,0,0,.48.11,1.35,1.35,0,0,0,.6-.21,2,2,0,0,0,.57-.47,2.35,2.35,0,0,0,.38-.6,2.72,2.72,0,0,0,.19-.69A3.67,3.67,0,0,0,255.34,225.79Z" style="fill:#fafafa"></path><path d="M256.93,221.34a.43.43,0,0,1,0-.27.38.38,0,0,1,.17-.2l.36-.21a.21.21,0,0,1,.2,0,.24.24,0,0,1,.11.18l.44,3.14a1.64,1.64,0,0,0,.53,1.17,1,1,0,0,0,1-.11,2.12,2.12,0,0,0,.89-1,2.85,2.85,0,0,0,.15-1.57l-.45-3.13a.51.51,0,0,1,0-.27.43.43,0,0,1,.17-.2l.36-.21a.18.18,0,0,1,.2,0,.21.21,0,0,1,.11.18l.79,5.54a.46.46,0,0,1-.05.27.41.41,0,0,1-.16.2l-.36.2a.18.18,0,0,1-.2,0,.24.24,0,0,1-.11-.18l-.05-.37a3.69,3.69,0,0,1-.44.86,2.67,2.67,0,0,1-.89.79,2.14,2.14,0,0,1-.86.29,1.23,1.23,0,0,1-.72-.15,1.4,1.4,0,0,1-.53-.59,3,3,0,0,1-.31-1Z" style="fill:#fafafa"></path><path d="M268,221a.45.45,0,0,1,0,.27.42.42,0,0,1-.17.2l-.36.2a.19.19,0,0,1-.19,0,.22.22,0,0,1-.11-.19l-.45-3.13c-.09-.61-.27-1-.56-1.16a1,1,0,0,0-1.05.12,2.18,2.18,0,0,0-.92,1,2.79,2.79,0,0,0-.17,1.58l.44,3.13a.43.43,0,0,1,0,.27.38.38,0,0,1-.17.2l-.36.21a.19.19,0,0,1-.19,0,.21.21,0,0,1-.11-.18l-.8-5.54a.5.5,0,0,1,0-.26.41.41,0,0,1,.17-.21l.36-.2a.17.17,0,0,1,.19,0,.21.21,0,0,1,.11.18l.05.37a3.76,3.76,0,0,1,.47-.87,2.89,2.89,0,0,1,.91-.81,2.18,2.18,0,0,1,.87-.29,1.19,1.19,0,0,1,.73.14,1.38,1.38,0,0,1,.55.59,3,3,0,0,1,.32,1Z" style="fill:#fafafa"></path><path d="M270.37,217.67a2.15,2.15,0,0,0,.09.4.6.6,0,0,0,.17.27.36.36,0,0,0,.28.08,1.25,1.25,0,0,0,.42-.16l.51-.3a.2.2,0,0,1,.2,0,.27.27,0,0,1,.1.18l.06.38a.44.44,0,0,1-.05.27.34.34,0,0,1-.17.2l-.6.36c-.56.32-1,.37-1.3.16a1.86,1.86,0,0,1-.59-1.32l-.44-3.08-.72.41a.17.17,0,0,1-.19,0,.21.21,0,0,1-.11-.18L268,215a.44.44,0,0,1,0-.27.42.42,0,0,1,.17-.2l.71-.41-.28-1.94a.52.52,0,0,1,.05-.27.42.42,0,0,1,.17-.2l.36-.21a.19.19,0,0,1,.19,0,.25.25,0,0,1,.11.18l.28,1.94,1.22-.71a.21.21,0,0,1,.2,0,.25.25,0,0,1,.11.18l.05.38a.43.43,0,0,1,0,.27.45.45,0,0,1-.17.21l-1.22.7Z" style="fill:#fafafa"></path><path d="M275.47,208.92a.51.51,0,0,1,0,.27.42.42,0,0,1-.17.2l-.55.32a.21.21,0,0,1-.2,0,.21.21,0,0,1-.11-.18l-.1-.68a.52.52,0,0,1,.05-.27.42.42,0,0,1,.17-.2l.55-.32a.21.21,0,0,1,.2,0,.24.24,0,0,1,.1.18Zm.92,7.17a.43.43,0,0,1,0,.27.42.42,0,0,1-.17.2l-.36.21a.19.19,0,0,1-.19,0,.25.25,0,0,1-.11-.18l-.8-5.54a.54.54,0,0,1,0-.27.42.42,0,0,1,.17-.2l.36-.2a.17.17,0,0,1,.19,0,.25.25,0,0,1,.11.19Z" style="fill:#fafafa"></path><path d="M280.5,212.22a.43.43,0,0,0-.16-.32.49.49,0,0,0-.34-.08,2.87,2.87,0,0,0-.54.1l-.76.22a1.35,1.35,0,0,1-1.19,0,1.36,1.36,0,0,1-.47-.92,2.38,2.38,0,0,1,0-.75,2.69,2.69,0,0,1,.26-.77,3.17,3.17,0,0,1,.53-.72,3.35,3.35,0,0,1,.8-.62,2.73,2.73,0,0,1,.85-.35,1.54,1.54,0,0,1,.64,0,.93.93,0,0,1,.43.22.79.79,0,0,1,.2.37.45.45,0,0,1,0,.27.51.51,0,0,1-.18.2l-.32.19a.38.38,0,0,1-.14,0,.23.23,0,0,1-.17,0,.6.6,0,0,0-.42-.13,1.64,1.64,0,0,0-.7.26,2.29,2.29,0,0,0-.69.61,1,1,0,0,0-.19.72.5.5,0,0,0,.13.32.39.39,0,0,0,.28.09,1.59,1.59,0,0,0,.48-.08l.74-.21a2.49,2.49,0,0,1,.79-.12,1.08,1.08,0,0,1,.54.14.77.77,0,0,1,.33.36,1.63,1.63,0,0,1,.17.54,2.06,2.06,0,0,1-.05.77,2.77,2.77,0,0,1-.31.81,3.46,3.46,0,0,1-.58.77,3.28,3.28,0,0,1-.82.64,2.6,2.6,0,0,1-.86.35,1.9,1.9,0,0,1-.67,0,.94.94,0,0,1-.47-.22.64.64,0,0,1-.21-.37.42.42,0,0,1,0-.27.46.46,0,0,1,.18-.21l.35-.2.13-.06a.18.18,0,0,1,.17.06.71.71,0,0,0,.48.16,1.66,1.66,0,0,0,.72-.27,2.32,2.32,0,0,0,.42-.3,3,3,0,0,0,.34-.38,1.44,1.44,0,0,0,.22-.4A.87.87,0,0,0,280.5,212.22Z" style="fill:#fafafa"></path><path d="M288.13,200.66a.19.19,0,0,1,.19,0,.19.19,0,0,1,.11.18l.07.43a.52.52,0,0,1-.05.27.42.42,0,0,1-.17.2l-3.17,1.83.39,2.75,3-1.72a.18.18,0,0,1,.2,0,.24.24,0,0,1,.11.18l.06.42a.52.52,0,0,1-.05.27.45.45,0,0,1-.17.21l-3,1.72.45,3.11a.44.44,0,0,1-.05.27.38.38,0,0,1-.17.2l-.39.23a.21.21,0,0,1-.2,0,.28.28,0,0,1-.11-.18l-1.1-7.68a.56.56,0,0,1,.05-.27.42.42,0,0,1,.17-.2Z" style="fill:#fafafa"></path><path d="M292.19,200.63a.18.18,0,0,1,.2,0,.21.21,0,0,1,.11.18l.06.38a.52.52,0,0,1-.05.27.42.42,0,0,1-.17.2l-.56.32a1.82,1.82,0,0,0-.91,2l.49,3.47a.45.45,0,0,1,0,.27.42.42,0,0,1-.17.2l-.36.2a.17.17,0,0,1-.19,0,.25.25,0,0,1-.11-.19l-.8-5.53a.52.52,0,0,1,.05-.27.42.42,0,0,1,.17-.2l.36-.21a.19.19,0,0,1,.19,0,.23.23,0,0,1,.11.18l.05.37a2.77,2.77,0,0,1,.39-.79,2.29,2.29,0,0,1,.68-.57Z" style="fill:#fafafa"></path><path d="M293.31,202.68a4.86,4.86,0,0,1,.07-1.14,4.46,4.46,0,0,1,.34-1.09,3.44,3.44,0,0,1,.59-.95,3.17,3.17,0,0,1,.84-.71,2.29,2.29,0,0,1,1-.33,1.29,1.29,0,0,1,.78.2,1.69,1.69,0,0,1,.59.69,4.21,4.21,0,0,1,.33,1.16l0,.32a.43.43,0,0,1,0,.27.45.45,0,0,1-.17.21l-3.32,1.91v.07a1.25,1.25,0,0,0,.58,1,1,1,0,0,0,1-.11,2.35,2.35,0,0,0,.77-.65,3.34,3.34,0,0,0,.37-.65.64.64,0,0,1,.12-.21.51.51,0,0,1,.17-.14l.29-.17a.21.21,0,0,1,.2,0,.17.17,0,0,1,.1.18,1.9,1.9,0,0,1-.1.57,2.85,2.85,0,0,1-.32.7,4.56,4.56,0,0,1-.58.74,4.32,4.32,0,0,1-.87.66,2,2,0,0,1-.9.29,1.35,1.35,0,0,1-.75-.18,1.64,1.64,0,0,1-.58-.59,3,3,0,0,1-.37-1A6.08,6.08,0,0,1,293.31,202.68Zm.87-.46,2.71-1.56v0a1.15,1.15,0,0,0-.53-.94,1.07,1.07,0,0,0-1.05.14,1.81,1.81,0,0,0-.51.41,2.46,2.46,0,0,0-.38.57,2.39,2.39,0,0,0-.21.67,2.18,2.18,0,0,0,0,.72Z" style="fill:#fafafa"></path><path d="M298.69,199.58a4.37,4.37,0,0,1,.06-1.14,4.54,4.54,0,0,1,.34-1.1,3.82,3.82,0,0,1,.59-.94,3.17,3.17,0,0,1,.84-.71,2.29,2.29,0,0,1,1-.33,1.25,1.25,0,0,1,.79.2,1.75,1.75,0,0,1,.58.69,4.21,4.21,0,0,1,.33,1.16l.05.32a.52.52,0,0,1-.05.27.42.42,0,0,1-.17.2l-3.32,1.92v.07a1.27,1.27,0,0,0,.58,1,1.07,1.07,0,0,0,1-.11,2.35,2.35,0,0,0,.77-.65,2.74,2.74,0,0,0,.37-.66,2.05,2.05,0,0,1,.12-.2.49.49,0,0,1,.17-.14l.29-.17a.22.22,0,0,1,.21,0,.18.18,0,0,1,.09.18,1.9,1.9,0,0,1-.09.57,2.91,2.91,0,0,1-.33.7,3.71,3.71,0,0,1-.58.73,4,4,0,0,1-.87.67,2,2,0,0,1-.9.29,1.39,1.39,0,0,1-.75-.18,1.82,1.82,0,0,1-.58-.59,3.37,3.37,0,0,1-.37-1A6.23,6.23,0,0,1,298.69,199.58Zm.86-.46,2.71-1.56v0a1.14,1.14,0,0,0-.54-.94,1.09,1.09,0,0,0-1.05.13,2,2,0,0,0-.51.42,2.37,2.37,0,0,0-.37.56,2.29,2.29,0,0,0-.22.67,2.54,2.54,0,0,0,0,.73Z" style="fill:#fafafa"></path><path d="M305.58,215.7,175.75,290.56a2.19,2.19,0,0,0-1,2l.46,3.15L177,308.17c.1.72.73,1,1.41.6l129.82-74.86a2.19,2.19,0,0,0,1-2L307,216.3A.86.86,0,0,0,305.58,215.7Z" style="fill:#fff;opacity:0.5"></path><g id="freepik--Button--inject-197"><g id="freepik--shadow--inject-197" style="opacity:0.2"><path d="M182.15,347l134.44-77.54c.62-.36,1.19-.11,1.28.54l2.52,17.58a2,2,0,0,1-.94,1.83L185,366.91c-.62.36-1.19.11-1.28-.54l-2.52-17.58A2,2,0,0,1,182.15,347Z"></path></g><g id="freepik--speech-bubble--inject-197"><path d="M315.54,274,185.72,348.86a2.16,2.16,0,0,0-1,2l2.23,15.6a2.78,2.78,0,0,0,1.61,1.89l2.68,1.12a3.39,3.39,0,0,0,2.64-.12l129.83-74.87a2.17,2.17,0,0,0,1-2l-2.23-15.6a2.79,2.79,0,0,0-1.6-1.89l-2.69-1.12A3.39,3.39,0,0,0,315.54,274Z" style="fill:#E11D48"></path><path d="M193.84,369.36a3.49,3.49,0,0,1-2.64.12l-2.68-1.13a2.75,2.75,0,0,1-1.61-1.88l-2.23-15.6a1.91,1.91,0,0,1,.25-1.17l5.5,2.33a1.79,1.79,0,0,0-.23,1.13l2.23,15.6A.86.86,0,0,0,193.84,369.36Z" style="opacity:0.2"></path><g style="opacity:0.2"><path d="M322.42,276.68c-.18-.57-.75-.75-1.36-.4L191.24,351.15a2.15,2.15,0,0,0-.81.88l-5.5-2.33a2,2,0,0,1,.79-.84L315.54,274a3.39,3.39,0,0,1,2.64-.12l2.68,1.12A2.9,2.9,0,0,1,322.42,276.68Z" style="fill:#fff"></path></g><path d="M321.06,276.29,191.23,351.15a2.17,2.17,0,0,0-1,2l.45,3.16,1.78,12.44c.1.72.73,1,1.41.6l129.83-74.87a2.17,2.17,0,0,0,1-2l-2.23-15.6A.86.86,0,0,0,321.06,276.29Z" style="fill:#E11D48"></path><path d="M321.06,276.29,191.23,351.15a2.17,2.17,0,0,0-1,2l.45,3.16,1.78,12.44c.1.72.73,1,1.41.6l129.83-74.87a2.17,2.17,0,0,0,1-2l-2.23-15.6A.86.86,0,0,0,321.06,276.29Z" style="fill:#fff;opacity:0.5"></path></g><path d="M236.11,330.74a2.27,2.27,0,0,1,2-.39,1.93,1.93,0,0,1,1,1.63,4.27,4.27,0,0,1-.12,1.75,4,4,0,0,1-.86,1.53l1.84,2.28a.61.61,0,0,1,.05.12.39.39,0,0,1,0,.23.36.36,0,0,1-.15.17l-.86.5a.31.31,0,0,1-.31.05.49.49,0,0,1-.17-.14l-1.75-2.14-1.34.78.41,2.91a.47.47,0,0,1,0,.28.41.41,0,0,1-.17.21l-.82.48a.2.2,0,0,1-.21,0,.26.26,0,0,1-.12-.19l-1.15-8.07a.48.48,0,0,1,0-.28.41.41,0,0,1,.17-.21Zm-1,4.81,1.47-.85a2.64,2.64,0,0,0,.89-.78,1.59,1.59,0,0,0,.21-1.15c-.07-.46-.23-.71-.48-.74a1.79,1.79,0,0,0-1,.3l-1.47.85Z" style="fill:#fff"></path><path d="M245.76,332.94a.18.18,0,0,1,.21,0c.07,0,.1.09.12.19l.12.88a.5.5,0,0,1,0,.29.54.54,0,0,1-.18.21l-4.45,2.57a.23.23,0,0,1-.21,0,.25.25,0,0,1-.11-.19l-1.16-8.07a.48.48,0,0,1,.05-.28.38.38,0,0,1,.18-.21l4.37-2.52a.19.19,0,0,1,.2,0,.26.26,0,0,1,.12.19l.12.89a.46.46,0,0,1,0,.28.58.58,0,0,1-.18.22l-3.28,1.89.29,2,3.05-1.76a.2.2,0,0,1,.21,0,.23.23,0,0,1,.11.19l.13.89a.48.48,0,0,1,0,.28.38.38,0,0,1-.18.21l-3,1.76.3,2.08Z" style="fill:#fff"></path><path d="M246.42,328.29a5.78,5.78,0,0,1,0-1.5,5,5,0,0,1,.44-1.4,5,5,0,0,1,.85-1.23,5.41,5.41,0,0,1,1.28-1,3.7,3.7,0,0,1,1.49-.56,1.76,1.76,0,0,1,1,.15,1.39,1.39,0,0,1,.59.53,2,2,0,0,1,.26.62.4.4,0,0,1,0,.28.48.48,0,0,1-.18.21l-.82.48a.23.23,0,0,1-.19,0,.27.27,0,0,1-.12-.09s-.06-.08-.14-.16a.76.76,0,0,0-.32-.19,1.29,1.29,0,0,0-.54,0,2,2,0,0,0-.78.3,2.72,2.72,0,0,0-1.14,1.21,2.86,2.86,0,0,0-.3,1.63c0,.33.08.67.13,1s.11.7.17,1c.11.68.35,1.08.7,1.22a1.48,1.48,0,0,0,1.28-.23,3.85,3.85,0,0,0,.68-.5,2.53,2.53,0,0,0,.76-1.44,3.21,3.21,0,0,0,0-1l0-.1-1.23.72a.23.23,0,0,1-.21,0,.29.29,0,0,1-.12-.19l-.12-.89a.48.48,0,0,1,.05-.28.41.41,0,0,1,.17-.21l2.34-1.35a.18.18,0,0,1,.2,0,.26.26,0,0,1,.12.19l.19,1.37a5.07,5.07,0,0,1-.41,2.91,5.08,5.08,0,0,1-.86,1.27,5.52,5.52,0,0,1-1.32,1,3.86,3.86,0,0,1-1.37.52,1.76,1.76,0,0,1-1-.15,1.79,1.79,0,0,1-.73-.76,4.08,4.08,0,0,1-.42-1.25q0-.22-.09-.51l-.09-.59c0-.2-.05-.39-.07-.59S246.43,328.45,246.42,328.29Z" style="fill:#fff"></path><path d="M254.91,329.35a.22.22,0,0,1-.21,0,.25.25,0,0,1-.11-.19l-1.16-8.07a.58.58,0,0,1,0-.28.38.38,0,0,1,.18-.21l.82-.48a.22.22,0,0,1,.21,0,.25.25,0,0,1,.11.19l1.16,8.07a.58.58,0,0,1-.05.28.48.48,0,0,1-.18.21Z" style="fill:#fff"></path><path d="M258.75,317.53a3.42,3.42,0,0,1,1.23-.46,2,2,0,0,1,.94.06,1.36,1.36,0,0,1,.63.44,1.54,1.54,0,0,1,.31.66.4.4,0,0,1-.05.28.42.42,0,0,1-.18.21l-.71.41a.34.34,0,0,1-.27.07.43.43,0,0,1-.19-.13.88.88,0,0,0-.54-.28,1.71,1.71,0,0,0-.95.3,3.43,3.43,0,0,0-.49.36,3.16,3.16,0,0,0-.39.44,2.1,2.1,0,0,0-.23.48,1.13,1.13,0,0,0,0,.48.78.78,0,0,0,.16.42.51.51,0,0,0,.37.12,3.05,3.05,0,0,0,.64-.1l1-.28a4.84,4.84,0,0,1,1.1-.22,1.66,1.66,0,0,1,.8.1,1.24,1.24,0,0,1,.52.47,2.19,2.19,0,0,1,.26.83,3.05,3.05,0,0,1-.05,1.16,4,4,0,0,1-.46,1.16,5.48,5.48,0,0,1-.84,1.07,5.75,5.75,0,0,1-1.2.91A4.29,4.29,0,0,1,259,327a2.24,2.24,0,0,1-1,0,1.43,1.43,0,0,1-.75-.39,1.6,1.6,0,0,1-.42-.84.42.42,0,0,1,0-.29.44.44,0,0,1,.19-.21l.71-.41a.47.47,0,0,1,.27-.08.3.3,0,0,1,.18.14,2.39,2.39,0,0,0,.22.23.66.66,0,0,0,.32.13,1.34,1.34,0,0,0,.46,0,2.33,2.33,0,0,0,.65-.29,4.89,4.89,0,0,0,.58-.39,2.65,2.65,0,0,0,.47-.48,2.12,2.12,0,0,0,.3-.52,1.07,1.07,0,0,0,.06-.56.47.47,0,0,0-.2-.37.86.86,0,0,0-.48-.05,5.18,5.18,0,0,0-.74.18l-1,.28a4.51,4.51,0,0,1-.94.16,1.42,1.42,0,0,1-.7-.15,1.12,1.12,0,0,1-.47-.49,2.85,2.85,0,0,1-.26-.9,3.22,3.22,0,0,1,.06-1.15,4,4,0,0,1,.44-1.13,4.64,4.64,0,0,1,.77-1A4.72,4.72,0,0,1,258.75,317.53Z" style="fill:#fff"></path><path d="M267.56,312.58a.21.21,0,0,1,.2,0,.23.23,0,0,1,.12.19l.13.89a.58.58,0,0,1-.05.28.48.48,0,0,1-.18.21L266,315.2l1,6.84a.46.46,0,0,1,0,.28.48.48,0,0,1-.18.21l-.82.48a.2.2,0,0,1-.21,0,.25.25,0,0,1-.11-.19l-1-6.84L262.76,317a.18.18,0,0,1-.2,0,.22.22,0,0,1-.12-.19l-.13-.88a.59.59,0,0,1,.05-.29.38.38,0,0,1,.18-.21Z" style="fill:#fff"></path><path d="M274.6,316.29a.18.18,0,0,1,.2,0,.22.22,0,0,1,.12.19l.13.89a.58.58,0,0,1-.05.28.48.48,0,0,1-.18.21l-4.45,2.57a.2.2,0,0,1-.21,0,.23.23,0,0,1-.11-.19l-1.16-8.06a.61.61,0,0,1,.05-.29.42.42,0,0,1,.18-.21l4.37-2.52a.18.18,0,0,1,.2,0,.22.22,0,0,1,.12.19l.13.88a.59.59,0,0,1-.05.29.42.42,0,0,1-.18.21l-3.27,1.89.28,2,3-1.77a.23.23,0,0,1,.21,0,.25.25,0,0,1,.11.19l.13.89a.47.47,0,0,1-.05.28.41.41,0,0,1-.17.21l-3.06,1.77.3,2.07Z" style="fill:#fff"></path><path d="M278,306.56a2.27,2.27,0,0,1,2-.39,1.93,1.93,0,0,1,1,1.63,4.27,4.27,0,0,1-.12,1.75,4,4,0,0,1-.86,1.53l1.84,2.28a.61.61,0,0,1,.05.12.39.39,0,0,1,0,.23.36.36,0,0,1-.15.17l-.86.5c-.13.08-.24.1-.31.05a.4.4,0,0,1-.17-.13l-1.75-2.15-1.35.78.42,2.91a.47.47,0,0,1-.05.28.41.41,0,0,1-.17.21l-.83.48a.18.18,0,0,1-.2,0,.24.24,0,0,1-.12-.19l-1.15-8.07a.47.47,0,0,1,0-.28.48.48,0,0,1,.18-.21Zm-1,4.81,1.47-.85a2.64,2.64,0,0,0,.89-.78,1.64,1.64,0,0,0,.21-1.15c-.07-.46-.23-.71-.48-.74a1.79,1.79,0,0,0-1,.3l-1.47.85Z" style="fill:#fff"></path></g><path d="M310.23,243.89,180.41,318.76a2.16,2.16,0,0,0-1,2l.45,3.16,1.78,12.44c.1.72.74,1,1.41.59L312.84,262.1a2.17,2.17,0,0,0,1-2l-2.23-15.6C311.54,243.77,310.91,243.5,310.23,243.89Z" style="fill:#fff;opacity:0.5"></path><path d="M209.6,283.45a.19.19,0,0,1,.19,0,.2.2,0,0,1,.1.17l.06.39a.47.47,0,0,1,0,.25.38.38,0,0,1-.16.19L206,286.62a.19.19,0,0,1-.19,0,.19.19,0,0,1-.11-.16l-1-7a.39.39,0,0,1,0-.25.45.45,0,0,1,.17-.19l3.71-2.14a.22.22,0,0,1,.19,0,.2.2,0,0,1,.1.17l.06.39a.45.45,0,0,1-.21.44l-3.08,1.78.33,2.29,2.87-1.65a.19.19,0,0,1,.19,0,.19.19,0,0,1,.11.16l.05.4a.38.38,0,0,1,0,.25.4.4,0,0,1-.17.19l-2.87,1.65.34,2.39Z" style="fill:#37474f"></path><path d="M215.43,280.82a.44.44,0,0,1,0,.25.4.4,0,0,1-.17.19l-.34.2a.21.21,0,0,1-.2,0,.23.23,0,0,1-.1-.17l-.41-2.87a1.31,1.31,0,0,0-.53-1.05,1.06,1.06,0,0,0-1,.14,2.22,2.22,0,0,0-.9,1,2.48,2.48,0,0,0-.18,1.46l.41,2.87a.38.38,0,0,1,0,.25.4.4,0,0,1-.17.19l-.34.2a.19.19,0,0,1-.19,0,.21.21,0,0,1-.11-.17l-.73-5.07a.47.47,0,0,1,0-.25.4.4,0,0,1,.17-.19l.34-.2a.19.19,0,0,1,.19,0,.21.21,0,0,1,.11.17l.05.33a3.35,3.35,0,0,1,.45-.81,2.84,2.84,0,0,1,.89-.77,2.25,2.25,0,0,1,.84-.3,1.31,1.31,0,0,1,.72.11,1.33,1.33,0,0,1,.52.53,2.54,2.54,0,0,1,.3.93Z" style="fill:#37474f"></path><path d="M217.76,277.73a1.82,1.82,0,0,0,.09.37.48.48,0,0,0,.16.24.35.35,0,0,0,.27.07,1.36,1.36,0,0,0,.41-.16l.5-.29a.22.22,0,0,1,.19,0,.2.2,0,0,1,.1.17l.05.35a.45.45,0,0,1,0,.25.53.53,0,0,1-.17.19l-.59.34c-.54.31-1,.38-1.25.19a1.66,1.66,0,0,1-.57-1.2l-.4-2.83-.7.41a.19.19,0,0,1-.19,0,.18.18,0,0,1-.1-.16l-.05-.35a.45.45,0,0,1,0-.25.4.4,0,0,1,.17-.19l.69-.4-.25-1.78a.45.45,0,0,1,.21-.44l.35-.2a.19.19,0,0,1,.19,0,.18.18,0,0,1,.1.16l.25,1.78,1.2-.69a.19.19,0,0,1,.19,0,.2.2,0,0,1,.1.17l0,.35a.41.41,0,0,1,0,.24.49.49,0,0,1-.17.2l-1.19.68Z" style="fill:#37474f"></path><path d="M219.8,275a4.16,4.16,0,0,1,.07-1,4.89,4.89,0,0,1,.34-1,4,4,0,0,1,.57-.89,3.18,3.18,0,0,1,.83-.67,2.14,2.14,0,0,1,.93-.33,1.22,1.22,0,0,1,.76.15,1.56,1.56,0,0,1,.55.63,3.17,3.17,0,0,1,.32,1.05l0,.3a.39.39,0,0,1-.05.25.43.43,0,0,1-.16.19l-3.23,1.86v.06a1.13,1.13,0,0,0,.55.92,1.11,1.11,0,0,0,1-.14,2.38,2.38,0,0,0,.74-.61,3.48,3.48,0,0,0,.37-.62,1.63,1.63,0,0,1,.11-.2.92.92,0,0,1,.17-.13l.28-.16a.21.21,0,0,1,.2,0,.17.17,0,0,1,.09.17,1.62,1.62,0,0,1-.1.52,2.78,2.78,0,0,1-.31.66,4.33,4.33,0,0,1-.57.69,4,4,0,0,1-.85.64,2.06,2.06,0,0,1-.87.3,1.47,1.47,0,0,1-.73-.15,1.65,1.65,0,0,1-.56-.53A2.5,2.5,0,0,1,220,276,5.34,5.34,0,0,1,219.8,275Zm.84-.45,2.64-1.52v0a1,1,0,0,0-.51-.85,1.07,1.07,0,0,0-1,.16,2,2,0,0,0-.49.39,2.4,2.4,0,0,0-.37.53,2.77,2.77,0,0,0-.22.63,2.09,2.09,0,0,0,0,.66Z" style="fill:#37474f"></path><path d="M227.4,268.1a.19.19,0,0,1,.19,0,.18.18,0,0,1,.1.16l.05.35a.38.38,0,0,1,0,.25.4.4,0,0,1-.17.19l-.54.31a1.72,1.72,0,0,0-.9,1.88l.46,3.18a.47.47,0,0,1-.05.25.45.45,0,0,1-.17.19l-.34.2a.19.19,0,0,1-.19,0,.19.19,0,0,1-.11-.16l-.72-5.08a.38.38,0,0,1,0-.25.37.37,0,0,1,.17-.18l.34-.21a.19.19,0,0,1,.19,0,.19.19,0,0,1,.11.16l.05.34a2.35,2.35,0,0,1,.38-.74,2.47,2.47,0,0,1,.66-.55Z" style="fill:#37474f"></path><path d="M232.8,273.07a.75.75,0,0,1-.07.23.38.38,0,0,1-.16.19l-.39.22a.18.18,0,0,1-.17,0,.2.2,0,0,1-.09-.15s0-.06,0-.08l.57-2.8L230,267a.12.12,0,0,1,0-.07.36.36,0,0,1,0-.22.42.42,0,0,1,.15-.17l.38-.22a.19.19,0,0,1,.19,0,.45.45,0,0,1,.12.12l2,2.87.93-4.54a.75.75,0,0,1,.07-.23.34.34,0,0,1,.16-.19l.39-.22a.18.18,0,0,1,.17,0,.18.18,0,0,1,.09.15.22.22,0,0,1,0,.08Z" style="fill:#37474f"></path><path d="M237.31,262.26a2.36,2.36,0,0,1,.93-.34,1.23,1.23,0,0,1,1.3.62,2.71,2.71,0,0,1,.35.86c0,.07,0,.14,0,.23a2.89,2.89,0,0,0,0,.29c0,.09,0,.19,0,.28s0,.17,0,.23a5.1,5.1,0,0,1-.06,1.11,4.35,4.35,0,0,1-.33,1,4,4,0,0,1-.61.88,3.77,3.77,0,0,1-.87.7,2.53,2.53,0,0,1-.93.34,1.33,1.33,0,0,1-.75-.11,1.37,1.37,0,0,1-.55-.5,2.53,2.53,0,0,1-.34-.88,1.65,1.65,0,0,1-.05-.21,2.36,2.36,0,0,1,0-.28,2.89,2.89,0,0,1,0-.29,2.32,2.32,0,0,1,0-.24,4.15,4.15,0,0,1,.4-2.13,3.61,3.61,0,0,1,.6-.88A3.72,3.72,0,0,1,237.31,262.26Zm1.86,2.61a4.7,4.7,0,0,0,0-.47c0-.17-.06-.33-.09-.45a1.9,1.9,0,0,0-.21-.54,1,1,0,0,0-.33-.34A.86.86,0,0,0,238,263a1.49,1.49,0,0,0-.59.22,2.06,2.06,0,0,0-.56.45,2.23,2.23,0,0,0-.36.56,2.36,2.36,0,0,0-.19.64,3.11,3.11,0,0,0,0,.68c0,.14,0,.3,0,.48a3.53,3.53,0,0,0,.08.44,2.17,2.17,0,0,0,.21.54.87.87,0,0,0,.33.33.72.72,0,0,0,.46.09,1.32,1.32,0,0,0,.59-.21,1.91,1.91,0,0,0,.56-.45,2.23,2.23,0,0,0,.36-.56,2.38,2.38,0,0,0,.2-.64A3.87,3.87,0,0,0,239.17,264.87Z" style="fill:#37474f"></path><path d="M240.74,260.72a.45.45,0,0,1,.21-.44l.35-.2a.19.19,0,0,1,.19,0,.2.2,0,0,1,.1.17l.41,2.87a1.4,1.4,0,0,0,.51,1.07,1,1,0,0,0,1-.13,2.16,2.16,0,0,0,.87-1,2.62,2.62,0,0,0,.16-1.45l-.42-2.88a.47.47,0,0,1,0-.25.45.45,0,0,1,.17-.19l.34-.2a.19.19,0,0,1,.19,0,.19.19,0,0,1,.11.16l.72,5.08a.38.38,0,0,1,0,.25.45.45,0,0,1-.17.19l-.34.2a.19.19,0,0,1-.19,0,.19.19,0,0,1-.11-.16l0-.34a3.33,3.33,0,0,1-.43.8,2.72,2.72,0,0,1-.87.75,2.15,2.15,0,0,1-.83.3,1.17,1.17,0,0,1-.7-.12,1.25,1.25,0,0,1-.51-.53,3,3,0,0,1-.29-.94Z" style="fill:#37474f"></path><path d="M248.82,255.74a.19.19,0,0,1,.19,0,.18.18,0,0,1,.1.16l0,.35a.38.38,0,0,1,0,.25.4.4,0,0,1-.17.19l-.54.32a1.7,1.7,0,0,0-.9,1.87L248,262a.47.47,0,0,1-.05.25.4.4,0,0,1-.17.19l-.34.2a.19.19,0,0,1-.19,0,.21.21,0,0,1-.11-.17l-.72-5.07a.38.38,0,0,1,0-.25.4.4,0,0,1,.17-.19l.34-.2a.19.19,0,0,1,.19,0,.21.21,0,0,1,.11.17l0,.33a2.35,2.35,0,0,1,.38-.74,2.28,2.28,0,0,1,.66-.54Z" style="fill:#37474f"></path><path d="M256.77,256.21a.19.19,0,0,1,.3.15l.06.39a.45.45,0,0,1-.05.25.44.44,0,0,1-.16.19l-3.79,2.19a.21.21,0,0,1-.2,0,.19.19,0,0,1-.1-.16l-1-7a.45.45,0,0,1,.05-.25.44.44,0,0,1,.16-.19l3.72-2.15a.19.19,0,0,1,.19,0,.18.18,0,0,1,.1.16l.06.39a.51.51,0,0,1-.21.44l-3.08,1.78.33,2.3L256,253a.22.22,0,0,1,.19,0,.24.24,0,0,1,.11.17l.05.39a.45.45,0,0,1-.21.44l-2.87,1.65.34,2.39Z" style="fill:#37474f"></path><path d="M258,253.56a.19.19,0,0,1-.19,0,.18.18,0,0,1-.11-.16l-.05-.35a.47.47,0,0,1,.05-.25.43.43,0,0,1,.16-.19l2.77-1.59a.19.19,0,0,1,.19,0,.22.22,0,0,1,.11.16l0,.35a.37.37,0,0,1,0,.25.4.4,0,0,1-.17.19Z" style="fill:#37474f"></path><path d="M262.85,248.32c0-.12.1-.25.16-.38a2.46,2.46,0,0,1,.22-.39,2.73,2.73,0,0,1,.32-.37,2.61,2.61,0,0,1,.45-.33,1.78,1.78,0,0,1,1-.3,1,1,0,0,1,.7.36c.06-.18.13-.35.2-.52a2.68,2.68,0,0,1,.28-.49,2.61,2.61,0,0,1,.38-.44,3.29,3.29,0,0,1,.53-.38c.63-.37,1.12-.41,1.47-.14a2.35,2.35,0,0,1,.69,1.56l.43,3a.37.37,0,0,1,0,.25.4.4,0,0,1-.17.19l-.34.2a.18.18,0,0,1-.3-.14l-.42-2.91a1.51,1.51,0,0,0-.46-1.07c-.22-.16-.51-.14-.88.07a1.76,1.76,0,0,0-.74.85,2.35,2.35,0,0,0-.14,1.35l.43,3a.45.45,0,0,1-.05.25.44.44,0,0,1-.16.19l-.35.2a.19.19,0,0,1-.19,0,.22.22,0,0,1-.11-.16l-.41-2.91a1.6,1.6,0,0,0-.46-1.08.8.8,0,0,0-.88.08,1.83,1.83,0,0,0-.75.85,2.44,2.44,0,0,0-.14,1.35l.43,3a.51.51,0,0,1-.21.44l-.35.2a.19.19,0,0,1-.19,0,.18.18,0,0,1-.1-.16l-.73-5.08a.39.39,0,0,1,.05-.25.38.38,0,0,1,.16-.19l.35-.2a.19.19,0,0,1,.19,0,.18.18,0,0,1,.1.16Z" style="fill:#37474f"></path><path d="M270.51,247.79a2.15,2.15,0,0,1,.05-.84,2.76,2.76,0,0,1,.33-.8,4.12,4.12,0,0,1,.56-.72,7.3,7.3,0,0,1,.71-.65l1.29-1,0-.15c-.05-.37-.2-.58-.43-.65a1.13,1.13,0,0,0-.83.18,1.63,1.63,0,0,0-.59.53,3.26,3.26,0,0,0-.31.62.56.56,0,0,1-.1.19.61.61,0,0,1-.17.14l-.29.16a.19.19,0,0,1-.19,0,.17.17,0,0,1-.1-.17,1.64,1.64,0,0,1,.09-.58,3,3,0,0,1,.33-.67,4,4,0,0,1,.53-.66,3.35,3.35,0,0,1,.67-.52,2.68,2.68,0,0,1,.8-.31,1.17,1.17,0,0,1,.68.06,1.05,1.05,0,0,1,.5.44,2,2,0,0,1,.28.84l.47,3.32a.37.37,0,0,1,0,.25.4.4,0,0,1-.17.19l-.34.2a.19.19,0,0,1-.19,0,.21.21,0,0,1-.11-.17l-.06-.44a1.84,1.84,0,0,1-.21.51,4.39,4.39,0,0,1-.37.51,4.78,4.78,0,0,1-.46.44,3.48,3.48,0,0,1-.45.32,2.33,2.33,0,0,1-.69.27,1.14,1.14,0,0,1-.56,0,.77.77,0,0,1-.4-.29A1.29,1.29,0,0,1,270.51,247.79Zm1.82-.39a2.75,2.75,0,0,0,.6-.48,2.81,2.81,0,0,0,.43-.61,2.18,2.18,0,0,0,.24-.69,2.11,2.11,0,0,0,0-.71l0-.27-1.07.84a4.39,4.39,0,0,0-.89.89,1.18,1.18,0,0,0-.26.82.58.58,0,0,0,.08.22.45.45,0,0,0,.19.14.54.54,0,0,0,.29,0A1.59,1.59,0,0,0,272.33,247.4Z" style="fill:#37474f"></path><path d="M276.16,238.7a.45.45,0,0,1-.05.25.44.44,0,0,1-.16.19l-.54.31a.19.19,0,0,1-.19,0,.2.2,0,0,1-.1-.17l-.09-.62a.45.45,0,0,1,.21-.44l.53-.31a.19.19,0,0,1,.19,0,.19.19,0,0,1,.11.16Zm.84,6.58a.47.47,0,0,1-.05.25.44.44,0,0,1-.16.19l-.35.2a.22.22,0,0,1-.19,0,.24.24,0,0,1-.11-.17l-.72-5.07a.44.44,0,0,1,0-.25.4.4,0,0,1,.17-.19l.34-.2a.18.18,0,0,1,.3.14Z" style="fill:#37474f"></path><path d="M279.26,244a.45.45,0,0,1-.05.25.44.44,0,0,1-.16.19l-.35.2a.19.19,0,0,1-.19,0,.22.22,0,0,1-.11-.16l-1-7.15a.39.39,0,0,1,.05-.25.43.43,0,0,1,.16-.19l.35-.2a.19.19,0,0,1,.19,0,.18.18,0,0,1,.1.16Z" style="fill:#37474f"></path><path d="M206.58,316.83a.19.19,0,0,1,.19,0,.19.19,0,0,1,.11.16l.05.39a.37.37,0,0,1,0,.25.4.4,0,0,1-.17.19L202.93,320a.19.19,0,0,1-.19,0,.2.2,0,0,1-.1-.17l-1-7a.47.47,0,0,1,.05-.25.38.38,0,0,1,.16-.19l3.72-2.15a.19.19,0,0,1,.29.15l.06.39a.45.45,0,0,1,0,.25.39.39,0,0,1-.16.19L202.62,313l.33,2.3,2.87-1.66a.19.19,0,0,1,.19,0c.06,0,.09.08.1.16l.06.39a.45.45,0,0,1-.21.44l-2.87,1.66.34,2.38Z" style="fill:#37474f"></path><path d="M212.42,314.21a.39.39,0,0,1,0,.25.43.43,0,0,1-.16.19l-.35.2a.19.19,0,0,1-.19,0,.18.18,0,0,1-.1-.16l-.42-2.88c-.08-.55-.25-.91-.52-1.05a1.07,1.07,0,0,0-1,.15,2.13,2.13,0,0,0-.89,1,2.48,2.48,0,0,0-.18,1.46l.41,2.87a.51.51,0,0,1-.21.44l-.35.2a.19.19,0,0,1-.19,0,.18.18,0,0,1-.1-.16l-.73-5.08a.39.39,0,0,1,0-.25.43.43,0,0,1,.16-.19l.35-.2a.19.19,0,0,1,.19,0,.18.18,0,0,1,.1.16l0,.34a3.42,3.42,0,0,1,.46-.81,2.71,2.71,0,0,1,.89-.77,2.14,2.14,0,0,1,.84-.3,1.19,1.19,0,0,1,.71.1,1.35,1.35,0,0,1,.53.53,2.6,2.6,0,0,1,.29.94Z" style="fill:#37474f"></path><path d="M214.75,311.12a1.58,1.58,0,0,0,.09.36.57.57,0,0,0,.16.25.39.39,0,0,0,.27.06,1.21,1.21,0,0,0,.41-.16l.49-.29a.19.19,0,0,1,.19,0,.19.19,0,0,1,.11.16l.05.35a.47.47,0,0,1-.05.25.38.38,0,0,1-.16.19l-.59.34c-.55.31-1,.38-1.26.19a1.58,1.58,0,0,1-.56-1.2l-.41-2.82-.69.4a.17.17,0,0,1-.19,0,.18.18,0,0,1-.11-.16l-.05-.35a.47.47,0,0,1,.05-.25.51.51,0,0,1,.16-.19l.7-.4-.26-1.77a.45.45,0,0,1,.05-.25.44.44,0,0,1,.16-.19l.35-.2a.19.19,0,0,1,.19,0,.21.21,0,0,1,.11.17l.25,1.77,1.19-.69a.19.19,0,0,1,.19,0,.18.18,0,0,1,.11.16l.05.35a.47.47,0,0,1-.05.25.44.44,0,0,1-.16.19l-1.19.69Z" style="fill:#37474f"></path><path d="M216.79,308.35a4.24,4.24,0,0,1,.07-1.06,4.5,4.5,0,0,1,.33-1,3.94,3.94,0,0,1,.58-.88,3.34,3.34,0,0,1,.82-.68,2.47,2.47,0,0,1,.94-.33,1.19,1.19,0,0,1,.75.16,1.48,1.48,0,0,1,.56.62,3.17,3.17,0,0,1,.31,1.06l0,.29a.47.47,0,0,1,0,.25.44.44,0,0,1-.16.19l-3.23,1.86v.07a.94.94,0,0,0,1.53.78,2.58,2.58,0,0,0,.75-.62,2.68,2.68,0,0,0,.36-.62,1.28,1.28,0,0,1,.12-.19.43.43,0,0,1,.16-.13l.28-.17a.24.24,0,0,1,.2,0,.17.17,0,0,1,.1.17,1.62,1.62,0,0,1-.1.52,2.49,2.49,0,0,1-.32.66,3.47,3.47,0,0,1-.57.69,3.72,3.72,0,0,1-.84.64,2.14,2.14,0,0,1-.88.3,1.25,1.25,0,0,1-.72-.15,1.53,1.53,0,0,1-.56-.52,2.64,2.64,0,0,1-.35-.87A5.36,5.36,0,0,1,216.79,308.35Zm.84-.45,2.63-1.52v0a1,1,0,0,0-.52-.85,1.09,1.09,0,0,0-1,.16,1.83,1.83,0,0,0-.49.39,2.62,2.62,0,0,0-.38.54,2.16,2.16,0,0,0-.21.62,2.44,2.44,0,0,0,0,.66Z" style="fill:#37474f"></path><path d="M224.39,301.49a.19.19,0,0,1,.19,0,.21.21,0,0,1,.1.16l0,.35a.39.39,0,0,1,0,.25.38.38,0,0,1-.16.19l-.54.32a1.7,1.7,0,0,0-.9,1.87l.45,3.18a.45.45,0,0,1-.21.44l-.35.2a.19.19,0,0,1-.19,0,.2.2,0,0,1-.1-.17l-.73-5.07A.47.47,0,0,1,222,303a.38.38,0,0,1,.16-.19l.35-.2a.19.19,0,0,1,.19,0,.24.24,0,0,1,.11.17l0,.33a2.58,2.58,0,0,1,.38-.74,2.48,2.48,0,0,1,.67-.54Z" style="fill:#37474f"></path><path d="M229.79,306.45a1.19,1.19,0,0,1-.07.23.35.35,0,0,1-.17.19l-.38.23a.17.17,0,0,1-.17,0,.17.17,0,0,1-.09-.15.22.22,0,0,1,0-.08l.58-2.79-2.54-3.71a.14.14,0,0,1,0-.07.38.38,0,0,1,0-.23.32.32,0,0,1,.14-.16l.39-.23a.19.19,0,0,1,.19,0,.34.34,0,0,1,.12.12l2,2.87.94-4.55a1.12,1.12,0,0,1,.06-.23.39.39,0,0,1,.17-.19l.38-.22a.18.18,0,0,1,.17,0,.18.18,0,0,1,.1.15v.08Z" style="fill:#37474f"></path><path d="M234.3,295.64a2.72,2.72,0,0,1,.93-.34,1.37,1.37,0,0,1,.74.11,1.3,1.3,0,0,1,.56.51,2.64,2.64,0,0,1,.34.87,1.2,1.2,0,0,1,0,.23,2.36,2.36,0,0,1,0,.28c0,.1,0,.19,0,.28s0,.17,0,.23a4.54,4.54,0,0,1-.07,1.11,3.59,3.59,0,0,1-.33,1,4,4,0,0,1-.6.88,3.36,3.36,0,0,1-.88.7,2.27,2.27,0,0,1-.92.34,1.42,1.42,0,0,1-.75-.1,1.27,1.27,0,0,1-.55-.51,2.48,2.48,0,0,1-.35-.87c0-.06,0-.13,0-.22a2.33,2.33,0,0,1-.05-.28c0-.1,0-.19,0-.28s0-.18,0-.25a4.07,4.07,0,0,1,.06-1.1,3.93,3.93,0,0,1,.33-1,3.8,3.8,0,0,1,.61-.89A3.57,3.57,0,0,1,234.3,295.64Zm1.86,2.61a4.57,4.57,0,0,0,0-.46,3.4,3.4,0,0,0-.08-.45,1.9,1.9,0,0,0-.21-.54.8.8,0,0,0-.34-.34.7.7,0,0,0-.46-.09,1.36,1.36,0,0,0-.59.21,2.21,2.21,0,0,0-.55.45,2.43,2.43,0,0,0-.37.57,2.64,2.64,0,0,0-.19.64,3.07,3.07,0,0,0,0,.68,4.7,4.7,0,0,0,0,.47c0,.18.06.32.09.44a1.9,1.9,0,0,0,.21.54.9.9,0,0,0,.33.34.86.86,0,0,0,.46.09,1.69,1.69,0,0,0,.59-.21,2.25,2.25,0,0,0,.55-.45,2.53,2.53,0,0,0,.37-.57,2.26,2.26,0,0,0,.19-.64A3.07,3.07,0,0,0,236.16,298.25Z" style="fill:#37474f"></path><path d="M237.72,294.1a.47.47,0,0,1,.05-.25.45.45,0,0,1,.17-.19l.34-.2a.22.22,0,0,1,.19,0,.23.23,0,0,1,.11.17l.41,2.87a1.43,1.43,0,0,0,.5,1.07,1,1,0,0,0,1-.13,2,2,0,0,0,.87-.95,2.53,2.53,0,0,0,.16-1.45l-.41-2.87a.51.51,0,0,1,.21-.44l.35-.2a.19.19,0,0,1,.19,0,.18.18,0,0,1,.1.16l.73,5.08a.39.39,0,0,1-.05.25.38.38,0,0,1-.16.19l-.35.2a.22.22,0,0,1-.19,0,.2.2,0,0,1-.1-.17l-.05-.34a3.39,3.39,0,0,1-.44.8,2.49,2.49,0,0,1-.86.76,2.18,2.18,0,0,1-.83.29,1.13,1.13,0,0,1-1.21-.64,2.88,2.88,0,0,1-.29-.95Z" style="fill:#37474f"></path><path d="M245.81,289.12a.19.19,0,0,1,.19,0,.23.23,0,0,1,.1.17l.05.35a.35.35,0,0,1-.05.24.41.41,0,0,1-.16.2l-.55.31a1.71,1.71,0,0,0-.89,1.87l.45,3.18a.44.44,0,0,1,0,.25.46.46,0,0,1-.17.19l-.35.2a.19.19,0,0,1-.19,0,.18.18,0,0,1-.1-.16l-.73-5.08a.39.39,0,0,1,0-.25.43.43,0,0,1,.16-.19l.35-.2a.19.19,0,0,1,.19,0,.18.18,0,0,1,.1.16l.05.34a2.45,2.45,0,0,1,.38-.74,2.35,2.35,0,0,1,.67-.55Z" style="fill:#37474f"></path><path d="M251.38,283.78a3.45,3.45,0,0,1,.89-.37,1.47,1.47,0,0,1,.78,0,1.12,1.12,0,0,1,.59.43,1.89,1.89,0,0,1,.33.93,3.16,3.16,0,0,1,0,1.15,3.53,3.53,0,0,1-.39,1,3.37,3.37,0,0,1-.65.85,4.08,4.08,0,0,1-.85.65l-1.72,1,.38,2.67a.47.47,0,0,1-.05.25.38.38,0,0,1-.16.19l-.39.22a.19.19,0,0,1-.19,0,.2.2,0,0,1-.1-.17l-1-7a.45.45,0,0,1,.21-.44Zm-1.19,4.67,1.67-1a2.61,2.61,0,0,0,1-.94,1.82,1.82,0,0,0,.22-1.25c-.06-.46-.24-.73-.51-.79a1.54,1.54,0,0,0-1.09.28l-1.68,1Z" style="fill:#37474f"></path><path d="M255.11,288.33a2.21,2.21,0,0,1,0-.85,2.74,2.74,0,0,1,.34-.79,3.84,3.84,0,0,1,.56-.73,7.2,7.2,0,0,1,.71-.64l1.29-1,0-.14c0-.37-.2-.59-.44-.65a1.05,1.05,0,0,0-.82.17,1.77,1.77,0,0,0-.6.54,3.23,3.23,0,0,0-.3.62.67.67,0,0,1-.1.19.7.7,0,0,1-.18.14l-.28.16a.22.22,0,0,1-.19,0,.18.18,0,0,1-.1-.17,1.61,1.61,0,0,1,.09-.58,2.66,2.66,0,0,1,.33-.68,4,4,0,0,1,.53-.65,2.81,2.81,0,0,1,.67-.52,2.23,2.23,0,0,1,.8-.31,1.18,1.18,0,0,1,.68.05,1.1,1.1,0,0,1,.5.44,2.13,2.13,0,0,1,.28.85l.47,3.32a.38.38,0,0,1,0,.25.45.45,0,0,1-.17.19l-.35.2a.19.19,0,0,1-.19,0,.19.19,0,0,1-.1-.16l-.06-.45a1.89,1.89,0,0,1-.21.52,4.29,4.29,0,0,1-.37.5,4.73,4.73,0,0,1-.46.44,3.48,3.48,0,0,1-.45.32,2.09,2.09,0,0,1-.69.27,1.14,1.14,0,0,1-.56,0,.79.79,0,0,1-.4-.3A1.1,1.1,0,0,1,255.11,288.33Zm1.82-.4a3,3,0,0,0,.6-.47,3.08,3.08,0,0,0,.43-.61,2.46,2.46,0,0,0,.24-.69,2.18,2.18,0,0,0,0-.72l0-.27-1.07.85a4.15,4.15,0,0,0-.89.89,1.12,1.12,0,0,0-.26.82.44.44,0,0,0,.56.37A1.31,1.31,0,0,0,256.93,287.93Z" style="fill:#37474f"></path><path d="M263.34,283.43a.41.41,0,0,0-.15-.29.54.54,0,0,0-.33-.06,2.79,2.79,0,0,0-.53.11c-.21.05-.46.13-.73.22a1.34,1.34,0,0,1-1.16,0,1.19,1.19,0,0,1-.45-.83,2,2,0,0,1,0-.69,2.61,2.61,0,0,1,.26-.72,2.74,2.74,0,0,1,.52-.68,3.49,3.49,0,0,1,.78-.6,3.11,3.11,0,0,1,.82-.34,1.68,1.68,0,0,1,.62,0,.92.92,0,0,1,.41.19.61.61,0,0,1,.19.34.31.31,0,0,1,0,.24.42.42,0,0,1-.17.2l-.31.18-.14.05a.2.2,0,0,1-.16-.05.64.64,0,0,0-.41-.1,1.78,1.78,0,0,0-.68.26,2.16,2.16,0,0,0-.67.59.9.9,0,0,0-.19.66.46.46,0,0,0,.12.29.38.38,0,0,0,.28.08,1.71,1.71,0,0,0,.47-.09l.71-.21a2.74,2.74,0,0,1,.76-.14,1.19,1.19,0,0,1,.53.11.82.82,0,0,1,.32.32,1.73,1.73,0,0,1,.15.5,2,2,0,0,1-.05.71,2.71,2.71,0,0,1-.31.76,3.69,3.69,0,0,1-.56.72,4.16,4.16,0,0,1-.8.62,3.16,3.16,0,0,1-.83.34,1.89,1.89,0,0,1-.66,0,.93.93,0,0,1-.45-.19.65.65,0,0,1-.21-.34.42.42,0,0,1,0-.24.44.44,0,0,1,.18-.2l.33-.19.14-.06a.17.17,0,0,1,.16,0,.59.59,0,0,0,.46.13,1.77,1.77,0,0,0,.71-.26,3.35,3.35,0,0,0,.4-.29,2.24,2.24,0,0,0,.33-.36,1.58,1.58,0,0,0,.21-.38A.74.74,0,0,0,263.34,283.43Z" style="fill:#37474f"></path><path d="M268.08,280.69a.41.41,0,0,0-.15-.29.54.54,0,0,0-.33-.06,2.71,2.71,0,0,0-.52.11c-.21.05-.46.13-.74.22a1.32,1.32,0,0,1-1.15,0,1.19,1.19,0,0,1-.45-.83,2.3,2.3,0,0,1,0-.69,2.64,2.64,0,0,1,.27-.72,2.88,2.88,0,0,1,.51-.68,3.81,3.81,0,0,1,.79-.6,3.07,3.07,0,0,1,.81-.34,1.68,1.68,0,0,1,.62,0,.91.91,0,0,1,.42.19.68.68,0,0,1,.19.34.35.35,0,0,1,0,.24.58.58,0,0,1-.17.2l-.31.18-.14.05a.19.19,0,0,1-.17-.05.61.61,0,0,0-.4-.1,1.73,1.73,0,0,0-.68.26,2,2,0,0,0-.67.59.92.92,0,0,0-.2.66.42.42,0,0,0,.13.29.36.36,0,0,0,.27.08,1.65,1.65,0,0,0,.47-.09l.72-.21a2.68,2.68,0,0,1,.76-.14,1.14,1.14,0,0,1,.52.11.71.71,0,0,1,.32.32,1.28,1.28,0,0,1,.15.5,1.74,1.74,0,0,1,0,.71,3,3,0,0,1-.31.76,3.75,3.75,0,0,1-.57.72,3.62,3.62,0,0,1-.8.62,2.91,2.91,0,0,1-.83.34,1.89,1.89,0,0,1-.66,0,.94.94,0,0,1-.44-.19.59.59,0,0,1-.21-.34.31.31,0,0,1,0-.24.48.48,0,0,1,.17-.2l.34-.19.13-.06a.17.17,0,0,1,.16,0,.61.61,0,0,0,.47.13,1.74,1.74,0,0,0,.7-.26,2.7,2.7,0,0,0,.4-.29,1.86,1.86,0,0,0,.33-.36A1.34,1.34,0,0,0,268,281,.63.63,0,0,0,268.08,280.69Z" style="fill:#37474f"></path><path d="M274.48,276.79l.53-4.25a.63.63,0,0,1,.08-.23.41.41,0,0,1,.2-.21l.31-.18a.18.18,0,0,1,.17,0,.2.2,0,0,1,.09.15.27.27,0,0,1,0,.09l-.72,5.84a1.07,1.07,0,0,1-.06.27.37.37,0,0,1-.17.2l-.29.16c-.08.05-.15.06-.2,0a1,1,0,0,1-.14-.15l-1.63-3-.6,4.26a2.13,2.13,0,0,1-.08.27.33.33,0,0,1-.17.2l-.29.17a.19.19,0,0,1-.19,0,.39.39,0,0,1-.13-.17L269,276.08l0-.08a.43.43,0,0,1,0-.22.42.42,0,0,1,.15-.17l.31-.18a.29.29,0,0,1,.23,0,.3.3,0,0,1,.13.12l1.57,3,.6-4.29a.7.7,0,0,1,.07-.22.42.42,0,0,1,.19-.21l.2-.12c.1-.05.17-.06.22,0a.32.32,0,0,1,.11.12Z" style="fill:#37474f"></path><path d="M278.71,270a2.53,2.53,0,0,1,.93-.34,1.42,1.42,0,0,1,.75.11,1.33,1.33,0,0,1,.55.51,2.64,2.64,0,0,1,.34.87,2.14,2.14,0,0,1,.05.23c0,.09,0,.18,0,.28a2.36,2.36,0,0,0,0,.28c0,.09,0,.17,0,.23a5.1,5.1,0,0,1-.06,1.11,4,4,0,0,1-.34,1,3.61,3.61,0,0,1-.6.88,3.72,3.72,0,0,1-.87.7,2.36,2.36,0,0,1-.93.34,1.33,1.33,0,0,1-.75-.11,1.3,1.3,0,0,1-.55-.5,2.47,2.47,0,0,1-.34-.87c0-.06,0-.13-.05-.22s0-.18-.05-.28l0-.29a2.32,2.32,0,0,1,0-.24,4.07,4.07,0,0,1,.06-1.1,3.83,3.83,0,0,1,.34-1,3.48,3.48,0,0,1,.6-.89A3.77,3.77,0,0,1,278.71,270Zm1.86,2.61a4.57,4.57,0,0,0-.05-.46,3.93,3.93,0,0,0-.08-.46,2.17,2.17,0,0,0-.21-.54.87.87,0,0,0-.33-.33.72.72,0,0,0-.46-.09,1.32,1.32,0,0,0-.59.21,1.91,1.91,0,0,0-.56.45,2.23,2.23,0,0,0-.36.56,2.5,2.5,0,0,0-.2.64,3.91,3.91,0,0,0,0,.68c0,.14,0,.3.05.48a3.21,3.21,0,0,0,.08.44,1.9,1.9,0,0,0,.21.54,1,1,0,0,0,.33.34.86.86,0,0,0,.46.09,1.49,1.49,0,0,0,.59-.22,1.91,1.91,0,0,0,.56-.45,2.23,2.23,0,0,0,.36-.56,2.36,2.36,0,0,0,.19-.64A3.11,3.11,0,0,0,280.57,272.61Z" style="fill:#37474f"></path><path d="M284.62,266.71a.22.22,0,0,1,.19,0,.2.2,0,0,1,.1.17l0,.35a.45.45,0,0,1-.21.44l-.54.31a1.72,1.72,0,0,0-.9,1.88l.45,3.18a.38.38,0,0,1,0,.25.37.37,0,0,1-.17.18l-.34.21a.21.21,0,0,1-.19,0,.19.19,0,0,1-.11-.16l-.73-5.08a.47.47,0,0,1,.05-.25.45.45,0,0,1,.17-.19l.34-.2a.19.19,0,0,1,.19,0,.19.19,0,0,1,.11.16l0,.34a2.25,2.25,0,0,1,.38-.74,2.3,2.3,0,0,1,.66-.55Z" style="fill:#37474f"></path><path d="M287.45,265a1.8,1.8,0,0,1,1-.3,1.09,1.09,0,0,1,.59.21l-.34-2.41a.45.45,0,0,1,.21-.44l.35-.2a.21.21,0,0,1,.19,0,.2.2,0,0,1,.1.17l1,7.14a.38.38,0,0,1,0,.25.4.4,0,0,1-.17.19l-.34.2a.19.19,0,0,1-.19,0,.21.21,0,0,1-.11-.17l-.05-.33a3.11,3.11,0,0,1-.46.82,2.9,2.9,0,0,1-.88.76,2.2,2.2,0,0,1-.85.29,1.24,1.24,0,0,1-.74-.14,1.47,1.47,0,0,1-.56-.55,2.76,2.76,0,0,1-.35-1,2.7,2.7,0,0,1-.07-.35c0-.12,0-.24,0-.35a4.77,4.77,0,0,1,.05-1.2,4.17,4.17,0,0,1,.33-1.07,3.63,3.63,0,0,1,.59-.89A3.09,3.09,0,0,1,287.45,265Zm1.94,2.57c0-.11,0-.25-.05-.43s0-.32-.07-.43a1.21,1.21,0,0,0-.57-1,1.06,1.06,0,0,0-1,.14,2.2,2.2,0,0,0-.91,1,3,3,0,0,0-.21,1.47c0,.2.05.41.08.61a1.44,1.44,0,0,0,.57,1,1,1,0,0,0,1.05-.1,2.32,2.32,0,0,0,.89-1A2.42,2.42,0,0,0,289.39,267.52Z" style="fill:#37474f"></path></g></g><g id="freepik--Plant--inject-197"><g id="freepik--plant--inject-197"><g id="freepik--Pot--inject-197"><path d="M35.36,441.31c-8.17-8.43-13-29.61-5-36.3H70.89c8,6.68,3.17,27.86-5,36.29l-.22.24-.29.27c-.23.23-.47.45-.73.67l-.2.15c-.2.16-.4.32-.62.47a10,10,0,0,1-1.05.69c-6.72,3.92-17.61,3.92-24.33,0h0c-.36-.21-.71-.44-1.06-.69s-.39-.29-.58-.44l-.24-.19c-.25-.21-.49-.43-.71-.64l-.33-.32C35.48,441.44,35.41,441.38,35.36,441.31Z" style="fill:#37474f"></path><path d="M67.37,402.32c9.25,5.4,9.25,14.15,0,19.55s-24.24,5.4-33.49,0-9.25-14.15,0-19.55S58.12,396.92,67.37,402.32Z" style="fill:#455a64"></path><path d="M62.92,404.92c6.79,4,6.79,10.39,0,14.36s-17.8,4-24.59,0-6.8-10.4,0-14.36S56.13,401,62.92,404.92Z" style="fill:#263238"></path><path d="M38.33,411.73c6.79-4,17.8-4,24.59,0A11.36,11.36,0,0,1,67,415.5a11.29,11.29,0,0,1-4.07,3.78c-6.79,4-17.8,4-24.59,0a11.29,11.29,0,0,1-4.07-3.78A11.36,11.36,0,0,1,38.33,411.73Z" style="fill:#fafafa"></path></g><path d="M47.9,357.68c-3.11,3.36-11.74,4.29-15.32-4.8-3.35-8.53-7-16.62-8-19.75A3.22,3.22,0,0,1,26.64,329s.25-4.69,8.19-1.51,13.55,8,17,15.78S53.21,356.63,47.9,357.68Z" style="fill:#E11D48"></path><path d="M47.9,357.68c-3.11,3.36-11.74,4.29-15.32-4.8-3.35-8.53-7-16.62-8-19.75A3.22,3.22,0,0,1,26.64,329s.25-4.69,8.19-1.51,13.55,8,17,15.78S53.21,356.63,47.9,357.68Z" style="fill:#fff;opacity:0.45"></path><path d="M51.34,369.7a44.36,44.36,0,0,0-.69-4.74A64.63,64.63,0,0,0,48,355.81a67.52,67.52,0,0,0-9.2-17,58.14,58.14,0,0,0-7.23-8.2c-.09-.08-.15.1-.09.16a72,72,0,0,1,11.32,15.65,73.15,73.15,0,0,1,6.56,17.75c.39,1.73.76,3.47,1.08,5.21s.5,3.56.8,5.33c0,.18.31.29.32,0A34.36,34.36,0,0,0,51.34,369.7Z" style="fill:#E11D48"></path><path d="M51.34,369.7a44.36,44.36,0,0,0-.69-4.74A64.63,64.63,0,0,0,48,355.81a67.52,67.52,0,0,0-9.2-17,58.14,58.14,0,0,0-7.23-8.2c-.09-.08-.15.1-.09.16a72,72,0,0,1,11.32,15.65,73.15,73.15,0,0,1,6.56,17.75c.39,1.73.76,3.47,1.08,5.21s.5,3.56.8,5.33c0,.18.31.29.32,0A34.36,34.36,0,0,0,51.34,369.7Z" style="opacity:0.30000000000000004"></path><path d="M54,355.32c-7.13,2.2-12.43-3.36-10.6-12.09s11-18.43,14.47-15.82c2.16-2.16,6.93-1.39,9.17,5.7S67.24,358.41,54,355.32Z" style="fill:#E11D48"></path><path d="M54,355.32c-7.13,2.2-12.43-3.36-10.6-12.09s11-18.43,14.47-15.82c2.16-2.16,6.93-1.39,9.17,5.7S67.24,358.41,54,355.32Z" style="fill:#fff;opacity:0.25"></path><path d="M58.17,332.72a95.86,95.86,0,0,0-4.74,15.69,152,152,0,0,0-2.75,16.42A256.36,256.36,0,0,0,49.25,397q0,4.46.12,8.91c.05,3.06,0,6.15.27,9.19.1,1.17,1.76.86,1.78-.21.1-5.35-.19-10.72-.24-16.06s0-10.58.1-15.87a223.45,223.45,0,0,1,2.88-32.15c.51-3,1.08-5.91,1.77-8.83.72-3.08,1.61-6.11,2.42-9.16C58.38,332.72,58.24,332.56,58.17,332.72Z" style="fill:#E11D48"></path><path d="M58.17,332.72a95.86,95.86,0,0,0-4.74,15.69,152,152,0,0,0-2.75,16.42A256.36,256.36,0,0,0,49.25,397q0,4.46.12,8.91c.05,3.06,0,6.15.27,9.19.1,1.17,1.76.86,1.78-.21.1-5.35-.19-10.72-.24-16.06s0-10.58.1-15.87a223.45,223.45,0,0,1,2.88-32.15c.51-3,1.08-5.91,1.77-8.83.72-3.08,1.61-6.11,2.42-9.16C58.38,332.72,58.24,332.56,58.17,332.72Z" style="opacity:0.30000000000000004"></path><path d="M42.38,380.92c-3.12,3.53-10.26,3.22-15.05-3.08s-7.66-30-.92-28.45c1.43-3.16,20.05,4.42,22.44,19.87C50.59,380.49,42.38,380.92,42.38,380.92Z" style="fill:#E11D48"></path><path d="M42.38,380.92c-3.12,3.53-10.26,3.22-15.05-3.08s-7.66-30-.92-28.45c1.43-3.16,20.05,4.42,22.44,19.87C50.59,380.49,42.38,380.92,42.38,380.92Z" style="fill:#fff;opacity:0.25"></path><path d="M48,392.11a31.92,31.92,0,0,0-.92-4.32,88.92,88.92,0,0,0-2.77-8.56,90,90,0,0,0-8.32-16.33A78.64,78.64,0,0,0,30,354.55c-.06-.07-.11.09-.08.14,1.67,2.43,3.35,4.82,4.85,7.36s2.94,5.35,4.22,8.12a111,111,0,0,1,6.14,16.48c.46,1.6.84,3.23,1.31,4.82s1.11,3.29,1.53,5c.06.25.37.33.34,0C48.19,395,48.14,393.55,48,392.11Z" style="fill:#E11D48"></path><path d="M48,392.11a31.92,31.92,0,0,0-.92-4.32,88.92,88.92,0,0,0-2.77-8.56,90,90,0,0,0-8.32-16.33A78.64,78.64,0,0,0,30,354.55c-.06-.07-.11.09-.08.14,1.67,2.43,3.35,4.82,4.85,7.36s2.94,5.35,4.22,8.12a111,111,0,0,1,6.14,16.48c.46,1.6.84,3.23,1.31,4.82s1.11,3.29,1.53,5c.06.25.37.33.34,0C48.19,395,48.14,393.55,48,392.11Z" style="opacity:0.30000000000000004"></path><path d="M53.78,377.42c-4.07-.92-4.27-5.82.82-11.83s17.93-8.63,18.55-6.1c2.85,0,2.85,8.94-3.47,17.15S54.17,382.94,53.78,377.42Z" style="fill:#E11D48"></path><path d="M53.78,377.42c-4.07-.92-4.27-5.82.82-11.83s17.93-8.63,18.55-6.1c2.85,0,2.85,8.94-3.47,17.15S54.17,382.94,53.78,377.42Z" style="fill:#fff;opacity:0.25"></path><path d="M61.77,368.69A32.31,32.31,0,0,0,50,383.92c-.13.35.47.86.62.48a37.54,37.54,0,0,1,11.2-15.63S61.82,368.65,61.77,368.69Z" style="fill:#E11D48"></path><path d="M61.77,368.69A32.31,32.31,0,0,0,50,383.92c-.13.35.47.86.62.48a37.54,37.54,0,0,1,11.2-15.63S61.82,368.65,61.77,368.69Z" style="opacity:0.30000000000000004"></path><path d="M58.44,407.25c-5.64,2.29-3.22,9,2.29,14.12a25.18,25.18,0,0,0,17.18,6.18c3.79-.27,4.76-.79,4.76-.79a42.67,42.67,0,0,0,0-9.34,18.06,18.06,0,0,0-13.3-14.34C60.55,400.7,58.44,403.89,58.44,407.25Z" style="fill:#E11D48"></path><path d="M58.44,407.25c-5.64,2.29-3.22,9,2.29,14.12a25.18,25.18,0,0,0,17.18,6.18c3.79-.27,4.76-.79,4.76-.79a42.67,42.67,0,0,0,0-9.34,18.06,18.06,0,0,0-13.3-14.34C60.55,400.7,58.44,403.89,58.44,407.25Z" style="fill:#fff;opacity:0.45"></path><path d="M74.07,417.18a45.54,45.54,0,0,0-8.64-8c-3.22-2.12-7.5-3.92-11.36-2.6-1.49.51-3.82,2-3.54,3.85,0,.18.36.64.58.38a15.31,15.31,0,0,1,2-2.37,6.06,6.06,0,0,1,3-1.15,14.11,14.11,0,0,1,7.92,1.8c3.82,2,6.9,5.17,9.94,8.18C74.06,417.3,74.1,417.21,74.07,417.18Z" style="fill:#E11D48"></path><path d="M74.07,417.18a45.54,45.54,0,0,0-8.64-8c-3.22-2.12-7.5-3.92-11.36-2.6-1.49.51-3.82,2-3.54,3.85,0,.18.36.64.58.38a15.31,15.31,0,0,1,2-2.37,6.06,6.06,0,0,1,3-1.15,14.11,14.11,0,0,1,7.92,1.8c3.82,2,6.9,5.17,9.94,8.18C74.06,417.3,74.1,417.21,74.07,417.18Z" style="opacity:0.30000000000000004"></path><path d="M40.13,385.64c1.1-2.29-.93-8.93-11.51-12.74s-19.85-1.25-22,.44-3.54,3.7-1.71,4.75,8.44,3.39,12.38,6.55,11.48,11.48,18.1,11.22S42.6,388.8,40.13,385.64Z" style="fill:#E11D48"></path><path d="M40.13,385.64c1.1-2.29-.93-8.93-11.51-12.74s-19.85-1.25-22,.44-3.54,3.7-1.71,4.75,8.44,3.39,12.38,6.55,11.48,11.48,18.1,11.22S42.6,388.8,40.13,385.64Z" style="fill:#fff;opacity:0.45"></path><path d="M46.28,396.1C44.06,385.5,33,379.67,23.34,377.31a39.23,39.23,0,0,0-9.71-1.12c-.05,0-.08.1,0,.11a51.44,51.44,0,0,1,15.74,3.76,33.62,33.62,0,0,1,13,9.12,20.07,20.07,0,0,1,3.69,7C46.09,396.48,46.32,396.31,46.28,396.1Z" style="fill:#E11D48"></path><path d="M46.28,396.1C44.06,385.5,33,379.67,23.34,377.31a39.23,39.23,0,0,0-9.71-1.12c-.05,0-.08.1,0,.11a51.44,51.44,0,0,1,15.74,3.76,33.62,33.62,0,0,1,13,9.12,20.07,20.07,0,0,1,3.69,7C46.09,396.48,46.32,396.31,46.28,396.1Z" style="opacity:0.30000000000000004"></path><path d="M63.91,364.82c-.14,4.05,5.55,6.4,11.07,2.9s11.29-6.91,16.4-8.23S98.91,354,97.3,352s-4.18-7.11-17.61-5.45-18.2,7.72-20,12S61.89,366,63.91,364.82Z" style="fill:#E11D48"></path><path d="M63.91,364.82c-.14,4.05,5.55,6.4,11.07,2.9s11.29-6.91,16.4-8.23S98.91,354,97.3,352s-4.18-7.11-17.61-5.45-18.2,7.72-20,12S61.89,366,63.91,364.82Z" style="fill:#fff;opacity:0.45"></path><path d="M85.78,352a14.62,14.62,0,0,0-5.76.6,29.66,29.66,0,0,0-4.94,1.77,27.3,27.3,0,0,0-8.4,6.09,24.32,24.32,0,0,0-1.89,2.28,9.64,9.64,0,0,0-1.44,2.35c-.09.27.3.7.54.43.66-.77,1.16-1.71,1.79-2.51a25.41,25.41,0,0,1,2.16-2.48A27.57,27.57,0,0,1,73,356.42a32.37,32.37,0,0,1,5.74-2.79,32.82,32.82,0,0,1,3.34-1,11.63,11.63,0,0,1,3.65-.51C85.81,352.13,85.84,352,85.78,352Z" style="fill:#E11D48"></path><path d="M85.78,352a14.62,14.62,0,0,0-5.76.6,29.66,29.66,0,0,0-4.94,1.77,27.3,27.3,0,0,0-8.4,6.09,24.32,24.32,0,0,0-1.89,2.28,9.64,9.64,0,0,0-1.44,2.35c-.09.27.3.7.54.43.66-.77,1.16-1.71,1.79-2.51a25.41,25.41,0,0,1,2.16-2.48A27.57,27.57,0,0,1,73,356.42a32.37,32.37,0,0,1,5.74-2.79,32.82,32.82,0,0,1,3.34-1,11.63,11.63,0,0,1,3.65-.51C85.81,352.13,85.84,352,85.78,352Z" style="opacity:0.30000000000000004"></path><path d="M54.27,386.68c-1.88-1.88-7-1.45-9.41,4.12s2.66,11.65,3.23,13.36c2.33-1.35,4.15-.55,8.26-1.35a10.25,10.25,0,0,0,7.87-10.23C64,387.49,61.8,384.12,54.27,386.68Z" style="fill:#E11D48"></path><path d="M54.27,386.68c-1.88-1.88-7-1.45-9.41,4.12s2.66,11.65,3.23,13.36c2.33-1.35,4.15-.55,8.26-1.35a10.25,10.25,0,0,0,7.87-10.23C64,387.49,61.8,384.12,54.27,386.68Z" style="fill:#fff;opacity:0.45"></path><path d="M54.2,386.12a7.69,7.69,0,0,0-2.49,2.58,14,14,0,0,0-1.62,3.12,13.37,13.37,0,0,0-.71,7.08c0,.09.09,0,.09,0a14.64,14.64,0,0,1,1.19-7,13.66,13.66,0,0,1,1.7-2.81,14.16,14.16,0,0,1,1.13-1.31,7.35,7.35,0,0,0,1.08-1.08C54.71,386.44,54.49,386,54.2,386.12Z" style="fill:#E11D48"></path><path d="M54.2,386.12a7.69,7.69,0,0,0-2.49,2.58,14,14,0,0,0-1.62,3.12,13.37,13.37,0,0,0-.71,7.08c0,.09.09,0,.09,0a14.64,14.64,0,0,1,1.19-7,13.66,13.66,0,0,1,1.7-2.81,14.16,14.16,0,0,1,1.13-1.31,7.35,7.35,0,0,0,1.08-1.08C54.71,386.44,54.49,386,54.2,386.12Z" style="opacity:0.30000000000000004"></path><path d="M45.41,398c-.17-4.14-4.65-7.42-11-9.32a17.38,17.38,0,0,0-17.95,4.77c-4.66,5.07-7.07,9.38-5.17,10.59s10.35,4.32,15.87,6,12.77,2.24,18.29-1S50.59,400,45.41,398Z" style="fill:#E11D48"></path><path d="M45.41,398c-.17-4.14-4.65-7.42-11-9.32a17.38,17.38,0,0,0-17.95,4.77c-4.66,5.07-7.07,9.38-5.17,10.59s10.35,4.32,15.87,6,12.77,2.24,18.29-1S50.59,400,45.41,398Z" style="fill:#fff;opacity:0.25"></path><path d="M45.77,397.49a17.57,17.57,0,0,0-6.94-1.86,32.3,32.3,0,0,0-6.95.09,42.19,42.19,0,0,0-7.19,1.52c-1.23.36-2.45.76-3.65,1.21a24.91,24.91,0,0,0-3.34,1.37s-.07.16,0,.15c1.17-.25,2.32-.71,3.46-1.06s2.47-.74,3.72-1.06A48.72,48.72,0,0,1,32,396.5a31.61,31.61,0,0,1,7.21,0,42,42,0,0,1,6.53,1.6C46.15,398.26,46,397.63,45.77,397.49Z" style="fill:#E11D48"></path><path d="M45.77,397.49a17.57,17.57,0,0,0-6.94-1.86,32.3,32.3,0,0,0-6.95.09,42.19,42.19,0,0,0-7.19,1.52c-1.23.36-2.45.76-3.65,1.21a24.91,24.91,0,0,0-3.34,1.37s-.07.16,0,.15c1.17-.25,2.32-.71,3.46-1.06s2.47-.74,3.72-1.06A48.72,48.72,0,0,1,32,396.5a31.61,31.61,0,0,1,7.21,0,42,42,0,0,1,6.53,1.6C46.15,398.26,46,397.63,45.77,397.49Z" style="opacity:0.30000000000000004"></path><path d="M58.59,391.78c-4.56-3.62-3-12.32,12.93-12.79s27.38,3.71,26.87,8.85c2.57,2.57,1.27,9.77-11.66,12S55.29,401,58.59,391.78Z" style="fill:#E11D48"></path><path d="M58.59,391.78c-4.56-3.62-3-12.32,12.93-12.79s27.38,3.71,26.87,8.85c2.57,2.57,1.27,9.77-11.66,12S55.29,401,58.59,391.78Z" style="fill:#fff;opacity:0.25"></path><path d="M90.88,387.89a68.82,68.82,0,0,0-14.27-.83,55,55,0,0,0-13.17,1.51,19.37,19.37,0,0,0-3.21,1.2,15.89,15.89,0,0,0-1.41.75c-.36.22-.76.41-.89.84a.43.43,0,0,0,.47.5,16.44,16.44,0,0,0,2.79-1.38,22.94,22.94,0,0,1,2.77-1,34.91,34.91,0,0,1,5.55-1.09A98,98,0,0,1,83,387.64c2.63,0,5.24.23,7.86.44C90.93,388.08,91,387.91,90.88,387.89Z" style="fill:#E11D48"></path><path d="M90.88,387.89a68.82,68.82,0,0,0-14.27-.83,55,55,0,0,0-13.17,1.51,19.37,19.37,0,0,0-3.21,1.2,15.89,15.89,0,0,0-1.41.75c-.36.22-.76.41-.89.84a.43.43,0,0,0,.47.5,16.44,16.44,0,0,0,2.79-1.38,22.94,22.94,0,0,1,2.77-1,34.91,34.91,0,0,1,5.55-1.09A98,98,0,0,1,83,387.64c2.63,0,5.24.23,7.86.44C90.93,388.08,91,387.91,90.88,387.89Z" style="opacity:0.30000000000000004"></path></g></g><g id="freepik--user-icon--inject-197"><g id="freepik--Icon--inject-197"><path d="M210.86,108.1l42.42-24.49-.69-6.11c-.44-3.87-2-6.57-4.2-7.85l-5.9-3.4c-2.21-1.27-5.08-1.14-8.19.66L218,76.3c-6.23,3.6-11.51,12.76-12.39,21.48l-.69,6.91Z" style="fill:#e0e0e0"></path><path d="M252.59,77.85c-.44-3.87-2-6.57-4.2-7.84s-5.08-1.14-8.19.66l-16.27,9.39c-6.22,3.59-11.5,12.75-12.38,21.48l-.69,6.91L253.28,84Z" style="fill:#fafafa"></path><path d="M245.17,70.17a5.38,5.38,0,0,1,2.72.7c2,1.16,3.31,3.67,3.7,7.09l.62,5.46-40.16,23.19.5-5c.84-8.38,5.95-17.29,11.88-20.72l16.27-9.39a9.08,9.08,0,0,1,4.47-1.36m0-1a10,10,0,0,0-5,1.5l-16.27,9.39c-6.22,3.59-11.5,12.75-12.38,21.48l-.69,6.91L253.28,84l-.69-6.11c-.44-3.87-2-6.57-4.2-7.84a6.32,6.32,0,0,0-3.22-.84Z" style="fill:#e0e0e0"></path><path d="M241.25,43.66c2.09,1.21,3.38,3.8,3.38,7.48,0,7.36-5.17,16.31-11.54,20-3.19,1.84-6.08,2-8.16.81l-5.8-3.35c-2.09-1.2-3.38-3.79-3.38-7.47,0-7.36,5.17-16.31,11.54-20,3.19-1.85,6.08-2,8.16-.81Z" style="fill:#e0e0e0"></path><path d="M233.09,71.13c-3.19,1.84-6.08,2-8.16.81s-3.38-3.8-3.38-7.48c0-7.36,5.16-16.31,11.54-20,3.19-1.84,6.07-2,8.16-.81s3.38,3.79,3.38,7.48C244.63,58.5,239.46,67.45,233.09,71.13Z" style="fill:#fafafa"></path><path d="M238.24,43.89h0a5,5,0,0,1,2.51.64c1.86,1.07,2.88,3.42,2.88,6.61,0,7-4.95,15.61-11,19.12a9.57,9.57,0,0,1-4.66,1.45,4.92,4.92,0,0,1-2.5-.64c-1.86-1.07-2.88-3.42-2.88-6.61,0-7,4.95-15.61,11-19.12a9.5,9.5,0,0,1,4.65-1.45m0-1a10.45,10.45,0,0,0-5.15,1.58c-6.38,3.68-11.54,12.63-11.54,20,0,3.68,1.29,6.27,3.38,7.48a6,6,0,0,0,3,.77,10.51,10.51,0,0,0,5.16-1.58c6.37-3.68,11.54-12.63,11.54-20,0-3.69-1.29-6.27-3.38-7.48a6,6,0,0,0-3-.77Z" style="fill:#e0e0e0"></path></g></g><g id="freepik--Notification--inject-197"><g id="freepik--notification--inject-197"><path d="M183.92,69.56l-9.13-5.29h0c-5-2.83-11.91-2.38-19.52,2-15.33,8.85-27.76,30.38-27.76,48.08,0,8.84,3.1,15,8.1,18h0l8,4.59,2.46-4.11a28.19,28.19,0,0,0,8-3.1c15.33-8.85,27.76-30.38,27.76-48.08a29.65,29.65,0,0,0-.87-7.09Z" style="fill:#37474f"></path><path d="M128.56,105a44.7,44.7,0,0,0-1,9.33c0,8.84,3.1,15,8.1,18h0l8,4.59,2.46-4.11a28.19,28.19,0,0,0,8-3.1,45.06,45.06,0,0,0,7.57-5.58Z" style="fill:#263238"></path><path d="M163.72,71.14C148.38,80,136,101.52,136,119.22s12.43,24.88,27.76,16,27.76-30.38,27.77-48.08S179.05,62.29,163.72,71.14Z" style="fill:#455a64"></path><path d="M174.68,95.79V89c0-7.76-4.72-11.33-10.54-8h0c-5.82,3.36-10.54,12.38-10.54,20.14v6.08a24.07,24.07,0,0,1-3.54,11.87l0,0a6.65,6.65,0,0,0-.86,3.11h0c0,2,1.19,2.85,2.66,2L176.45,110a6.36,6.36,0,0,0,2.66-5.08h0a2.49,2.49,0,0,0-.78-2l0,0C176.11,101.9,174.68,99.45,174.68,95.79Z" style="fill:#fff"></path><path d="M169.2,116.32c0,3.73-2.26,8.06-5.06,9.67s-5.06-.1-5.06-3.83Z" style="fill:#fff"></path></g></g><g id="freepik--Mail--inject-197"><g id="freepik--Envelope--inject-197"><path d="M37.44,148l70.64-40.78,2.82,1.63a2.91,2.91,0,0,1,1.33,2.3v52.11a2.94,2.94,0,0,1-1.33,2.3l-68,39.24a2.9,2.9,0,0,1-2.66,0l-1.5-.86a3,3,0,0,1-1.33-2.3Z" style="fill:#E11D48"></path><path d="M107.69,102.65l.29-.15-1.1-.64h0l-.29-.14L75.5,90.2a2.16,2.16,0,0,0-2.39.76L38.34,141.74a6,6,0,0,0-.9,2.9V148l1.08.62,69.56-41.4v-3.38A2.31,2.31,0,0,0,107.69,102.65Z" style="fill:#E11D48"></path><path d="M74.55,91.21a1.86,1.86,0,0,0-.36.38L39.42,142.37a5.39,5.39,0,0,0-.65,1.45l-1.08-.62a5.83,5.83,0,0,1,.28-.77v0l.15-.31,0,0a2.29,2.29,0,0,1,.18-.31L73.11,91a1.81,1.81,0,0,1,.18-.21l.18-.17Z" style="fill:#fff;opacity:0.4"></path><path d="M108,102.49a2,2,0,0,0-.3-.14L76.58,90.83a2.11,2.11,0,0,0-2,.38l-1.08-.63a2.17,2.17,0,0,1,2-.38l31.09,11.52a1.92,1.92,0,0,1,.29.14Z" style="fill:#fff;opacity:0.7000000000000001"></path><path d="M74.19,91.59,39.42,142.37a6,6,0,0,0-.9,2.9v3.37l70.64-40.78v-3.37a2.45,2.45,0,0,0-1.49-2.14L76.58,90.83A2.13,2.13,0,0,0,74.19,91.59Z" style="fill:#E11D48"></path><polygon points="107.24 165.59 107.24 88.5 43.58 125.25 43.58 202.34 107.24 165.59" style="fill:#fafafa"></polygon><path d="M107.06,88.81v76.68L43.76,202V125.36l63.3-36.55m.36-.63-64,37v77.51l64-37V88.18Z" style="fill:#ebebeb"></path><polygon points="43.4 125.15 41.98 124.33 106 87.36 107.42 88.18 43.4 125.15" style="fill:#f5f5f5"></polygon><polygon points="41.98 124.33 41.98 201.83 43.4 202.66 43.4 125.15 41.98 124.33" style="fill:#e0e0e0"></polygon><path d="M49.28,135a.61.61,0,0,0,.32-.08l52.26-30.18a.64.64,0,1,0-.64-1.11L49,133.79a.63.63,0,0,0-.23.87A.61.61,0,0,0,49.28,135Z" style="fill:#e0e0e0"></path><path d="M49.28,145.17a.61.61,0,0,0,.32-.08l52.26-30.18a.64.64,0,1,0-.64-1.11L49,144a.63.63,0,0,0-.23.87A.61.61,0,0,0,49.28,145.17Z" style="fill:#e0e0e0"></path><path d="M49.28,155.36a.61.61,0,0,0,.32-.08l52.26-30.18a.64.64,0,1,0-.64-1.11L49,154.17a.63.63,0,0,0-.23.87A.61.61,0,0,0,49.28,155.36Z" style="fill:#e0e0e0"></path><path d="M112.21,110.84h0c-.06-.39-.26-.49-.52-.31a1.42,1.42,0,0,0-.34.35l-.15.2-29,44.17-4.33,6a2.48,2.48,0,0,1-2.39.89l-3.75-.89L43.09,150.77a1.43,1.43,0,0,0-.58,0l-.22.07,1.08-.62,27.4,10,3.61,1.29a2.48,2.48,0,0,0,2.39-.9l4.34-6,29.19-44.36a1.07,1.07,0,0,1,.33-.31l-2.53-1.45,1.06-.61,1.75,1A3,3,0,0,1,112.21,110.84Z" style="fill:#E11D48"></path><path d="M110.44,164l-.07.11-29.44-9.34a5.08,5.08,0,0,0-6.36,2L43.1,203.47l-1.16.67h0a1,1,0,0,1-.9.1L73.39,156a5.09,5.09,0,0,1,6.37-2Z" style="fill:#E11D48"></path><path d="M110.9,108.86l-1.74-1-1.06.61,2.52,1.45h0a1.08,1.08,0,0,0-.33.31L81.15,154.52l-.14.22.19.06,1,.33,29-44,.15-.2a1.26,1.26,0,0,1,.34-.35c.26-.18.46-.08.52.3h0A3.07,3.07,0,0,0,110.9,108.86Z" style="fill:#fff;opacity:0.4"></path><path d="M43.67,151.62,37.44,148v53.64a3,3,0,0,0,1.33,2.3l1.5.86a2.9,2.9,0,0,0,2.66,0l.74-.43Z" style="fill:#E11D48"></path><path d="M43.67,151.62,37.44,148v53.64a3,3,0,0,0,1.33,2.3l1.5.86a2.9,2.9,0,0,0,2.66,0l.74-.43Z" style="fill:#fff;opacity:0.25"></path><path d="M112.24,111.17v52.1a2.67,2.67,0,0,1-.42,1.35,2.74,2.74,0,0,1-.78.87l-.05,0-.08.06-68,39.24a1,1,0,0,1-.92.11.78.78,0,0,1-.39-.63,1.94,1.94,0,0,1,0-.24V152a1.15,1.15,0,0,1,1.49-1.18l28.58,10.52,3.75.89a2.48,2.48,0,0,0,2.39-.89l4.33-6,29.05-44.17.15-.2C111.83,110.19,112.24,110.32,112.24,111.17Z" style="fill:#E11D48"></path><path d="M112.24,111.17v52.1a2.67,2.67,0,0,1-.42,1.35,2.74,2.74,0,0,1-.78.87l-.05,0-.08.06-68,39.24a1,1,0,0,1-.92.11.78.78,0,0,1-.39-.63,1.94,1.94,0,0,1,0-.24V152a1.15,1.15,0,0,1,1.49-1.18l28.58,10.52,3.75.89a2.48,2.48,0,0,0,2.39-.89l4.33-6,29.05-44.17.15-.2C111.83,110.19,112.24,110.32,112.24,111.17Z" style="fill:#fff;opacity:0.5"></path><path d="M110.32,164.14,81,154.74a5.17,5.17,0,0,0-6.44,2L73.4,156c1.35-2.14,3.72-2.93,6.44-2.05Z" style="fill:#E11D48"></path><path d="M110.32,164.14,81,154.74a5.17,5.17,0,0,0-6.44,2L73.4,156c1.35-2.14,3.72-2.93,6.44-2.05Z" style="fill:#fff;opacity:0.8"></path><path d="M110.91,165.58l.08-.06.05,0a2.74,2.74,0,0,0,.78-.87,2.68,2.68,0,0,0,.41-1.32l-30.08-8.05,20.14,15.3Z" style="fill:#E11D48"></path><path d="M111.82,164.62a2.74,2.74,0,0,1-.78.87l-.05,0-68.06,39.3h0a1,1,0,0,1-.91.1l32.55-48.24a5.12,5.12,0,0,1,6.4-2Z" style="fill:#E11D48"></path><path d="M111.82,164.62a2.74,2.74,0,0,1-.78.87h0L43,204.79l-.07,0a1,1,0,0,1-.91.1l32.55-48.24a5.12,5.12,0,0,1,6.4-2Z" style="fill:#fff;opacity:0.6000000000000001"></path><path d="M37.69,143.2l1.08.62a5.45,5.45,0,0,0-.25,1.45v3.37L37.44,148v-3.37A5.32,5.32,0,0,1,37.69,143.2Z" style="fill:#fff;opacity:0.25"></path><polygon points="43.37 150.2 42.29 150.82 41.2 150.19 38.52 148.64 39.56 148.02 43.37 150.2" style="fill:#E11D48"></polygon><path d="M43.42,150.22,39.56,148l-1,.62,2.68,1.55,1.09.63h0a.66.66,0,0,1,.2-.06,1.43,1.43,0,0,1,.58,0l2.17.8,25,9.19.38-.58Z" style="fill:#fff;opacity:0.4"></path><path d="M74.56,156.69,42,204.93a.92.92,0,0,1-.41-.87v-.87L73.39,156v0Z" style="fill:#E11D48"></path><path d="M74.56,156.69,42,204.93a.92.92,0,0,1-.41-.87v-.87L73.39,156v0Z" style="fill:#fff;opacity:0.30000000000000004"></path></g></g><g id="freepik--Character--inject-197"><g id="freepik--Chartacter--inject-197"><g id="freepik--Bottom--inject-197"><polygon points="415.58 332.72 410.94 330.96 412.48 327.82 415.32 330.49 415.58 332.72"></polygon><path d="M420.42,324.37s.17,3,.21,4-4,3.9-5.05,4.38l-.25-2.23a17.1,17.1,0,0,0-2.35,3.6c-.79,1.35-1.8,3.92-4,5.66-3.21,2.59-8.18,3.88-13.26,4s-8-1.1-9.41-2.2a3.38,3.38,0,0,1-1.52-3.69C385.21,336.62,420.42,324.37,420.42,324.37Z" style="fill:#263238"></path><path d="M406.9,314l0-1.75c-.93,0-1.06,2.51-2.43,4.73a45.54,45.54,0,0,1-7.19,9.1c-5.16,4.66-9.77,7.58-12.07,9.68-3.09,2.81,2.29,7.32,10.57,6.9,4.11-.21,11.42-2.25,13.48-4.66s3.34-6.2,5-8,5.19-3.52,6.22-5.65c.57-1.18.29-3.92,0-6.26-.3-2.14-.34-5.42-1.55-5.16l-.09,1.1c-.5.93-1.65,2.47-5,3C412.12,317.34,407.18,317.46,406.9,314Z" style="fill:#37474f"></path><path d="M411.11,317.14c-1.58-.14-3.28-.68-3.93-2.1,0,0,0,0,0-.05a4,4,0,0,1-1.09,3.37c-1.49,1.72-10.9,13.89-10.9,13.89s8.76-10,10.43-11.92c2.49-2.8,3.27-3.12,5.53-3.19Z" style="opacity:0.15"></path><path d="M409,320.37a.51.51,0,0,0,.56.45.51.51,0,0,0,.45-.56.51.51,0,1,0-1,.11Z" style="opacity:0.15"></path><path d="M406.57,323.06a.51.51,0,0,0,.56.45.51.51,0,0,0-.11-1A.51.51,0,0,0,406.57,323.06Z" style="opacity:0.15"></path><path d="M404.12,325.75a.5.5,0,1,0,1-.11.5.5,0,0,0-.55-.45A.51.51,0,0,0,404.12,325.75Z" style="opacity:0.15"></path><path d="M401.66,328.44a.51.51,0,0,0,.56.45.51.51,0,1,0-.56-.45Z" style="opacity:0.15"></path><path d="M399.2,331.12a.51.51,0,0,0,.56.45.49.49,0,0,0,.45-.55.5.5,0,0,0-.55-.45A.52.52,0,0,0,399.2,331.12Z" style="opacity:0.15"></path><path d="M409.55,320.52a.31.31,0,0,0,.13-.06.21.21,0,0,0,0-.29,8.37,8.37,0,0,0-5.72-2.29h0a.2.2,0,0,0-.19.21.2.2,0,0,0,.22.19,8.11,8.11,0,0,1,5.4,2.18A.23.23,0,0,0,409.55,320.52Z" style="fill:#263238"></path><path d="M407.09,323.2a.31.31,0,0,0,.13-.06.21.21,0,0,0,0-.29,8.34,8.34,0,0,0-5.71-2.29h0a.2.2,0,1,0,0,.4,8.06,8.06,0,0,1,5.4,2.18A.25.25,0,0,0,407.09,323.2Z" style="fill:#263238"></path><path d="M404.64,325.9a.38.38,0,0,0,.13-.06.22.22,0,0,0,0-.29,8.31,8.31,0,0,0-5.71-2.29h0a.2.2,0,1,0,0,.4,8,8,0,0,1,5.41,2.18A.23.23,0,0,0,404.64,325.9Z" style="fill:#263238"></path><path d="M402.18,328.59a.31.31,0,0,0,.13-.06.21.21,0,0,0,0-.29,8.38,8.38,0,0,0-5.72-2.3h0a.22.22,0,0,0-.19.22.2.2,0,0,0,.22.19,8,8,0,0,1,5.4,2.18A.25.25,0,0,0,402.18,328.59Z" style="fill:#263238"></path><path d="M399.72,331.27a.16.16,0,0,0,.13-.06.19.19,0,0,0,0-.28,8.3,8.3,0,0,0-5.71-2.3h0a.2.2,0,0,0-.18.22.19.19,0,0,0,.21.19,8.07,8.07,0,0,1,5.41,2.18A.17.17,0,0,0,399.72,331.27Z" style="fill:#263238"></path><path d="M453.53,347.33c.71,4,1.64,6.53,3.33,8.7s4.73,2.41,7,1.94a9.7,9.7,0,0,0,7.51-7.41c.73-2.73.22-5.86-.83-9.48Z" style="fill:#263238"></path><path d="M462.34,316.94c1.13-.05,2.09,5.26,3.37,10.55,1.37,5.66,3.51,8.66,4.54,12.46,1.44,5.27,1.35,7.73-.15,11.21s-9.28,7.72-13.13,3.46c-3.13-3.48-3.74-7.68-4.14-13.08a137.11,137.11,0,0,0-1.38-13.7c-.69-4-1.44-7.88-.52-8.44.14.58.31,1.33.45,1.9s.49,2.6,1.11,2.55a8.72,8.72,0,0,0-.16-1.52,1.75,1.75,0,0,1,.15-1.33,2,2,0,0,1,1.17-.7,29.45,29.45,0,0,1,3.25-.91c.54-.11,1.1-.21,1.65-.27a18.27,18.27,0,0,1,2.94-.22,1,1,0,0,1,.66.47,1.59,1.59,0,0,1,.13.61,4.6,4.6,0,0,0,.28,1.09c.05.15.19.33.34.27s.16-.21.14-.34c-.07-.65-.21-1.12-.33-1.87,0-.34-.17-.81-.21-1.16S462.41,317.28,462.34,316.94Z" style="fill:#37474f"></path><path d="M466.33,341.77a.39.39,0,1,1-.47-.3A.39.39,0,0,1,466.33,341.77Z" style="opacity:0.15"></path><path d="M465.52,338.1a.39.39,0,1,1-.77.17.4.4,0,0,1,.3-.47A.4.4,0,0,1,465.52,338.1Z" style="opacity:0.15"></path><path d="M464.75,334.64a.39.39,0,1,1-.47-.3A.4.4,0,0,1,464.75,334.64Z" style="opacity:0.15"></path><path d="M464,331.23a.38.38,0,0,1-.3.46.39.39,0,0,1-.47-.29.39.39,0,0,1,.3-.47A.39.39,0,0,1,464,331.23Z" style="opacity:0.15"></path><path d="M455.25,332.82a.4.4,0,0,1-.3.47.4.4,0,0,1-.47-.3.38.38,0,0,1,.3-.46A.39.39,0,0,1,455.25,332.82Z" style="opacity:0.15"></path><path d="M456,336.26a.4.4,0,0,1-.3.47.39.39,0,1,1-.17-.77A.4.4,0,0,1,456,336.26Z" style="opacity:0.15"></path><path d="M456.78,339.72a.39.39,0,1,1-.77.17.39.39,0,1,1,.77-.17Z" style="opacity:0.15"></path><path d="M457.59,343.39a.39.39,0,0,1-.29.47.39.39,0,0,1-.17-.77A.39.39,0,0,1,457.59,343.39Z" style="opacity:0.15"></path><polygon points="461.08 344.75 455 319.2 456.44 319 461.08 344.75" style="opacity:0.15"></polygon><path d="M466,342.05h-.06c-2.64-.26-7,.52-8.62,1.57a.2.2,0,0,1-.27-.06.21.21,0,0,1,.06-.28c1.71-1.1,6.11-1.9,8.87-1.62a.19.19,0,0,1,.18.21A.21.21,0,0,1,466,342.05Z" style="fill:#263238"></path><path d="M465.18,338.38a.14.14,0,0,1-.11,0c-2.07-.69-6.72.39-8.57,1.58a.21.21,0,0,1-.28-.06.2.2,0,0,1,.06-.27c1.93-1.25,6.73-2.36,8.92-1.62a.19.19,0,0,1,.12.25A.18.18,0,0,1,465.18,338.38Z" style="fill:#263238"></path><path d="M464.41,334.92a.21.21,0,0,1-.11,0c-2.07-.69-6.72.39-8.57,1.58a.2.2,0,0,1-.22-.34c1.93-1.24,6.73-2.35,8.92-1.61a.19.19,0,0,1,.12.25A.2.2,0,0,1,464.41,334.92Z" style="fill:#263238"></path><path d="M463.65,331.51h-.11c-2.07-.7-6.72.38-8.57,1.58a.2.2,0,0,1-.21-.34c1.92-1.24,6.72-2.35,8.91-1.62a.21.21,0,0,1,.13.25A.26.26,0,0,1,463.65,331.51Z" style="fill:#263238"></path><path d="M456.31,186.69c2.6,32.92,4.19,77.75,4.19,77.75.24,2.5,2.64,13.17,3.85,25.5,1.27,13,2.31,37.38,2.31,37.38s-9.11,4.89-16.48,2.44c0,0-7.9-41.05-11.68-56.38-3.58-14.51-9.18-42-9.18-42l-3.81,27.22s.51,9.38.23,15.95c-.33,7.63-5.2,44.33-5.2,44.33s-9.9,5.83-17.55,0c0,0-1.33-50.62-1.54-59.8-.43-18,1.68-52.95,2.34-76.21Z" style="fill:#263238"></path><path d="M442.93,224.57q1,11.85,2.3,23.65.61,5.91,1.29,11.81l.67,5.91.35,2.95c.11,1,.31,1.95.46,2.93,1.3,7.81,3.29,22,4.71,29.79s2.92,15.57,4.54,23.33q-1.54-11.79-3.38-23.51c-1.22-7.82-3.13-22-4.47-29.81-.16-1-.36-1.95-.48-2.93l-.36-2.95-.74-5.89q-.75-5.88-1.54-11.77Q444.72,236.32,442.93,224.57Z"></path><path d="M406.46,222.34c-.82,7.36-1.26,14.76-1.58,22.16s-.6,14.82-.32,22.21.37,19.81.65,27.21.61,14.79,1.05,22.18q.17-11.1.07-22.2c-.05-7.4-.18-19.8-.34-27.2l-.14-5.54,0-1.39,0-1.37,0-2.78.13-11.09.18-11.09C406.22,229.74,406.34,226,406.46,222.34Z"></path><path d="M429.32,231.36l-3.21-18s-8.94-1.3-13.52-5.41c0,0,3,5.44,11.38,7.57l3.2,15.93-1.66,27.16Z"></path></g><g id="freepik--Top--inject-197"><g id="freepik--Arm--inject-197"><path d="M390.49,130.37c.06-1.59.81-2.8,2.68-4.07a13.45,13.45,0,0,0,3.83-3.36,36.88,36.88,0,0,1,3.87-4.85c1.07-.87-.21-2.1-2.08-1.89s-6.1,2.36-7.12,4.6A20,20,0,0,0,390.49,130.37Z" style="fill:#f28f8f"></path><path d="M414.78,122.94c-4.3.33-9.45.33-13.9,8.56-4.6,8.49-8.43,15.2-8.43,15.2a82.09,82.09,0,0,1-1.8-11.94c-.37-5.89-.21-8.47,1.66-11.86a100.14,100.14,0,0,0,7.17-11.56,58.09,58.09,0,0,0-9.82,1.34,2,2,0,0,0-1.24.87c-.17.33-.16.72-.32,1.06a2.21,2.21,0,0,1-1.17,1c-1,.47-2.13.88-2.6,1.87-.26.55-.25,1.19-.48,1.75a6.94,6.94,0,0,1-2,2.21,6.16,6.16,0,0,0-1.45,3.13c-1.5,6.07-1.9,12.24-1.9,21.64,0,6.54.39,15.47,2.62,20.41s6.73,10.52,13.33,3.92,18.11-24.94,18.11-24.94Z" style="fill:#ffa8a7"></path><path d="M393,121.74a11.23,11.23,0,0,0-3.06,1.8,3.75,3.75,0,0,1,0,3.31c-.8,2-2.28,2.78-1.91,4.7a3.26,3.26,0,0,1,1.76-3C392.05,127.21,393.3,122.94,393,121.74Z" style="fill:#f28f8f"></path><path d="M414.32,122.68c-4.08.43-8.27.65-12.31,6.19s-9.7,17.17-9.7,17.17l.14.66s3.33,4.22,4,12.56A17.35,17.35,0,0,1,392,172.55a6.69,6.69,0,0,1-1.95.83s1.64,1.21,4-.47,20.75-28,20.75-28Z" style="fill:#37474f"></path><path d="M392.2,145.53l.25,1.17s2.17,7.58-.59,13.34-6.74,6.33-8.81,6.16c-2.28-.2-3-3-3-3l-.42-1.95a1.7,1.7,0,0,0-.51,1.95,52.45,52.45,0,0,0,3.12,7c1.26,2.28,5.5,5.56,9.11,3.56s5.88-6.92,5.88-13.45-1.5-10.71-2.52-12.1-2.82-4.37-2.82-4.37Z" style="fill:#263238"></path></g><g id="freepik--top--inject-197"><g id="freepik--Chest--inject-197"><path d="M454.5,127.39s4.93,4.4,3.63,16.32c-1.14,10.37-1.66,19.07-1.79,23.09C456.15,173,457,194,457,194c-8.9,11.47-48.59,9.88-53.79-.06,0,0,.27-14.28.28-28.07,0-10.1.88-19.39,2.15-25.34,1.71-8,4.43-13.38,6.09-15l13.11-3.6,12-.59Z" style="fill:#455a64"></path></g></g><g id="freepik--Pen--inject-197"><path d="M451.74,59.29a4.19,4.19,0,1,0-7.14-4.39h0l-2.22,3.59a2.09,2.09,0,0,0,.15,2.1,6.53,6.53,0,0,0,5.05,3.11,2.05,2.05,0,0,0,1.94-.81l2.22-3.59Z" style="fill:#455a64"></path><path d="M447.58,63.7a2.05,2.05,0,0,0,1.94-.81l2.22-3.59h0a4.19,4.19,0,0,0,.18-4.07h0c.37,1.13-.69,2.83-1.92,4.82s-2.73,3-5.75,1.27c-2.2-1.24-1.93-2.58-1.62-3.22l-.25.4a2.09,2.09,0,0,0,.15,2.1A6.53,6.53,0,0,0,447.58,63.7Z" style="fill:#37474f"></path><path d="M451.51,76.51a13,13,0,1,0-22.18-13.66h0c-1,1.63-.94,3.94.46,6.52,2.79,5.17,9.81,9.5,15.68,9.66,2.93.09,5-.88,6-2.52Z" style="fill:#E11D48"></path><path d="M451.05,70c-2.79-5.17-9.81-9.49-15.68-9.66-2.94-.08-5,.89-6,2.53L380.58,142c-1,1.64-.93,3.94.46,6.53,2.79,5.16,9.81,9.49,15.68,9.66,2.94.08,5-.89,6-2.53l48.75-79.13C452.51,74.87,452.44,72.56,451.05,70Z" style="fill:#E11D48"></path><path d="M451.05,70c-2.79-5.17-9.81-9.49-15.68-9.66-2.94-.08-5,.89-6,2.53L380.58,142c-1,1.64-.93,3.94.46,6.53,2.79,5.16,9.81,9.49,15.68,9.66,2.94.08,5-.89,6-2.53l48.75-79.13C452.51,74.87,452.44,72.56,451.05,70Z" style="fill:#fff;opacity:0.2"></path><path d="M394,163.12c-6-.17-13.25-4.61-16.12-9.93-1.43-2.65-1.51-5-.47-6.71l3.75-6.08c1-1.68,3.19-2.68,6.2-2.6,6,.18,13.25,4.62,16.12,9.93,1.44,2.66,1.51,5,.48,6.71l-3.75,6.09C399.14,162.21,397,163.21,394,163.12Z" style="fill:#E11D48"></path><path d="M394,163.12c-6-.17-13.25-4.61-16.12-9.93-1.43-2.65-1.51-5-.47-6.71l3.75-6.08c1-1.68,3.19-2.68,6.2-2.6,6,.18,13.25,4.62,16.12,9.93,1.44,2.66,1.51,5,.48,6.71l-3.75,6.09C399.14,162.21,397,163.21,394,163.12Z" style="fill:#fff;opacity:0.35000000000000003"></path><path d="M383.58,143.89c6,.17,13.26,4.62,16.12,9.93,1.44,2.65,1.51,5,.48,6.71s-3.19,2.68-6.21,2.59c-6-.17-13.25-4.61-16.12-9.93-1.43-2.65-1.51-5-.47-6.71S380.57,143.8,383.58,143.89Z" style="fill:#E11D48"></path><path d="M383.58,143.89c6,.17,13.26,4.62,16.12,9.93,1.44,2.65,1.51,5,.48,6.71s-3.19,2.68-6.21,2.59c-6-.17-13.25-4.61-16.12-9.93-1.43-2.65-1.51-5-.47-6.71S380.57,143.8,383.58,143.89Z" style="opacity:0.15"></path><path d="M334.08,220.19c.9-1.45,2.76-2.32,5.37-2.25,5.23.15,11.48,4,14,8.61,1.24,2.3,1.31,4.35.41,5.81h0l-3,2.94h0a5.79,5.79,0,0,1-4.43,1.44,16.73,16.73,0,0,1-12.87-7.92,5.87,5.87,0,0,1-.71-4.62h0Z" style="fill:#E11D48"></path><g style="opacity:0.15"><path d="M334.08,220.19c.9-1.45,2.76-2.32,5.37-2.25,5.23.15,11.48,4,14,8.61,1.24,2.3,1.31,4.35.41,5.81h0l-3,2.94h0a5.79,5.79,0,0,1-4.43,1.44,16.73,16.73,0,0,1-12.87-7.92,5.87,5.87,0,0,1-.71-4.62h0Z"></path></g><path d="M339.45,217.94c5.23.15,11.48,4,14,8.61,1.24,2.3,1.31,4.35.41,5.81l44-71.37c.9-1.46.84-3.52-.41-5.82-2.48-4.6-8.73-8.45-14-8.6-2.62-.07-4.48.79-5.38,2.25l-44,71.37h0C335,218.74,336.84,217.87,339.45,217.94Z" style="fill:#E11D48"></path><path d="M350.45,235.56c.84-1.31.79-3.15-.35-5.24a16.17,16.17,0,0,0-12.56-7.67c-2.33-.06-4,.7-4.79,2h0l0,0h0c-2.79,4.58-8.29,18.42-7.64,25.32l.13.07a2.44,2.44,0,0,0,.32,1.08,6,6,0,0,0,4.65,2.83,2.42,2.42,0,0,0,1.06-.19h0C337.72,251.3,347.67,240.08,350.45,235.56Z" style="fill:#E11D48"></path><path d="M397.38,155.17a13.17,13.17,0,0,0-1.67-2.38l-44,71.37a13.45,13.45,0,0,1,1.68,2.39c.08.15.14.3.21.44l44-71.37A4.66,4.66,0,0,0,397.38,155.17Zm7.13-4.56a6.41,6.41,0,0,0-.17-.73S442.4,88.1,447.7,79.48c5.69-9.24,5.67-13.13,3.61-17,1.23,3.78-4,12.19-4.67,13.29l-43.73,71c.19.3.37.61.54.91l-3.75,6.09a10,10,0,0,1,1.06,2.87ZM328.1,253.48l2.28-1s1.67.18,6.6-4.33,7.93-9.37,13.12-17.8a12.25,12.25,0,0,0-2-2.72c-.05.11-5.84,11.34-13.1,19.27a42.39,42.39,0,0,1-7.24,6.4Z" style="fill:#fff;opacity:0.2"></path><path d="M326.93,250.33l-1.82,2.95c-.79,1.29-2.07,4.93-1.05,5.56s3.71-2.15,4.5-3.44h0l1.81-3s0-.76-1.39-1.6S326.93,250.33,326.93,250.33Z" style="fill:#455a64"></path><path d="M325.38,258.59a1.34,1.34,0,0,0-1.69-1c-.06.62.05,1.1.37,1.29S324.85,258.92,325.38,258.59Z" style="fill:#263238"></path></g><g id="freepik--Hand--inject-197"><path d="M399.46,111.34c1.11,0,3.18,1.2,4.8,2.25s3.12,1.14,2.59,2.32a2.34,2.34,0,0,1-2.15,1,9.1,9.1,0,0,1-2.63-.5c1.91,1.65,2.32,2.31,1.77,2.89-.78.84-2.21.73-3.36.16.65.66,1.38,1,1,1.65s-1.51.82-2.89.57a8,8,0,0,1-2.51-.88c-1.46.39-3.09.95-3.09.95A35.26,35.26,0,0,1,399.46,111.34Z" style="fill:#ffa8a7"></path><path d="M400.48,119.45c-.8-.45-1.55-1-2.32-1.47a3.53,3.53,0,0,0-2.57-.28c-.9.11-1.8.28-2.7.45s-1.8.31-2.71.43c.88-.25,1.77-.47,2.67-.68s1.79-.39,2.7-.53a8.11,8.11,0,0,1,1.4-.07,2.57,2.57,0,0,1,1.35.46C399.07,118.29,399.75,118.89,400.48,119.45Z" style="fill:#f28f8f"></path><path d="M402.07,116.4c-.7-.44-1.4-.89-2.11-1.3a11.24,11.24,0,0,0-1.07-.58,3.17,3.17,0,0,0-1.16-.1c-.82,0-1.63.15-2.45.24s-1.65.21-2.47.29c.8-.21,1.61-.38,2.43-.54a20.09,20.09,0,0,1,2.47-.32,3.38,3.38,0,0,1,1.29.15,10.58,10.58,0,0,1,1.1.64A18.12,18.12,0,0,1,402.07,116.4Z" style="fill:#f28f8f"></path></g><g id="freepik--Head--inject-197"><path d="M440.27,116.34c.78-4,4.85-8,6.72-11.4s2.9-5.86,2.8-9a6.82,6.82,0,0,0-2.12-5.1c.35-6.79-6.48-10.31-11.08-11.55-5.35-1.45-9.74-1.8-15.28.52a12.18,12.18,0,0,0-6.86,6.48,14.65,14.65,0,0,0-.87,6.53,3.78,3.78,0,0,0,.57,1.22c.16.16.12.72.16.94a4.54,4.54,0,0,0,.64,1.78,6.43,6.43,0,0,0,2.22,2.12c2.9,1.48,6.13,2,9.27,2.77l3.73.87c.21.06,1.34.16,1.47.35Z" style="fill:#263238"></path><path d="M445.07,111.37a3.84,3.84,0,0,1-4.68-.26l.72,12c-2.34,5.36-8.83,3.06-16.26,12.38,0,0-2.37-3.9-.42-11.63l-.36-4a44.8,44.8,0,0,1-4.71-.35c-3.34-.51-5-3.46-6.05-7.86a28.44,28.44,0,0,1-.14-12,12,12,0,0,0,.26-3.27,15.34,15.34,0,0,1,1.16-7c3.5-2.66,11.45-3.39,18.72,1.31-1,4.37.64,7.91,3.79,9.67-.18,1.18-.41,4.18,1.54,4.18,1.41,0,1.55-1.76,3-3.28s4.87-1.84,6.11.49A7.59,7.59,0,0,1,445.07,111.37Z" style="fill:#ffa8a7"></path><path d="M424.07,119.8c5-.45,8.88-.93,11.55-4.44a30.71,30.71,0,0,0,3.14-5.77,23.93,23.93,0,0,1-2.32,7.28c-1.3,2.25-4.45,4.25-12.21,4.71Z" style="fill:#f28f8f"></path><polygon points="423.34 96.99 416.52 104.99 422.18 106.88 423.34 96.99" style="fill:#f28f8f"></polygon><path d="M427.12,95.34l2.94,1.7a1.79,1.79,0,0,0-.65-2.38A1.65,1.65,0,0,0,427.12,95.34Z" style="fill:#263238"></path><path d="M415.13,96.3l3.12-1.4A1.64,1.64,0,0,0,416,94,1.8,1.8,0,0,0,415.13,96.3Z" style="fill:#263238"></path><path d="M426.57,99.92a1.39,1.39,0,1,0,1.58-1.24A1.41,1.41,0,0,0,426.57,99.92Z" style="fill:#263238"></path><path d="M427.73,109.16l-5.68.77a3,3,0,0,0,3.32,2.51A2.79,2.79,0,0,0,427.73,109.16Z" style="fill:#b16668"></path><path d="M423.8,112.2a3.39,3.39,0,0,1,3.94-2.22,2.77,2.77,0,0,1-2.37,2.46A3,3,0,0,1,423.8,112.2Z" style="fill:#f28f8f"></path><path d="M417.45,98a1.44,1.44,0,1,0,1.31,1.51A1.42,1.42,0,0,0,417.45,98" style="fill:#263238"></path></g><g id="freepik--Tie--inject-197"><path d="M424.85,135.44a17.54,17.54,0,0,0,2.7-2.28c1.21-1.3,1.78-1.89,2.25-1.45a31.05,31.05,0,0,1,3.11,5.35c.53,1.19.43,1.18,2.06.1a29.12,29.12,0,0,0,7.4-7.13,21.58,21.58,0,0,0,2.93-5.87s-1.85-2.57-2.4-3.55c-1-1.89-1-2.68-2.09-2.51v1.34c-.18,1.65-2.57,3.14-4.88,5.13s-6.05,3.9-6.93,4.75C428.36,129.94,424.85,135.44,424.85,135.44Z" style="fill:#37474f"></path><path d="M418.23,134.24c.26.68,2.4-4.6,3.46-4.49.5.05,1.46,2.65,2,3.63s.84,1.44,1.18,2.06c-.63-1.59-.81-5.68-.94-6.74a18.36,18.36,0,0,1,.52-4.89l-.36-4c-.27,0-.6,0-.95,0a13.8,13.8,0,0,0-1.47,1.78c-1,1.68-2.93,4.74-3.27,6.75A17.8,17.8,0,0,0,418.23,134.24Z" style="fill:#37474f"></path></g><path d="M452.34,126.65c7.51,2.41,12.4,3.48,15.08,9s7.27,19.35,9.81,27.69c2.18,7.14,3.33,13.64,1.74,16.89l-15.76-5.66-8.58-22.42S447.41,134.31,452.34,126.65Z" style="fill:#37474f"></path><path d="M461.19,163.58c1.4,1.74,2.94,2.37,6.3,3.72,3.13,1.26,6.74,2.42,8.76,5.63-.7-3-2.46-4.46-6.38-6.38s-9.64-4.16-9.64-4.16Z" style="fill:#263238"></path><path d="M461.19,163.58c1.4,1.74,2.94,2.37,6.3,3.72,3.13,1.26,6.74,2.42,8.76,5.63,1.78,2.83,3.67,5.16,2.72,7.35-.66,1.5-4.88,2.65-8.94,2.61s-7-3.25-11.21-5.92c-3.64-2.29-5.55-3.77-5.55-3.77Z" style="fill:#ffa8a7"></path><path d="M454.57,167.76c1.5-1.5,1.77-3,4-4.29s3.62-1.22,6-2.42,4.27-1.83,6.05-1.25,1.51,1.6.17,2.44-3.63,1.95-5.23,3.12-3.15,1.83-3.15,3.85a90.16,90.16,0,0,0,.72,9.57c.44,3.39,1.11,6.13.86,6.5s-1.71.53-2.61-1.36-2.06-8.78-2.06-8.78-.65,4.78-.91,8.08-.37,5.81-.47,6.51-2.43.17-2.8-2.32.1-9.85.1-9.85-1.94,3.35-3.18,5.53-2.79,5.14-3.3,5.87-2-.56-1.64-2.54S450,179.6,450,179.6s-3.06,3.21-3.6,3.52-2.17.07-1.61-2.12c.37-1.46,1.3-2.39,3.76-5.2s2.43-4,3.19-5.27C452.71,168.83,453.49,168.85,454.57,167.76Z" style="fill:#ffa8a7"></path><path d="M470.57,159.8a2.77,2.77,0,0,1,.85.45.77.77,0,0,1,.32.8,2.63,2.63,0,0,1-1.34,1.24L467,164.15a16,16,0,0,0-1.66,1c-.52.37-1.07.71-1.6,1.11a4.09,4.09,0,0,0-1.35,1.53,4.22,4.22,0,0,0-.29,2q.14,3.9.63,7.76c.17,1.29.38,2.57.62,3.85l.39,1.9a5.93,5.93,0,0,1,.21,1.91,5.71,5.71,0,0,0-.08-1.93l-.25-1.93c-.19-1.28-.35-2.56-.47-3.85-.24-2.57-.45-5.15-.5-7.72a3.88,3.88,0,0,1,.22-1.79A3.72,3.72,0,0,1,464,166.7c.5-.38,1-.73,1.57-1.12s1.05-.73,1.6-1.07l3.33-2a2.72,2.72,0,0,0,1.33-1.44.87.87,0,0,0-.41-.88A3,3,0,0,0,470.57,159.8Z" style="fill:#f28f8f"></path><path d="M460.68,168.9c-2.45,1.09-4.85,0-5.18-.62C455.66,170,459,171,460.68,168.9Z" style="fill:#f28f8f"></path><path d="M444.69,182.27a1.13,1.13,0,0,0,1.54-.11c.61-.52,2.13-2.23,2.82-3s3.06-3.59,3.06-3.59l-2.15,4s-3.06,3.21-3.6,3.52A1.19,1.19,0,0,1,444.69,182.27Z" style="fill:#f28f8f"></path></g></g></g><g id="freepik--speech-bubble--inject-197"><g id="freepik--speech-bubble--inject-197"><g id="freepik--speech-bubble--inject-197"><path d="M398.73,53.55a20.58,20.58,0,0,1,6.07,13.9l-.05,2.37A20.64,20.64,0,0,1,363.6,70l-.07-2.36a20.64,20.64,0,0,1,35.2-14Z" style="fill:#fff"></path><path d="M368.24,52.45a22.41,22.41,0,0,0,29,34l6.39,2.78a1.3,1.3,0,0,0,1.71-1.72L402.5,81.1a22.41,22.41,0,0,0-34.26-28.65Zm30.46,1.07a20.57,20.57,0,0,1,6.1,13.9l0,2.36A20.65,20.65,0,0,1,363.6,70l-.07-2.36A20.65,20.65,0,0,1,398.7,53.52Z" style="fill:#455a64"></path></g><g id="freepik--Check--inject-197"><path d="M381.19,79.48a3.09,3.09,0,0,1-2.25-1l-7-7.45a3.08,3.08,0,0,1,4.5-4.21L381,71.69l10.72-13.58a3.08,3.08,0,1,1,4.83,3.81L383.6,78.31a3.05,3.05,0,0,1-2.28,1.17Z" style="fill:#E11D48"></path></g></g></g></svg>
```

## File: src/App.css
```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

```

## File: src/App.jsx
```jsx
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import OAuthCallback from './pages/Auth/OAuthCallback';
import Chat from './pages/Chat/Chat';
import Profile from './pages/Profile/Profile';
import ProtectedRoute from './components/layout/ProtectedRoute';
import {useAuthStore} from './stores/authStore';

function App() {
    const {isAuthenticated} = useAuthStore();

    return (
        <Router>
            <div className="min-h-screen bg-background">
                <Routes>
                    <Route
                        path="/login"
                        element={!isAuthenticated ? <Login /> : <Navigate to="/chat" />}
                    />
                    <Route
                        path="/signup"
                        element={!isAuthenticated ? <Signup /> : <Navigate to="/chat" />}
                    />
                    <Route
                        path="/oauth-callback"
                        element={<OAuthCallback />}
                    />
                    <Route
                        path="/chat"
                        element={
                            <ProtectedRoute>
                                <Chat />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/"
                        element={<Navigate to={isAuthenticated ? "/chat" : "/login"} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
```

## File: src/components/layout/Layout.jsx
```jsx
import {useState} from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({children}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-background">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="flex-1 flex flex-col">
                <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
```

## File: src/components/layout/Navbar.jsx
```jsx
import {Button} from '@/components/ui/button';
import {useAuthStore} from '@/stores/authStore';
import {Menu, LogOut} from 'lucide-react';
import {ThemeToggle} from '@/components/ui/theme-toggle';

const Navbar = ({onMenuClick}) => {
    const {logout} = useAuthStore();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onMenuClick}
                        className="lg:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <h1 className="text-xl font-bold">JustChat</h1>
                </div>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Button variant="ghost" size="icon" onClick={handleLogout}>
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
```

## File: src/components/layout/ProtectedRoute.jsx
```jsx
import {Navigate} from 'react-router-dom';
import {useAuthStore} from '@/stores/authStore';

const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useAuthStore();

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
```

## File: src/components/layout/Sidebar.jsx
```jsx
import {useConversationStore} from '@/stores/conversationStore';
import {useAuthStore} from '@/stores/authStore';
import {Button} from '@/components/ui/button';
import {X, MessageSquare, Plus, User, Settings} from 'lucide-react';
import {useNavigate} from 'react-router-dom';

const Sidebar = ({isOpen, onClose}) => {
    const {conversationsList, loadConversations, setCurrentConversation} = useConversationStore();
    const {user} = useAuthStore();
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profile');
        onClose();
    };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-80 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border">
                        <h2 className="text-lg font-semibold">Conversations</h2>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <Plus className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Conversations List */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {conversationsList.length === 0 ? (
                            <div className="text-center text-muted-foreground py-8">
                                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>No conversations yet</p>
                                <p className="text-sm">Start a new chat to begin messaging</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {conversationsList.map((conversation) => (
                                    <div
                                        key={conversation.id}
                                        className="p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                                        onClick={() => {
                                            setCurrentConversation(conversation.id);
                                            onClose();
                                        }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                                <MessageSquare className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm truncate">
                                                    {conversation.user1.id === user?.id
                                                        ? conversation.user2.full_name
                                                        : conversation.user1.full_name
                                                    }
                                                </p>
                                                <p className="text-xs text-muted-foreground truncate">
                                                    {conversation.last_message?.message_text || 'No messages yet'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* User Profile Button */}
                    <div className="p-4 border-t border-border">
                        <Button
                            variant="ghost"
                            className="w-full justify-start p-3 h-auto"
                            onClick={handleProfileClick}
                        >
                            <div className="flex items-center gap-3 w-full">
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                    <span className="text-xs font-medium text-primary-foreground">
                                        {user?.full_name?.charAt(0) || 'U'}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0 text-left">
                                    <p className="text-sm font-medium truncate">{user?.full_name}</p>
                                    <p className="text-xs text-muted-foreground truncate">View profile</p>
                                </div>
                                <Settings className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
```

## File: src/components/ui/button.jsx
```jsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }

```

## File: src/components/ui/card.jsx
```jsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
    {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

```

## File: src/components/ui/form.jsx
```jsx
"use client";
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Controller, FormProvider, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

const FormFieldContext = React.createContext({})

const FormField = (
  {
    ...props
  }
) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

const FormItemContext = React.createContext({})

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props} />
  );
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props} />
  );
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props} />
  );
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}>
      {body}
    </p>
  );
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

```

## File: src/components/ui/input.jsx
```jsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props} />
  );
})
Input.displayName = "Input"

export { Input }

```

## File: src/components/ui/label.jsx
```jsx
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

```

## File: src/components/ui/theme-toggle.jsx
```jsx
import {Moon, Sun} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useUIStore} from '@/stores/uiStore';

export function ThemeToggle() {
    const {theme, toggleTheme} = useUIStore();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
        >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
```

## File: src/constants/config.js
```js
export const APP_CONFIG = {
    APP_NAME: "JustChat",
    API_BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
    WS_URL: import.meta.env.VITE_WS_URL || "ws://localhost:5001",
    UPLOAD: {
        MAX_FILE_SIZE: 5 * 1024 * 1024,
        ALLOWED_IMAGE_TYPES: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
        ],
    },
    MESSAGES: {
        MAX_LENGTH: 1000,
        LOAD_LIMIT: 50,
        EDIT_TIMEOUT: 5 * 60 * 1000,
    },
    REALTIME: {
        TYPING_INDICATOR_TIMEOUT: 3000,
        RECONNECT_DELAY: 1000,
        MAX_RECONNECT_ATTEMPTS: 5,
    },
};

```

## File: src/constants/endpoints.js
```js

```

## File: src/index.css
```css
@import '@fontsource/jetbrains-mono/400.css';
@import '@fontsource/jetbrains-mono/500.css';
@import '@fontsource/jetbrains-mono/600.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Your Rose theme variables remain the same */
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 346.8 77.2% 49.8%;
    --primary-foreground: 355.7 100% 97.3%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 346.8 77.2% 49.8%;
    --radius: 0.65rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
  }

  .dark {
    --background: 20 14.3% 4.1%;
    --foreground: 0 0% 95%;
    --card: 24 9.8% 10%;
    --card-foreground: 0 0% 95%;
    --popover: 0 0% 9%;
    --popover-foreground: 0 0% 95%;
    --primary: 346.8 77.2% 49.8%;
    --primary-foreground: 355.7 100% 97.3%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 15%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 12 6.5% 15.1%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 85.7% 97.3%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 346.8 77.2% 49.8%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-family: 'JetBrains Mono', monospace;
  }
}
```

## File: src/lib/utils.js
```js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

```

## File: src/main.jsx
```jsx
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
```

## File: src/pages/Auth/Login.jsx
```jsx
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useAuthStore} from '@/stores/authStore';
import {ThemeToggle} from '@/components/ui/theme-toggle';
import {Github} from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const {login, error, clearError} = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        clearError();

        try {
            await login(formData);
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (error) clearError();
    };

    const handleGitHubLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/auth/oauth/github`;
    };

    return (
        <div className="min-h-screen flex">
            <div className="flex-1 flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-foreground">JustChat</h1>
                        <p className="text-muted-foreground mt-2">Sign in to your account</p>
                    </div>

                    <Card>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
                            <CardDescription className="text-center">
                                Enter your credentials to continue
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full mb-6"
                                onClick={handleGitHubLogin}
                                disabled={isLoading}
                            >
                                <Github className="mr-2 h-4 w-4" />
                                Continue with GitHub
                            </Button>

                            <div className="relative mb-6">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Or continue with email
                                    </span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                        <Link
                                            to="/forgot-password"
                                            className="text-sm text-primary hover:text-primary/90"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>

                                {error && (
                                    <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                                        {error}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Wait ...' : 'Log In'}
                                </Button>
                            </form>

                            <div className="mt-6 text-center text-sm">
                                Don't have an account?{' '}
                                <Link
                                    to="/signup"
                                    className="text-primary hover:text-primary/90 font-medium"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

           <div className="flex-1 hidden lg:flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <img 
                        src="/Login.svg" 
                        alt="Login Illustration"
                        className="w-full h-auto"
                    />
                </div>
            </div>

            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
        </div>
    );
};

export default Login;
```

## File: src/pages/Auth/OAuthCallback.jsx
```jsx
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuthStore} from '@/stores/authStore';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

const OAuthCallback = () => {
    const navigate = useNavigate();
    const {initialize} = useAuthStore();

    useEffect(() => {
        const handleOAuthCallback = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const accessToken = urlParams.get('accessToken');
            const refreshToken = urlParams.get('refreshToken');
            const user = urlParams.get('user');

            if (accessToken && refreshToken && user) {
                try {
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);

                    const userData = JSON.parse(decodeURIComponent(user));
                    localStorage.setItem('user', JSON.stringify(userData));

                    await initialize();
                    navigate('/chat');
                } catch (error) {
                    console.error('OAuth callback error:', error);
                    navigate('/login?error=oauth_failed');
                }
            } else {
                navigate('/login?error=oauth_failed');
            }
        };

        handleOAuthCallback();
    }, [navigate, initialize]);

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-center">Completing sign in...</CardTitle>
                        <CardDescription className="text-center">
                            Please wait while we complete your authentication.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </CardContent>
                </Card>
            </div>
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
        </>

        
    );
};

export default OAuthCallback;
```

## File: src/pages/Auth/Signup.jsx
```jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/stores/authStore';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Github } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        full_name: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const { signup, error, clearError } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            return;
        }

        setIsLoading(true);
        clearError();

        try {
            await signup({
                email: formData.email,
                password: formData.password,
                full_name: formData.full_name,
            });
        } catch (error) {
            console.error('Signup failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (error) clearError();
    };

    const handleGitHubSignup = () => {
        window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/auth/oauth/github`;
    };

    const passwordsMatch = formData.password === formData.confirmPassword || !formData.confirmPassword;

    return (
        <div className="min-h-screen flex">

            <div className="flex-1 flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-foreground">JustChat</h1>
                        <p className="text-muted-foreground mt-2">Create your account</p>
                    </div>

                    <Card>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl text-center">Get started</CardTitle>
                            <CardDescription className="text-center">
                                Enter your details to create an account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full mb-6"
                                onClick={handleGitHubSignup}
                                disabled={isLoading}
                            >
                                <Github className="mr-2 h-4 w-4" />
                                Continue with GitHub
                            </Button>

                            <div className="relative mb-6">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Or continue with email
                                    </span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="full_name">Full Name</Label>
                                    <Input
                                        id="full_name"
                                        name="full_name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                    {!passwordsMatch && (
                                        <p className="text-sm text-destructive">
                                            Passwords do not match
                                        </p>
                                    )}
                                </div>

                                {error && (
                                    <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                                        {error}
                                    </div>
                                )}

                                <Button 
                                    type="submit" 
                                    className="w-full" 
                                    disabled={isLoading || !passwordsMatch}
                                >
                                    {isLoading ? 'Creating account...' : 'Create Account'}
                                </Button>
                            </form>

                            <div className="mt-6 text-center text-sm">
                                Already have an account?{' '}
                                <Link 
                                    to="/login" 
                                    className="text-primary hover:text-primary/90 font-medium"
                                >
                                    Log in
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="flex-1 hidden lg:flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <img
                        src="/SignUp.svg"
                        alt="Login Illustration"
                        className="w-full h-auto"
                    />
                </div>
            </div>

            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
        </div>
    );
};

export default Signup;
```

## File: src/pages/Chat/Chat.jsx
```jsx
import Layout from '@/components/layout/Layout';

const Chat = () => {
    return (
        <Layout>
            <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Welcome to JustChat</h2>
                    <p>Select a conversation to start chatting</p>
                </div>
            </div>
        </Layout>
    );
};

export default Chat;
```

## File: src/pages/Profile/Profile.jsx
```jsx
import Layout from '@/components/layout/Layout';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useAuthStore} from '@/stores/authStore';
import {useUserStore} from '@/stores/userStore';
import {useState} from 'react';
import {User, Mail, Camera, Save, X, Key, Upload} from 'lucide-react';

const Profile = () => {
    const {user} = useAuthStore();
    const {updateProfile, isLoading, error, clearError} = useUserStore();
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [formData, setFormData] = useState({
        full_name: user?.full_name || '',
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar_url || '');
    const [success, setSuccess] = useState('');

    const handleSave = async () => {
        clearError();
        setSuccess('');

        const updateData = new FormData();

        if (formData.full_name !== user?.full_name) {
            updateData.append('full_name', formData.full_name);
        }

        if (avatarFile) {
            updateData.append('avatar_file', avatarFile);
        }

        try {
            await updateProfile(updateData);
            setSuccess('Profile updated successfully');
            setIsEditing(false);
            setAvatarFile(null);
        } catch (error) {
            console.error('Profile update failed:', error);
        }
    };

    const handlePasswordChange = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            clearError();
            return;
        }

        if (passwordData.newPassword.length < 6) {
            clearError();
            return;
        }

        clearError();
        setSuccess('');

        const updateData = new FormData();
        updateData.append('currentPassword', passwordData.currentPassword);
        updateData.append('newPassword', passwordData.newPassword);

        try {
            await updateProfile(updateData);
            setSuccess('Password updated successfully');
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
            setIsChangingPassword(false);
        } catch (error) {
            console.error('Password update failed:', error);
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            return;
        }

        setAvatarFile(file);
        clearError();

        const reader = new FileReader();
        reader.onload = (e) => {
            setAvatarPreview(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleCancel = () => {
        setFormData({
            full_name: user?.full_name || '',
        });
        setAvatarFile(null);
        setAvatarPreview(user?.avatar_url || '');
        clearError();
        setSuccess('');
        setIsEditing(false);
    };

    const clearMessages = () => {
        clearError();
        setSuccess('');
    };

    const passwordsMatch = passwordData.newPassword === passwordData.confirmPassword || !passwordData.confirmPassword;

    return (
        <Layout>
            <div className="container max-w-4xl mx-auto p-6">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">Profile</h1>
                        <p className="text-muted-foreground">Manage your account settings</p>
                    </div>

                    {(error || success) && (
                        <Card className={error ? "border-destructive" : "border-green-500"}>
                            <CardContent className="p-4">
                                <div className={`flex items-center justify-between ${error ? "text-destructive" : "text-green-600"}`}>
                                    <span>{error || success}</span>
                                    <Button variant="ghost" size="icon" onClick={clearMessages}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <div className="grid gap-6 lg:grid-cols-3">
                        <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle>Profile Picture</CardTitle>
                                <CardDescription>
                                    Update your profile photo
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="relative">
                                        <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                                            {avatarPreview ? (
                                                <img
                                                    src={avatarPreview}
                                                    alt="Profile"
                                                    className="w-32 h-32 rounded-full object-cover"
                                                />
                                            ) : user?.avatar_url ? (
                                                <img
                                                    src={user.avatar_url}
                                                    alt="Profile"
                                                    className="w-32 h-32 rounded-full object-cover"
                                                />
                                            ) : (
                                                <User className="h-16 w-16 text-primary" />
                                            )}
                                        </div>
                                        {isEditing && (
                                            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90">
                                                <Camera className="h-4 w-4" />
                                                <input
                                                    id="avatar-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleAvatarChange}
                                                    className="hidden"
                                                    disabled={isLoading}
                                                />
                                            </label>
                                        )}
                                    </div>
                                    {isEditing ? (
                                        <label htmlFor="avatar-upload" className="w-full">
                                            <Button variant="outline" className="w-full" disabled={isLoading}>
                                                <Upload className="h-4 w-4 mr-2" />
                                                Change Photo
                                            </Button>
                                        </label>
                                    ) : (
                                        <p className="text-sm text-muted-foreground text-center">
                                            Click Edit Profile to change your photo
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>
                                    Update your personal details
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="full_name">Full Name</Label>
                                    <Input
                                        id="full_name"
                                        value={formData.full_name}
                                        onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                                        disabled={!isEditing || isLoading}
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            value={user?.email || ''}
                                            disabled
                                            className="flex-1"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Email cannot be changed
                                    </p>
                                </div>

                                <div className="flex gap-2 pt-4">
                                    {isEditing ? (
                                        <>
                                            <Button
                                                onClick={handleSave}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                ) : (
                                                    <Save className="h-4 w-4 mr-2" />
                                                )}
                                                Save Changes
                                            </Button>
                                            <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <Button onClick={() => setIsEditing(true)}>
                                            Edit Profile
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>
                                Update your password to keep your account secure
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {isChangingPassword ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="currentPassword">Current Password</Label>
                                        <Input
                                            id="currentPassword"
                                            type="password"
                                            value={passwordData.currentPassword}
                                            onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                            disabled={isLoading}
                                            placeholder="Enter current password"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="newPassword">New Password</Label>
                                        <Input
                                            id="newPassword"
                                            type="password"
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                            disabled={isLoading}
                                            placeholder="Enter new password"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                            disabled={isLoading}
                                            placeholder="Confirm new password"
                                        />
                                        {!passwordsMatch && (
                                            <p className="text-sm text-destructive">
                                                Passwords do not match
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={handlePasswordChange}
                                            disabled={isLoading || !passwordsMatch || !passwordData.currentPassword || !passwordData.newPassword}
                                        >
                                            {isLoading ? (
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            ) : (
                                                <Key className="h-4 w-4 mr-2" />
                                            )}
                                            Update Password
                                        </Button>
                                        <Button variant="outline" onClick={() => setIsChangingPassword(false)} disabled={isLoading}>
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <Button variant="outline" onClick={() => setIsChangingPassword(true)}>
                                    <Key className="h-4 w-4 mr-2" />
                                    Change Password
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
```

## File: src/services/api.js
```js
import axios from "axios";

const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 150000000000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Network error (backend not reachable)
        if (!error.response) {
            const networkError = new Error(
                "Cannot connect to server. Please check if the backend is running."
            );
            networkError.isNetworkError = true;
            return Promise.reject(networkError);
        }

        // Token refresh logic
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) throw new Error("No refresh token");

                const response = await axios.post(
                    `${API_BASE_URL}/auth/refresh-token`,
                    { refreshToken }
                );

                const { accessToken } = response.data.data;
                localStorage.setItem("accessToken", accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");

                if (window.location.pathname !== "/login") {
                    window.location.href = "/login";
                }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;

```

## File: src/services/authService.js
```js
import api from "./api";

export const authService = {
    login: async (credentials) => {
        const response = await api.post("/auth/login", credentials);
        return response;
    },

    signup: async (userData) => {
        const response = await api.post("/auth/signup", userData);
        return response;
    },

    refreshToken: async (tokenData) => {
        const response = await api.post("/auth/refresh-token", tokenData);
        return response;
    },

    logout: async (tokenData) => {
        const response = await api.post("/auth/logout", tokenData);
        return response;
    },

    logoutAll: async () => {
        const response = await api.post("/auth/logout-all");
        return response;
    },
};

```

## File: src/services/chatService.js
```js
import api from "./api";

export const chatService = {
    // Conversations
    getConversations: async () => {
        const response = await api.get("/conversations");
        return response;
    },

    createConversation: async (user2Id) => {
        const response = await api.post("/conversations", {
            user2_id: user2Id,
        });
        return response;
    },

    checkConversation: async (user2Id) => {
        const response = await api.get(`/conversations/check/${user2Id}`);
        return response;
    },

    getConversation: async (conversationId) => {
        const response = await api.get(`/conversations/${conversationId}`);
        return response;
    },

    getConversationParticipants: async (conversationId) => {
        const response = await api.get(
            `/conversations/${conversationId}/participants`
        );
        return response;
    },

    deleteConversation: async (conversationId) => {
        const response = await api.delete(`/conversations/${conversationId}`);
        return response;
    },

    // Messages
    getMessages: async (conversationId, page = 1, limit = 50) => {
        const response = await api.get(
            `/conversations/${conversationId}/messages`,
            {
                params: { page, limit },
            }
        );
        return response;
    },

    sendMessage: async (conversationId, messageData) => {
        const response = await api.post(
            `/conversations/${conversationId}/messages`,
            messageData
        );
        return response;
    },

    getMessage: async (conversationId, messageId) => {
        const response = await api.get(
            `/conversations/${conversationId}/messages/${messageId}`
        );
        return response;
    },

    updateMessage: async (conversationId, messageId, updateData) => {
        const response = await api.put(
            `/conversations/${conversationId}/messages/${messageId}`,
            updateData
        );
        return response;
    },

    deleteMessage: async (conversationId, messageId) => {
        const response = await api.delete(
            `/conversations/${conversationId}/messages/${messageId}`
        );
        return response;
    },

    markAsRead: async (conversationId, messageId) => {
        const response = await api.post(
            `/conversations/${conversationId}/messages/${messageId}/read`
        );
        return response;
    },

    getUnreadCount: async (conversationId) => {
        const response = await api.get(
            `/conversations/${conversationId}/unread-count`
        );
        return response;
    },
};

```

## File: src/services/index.js
```js
export { authService } from "./authService";
export { userService } from "./userService";
export { chatService } from "./chatService";
export { uploadService } from "./uploadService";
```

## File: src/services/uploadService.js
```js
import api from "./api";
import { validateFile, compressImage } from "../utils/fileUtils";

export const uploadService = {
    uploadImage: async (file, type = "message") => {
        validateFile(file);

        let processedFile = file;

        if (file.size > 1024 * 1024) {
            processedFile = await compressImage(file, 0.7);
        }

        const formData = new FormData();
        formData.append("image", processedFile);
        formData.append("type", type);

        const response = await api.post("/upload/image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    },

    deleteImage: async (publicId) => {
        // Note: backend doesn't have delete endpoint yet
        // This is for future implementation
        console.log("Delete image endpoint not implemented yet");
    },
};

```

## File: src/services/userService.js
```js
import api from "./api";

export const userService = {
    searchUsers: async (query, limit = 10) => {
        const response = await api.get("/users/search", {
            params: { q: query, limit },
        });
        return response;
    },

    getAllUsers: async (limit = 50) => {
        const response = await api.get("/users", {
            params: { limit },
        });
        return response;
    },

    getUserById: async (userId) => {
        const response = await api.get(`/users/${userId}`);
        return response;
    },

    getProfile: async () => {
        const response = await api.get("/profile/me");
        return response;
    },

    updateProfile: async (profileData) => {
        const response = await api.put("/profile/update", profileData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response;
    },

    updateOnlineStatus: async (isOnline) => {
        const response = await api.put("/users/online-status", {
            is_online: isOnline,
        });
        return response;
    },
};

```

## File: src/stores/authStore.js
```js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "../services/authService";
import { storage } from "../utils/storageUtils";
import { getErrorMessage } from "../utils/errorUtils";

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (credentials) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authService.login(credentials);
                    const { user, accessToken, refreshToken } =
                        response.data.data;

                    set({
                        user,
                        accessToken,
                        refreshToken,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    });

                    return response;
                } catch (error) {
                    const errorMessage =
                        getErrorMessage(error) || "Login failed";
                    set({ isLoading: false, error: errorMessage });
                    throw new Error(errorMessage);
                }
            },

            signup: async (userData) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authService.signup(userData);
                    const { user, accessToken, refreshToken } =
                        response.data.data;

                    set({
                        user,
                        accessToken,
                        refreshToken,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    });

                    return response;
                } catch (error) {
                    const errorMessage =
                        getErrorMessage(error) || "Signup failed";
                    set({ isLoading: false, error: errorMessage });
                    throw new Error(errorMessage);
                }
            },

            logout: async () => {
                set({ isLoading: true });
                try {
                    const { refreshToken } = get();
                    if (refreshToken) {
                        await authService.logout({ refreshToken });
                    }
                } catch (error) {
                    console.error("Logout API call failed:", error);
                } finally {
                    storage.clear();
                    set({
                        user: null,
                        accessToken: null,
                        refreshToken: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: null,
                    });
                }
            },

            refreshTokens: async () => {
                const { refreshToken } = get();
                if (!refreshToken)
                    throw new Error("No refresh token available");

                try {
                    const response = await authService.refreshToken({
                        refreshToken,
                    });
                    const { accessToken } = response.data.data;
                    set({ accessToken, error: null });
                    return accessToken;
                } catch (error) {
                    get().logout();
                    throw new Error("Session expired. Please login again.");
                }
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
            }),
        }
    )
);

```

## File: src/stores/conversationStore.js
```js
import { create } from "zustand";
import { chatService } from "../services/chatService";
import { useAuthStore } from "./authStore";
import { getErrorMessage } from "../utils/errorUtils";
import { sortConversations, getOtherUser } from "../utils/chatUtils";

export const useConversationStore = create((set, get) => ({
    conversations: new Map(),
    conversationsList: [],
    currentConversationId: null,
    isLoading: false,
    error: null,

    loadConversations: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await chatService.getConversations();
            const conversations = response.data.data.conversations;

            const sortedConversations = sortConversations(conversations);

            set((state) => {
                const newConversations = new Map(state.conversations);

                sortedConversations.forEach((conv) => {
                    newConversations.set(conv.id, conv);
                });

                return {
                    conversations: newConversations,
                    conversationsList: sortedConversations,
                    isLoading: false,
                };
            });
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to load conversations";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    createConversation: async (user2Id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await chatService.createConversation(user2Id);
            const conversation = response.data.data.conversation;

            set((state) => {
                const newConversations = new Map(state.conversations);
                newConversations.set(conversation.id, conversation);

                const conversationsList = sortConversations([
                    conversation,
                    ...state.conversationsList,
                ]);

                return {
                    conversations: newConversations,
                    conversationsList,
                    currentConversationId: conversation.id,
                    isLoading: false,
                };
            });

            return conversation;
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to create conversation";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    getOrCreateConversation: async (user2Id) => {
        const { user } = useAuthStore.getState();
        if (!user) throw new Error("User not authenticated");

        const existingConversation = get().conversationsList.find(
            (conv) => conv.user1_id === user2Id || conv.user2_id === user2Id
        );

        if (existingConversation) {
            set({ currentConversationId: existingConversation.id });
            return existingConversation;
        }

        return await get().createConversation(user2Id);
    },

    setCurrentConversation: (conversationId) => {
        set({ currentConversationId: conversationId });
    },

    updateConversationLastMessage: (conversationId, lastMessage) => {
        set((state) => {
            const conversation = state.conversations.get(conversationId);
            if (!conversation) return state;

            const updatedConversation = {
                ...conversation,
                last_message: lastMessage,
            };
            const newConversations = new Map(state.conversations);
            newConversations.set(conversationId, updatedConversation);

            const conversationsList = sortConversations([
                updatedConversation,
                ...state.conversationsList.filter(
                    (conv) => conv.id !== conversationId
                ),
            ]);

            return {
                conversations: newConversations,
                conversationsList,
            };
        });
    },

    clearError: () => set({ error: null }),

    getCurrentConversation: () => {
        const state = get();
        return state.conversations.get(state.currentConversationId);
    },

    getConversationById: (conversationId) =>
        get().conversations.get(conversationId),

    getCurrentOtherUser: () => {
        const state = get();
        const conversation = state.conversations.get(
            state.currentConversationId
        );
        const currentUserId = useAuthStore.getState().user?.id;
        return conversation ? getOtherUser(conversation, currentUserId) : null;
    },
}));

```

## File: src/stores/messageStore.js
```js
import { create } from "zustand";
import { chatService } from "../services/chatService";
import { useAuthStore } from "./authStore";
import { useConversationStore } from "./conversationStore";
import { getErrorMessage } from "../utils/errorUtils";
import { validateMessage, sanitizeMessage } from "../utils/validationUtils";
import { groupMessagesByDate } from "../utils/chatUtils";

export const useMessageStore = create((set, get) => ({
    messages: new Map(),
    isLoading: false,
    error: null,

    loadMessages: async (conversationId, page = 1, limit = 50) => {
        set({ isLoading: true, error: null });
        try {
            const response = await chatService.getMessages(
                conversationId,
                page,
                limit
            );
            const { messages, pagination } = response.data.data;

            set((state) => {
                const existingData = state.messages.get(conversationId) || {
                    messages: [],
                    pagination: {},
                };
                const existingMessages = existingData.messages;

                const messageMap = new Map();
                [...existingMessages, ...messages].forEach((msg) =>
                    messageMap.set(msg.id, msg)
                );

                const mergedMessages = Array.from(messageMap.values()).sort(
                    (a, b) => new Date(a.created_at) - new Date(b.created_at)
                );

                const newMessages = new Map(state.messages);
                newMessages.set(conversationId, {
                    messages: mergedMessages,
                    pagination: {
                        ...pagination,
                        hasMore: messages.length === limit,
                        currentPage: page,
                    },
                });

                return {
                    messages: newMessages,
                    isLoading: false,
                };
            });
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to load messages";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    sendMessage: async (conversationId, messageData) => {
        if (messageData.message_type === "TEXT") {
            const validationError = validateMessage(messageData.message_text);
            if (validationError) {
                throw new Error(validationError);
            }
        }

        const tempId = `temp-${Date.now()}`;
        const { user } = useAuthStore.getState();

        if (!user) {
            throw new Error("User not authenticated");
        }

        const sanitizedData = {
            ...messageData,
            message_text:
                messageData.message_type === "TEXT"
                    ? sanitizeMessage(messageData.message_text)
                    : messageData.message_text,
        };

        const optimisticMessage = {
            id: tempId,
            ...sanitizedData,
            conversation_id: conversationId,
            sender_id: user.id,
            sender: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                avatar_url: user.avatar_url,
            },
            created_at: new Date().toISOString(),
            is_delivered: false,
            is_optimistic: true,
            read_receipts: [],
        };

        set((state) => {
            const existingData = state.messages.get(conversationId) || {
                messages: [],
                pagination: {},
            };
            const newMessages = new Map(state.messages);
            newMessages.set(conversationId, {
                ...existingData,
                messages: [...existingData.messages, optimisticMessage],
            });

            return { messages: newMessages };
        });

        try {
            const response = await chatService.sendMessage(
                conversationId,
                sanitizedData
            );
            const realMessage = response.data.data.message;
            set((state) => {
                const existingData = state.messages.get(conversationId) || {
                    messages: [],
                    pagination: {},
                };
                const filteredMessages = existingData.messages.filter(
                    (msg) => msg.id !== tempId
                );

                const newMessages = new Map(state.messages);
                newMessages.set(conversationId, {
                    ...existingData,
                    messages: [...filteredMessages, realMessage],
                });

                return { messages: newMessages };
            });

            const { updateConversationLastMessage } =
                useConversationStore.getState();
            if (updateConversationLastMessage) {
                updateConversationLastMessage(conversationId, realMessage);
            }

            return realMessage;
        } catch (error) {
            set((state) => {
                const existingData = state.messages.get(conversationId) || {
                    messages: [],
                    pagination: {},
                };
                const filteredMessages = existingData.messages.filter(
                    (msg) => msg.id !== tempId
                );

                const newMessages = new Map(state.messages);
                newMessages.set(conversationId, {
                    ...existingData,
                    messages: filteredMessages,
                });

                return {
                    messages: newMessages,
                    error: getErrorMessage(error) || "Failed to send message",
                };
            });
            throw error;
        }
    },

    markMessageAsRead: async (conversationId, messageId) => {
        try {
            await chatService.markAsRead(conversationId, messageId);

            set((state) => {
                const conversationData = state.messages.get(conversationId);
                if (!conversationData) return state;

                const { user } = useAuthStore.getState();
                if (!user) return state;

                const updatedMessages = conversationData.messages.map((msg) => {
                    if (msg.id === messageId) {
                        const existingReceipts = msg.read_receipts || [];
                        const alreadyRead = existingReceipts.some(
                            (receipt) => receipt.reader_id === user.id
                        );

                        if (!alreadyRead) {
                            return {
                                ...msg,
                                read_receipts: [
                                    ...existingReceipts,
                                    {
                                        reader_id: user.id,
                                        read_at: new Date().toISOString(),
                                        reader: {
                                            id: user.id,
                                            full_name: user.full_name,
                                        },
                                    },
                                ],
                            };
                        }
                    }
                    return msg;
                });

                const newMessages = new Map(state.messages);
                newMessages.set(conversationId, {
                    ...conversationData,
                    messages: updatedMessages,
                });

                return { messages: newMessages };
            });
        } catch (error) {
            console.error("Failed to mark message as read:", error);
        }
    },

    addMessage: (conversationId, message) => {
        set((state) => {
            const existingData = state.messages.get(conversationId) || {
                messages: [],
                pagination: {},
            };
            const messageExists = existingData.messages.some(
                (msg) => msg.id === message.id
            );

            if (messageExists) return state;

            const newMessages = new Map(state.messages);
            newMessages.set(conversationId, {
                ...existingData,
                messages: [...existingData.messages, message],
            });

            return { messages: newMessages };
        });
    },

    clearMessages: (conversationId) => {
        set((state) => {
            const newMessages = new Map(state.messages);
            newMessages.delete(conversationId);
            return { messages: newMessages };
        });
    },

    clearError: () => set({ error: null }),

    getMessages: (conversationId) => {
        const data = get().messages.get(conversationId);
        return data?.messages || [];
    },

    getPagination: (conversationId) => {
        const data = get().messages.get(conversationId);
        return data?.pagination || { hasMore: true, currentPage: 1 };
    },

    getGroupedMessages: (conversationId) => {
        const messages = get().getMessages(conversationId);
        return groupMessagesByDate(messages);
    },
}));

```

## File: src/stores/uiStore.js
```js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUIStore = create(
    persist(
        (set, get) => ({
            theme: "light",
            activeSidebar: "conversations",
            isMobileSidebarOpen: false,
            modals: {
                userProfile: false,
                imagePreview: false,
                deleteConfirm: false,
                newConversation: false,
            },
            toast: null,
            loadingStates: new Map(),

            setTheme: (theme) => {
                set({ theme });
                document.documentElement.classList.toggle(
                    "dark",
                    theme === "dark"
                );
            },

            toggleTheme: () => {
                const newTheme = get().theme === "light" ? "dark" : "light";
                set({ theme: newTheme });
                document.documentElement.classList.toggle(
                    "dark",
                    newTheme === "dark"
                );
            },

            setActiveSidebar: (sidebar) => set({ activeSidebar: sidebar }),
            toggleMobileSidebar: () =>
                set((state) => ({
                    isMobileSidebarOpen: !state.isMobileSidebarOpen,
                })),
            openModal: (modalName) =>
                set((state) => ({
                    modals: { ...state.modals, [modalName]: true },
                })),
            closeModal: (modalName) =>
                set((state) => ({
                    modals: { ...state.modals, [modalName]: false },
                })),
            closeAllModals: () =>
                set({
                    modals: {
                        userProfile: false,
                        imagePreview: false,
                        deleteConfirm: false,
                        newConversation: false,
                    },
                }),
            showToast: (toastData) => set({ toast: toastData }),
            hideToast: () => set({ toast: null }),
            setLoading: (key, isLoading) =>
                set((state) => {
                    const newLoadingStates = new Map(state.loadingStates);
                    if (isLoading) newLoadingStates.set(key, true);
                    else newLoadingStates.delete(key);
                    return { loadingStates: newLoadingStates };
                }),
            isLoading: (key) => get().loadingStates.has(key),
            isModalOpen: (modalName) => get().modals[modalName],
        }),
        {
            name: "ui-storage",
            partialize: (state) => ({ theme: state.theme }),
        }
    )
);

```

## File: src/stores/userStore.js
```js
import { create } from "zustand";
import { userService } from "../services/userService";
import { getErrorMessage } from "../utils/errorUtils";
import { truncateText } from "../utils/stringUtils";

export const useUserStore = create((set, get) => ({
    currentUser: null,
    users: new Map(),
    searchedUsers: [],
    onlineUsers: new Set(),
    isLoading: false,
    error: null,

    loadCurrentUser: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await userService.getProfile();
            const user = response.data.data.user;

            set((state) => {
                const newUsers = new Map(state.users);
                newUsers.set(user.id, user);
                return {
                    currentUser: user,
                    users: newUsers,
                    isLoading: false,
                };
            });
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to load profile";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    updateProfile: async (profileData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await userService.updateProfile(profileData);
            const updatedUser = response.data.data.user;

            set((state) => {
                const newUsers = new Map(state.users);
                newUsers.set(updatedUser.id, updatedUser);
                return {
                    currentUser: updatedUser,
                    users: newUsers,
                    isLoading: false,
                };
            });

            return updatedUser;
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to update profile";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    searchUsers: async (query, limit = 10) => {
        const trimmedQuery = query?.trim();
        if (!trimmedQuery || trimmedQuery.length < 2) {
            set({ searchedUsers: [] });
            return [];
        }

        set({ isLoading: true, error: null });
        try {
            const response = await userService.searchUsers(trimmedQuery, limit);
            const users = response.data.data.users;

            set((state) => {
                const newUsers = new Map(state.users);
                users.forEach((user) => newUsers.set(user.id, user));
                return {
                    searchedUsers: users,
                    users: newUsers,
                    isLoading: false,
                };
            });

            return users;
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to search users";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    loadUserById: async (userId) => {
        const cachedUser = get().users.get(userId);
        if (cachedUser) return cachedUser;

        set({ isLoading: true, error: null });
        try {
            const response = await userService.getUserById(userId);
            const user = response.data.data.user;

            set((state) => {
                const newUsers = new Map(state.users);
                newUsers.set(user.id, user);
                return {
                    users: newUsers,
                    isLoading: false,
                };
            });

            return user;
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to load user";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    updateOnlineStatus: async (isOnline) => {
        try {
            await userService.updateOnlineStatus(isOnline);

            set((state) => {
                if (!state.currentUser) return state;

                const updatedUser = {
                    ...state.currentUser,
                    is_online: isOnline,
                };
                const newUsers = new Map(state.users);
                newUsers.set(updatedUser.id, updatedUser);

                return {
                    currentUser: updatedUser,
                    users: newUsers,
                };
            });
        } catch (error) {
            console.error("Failed to update online status:", error);
        }
    },

    setUserOnline: (userId) => {
        set((state) => {
            const newOnlineUsers = new Set(state.onlineUsers);
            newOnlineUsers.add(userId);
            return { onlineUsers: newOnlineUsers };
        });
    },

    setUserOffline: (userId) => {
        set((state) => {
            const newOnlineUsers = new Set(state.onlineUsers);
            newOnlineUsers.delete(userId);
            return { onlineUsers: newOnlineUsers };
        });
    },

    clearSearch: () => set({ searchedUsers: [] }),
    clearError: () => set({ error: null }),

    getUserById: (userId) => get().users.get(userId),
    isUserOnline: (userId) => get().onlineUsers.has(userId),
    getUserDisplayName: (userId) => {
        const user = get().users.get(userId);
        return user ? truncateText(user.full_name, 20) : "Unknown User";
    },
}));

```

## File: src/utils/chatUtils.js
```js
import { formatMessageTime } from "./dateUtils";

// Sort conversations by last message time or creation time
export const sortConversations = (conversations) => {
    if (!Array.isArray(conversations)) return [];

    return [...conversations].sort((a, b) => {
        const aTime = a.last_message?.created_at || a.created_at;
        const bTime = b.last_message?.created_at || b.created_at;

        if (!aTime || !bTime) return 0;

        return new Date(bTime).getTime() - new Date(aTime).getTime();
    });
};

// Get the other user in a conversation
export const getOtherUser = (conversation, currentUserId) => {
    if (!conversation || !currentUserId) return null;

    const { user1, user2 } = conversation;

    if (!user1 || !user2) return null;

    return user1.id === currentUserId ? user2 : user1;
};

// Group messages by date
export const groupMessagesByDate = (messages) => {
    if (!Array.isArray(messages)) return {};

    const groups = {};

    messages.forEach((message) => {
        if (!message?.created_at) return;

        try {
            const date = new Date(message.created_at).toDateString();
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(message);
        } catch (error) {
            console.error("Error grouping message by date:", error);
        }
    });

    return groups;
};

// Check if user is online
export const isUserOnline = (user, onlineUsers) => {
    if (!user) return false;

    return user.is_online === true || (onlineUsers && onlineUsers.has(user.id));
};

// Format conversation preview
export const getConversationPreview = (conversation, currentUserId) => {
    if (!conversation) return "No messages yet";

    const { last_message } = conversation;

    if (!last_message) return "No messages yet";

    const isCurrentUser = last_message.sender_id === currentUserId;
    const prefix = isCurrentUser ? "You: " : "";

    if (last_message.message_type === "IMAGE") {
        return `${prefix}📷 Image`;
    }

    // Handle deleted messages
    if (last_message.message_text === "This message was deleted") {
        return `${prefix}🗑️ Message deleted`;
    }

    const preview = last_message.message_text || "Message";
    return `${prefix}${
        preview.length > 30 ? preview.substring(0, 30) + "..." : preview
    }`;
};

// Check if message is from current user
export const isOwnMessage = (message, currentUserId) => {
    return message?.sender_id === currentUserId;
};

// Format message timestamp for display
export const formatMessageTimestamp = (timestamp) => {
    if (!timestamp) return "";

    try {
        return formatMessageTime(timestamp);
    } catch (error) {
        console.error("Error formatting timestamp:", error);
        return "";
    }
};

```

## File: src/utils/dateUtils.js
```js
export const formatMessageTime = (timestamp) => {
    if (!timestamp) return "";

    try {
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) return "";

        const now = new Date();
        const diffInMs = now - date;
        const diffInHours = diffInMs / (1000 * 60 * 60);
        const diffInDays = diffInHours / 24;

        if (diffInHours < 1) {
            const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
            if (diffInMinutes < 1) return "Just now";
            return `${diffInMinutes}m ago`;
        }

        if (diffInHours < 24) {
            return date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            });
        } else if (diffInDays < 2) {
            return "Yesterday";
        } else if (diffInDays < 7) {
            return date.toLocaleDateString("en-US", {
                weekday: "short",
            });
        } else {
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
        }
    } catch (error) {
        console.error("Error formatting message time:", error);
        return "";
    }
};

export const formatLastSeen = (timestamp) => {
    if (!timestamp) return "Never";

    try {
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) return "Never";

        const now = new Date();
        const diffInMinutes = (now - date) / (1000 * 60);

        if (diffInMinutes < 1) return "Just now";
        if (diffInMinutes < 60) return `${Math.floor(diffInMinutes)}m ago`;
        if (diffInMinutes < 1440)
            return `${Math.floor(diffInMinutes / 60)}h ago`;

        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    } catch (error) {
        console.error("Error formatting last seen:", error);
        return "Never";
    }
};

export const isToday = (timestamp) => {
    if (!timestamp) return false;

    try {
        const date = new Date(timestamp);
        const today = new Date();

        return date.toDateString() === today.toDateString();
    } catch (error) {
        console.error("Error checking if date is today:", error);
        return false;
    }
};

export const isYesterday = (timestamp) => {
    if (!timestamp) return false;

    try {
        const date = new Date(timestamp);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        return date.toDateString() === yesterday.toDateString();
    } catch (error) {
        console.error("Error checking if date is yesterday:", error);
        return false;
    }
};

export const formatDateHeader = (timestamp) => {
    if (!timestamp) return "";

    try {
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) return "";

        if (isToday(date)) return "Today";
        if (isYesterday(date)) return "Yesterday";

        return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    } catch (error) {
        console.error("Error formatting date header:", error);
        return "";
    }
};

```

## File: src/utils/errorUtils.js
```js
export const getErrorMessage = (error) => {
    if (!error) return "An unexpected error occurred";

    if (typeof error === "string") return error;

    // Axios error
    if (error.response?.data?.msg) {
        return error.response.data.msg;
    }

    // Error object with message
    if (error.message) {
        return error.message;
    }

    // Network error
    if (error.code === "NETWORK_ERROR" || error.message?.includes("Network")) {
        return "Network error. Please check your connection.";
    }

    // Fallback
    return "An unexpected error occurred";
};

export const isNetworkError = (error) => {
    return (
        !error?.response &&
        (error?.code === "NETWORK_ERROR" || error?.message?.includes("Network"))
    );
};

export const isAuthError = (error) => {
    return error?.response?.status === 401;
};

export const isServerError = (error) => {
    return error?.response?.status >= 500;
};

export const handleApiError = (error, fallback = "Something went wrong") => {
    console.error("API Error:", error);

    const message = getErrorMessage(error);

    if (isNetworkError(error)) {
        return "Network error. Please check your connection.";
    }

    if (isAuthError(error)) {
        return "Session expired. Please login again.";
    }

    return message || fallback;
};

export const logError = (error, context = "") => {
    console.error(`Error${context ? ` in ${context}` : ""}:`, {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
    });
};

```

## File: src/utils/fileUtils.js
```js
export const validateFile = (file, options = {}) => {
    const {
        maxSize = 5 * 1024 * 1024, // 5MB
        allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
    } = options;

    if (!file) {
        throw new Error("No file provided");
    }

    if (file.size > maxSize) {
        throw new Error(
            `File size must be less than ${maxSize / 1024 / 1024}MB`
        );
    }

    if (!allowedTypes.includes(file.type)) {
        throw new Error("Only image files (JPEG, PNG, WebP, GIF) are allowed");
    }

    return true;
};

export const getFilePreview = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (error) => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
    });
};

export const compressImage = (file, quality = 0.8, maxWidth = 1024) => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            // Calculate new dimensions while maintaining aspect ratio
            let width = img.width;
            let height = img.height;

            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }

            canvas.width = width;
            canvas.height = height;

            // Draw and compress
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error("Canvas to Blob conversion failed"));
                        return;
                    }
                    resolve(
                        new File([blob], file.name, {
                            type: "image/jpeg",
                            lastModified: Date.now(),
                        })
                    );
                },
                "image/jpeg",
                quality
            );
        };

        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = URL.createObjectURL(file);
    });
};

export const getFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

```

## File: src/utils/index.js
```js
export * from "./dateUtils";
export * from "./fileUtils";
export * from "./stringUtils";
export * from "./storageUtils";
export * from "./validationUtils";
export * from "./chatUtils";
export * from "./errorUtils";
export * from "./uiUtils";

```

## File: src/utils/storageUtils.js
```js
export const storage = {
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    },

    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
    },

    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error("Error removing from localStorage:", error);
        }
    },

    clear: () => {
        try {
            localStorage.clear();
        } catch (error) {
            console.error("Error clearing localStorage:", error);
        }
    },
};

export const sessionStorage = {
    get: (key, defaultValue = null) => {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    },

    set: (key, value) => {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error saving to sessionStorage:", error);
        }
    },
};

// Token-specific helpers
export const tokenStorage = {
    getAccessToken: () => storage.get("accessToken"),
    setAccessToken: (token) => storage.set("accessToken", token),
    getRefreshToken: () => storage.get("refreshToken"),
    setRefreshToken: (token) => storage.set("refreshToken", token),
    clearTokens: () => {
        storage.remove("accessToken");
        storage.remove("refreshToken");
    },
};

```

## File: src/utils/stringUtils.js
```js
export const truncateText = (text, maxLength = 50) => {
    if (!text || typeof text !== "string") return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
};

export const getInitials = (name) => {
    if (!name || typeof name !== "string") return "?";

    return name
        .trim()
        .split(/\s+/)
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase()
        .substring(0, 2);
};

export const sanitizeMessage = (text) => {
    if (!text || typeof text !== "string") return "";

    return text
        .trim()
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");
};

export const unsanitizeMessage = (text) => {
    if (!text || typeof text !== "string") return "";

    return text
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/<br>/g, "\n");
};

export const capitalizeFirst = (text) => {
    if (!text || typeof text !== "string") return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const generateRandomId = (prefix = "") => {
    return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

```

## File: src/utils/uiUtils.js
```js
export const cn = (...classes) => {
    return classes.filter(Boolean).join(" ");
};

export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        return false;
    }
};

```

## File: src/utils/validationUtils.js
```js
// utils/validationUtils.js - COMPLETE FIX
export const isValidEmail = (email) => {
    if (!email || typeof email !== "string") return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
};

export const isValidPassword = (password) => {
    if (!password || typeof password !== "string") return false;

    // At least 6 characters, with at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
};

export const isValidName = (name) => {
    if (!name || typeof name !== "string") return false;

    const trimmed = name.trim();
    return trimmed.length >= 2 && trimmed.length <= 100;
};

export const validateMessage = (text) => {
    if (!text && text !== "") {
        return "Message is required";
    }

    const trimmed = text.toString().trim();
    if (!trimmed) return "Message cannot be empty";
    if (trimmed.length > 1000) return "Message too long (max 1000 characters)";

    return null;
};

export const validateConversationId = (id) => {
    if (!id || typeof id !== "string") return false;

    const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
};

export const validateFileUpload = (file, options = {}) => {
    const {
        maxSize = 5 * 1024 * 1024,
        allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
    } = options;

    if (!file) {
        return "No file selected";
    }

    if (file.size > maxSize) {
        return `File must be smaller than ${maxSize / 1024 / 1024}MB`;
    }

    if (!allowedTypes.includes(file.type)) {
        return "Only JPEG, PNG, WebP, and GIF images are allowed";
    }

    return null;
};

```

## File: tailwind.config.js
```js
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                mono: ["JetBrains Mono", "monospace"],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    1: "hsl(var(--chart-1))",
                    2: "hsl(var(--chart-2))",
                    3: "hsl(var(--chart-3))",
                    4: "hsl(var(--chart-4))",
                    5: "hsl(var(--chart-5))",
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

```

## File: vite.config.js
```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});

```

