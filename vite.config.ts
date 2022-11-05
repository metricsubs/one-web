import * as Path from 'path';

import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import tsconfigPath from 'vite-tsconfig-paths';

const PROJECT_DIR = Path.join(__dirname, '.');
const TSCONFIG_PATH = Path.join(PROJECT_DIR, 'tsconfig.json');

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: 'ONE_',
  plugins: [react(), tsconfigPath({projects: [TSCONFIG_PATH]})],
});
