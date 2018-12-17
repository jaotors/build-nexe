const { compile } = require('nexe');
compile({
  input: './index.js',
  output: './XSplitVCamFrameExtractor',
  name: 'XSplitVCamFrameExtractor',
}).then(() => {
  console.log('success');
});
