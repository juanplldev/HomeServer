// Dependencies
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
// Files

ffmpeg.setFfmpegPath(ffmpegPath);


function generateVideoThumbnail({thumbnailsDir, inputPath, thumbnailName})
{
    let foundError = null;
    
    try
    {
        return ffmpeg(inputPath).screenshots({
            count: 1,
            size: "200x200",
            folder: thumbnailsDir,
            filename: thumbnailName,
        });
        
    }
    catch(error)
    {
        foundError =
        {
            file: outputPath,
            msg: "Error generating video thumbnail.",
            error,
        };
        
        console.error(foundError);
    };
};


module.exports =
{
    generateVideoThumbnail,
};