import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 *
 * @param {string} metaUrl
 * @returns string
 */
export function getDirname(metaUrl) {
  const __filename = fileURLToPath(metaUrl);

  const __dirname = path.dirname(__filename);

  return __dirname;
}

/**
 * @typedef {{
 * __meta:{
 *  cwd: string,
 *  secrets: [string, string][]
 * },
 * projectId: string,
 * orgId: string,
 * settings: {
 *  framework: string,
 *  devCommand: string,
 *  installCommand: string,
 *  buildCommand: string,
 *  outputDirectory: string,
 *  rootDirectory: string,
 *  directoryListing: boolean,
 *  nodeVersion: string
 * }
 * }} vercelConfig
 *
 * @typedef ('production' | 'preview') environment
 */

/**
 *
 * @param {{
 *  framework: string,
 *  projectName: string,
 *  cwd: string,
 *  secrets: [string, string][],
 *  env:
 * }} config
 *
 * @returns vercelConfig
 */
export function createVercelJsonConfig({
  framework,
  projectName,
  cwd,
  secrets = [],
  env = 'preview',
}) {
  const projectId = process.env.VERCEL_PROJECT_ID;
  const orgId = process.env.VERCEL_ORG_ID;

  if (projectId === undefined || projectId === '') {
    throw new Error('VERCEL_PROJECT_ID is required');
  }

  if (orgId === undefined || orgId === '') {
    throw new Error('VERCEL_ORG_ID is required');
  }

  const config = {
    projectId,
    orgId,
    settings: {
      framework,
      devCommand: null,
      installCommand: `pnpm i --frozen-lock --filter ${projectName}... --filter .`,
      buildCommand: `pnpm --filter ${projectName}... run build`,
      outputDirectory: null,
      rootDirectory: null,
      directoryListing: false,
      nodeVersion: '16.x',
    },
  };

  return {
    config,
    write() {
      try {
        console.log('Writing vercel files');
        writeVercelConfig(config, cwd);
        writeVercelDotEnv(secrets, cwd, env);
        console.log('Vercel files written successfully');
      } catch (error) {
        console.error('Error writing vercel files', error);
      }
    },
  };
}

/**
 *
 * @param {vercelConfig} config
 * @param {string} configPath
 */
function writeVercelConfig(config, cwd) {
  const vercelFolderPath = path.resolve(cwd, '.vercel');
  const VERCEL_PROJECT_FILE_NAME = 'project.json';

  if (!fs.existsSync(vercelFolderPath)) {
    fs.mkdirSync(vercelFolderPath);
  }

  fs.writeFileSync(
    path.resolve(vercelFolderPath, VERCEL_PROJECT_FILE_NAME),
    JSON.stringify(config, null, 2),
  );
}

/**
 *
 * @param {[string, string][]} secrets
 * @param {environment} env
 * @param {string} cwd
 */
function writeVercelDotEnv(secrets, cwd, environment) {
  const defaultSecrets = [
    ['VERCEL', '1'],
    ['VERCEL_ENV', environment],
  ];

  const VERCEL_DOT_ENV_FILE_NAME = `.env${
    environment === 'preview' ? '.preview' : ''
  }.local`;

  const dotenvPath = path.resolve(cwd, '.vercel', VERCEL_DOT_ENV_FILE_NAME);

  const result = [...defaultSecrets, ...secrets].reduce((env, [key, value]) => {
    env += `${key}=${value}\n`;
    return env;
  }, `# Created by @raulmelo/vercel-utils\n`);

  fs.writeFileSync(dotenvPath, result);
}
