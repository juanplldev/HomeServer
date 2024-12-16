// Dependencies
const mime = require("mime-types");
// Files


function getMimeType(filePath)
{
    const mimeType = mime.lookup(filePath);
    
    if(mimeType.startsWith("image/")) return "image";
    if(mimeType.startsWith("video/")) return "video";
    if(mimeType.startsWith("application/pdf")) return "pdf";
    
    return "unknown";
};


module.exports =
{
    getMimeType,
};