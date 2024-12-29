// Files
const sequelize = require("./sequelize");

const models = sequelize.models;


async function getModel(Model, modelsToInclude)
{
    let response = {
        model: null,
        error: null,
    };
    
    if(Model)
    {
        if(models[Model.name])
        {
            try
            {
                const includedModels = [];
                
                // Insert models into an array
                Array.isArray(modelsToInclude) && modelsToInclude.forEach(e => {
                    includedModels.push({model: e});
                });
                
                response.model = await Model.findAll({
                    include: includedModels,
                });
            }
            catch(error)
            {
                response.error = error;
            };
        }
        else
        {
            response.error = "Provide a valid model.";
        };
    }
    else
    {
        response.error = "Provide the model to be operated.";
    };
    
    return response;
};

async function getModelById(Model, id, modelsToInclude)
{
    let response = {
        model: null,
        error: null,
    };
    
    if(Model)
    {
        if(models[Model.name])
        {
            if(id && typeof id === "string")
            {
                try
                {
                    const includedModels = [];
                    
                    // Insert models into an array
                    Array.isArray(modelsToInclude) && modelsToInclude.forEach(e => {
                        includedModels.push({model: e});
                    });
                    
                    response.model = await Model.findByPk(id, {
                        include: includedModels,
                    });
                    
                    response.error = !response.model && "Id not found.";
                }
                catch(error)
                {
                    response.error = error;
                };
            }
            else
            {
                response.error = "Provide a UUIDV4.";
            };
        }
        else
        {
            response.error = "Provide a valid model.";
        };
    }
    else
    {
        response.error = "Provide the model to be operated.";
    };
    
    return response;
};

async function getModelByParam(Model, whereParam, whereContent, find, modelsToInclude)
{
    let response = {
        model: null,
        error: null,
    };
    
    if(Model)
    {
        if(models[Model.name])
        {
            if(whereParam && whereContent)
            {
                try
                {
                    const includedModels = [];
                    
                    // Insert models into an array
                    Array.isArray(modelsToInclude) && modelsToInclude.forEach(e => {
                        includedModels.push({model: e});
                    });
                    
                    if(find === "one")
                    {
                        response.model = await Model.findOne({
                            where:
                            {
                                [whereParam]: whereContent,
                            },
                            include: includedModels,
                        });
                        
                        
                        response.error = !response.model && "Param not found.";
                    }
                    else if(find === "all")
                    {
                        response.model = await Model.findAll({
                            where:
                            {
                                [whereParam]: whereContent,
                            },
                            include: includedModels,
                        });
                        
                        response.error = !response.model && "Param not found.";
                    }
                    else
                    {
                        response.error = "Provide the find param.";
                    };
                }
                catch(error)
                {
                    response.error = error;
                };
            }
            else
            {
                response.error = "Provide a where param and its content.";
            };
        }
        else
        {
            response.error = "Provide a valid model.";
        };
    }
    else
    {
        response.error = "Provide the model to be operated.";
    };
    
    return response;
};

async function getModelByParams(Model, whereObject, find, modelsToInclude)
{
    let response = {
        model: null,
        error: null,
    };
    
    if(Model)
    {
        if(models[Model.name])
        {
            if(typeof whereObject === "object")
            {
                try
                {
                    const includedModels = [];
                    
                    // Insert models into an array
                    Array.isArray(modelsToInclude) && modelsToInclude.forEach(e => {
                        includedModels.push({model: e});
                    });
                    
                    if(find === "one")
                    {
                        response.model = await Model.findOne({
                            where: whereObject,
                            include: includedModels,
                        });
                        
                        response.error = !response.model && "Param not found.";
                    }
                    else if(find === "all")
                    {
                        response.model = await Model.findAll({
                            where: whereObject,
                            include: includedModels,
                        });
                        
                        response.error = !response.model && "Param not found.";
                    }
                    else
                    {
                        response.error = "Provide the find param.";
                    };
                }
                catch(error)
                {
                    response.error = error;
                };
            }
            else
            {
                response.error = "Provide a where object.";
            };
        }
        else
        {
            response.error = "Provide a valid model.";
        };
    }
    else
    {
        response.error = "Provide the model to be operated.";
    };
    
    return response;
};

async function postModel(Model, content)
{
    let response = {
        model: null,
        error: null,
    };
    
    if(Model && content)
    {
        if(models[Model.name])
        {
            try
            {
                if(typeof content === "object")
                {
                    response.model = await Model.create(content);
                    
                    response.error = !response.model && "Failed to create model.";
                }
                else
                {
                    response.error = "Provide an object with the content to be saved.";
                };
            }
            catch(error)
            {
                response.error = error;
            };
        }
        else
        {
            response.error = "Provide a valid model.";
        };
    }
    else
    {
        response.error = "Provide the model to be operated and its content.";
    };
    
    return response;
};

async function putModel(Model, id, content)
{
    let response = {
        model: null,
        error: null,
    };
    
    if(Model && id)
    {
        if(models[Model.name])
        {
            try
            {
                const foundModel = await getModelById(Model, id);
                
                if(!foundModel.error)
                {
                    if(typeof content === "object")
                    {
                        response.model = await foundModel.update(content);
                        
                        response.error = !response.model && "Failed to update model.";
                    }
                    else
                    {
                        response.error = "Provide an object with the content to be saved.";
                    };
                }
                else
                {
                    response.error = foundModel.error;
                };
            }
            catch(error)
            {
                response.error = error;
            };
        }
        else
        {
            response.error = "Provide a valid model.";
        };
    }
    else
    {
        response.error = "Provide the model to be operated and the id to be updated.";
    };
    
    return response;
};

async function deleteModel(Model, id)
{
    let response = {
        model: null,
        error: null,
    };
    
    if(Model && id)
    {
        if(models[Model.name])
        {
            try
            {
                const foundModel = await getModelById(Model, id);
                
                if(!foundModel.error)
                {
                    response.model = await foundModel.destroy();
                    
                    response.error = !response.model && "Failed to delete model.";
                }
                else
                {
                    response.error = foundModel.error;
                };
            }
            catch(error)
            {
                response.error = error;
            };
        }
        else
        {
            response.error = "Provide a valid model.";
        };
    }
    else
    {
        response.error = "Provide the model to be operated and the id to be deleted.";
    };
    
    return response;
};

module.exports =
{
    getModel,
    getModelById,
    getModelByParam,
    getModelByParams,
    postModel,
    putModel,
    deleteModel,
};