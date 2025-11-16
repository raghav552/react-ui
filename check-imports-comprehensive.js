import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (file.match(/\.(jsx?|tsx?)$/)) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function extractImports(content) {
  const importRegex = /import\s+.*?\s+from\s+['"](\.\.?\/[^'"]+)['"]/g;
  const imports = [];
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }
  return imports;
}

function resolveImportPath(importPath, baseDir) {
  // Remove file extension if present
  let checkPath = importPath;
  const hasExtension = /\.(jsx?|tsx?)$/.test(checkPath);
  
  if (hasExtension) {
    checkPath = checkPath.replace(/\.(jsx?|tsx?)$/, '');
  }
  
  const fullPath = path.resolve(baseDir, checkPath);
  const dir = path.dirname(fullPath);
  const base = path.basename(fullPath);
  
  // Check if directory exists
  if (!fs.existsSync(dir)) {
    return { exists: false, error: `Directory does not exist: ${dir}` };
  }
  
  // Get actual directory listing to check case
  try {
    const entries = fs.readdirSync(dir);
    const files = entries.filter(f => {
      const full = path.join(dir, f);
      return fs.statSync(full).isFile();
    });
    const dirs = entries.filter(f => {
      const full = path.join(dir, f);
      return fs.statSync(full).isDirectory();
    });
    
    // Check for exact file match (with extensions)
    const fileExtensions = ['.jsx', '.js', '.tsx', '.ts'];
    for (const ext of fileExtensions) {
      const expectedName = base + ext;
      const actualFile = files.find(f => f === expectedName);
      if (actualFile) {
        return { 
          exists: true, 
          mismatch: false, 
          actualPath: path.join(dir, actualFile).replace(/\\/g, '/'),
          relativePath: path.relative(__dirname, path.join(dir, actualFile)).replace(/\\/g, '/')
        };
      }
      
      // Check for case-insensitive match
      const caseInsensitiveMatch = files.find(f => 
        f.toLowerCase() === expectedName.toLowerCase()
      );
      if (caseInsensitiveMatch && caseInsensitiveMatch !== expectedName) {
        const correctedPath = importPath.replace(base + ext, caseInsensitiveMatch.replace(ext, ''));
        return { 
          exists: true, 
          mismatch: true, 
          actual: caseInsensitiveMatch, 
          expected: expectedName,
          correctedPath: correctedPath,
          actualPath: path.join(dir, caseInsensitiveMatch).replace(/\\/g, '/')
        };
      }
    }
    
    // Check for directory match (for index files)
    const actualDir = dirs.find(d => d === base);
    if (actualDir) {
      const indexPath = path.join(dir, actualDir, 'index.jsx');
      const indexPathJs = path.join(dir, actualDir, 'index.js');
      if (fs.existsSync(indexPath)) {
        return { exists: true, mismatch: false, isIndex: true, actualPath: indexPath.replace(/\\/g, '/') };
      }
      if (fs.existsSync(indexPathJs)) {
        return { exists: true, mismatch: false, isIndex: true, actualPath: indexPathJs.replace(/\\/g, '/') };
      }
    }
    
    // Check for case-insensitive directory match
    const caseInsensitiveDir = dirs.find(d => d.toLowerCase() === base.toLowerCase());
    if (caseInsensitiveDir && caseInsensitiveDir !== base) {
      const indexPath = path.join(dir, caseInsensitiveDir, 'index.jsx');
      const indexPathJs = path.join(dir, caseInsensitiveDir, 'index.js');
      if (fs.existsSync(indexPath) || fs.existsSync(indexPathJs)) {
        const correctedPath = importPath.replace(base, caseInsensitiveDir);
        return { 
          exists: true, 
          mismatch: true, 
          actual: caseInsensitiveDir, 
          expected: base,
          correctedPath: correctedPath,
          isDir: true,
          actualPath: (fs.existsSync(indexPath) ? indexPath : indexPathJs).replace(/\\/g, '/')
        };
      }
    }
    
    // Check if it's a directory with index file (case-insensitive)
    if (caseInsensitiveDir) {
      const indexPath = path.join(dir, caseInsensitiveDir, 'index.jsx');
      const indexPathJs = path.join(dir, caseInsensitiveDir, 'index.js');
      if (fs.existsSync(indexPath) || fs.existsSync(indexPathJs)) {
        if (caseInsensitiveDir !== base) {
          const correctedPath = importPath.replace(base, caseInsensitiveDir);
          return { 
            exists: true, 
            mismatch: true, 
            actual: caseInsensitiveDir, 
            expected: base,
            correctedPath: correctedPath,
            isDir: true,
            actualPath: (fs.existsSync(indexPath) ? indexPath : indexPathJs).replace(/\\/g, '/')
          };
        }
        return { exists: true, mismatch: false, isIndex: true };
      }
    }
  } catch (e) {
    return { exists: false, error: e.message };
  }
  
  return { exists: false, error: 'File or directory not found' };
}

const srcDir = path.join(__dirname, 'src');
const files = getAllFiles(srcDir);
const issues = [];
const fileMap = new Map();

// Build a map of all actual files
files.forEach(file => {
  const relativePath = path.relative(srcDir, file).replace(/\\/g, '/');
  const dir = path.dirname(relativePath);
  const base = path.basename(relativePath);
  const key = (dir + '/' + base).toLowerCase();
  fileMap.set(key, relativePath);
});

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const imports = extractImports(content);
  const relativeFile = path.relative(__dirname, file).replace(/\\/g, '/');
  
  imports.forEach(importPath => {
    if (importPath.startsWith('./') || importPath.startsWith('../')) {
      const result = resolveImportPath(importPath, path.dirname(file));
      if (!result.exists || result.mismatch) {
        issues.push({
          file: relativeFile,
          import: importPath,
          issue: result.mismatch 
            ? `Case mismatch: expected "${result.expected}" but found "${result.actual}"`
            : result.error || 'Not found',
          actual: result.actual,
          expected: result.expected,
          correctedPath: result.correctedPath,
          actualPath: result.actualPath
        });
      }
    }
  });
});

if (issues.length > 0) {
  console.log('Found import issues:\n');
  issues.forEach(issue => {
    console.log(`File: ${issue.file}`);
    console.log(`  Import: ${issue.import}`);
    console.log(`  Issue: ${issue.issue}`);
    if (issue.correctedPath) {
      console.log(`  Fix: Change "${issue.import}" to "${issue.correctedPath}"`);
    } else if (issue.actualPath) {
      console.log(`  Actual file exists at: ${issue.actualPath}`);
    }
    console.log('');
  });
  process.exit(1);
} else {
  console.log('✓ All import paths are correct!');
  process.exit(0);
}

