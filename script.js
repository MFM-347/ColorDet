document.getElementById("btn").addEventListener("click", function () {
  const color = document.getElementById("color").value.trim();
  const preview = document.getElementById("preview");
  const details = document.getElementById("details");

  if (!tinycolor(color).isValid()) {
    details.innerHTML = "<p class='text-danger'>Invalid color value.</p>";
    preview.style.backgroundColor = "transparent";
    return;
  }

  const c = tinycolor(color);
  preview.style.backgroundColor = c.toHexString();
  details.innerHTML = `
<p>Name: ${c.toName().toString()}</p>
<p>Hex: ${c.toHex8String()}</p>
<p>RGB: ${c.toRgbString()}</p>
<p>HSL: ${c.toHslString()}</p>
<p>HSV: ${c.toHsvString()}</p>
<p>Brightness: ${c.getBrightness()}</p>
<p>Luminance: ${c.getLuminance()}</p>
`;
  palettes.innerHTML = "";
  const analogous = c.analogous();
  const complement = c.complement();
  const monochromatic = c.monochromatic();
  const splitcomplement = c.splitcomplement();
  const tetrad = c.tetrad();
  const triad = c.triad();

  function generatePalette(paletteColors) {
    const paletteContainer = document.createElement("div");
    paletteContainer.classList.add("palette");
    palettes.appendChild(paletteContainer);

    paletteColors.forEach((paletteColor) => {
      const colorSquare = document.createElement("div");
      colorSquare.classList.add("color-sq");
      colorSquare.style.backgroundColor = tinycolor(paletteColor).toHexString();
      paletteContainer.appendChild(colorSquare);
    });
  }

  generatePalette(analogous);
  generatePalette([complement]);
  if (Array.isArray(monochromatic)) {
    generatePalette(monochromatic);
  } else {
    generatePalette([monochromatic]);
  }
  generatePalette(splitcomplement);
  generatePalette(tetrad);
  generatePalette(triad);
});
