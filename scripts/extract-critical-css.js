#!/usr/bin/env node

/**
 * Critical CSS Extraction for Next.js Static Export
 * Extracts above-the-fold CSS to inline in HTML
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Critical CSS for above-the-fold content
const criticalCSS = `
/* Critical CSS - Above the fold */
html{line-height:1.15;-webkit-text-size-adjust:100%}
body{margin:0;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif}
*,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}
.bg-white{background-color:rgb(255 255 255)}
.bg-blue-600{background-color:rgb(37 99 235)}
.text-white{color:rgb(255 255 255)}
.text-gray-900{color:rgb(17 24 39)}
.text-gray-600{color:rgb(75 85 99)}
.px-4{padding-left:1rem;padding-right:1rem}
.py-2{padding-top:0.5rem;padding-bottom:0.5rem}
.py-4{padding-top:1rem;padding-bottom:1rem}
.py-8{padding-top:2rem;padding-bottom:2rem}
.mt-4{margin-top:1rem}
.mb-8{margin-bottom:2rem}
.flex{display:flex}
.items-center{align-items:center}
.justify-between{justify-content:space-between}
.space-x-4>:not([hidden])~:not([hidden]){margin-left:1rem}
.text-xl{font-size:1.25rem;line-height:1.75rem}
.text-2xl{font-size:1.5rem;line-height:2rem}
.text-3xl{font-size:1.875rem;line-height:2.25rem}
.font-bold{font-weight:700}
.font-semibold{font-weight:600}
.rounded{border-radius:0.25rem}
.rounded-lg{border-radius:0.5rem}
.shadow{box-shadow:0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)}
.hover\\:bg-blue-700:hover{background-color:rgb(29 78 216)}
.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}
.max-w-7xl{max-width:80rem}
.mx-auto{margin-left:auto;margin-right:auto}
.container{width:100%}
@media (min-width: 640px){.container{max-width:640px}}
@media (min-width: 768px){.container{max-width:768px}}
@media (min-width: 1024px){.container{max-width:1024px}}
@media (min-width: 1280px){.container{max-width:1280px}}
@media (min-width: 1536px){.container{max-width:1536px}}
`;

/**
 * Inject critical CSS into HTML files
 */
function injectCriticalCSS() {
  const outDir = './out';
  const htmlFiles = [];
  
  function findHTMLFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        findHTMLFiles(filePath);
      } else if (file.endsWith('.html')) {
        htmlFiles.push(filePath);
      }
    });
  }
  
  findHTMLFiles(outDir);
  
  htmlFiles.forEach(htmlFile => {
    console.log(`Processing: ${htmlFile}`);
    
    let content = fs.readFileSync(htmlFile, 'utf8');
    
    // Find the CSS link and make it non-blocking
    content = content.replace(
      /<link rel="stylesheet" href="([^"]*\.css)"[^>]*>/g,
      '<link rel="preload" href="$1" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">' +
      '<noscript><link rel="stylesheet" href="$1"></noscript>'
    );
    
    // Inject critical CSS
    const criticalCSSTag = `<style>${criticalCSS.replace(/\s+/g, ' ').trim()}</style>`;
    content = content.replace('</head>', `${criticalCSSTag}\n</head>`);
    
    fs.writeFileSync(htmlFile, content);
  });
  
  console.log(`✅ Processed ${htmlFiles.length} HTML files`);
}

/**
 * Main execution
 */
if (require.main === module) {
  console.log('🎨 Extracting Critical CSS...\n');
  injectCriticalCSS();
  
  console.log('\n✨ Critical CSS injection complete!');
  console.log('📈 Expected improvements:');
  console.log('   • Faster First Contentful Paint (FCP)');
  console.log('   • Reduced render-blocking time');
  console.log('   • Better Lighthouse scores');
}

module.exports = { injectCriticalCSS };
