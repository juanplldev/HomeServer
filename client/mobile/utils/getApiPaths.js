// Dependencies
// Files
import {getDirContent} from "../api";


export default async function getApiPaths(path, allPaths=[])
{
    const {directories} = await getDirContent(path);
    
    const promises = directories.map(async dirent => {
        const newPath = `${path}/${dirent}`;
        allPaths.push(newPath);
        
        return getApiPaths(newPath, allPaths);
    });
    
    await Promise.all(promises);
    
    return allPaths;
};