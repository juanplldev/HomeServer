// Files
const {models} = require("../db");


async function postModel(Model, content)
{
    if(Model && content)
    {
        const modelName = Model.name;
        
        if(models[modelName])
        {
            try
            {
                if(typeof content === "object")
                {
                    const newModel = await Model.create(content).catch(() => {
                        const error = "Some key or value was rejected.";
                        return {"Error": error};
                    });
                    
                    return newModel;
                }
                else
                {
                    const error = "Provide an object with the content to be saved.";
                    
                    return {"Error": error};
                };
            }
            catch(error)
            {
                return {"Error": error};
            };
        }
        else
        {
            const error = "Provide a valid model.";
            
            return {"Error": error};
        };
    }
    else
    {
        const error = "Provide the model to be operated and its content.";
        
        return {"Error": error};
    };
};


module.exports =
{
    postModel,
};