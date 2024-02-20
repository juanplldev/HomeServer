// Files
const {models} = require("../db");
const {getModelById} = require("./getDbMethods");


async function putModel(Model, id, content)
{
    if(Model && id)
    {
        const modelName = Model.name;
        
        if(models[modelName])
        {
            try
            {
                const foundModel = await getModelById(Model, id);
                
                if(!foundModel.Error)
                {
                    if(typeof content === "object")
                    {
                        const updatedModel = await foundModel.update(content).catch(() => {
                            const error = "Some key or value was rejected.";
                            return {"Error": error};
                        });
                        
                        return updatedModel;
                    }
                    else
                    {
                        const error = "Provide an object with the content to be saved.";
                        
                        return {"Error": error};
                    };
                }
                else
                {
                    return {"Error": foundModel.Error};
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
        const error = "Provide the model to be operated and the id to be updated.";
        
        return {"Error": error};
    };
};


module.exports =
{
    putModel,
};