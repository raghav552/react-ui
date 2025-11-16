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
    if (stat.isDirectory() && file !== 'node_modules') {
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
    imports.push({
      fullMatch: match[0],
      path: match[1],
      startIndex: match.index,
      endIndex: match.index + match[0].length
    });
  }
  return imports;
}

function findActualFile(importPath, baseDir) {
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
    return null;
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
          type: 'file',
          actualPath: path.join(dir, actualFile).replace(/\\/g, '/'),
          relativePath: path.relative(__dirname, path.join(dir, actualFile)).replace(/\\/g, '/'),
          needsFix: false
        };
      }
      
      // Check for case-insensitive match
      const caseInsensitiveMatch = files.find(f => 
        f.toLowerCase() === expectedName.toLowerCase()
      );
      if (caseInsensitiveMatch && caseInsensitiveMatch !== expectedName) {
        const correctedPath = importPath.replace(base + ext, caseInsensitiveMatch.replace(ext, ''));
        return {
          type: 'file',
          actualPath: path.join(dir, caseInsensitiveMatch).replace(/\\/g, '/'),
          relativePath: path.relative(__dirname, path.join(dir, caseInsensitiveMatch)).replace(/\\/g, '/'),
          needsFix: true,
          actualName: caseInsensitiveMatch,
          expectedName: expectedName,
          correctedPath: correctedPath
        };
      }
    }
    
    // Check for directory match (for index files)
    const actualDir = dirs.find(d => d === base);
    if (actualDir) {
      const indexPath = path.join(dir, actualDir, 'index.jsx');
      const indexPathJs = path.join(dir, actualDir, 'index.js');
      if (fs.existsSync(indexPath)) {
        return { type: 'index', actualPath: indexPath.replace(/\\/g, '/'), needsFix: false };
      }
      if (fs.existsSync(indexPathJs)) {
        return { type: 'index', actualPath: indexPathJs.replace(/\\/g, '/'), needsFix: false };
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
          type: 'index',
          actualPath: (fs.existsSync(indexPath) ? indexPath : indexPathJs).replace(/\\/g, '/'),
          needsFix: true,
          actualName: caseInsensitiveDir,
          expectedName: base,
          correctedPath: correctedPath
        };
      }
    }
  } catch (e) {
    return null;
  }
  
  return null;
}

function getRelativePath(fromFile, toFile) {
  const fromDir = path.dirname(fromFile);
  const toDir = path.dirname(toFile);
  const toBase = path.basename(toFile, path.extname(toFile));
  
  let relative = path.relative(fromDir, toDir).replace(/\\/g, '/');
  if (relative && !relative.startsWith('.')) {
    relative = './' + relative;
  } else if (!relative) {
    relative = '.';
  }
  
  // If it's an index file, return the directory path
  if (toBase === 'index') {
    return relative === '.' ? './' + path.basename(toDir) : relative + '/' + path.basename(toDir);
  }
  
  return relative === '.' ? './' + toBase : relative + '/' + toBase;
}

const srcDir = path.join(__dirname, 'src');
const files = getAllFiles(srcDir);
const issues = [];
const fixes = [];

console.log('Scanning files for import issues...\n');

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const imports = extractImports(content);
  const relativeFile = path.relative(__dirname, file).replace(/\\/g, '/');
  
  imports.forEach(imp => {
    if (imp.path.startsWith('./') || imp.path.startsWith('../')) {
      const result = findActualFile(imp.path, path.dirname(file));
      if (!result) {
        issues.push({
          file: relativeFile,
          import: imp.path,
          issue: 'File not found'
        });
      } else if (result.needsFix) {
        // Calculate the correct relative path
        const correctPath = getRelativePath(file, result.actualPath);
        
        fixes.push({
          file: file,
          relativeFile: relativeFile,
          oldImport: imp.path,
          newImport: correctPath,
          fullMatch: imp.fullMatch,
          startIndex: imp.startIndex,
          endIndex: imp.endIndex
        });
        
        issues.push({
          file: relativeFile,
          import: imp.path,
          issue: `Case mismatch: expected "${result.expectedName}" but found "${result.actualName}"`,
          fix: correctPath
        });
      }
    }
  });
});

if (issues.length > 0) {
  console.log(`Found ${issues.length} import issue(s):\n`);
  issues.forEach(issue => {
    console.log(`File: ${issue.file}`);
    console.log(`  Import: ${issue.import}`);
    console.log(`  Issue: ${issue.issue}`);
    if (issue.fix) {
      console.log(`  Fix: Change to "${issue.fix}"`);
    }
    console.log('');
  });
} else {
  console.log('✓ No import issues found!');
  process.exit(0);
}

if (fixes.length > 0) {
  console.log(`\nApplying ${fixes.length} fix(es)...\n`);
  
  // Group fixes by file
  const fixesByFile = new Map();
  fixes.forEach(fix => {
    if (!fixesByFile.has(fix.file)) {
      fixesByFile.set(fix.file, []);
    }
    fixesByFile.get(fix.file).push(fix);
  });
  
  // Apply fixes (in reverse order to preserve indices)
  fixesByFile.forEach((fileFixes, file) => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Sort fixes by start index in reverse order
    fileFixes.sort((a, b) => b.startIndex - a.startIndex);
    
    fileFixes.forEach(fix => {
      // Replace the import path in the full match
      const newFullMatch = fix.fullMatch.replace(fix.oldImport, fix.newImport);
      content = content.substring(0, fix.startIndex) + newFullMatch + content.substring(fix.endIndex);
      console.log(`Fixed: ${fix.relativeFile}`);
      console.log(`  ${fix.oldImport} → ${fix.newImport}`);
    });
    
    fs.writeFileSync(file, content, 'utf-8');
  });
  
  console.log('\n✓ All fixes applied!');
} else {
  console.log('\nNo fixes needed (only missing files found).');
}

process.exit(issues.length > 0 ? 1 : 0);

