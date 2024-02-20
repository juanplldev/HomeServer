// Files
const {models} = require("../db");
const {getModelById} = require("./getDbMethods");


async function deleteModel(Model, id)
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
                    
                    const deletedModel = await foundModel.destroy();
                    
                    return deletedModel;
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
        const error = "Provide the model to be operated and the id to be deleted.";
        
        return {"Error": error};
    };
};


module.exports =
{
    deleteModel,
};