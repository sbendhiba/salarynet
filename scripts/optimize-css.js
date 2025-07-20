#!/usr/bin/env node

/**
 * CSS Optimization Script for Static Export
 * This script analyzes and optimizes CSS for production builds
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const CONFIG = {
  sourceDir: './src',
  outputDir: './out',
  extensions: ['tsx', 'jsx', 'ts', 'js'],
  cssFile: './out/_next/static/css/*.css'
};

/**
 * Extract all className values from source files
 */
function extractClassNames() {
  const classNames = new Set();
  const files = glob.sync(`${CONFIG.sourceDir}/**/*.{${CONFIG.extensions.join(',')}}`);
  
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Match className="..." patterns
    const matches = content.matchAll(/className="([^"]*)"/g);
    for (const match of matches) {
      const classes = match[1].split(/\s+/).filter(Boolean);
      classes.forEach(cls => classNames.add(cls));
    }
    
    // Match className={...} patterns (for dynamic classes)
    const dynamicMatches = content.matchAll(/className=\{[^}]*["'`]([^"'`]*)["'`][^}]*\}/g);
    for (const match of dynamicMatches) {
      const classes = match[1].split(/\s+/).filter(Boolean);
      classes.forEach(cls => classNames.add(cls));
    }
  });
  
  return Array.from(classNames).sort();
}

/**
 * Analyze CSS usage
 */
function analyzeCSSUsage() {
  console.log('🔍 Analyzing CSS usage...\n');
  
  const usedClasses = extractClassNames();
  console.log(`✅ Found ${usedClasses.length} unique CSS classes`);
  
  // Group classes by category
  const categories = {
    colors: usedClasses.filter(cls => cls.includes('text-') || cls.includes('bg-')),
    spacing: usedClasses.filter(cls => cls.match(/^(m|p|gap|space)-/)),
    layout: usedClasses.filter(cls => cls.match(/^(flex|grid|block|inline|absolute|relative)/)),
    sizing: usedClasses.filter(cls => cls.match(/^(w-|h-|max-|min-)/)),
    typography: usedClasses.filter(cls => cls.match(/^(text-|font-|leading-|tracking-)/)),
    borders: usedClasses.filter(cls => cls.match(/^(border|rounded)/)),
    effects: usedClasses.filter(cls => cls.match(/^(shadow|opacity|blur)/)),
  };
  
  console.log('\n📊 CSS Categories Usage:');
  Object.entries(categories).forEach(([category, classes]) => {
    console.log(`   ${category}: ${classes.length} classes`);
  });
  
  return { usedClasses, categories };
}

/**
 * Check for potential optimizations
 */
function suggestOptimizations(usedClasses) {
  console.log('\n💡 Optimization Suggestions:');
  
  // Check for redundant classes
  const redundantPatterns = [
    { pattern: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)$/, suggestion: 'Consider using fewer text sizes' },
    { pattern: /^(m|p)-(0|1|2|3|4|5|6|8|10|12|16|20|24|32|40|48|56|64)$/, suggestion: 'Consider using a consistent spacing scale' },
    { pattern: /^text-(gray|slate|zinc|neutral|stone)-(100|200|300|400|500|600|700|800|900)$/, suggestion: 'Consider using fewer gray shades' }
  ];
  
  redundantPatterns.forEach(({ pattern, suggestion }) => {
    const matches = usedClasses.filter(cls => pattern.test(cls));
    if (matches.length > 5) {
      console.log(`   ⚠️  ${suggestion} (found ${matches.length} variants)`);
    }
  });
  
  // Check for unused responsive prefixes
  const responsivePrefixes = ['sm:', 'md:', 'lg:', 'xl:', '2xl:'];
  responsivePrefixes.forEach(prefix => {
    const count = usedClasses.filter(cls => cls.startsWith(prefix)).length;
    console.log(`   📱 ${prefix} classes: ${count}`);
  });
}

/**
 * Generate optimized CSS report
 */
function generateReport() {
  const { usedClasses, categories } = analyzeCSSUsage();
  suggestOptimizations(usedClasses);
  
  const report = {
    timestamp: new Date().toISOString(),
    totalClasses: usedClasses.length,
    categories: Object.fromEntries(
      Object.entries(categories).map(([key, classes]) => [key, classes.length])
    ),
    topClasses: {
      colors: categories.colors.slice(0, 10),
      spacing: categories.spacing.slice(0, 10),
      typography: categories.typography.slice(0, 10)
    }
  };
  
  // Write report to file
  fs.writeFileSync('./css-optimization-report.json', JSON.stringify(report, null, 2));
  console.log('\n📄 Detailed report saved to: css-optimization-report.json');
  
  return report;
}

/**
 * Main execution
 */
if (require.main === module) {
  console.log('🎨 CSS Optimization Analysis\n');
  generateReport();
  
  console.log('\n✨ Recommendations:');
  console.log('   1. Enable Tailwind CSS purging in production');
  console.log('   2. Use Tailwind JIT mode for smaller builds');
  console.log('   3. Consider creating custom components for repeated patterns');
  console.log('   4. Use CSS compression in your build process');
  console.log('   5. Consider critical CSS extraction for better loading performance');
}

module.exports = { extractClassNames, analyzeCSSUsage, generateReport };
