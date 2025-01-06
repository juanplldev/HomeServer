// Dependencies
const sharp = require("sharp");
// Files


async function generateImageThumbnail(inputPath, outputPath)
{
    let foundError = null;
    
    try
    {
        return await sharp(inputPath).rotate().resize(200, 200).toFormat(sharp.format.webp).toFile(outputPath);
    }
    catch(error)
    {
        foundError =
        {
            file: outputPath,
            msg: "Error generating image thumbnail.",
            error,
        };
        
        console.error(foundError);
    };
};


module.exports =
{
    generateImageThumbnail,
};