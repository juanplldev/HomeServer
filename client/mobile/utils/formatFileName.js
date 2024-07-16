export default function formatFileName(name)
{
    return name.replace(/[!*'();:@&=+$,/?%#[\]]/g, '_');
};