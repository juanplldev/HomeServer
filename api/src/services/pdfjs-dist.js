// Dependencies
const {createCanvas} = require("canvas");
const pdfjs = require("pdfjs-dist/legacy/build/pdf.js");
// Files
const {generateImageThumbnail} = require("./sharp");


async function generatePDFThumbnail(inputPath, outputPath)
{
    let foundError = null;
    
    try
    {
        const width = 200, height = 200;
        
        const pdf = await pdfjs.getDocument({url: inputPath})?.promise;
        
        const page = await pdf.getPage(1);
        
        const viewport = page.getViewport({scale: 1});
        
        const scale = Math.min(width / viewport.width, height / viewport.height);
        const scaledViewport = page.getViewport({scale});
        
        const canvas = createCanvas(width, height);
        const canvasContext = canvas.getContext("2d");
        
        await page.render({
            canvasContext,
            viewport: scaledViewport,
        }).promise;
        
        const thumbnailBuffer = canvas.toBuffer();
        
        await generateImageThumbnail(thumbnailBuffer, outputPath);
    }
    catch(error)
    {
        foundError =
        {
            file: inputPath,
            msg: "Error generating PDF thumbnail.",
            error,
        };
        
        console.error(foundError);
    };
};


module.exports =
{
    generatePDFThumbnail,
};