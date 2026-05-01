const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SITE_URL = 'https://salairenet.ma';
const HOST = 'salairenet.ma';
const DEFAULT_KEY = '4a8e2c6f1b9d3e7a5c2f8b4d6a1e9c3f';
const KEY = process.env.INDEXNOW_KEY || DEFAULT_KEY;
const KEY_LOCATION = process.env.INDEXNOW_KEY_LOCATION || (KEY ? `${SITE_URL}/${KEY}.txt` : '');
const DRY_RUN = process.env.INDEXNOW_DRY_RUN === '1';
const STRICT = process.env.INDEXNOW_STRICT === '1';

function normalizePath(filePath) {
  return filePath.replace(/\\/g, '/');
}

function quoteArg(value) {
  return `"${String(value).replace(/"/g, '\\"')}"`;
}

function runGit(command) {
  try {
    return execSync(command, {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
  } catch {
    return '';
  }
}

function gitRefExists(ref) {
  return Boolean(runGit(`git rev-parse --verify ${quoteArg(ref)}`));
}

function resolveBaseRef() {
  const candidates = [process.env.CACHED_COMMIT_REF, process.env.INDEXNOW_BASE_REF].filter(Boolean);

  for (const candidate of candidates) {
    if (gitRefExists(candidate)) {
      return candidate;
    }
  }

  return gitRefExists('HEAD~1') ? 'HEAD~1' : '';
}

function collectChangedFiles(baseRef) {
  const changedFiles = new Set();
  const commands = [];

  if (baseRef) {
    commands.push(`git diff --name-only ${quoteArg(baseRef)}..HEAD`);
  }

  commands.push('git diff --name-only HEAD');
  commands.push('git ls-files --others --exclude-standard');

  for (const command of commands) {
    const output = runGit(command);
    if (!output) {
      continue;
    }

    for (const line of output.split(/\r?\n/)) {
      const normalized = normalizePath(line.trim());
      if (normalized) {
        changedFiles.add(normalized);
      }
    }
  }

  return changedFiles;
}

function listPageFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith('_') || entry.name.startsWith('(')) {
      continue;
    }

    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name.startsWith('[') && entry.name.endsWith(']')) {
        continue;
      }
      results.push(...listPageFiles(entryPath));
      continue;
    }

    if (entry.isFile() && entry.name === 'page.tsx') {
      results.push(entryPath);
    }
  }

  return results;
}

function getRouteEntries() {
  const appDir = path.join(ROOT, 'src', 'app');
  const layoutFile = 'src/app/layout.tsx';

  return listPageFiles(appDir).map((pageFile) => {
    const relativeFile = normalizePath(path.relative(ROOT, pageFile));
    const relativeDir = normalizePath(path.relative(appDir, path.dirname(pageFile)));
    const route = relativeDir === '' ? '/' : `/${relativeDir}/`;

    return {
      url: `${SITE_URL}${route}`,
      files: [relativeFile, layoutFile],
    };
  });
}

function checkKeyFile() {
  if (!KEY || process.env.INDEXNOW_KEY_LOCATION) {
    return;
  }

  const keyFilePath = path.join(ROOT, 'public', `${KEY}.txt`);
  if (!fs.existsSync(keyFilePath)) {
    console.warn(`[indexnow] Verification file missing: public/${KEY}.txt`);
  }
}

async function submitUrls(urlList) {
  if (urlList.length === 0) {
    console.log('[indexnow] No changed URLs detected, skipping submission');
    return;
  }

  if (!KEY || !KEY_LOCATION) {
    console.warn('[indexnow] Missing INDEXNOW_KEY/INDEXNOW_KEY_LOCATION, skipping submission');
    return;
  }

  checkKeyFile();

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  if (DRY_RUN) {
    console.log(`[indexnow] Dry run: would submit ${urlList.length} URLs`);
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 202) {
      console.log(`[indexnow] Submitted ${urlList.length} URLs (HTTP ${response.status})`);
      return;
    }

    const body = await response.text();
    throw new Error(`HTTP ${response.status}: ${body}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (STRICT) {
      throw error;
    }
    console.warn(`[indexnow] Submission skipped after error: ${message}`);
  }
}

async function main() {
  const baseRef = resolveBaseRef();
  const changedFiles = collectChangedFiles(baseRef);
  const changedUrls = getRouteEntries()
    .filter((entry) => entry.files.some((file) => changedFiles.has(file)))
    .map((entry) => entry.url)
    .sort((left, right) => left.localeCompare(right));

  console.log(`[indexnow] Base ref: ${baseRef || 'working tree only'}`);
  console.log(`[indexnow] Changed files: ${changedFiles.size}`);
  console.log(`[indexnow] Changed URLs: ${changedUrls.length}`);

  await submitUrls(changedUrls);
}

main().catch((error) => {
  console.error(`[indexnow] Fatal error: ${error instanceof Error ? error.message : String(error)}`);
  if (STRICT) {
    process.exit(1);
  }
});