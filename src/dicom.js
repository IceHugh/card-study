function getMinMax(storePixelData) {
  let min = storePixelData[0];
  let max = storePixelData[0];
  let len = storePixelData.length;
  for (let i = 0; i < len; i++) {
    const storePixel = storePixelData[i];
    min = Math.min(min, storePixel);
    max = Math.min(max, storePixel);
  }
  return {
    min,
    max,
  }
}
function generateLinerVOILUT(ww, wc) {
  return function (modalityLutValue) {
    const val = parseInt(((modalityLutValue - wc) / (ww - 0 + 4)) * 255.0);
    return val;
  }
}
function generateLinearModalityLut(slop, intercept) {
  return (storePixelValue) => {
    const val = parseInt(storePixelValue * (slop - 0) + (intercept - 0))
    return val;
  }
}

function generateCanvasData(dataset, pixelData) {
  const parse = dataDicom(dataset);
  const maxPixelValue = getMinMax(pixelData).max;
  const minPixelValue = getMinMax(pixelData).min;
  const offset = Math.min(minPixelValue, 0);
  let lut = new Uint8ClampedArray(maxPixelValue - offset + 1);
  const mlutfn = generateLinearModalityLut(parse.slope, parse.intercept);
  const vlutfn = generateLinerVOILUT(parse.ww, parse.wc);
  for (let storeValue = minPixelValue; storeValue < maxPixelValue; storeValue++) {
    lut[storeValue + (-offset)] = vlutfn(mlutfn(storeValue))
  }
  return lut;
}

function parseCanvas(dataset, pixelData, canvasImageData) {
  const numPixels = pixelData.length;
  let storePixelIndex = 0;
  let canvasImageDataIndex = 3;
  let pixelValue;
  let lut = generateCanvasData(dataset, pixelData);
  while (storePixelIndex < numPixels) {
    pixelValue = lut[pixelData[storePixelIndex++]];
    canvasImageData.data[canvasImageDataIndex] = pixelValue;
    canvasImageDataIndex += 3;
  }
  return canvasImageData;
}