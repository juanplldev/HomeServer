// Dependencies
const bcrypt = require("bcryptjs");


async function hashPassword(password)
{
    const hashedPassword = await bcrypt.hash(password, 10);
    
    return hashedPassword;
};

async function comparePassword(password, hashedPassword)
{
    return await bcrypt.compare(password, hashedPassword);
};



module.exports =
{
    hashPassword,
    comparePassword,
};