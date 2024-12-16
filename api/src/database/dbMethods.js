// Files
const {models} = require("./db");


async function getModel(Model, modelsToInclude)
{
    if(Model)
    {
        const modelName = Model.name;
        
        if(models[modelName])
        {
            try
            {
                const includedModels = [];
                
                // Insert models into an array
                Array.isArray(modelsToInclude) && modelsToInclude.forEach(e => {
                    includedModels.push({model: e});
                });
                
                const foundModel = await Model.findAll({
                    include: includedModels,
                });
                
                return foundModel;
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
        const error = "Provide the model to be operated.";
        
        return {"Error": error};
    };
};

async function getModelById(Model, id, modelsToInclude)
{
    const typeOfId = "string";
    
    if(Model)
    {
        const modelName = Model.name;
        
        if(models[modelName])
        {
            if(id && typeof id === typeOfId)
            {
                try
                {
                    const includedModels = [];
                    
                    // Insert models into an array
                    Array.isArray(modelsToInclude) && modelsToInclude.forEach(e => {
                        includedModels.push({model: e});
                    });
                    
                    const foundModel = await Model.findByPk(id, {
                        include: includedModels,
                    }).catch(() => {
                        const error = "Provide a UUIDV4.";
                        return {"Error": error};
                    });
                    
                    if(foundModel)
                    {
                        return foundModel;
                    }
                    else
                    {
                        const error = "Id not found.";
                        
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
                const error = "Provide a UUIDV4.";
                
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
        const error = "Provide the model to be operated.";
        
        return {"Error": error};
    };
};

async function getModelByParam(Model, whereParam, whereContent, find, modelsToInclude)
{
    if(Model)
    {
        const modelName = Model.name;
        
        if(models[modelName])
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
                        const foundModel = await Model.findOne({
                            where:
                            {
                                [whereParam]: whereContent,
                            },
                            include: includedModels,
                        }).catch(() => {
                            const error = "Provide a valid param.";
                            return {"Error": error};
                        });
                        
                        if(foundModel)
                        {
                            return foundModel;
                        }
                        else
                        {
                            const error = "Param not found.";
                            
                            return {"Error": error};
                        };
                    }
                    else if(find === "all")
                    {
                        const foundModel = await Model.findAll({
                            where:
                            {
                                [whereParam]: whereContent,
                            },
                            include: includedModels,
                        }).catch(() => {
                            const error = "Provide a valid param.";
                            return {"Error": error};
                        });
                        
                        return foundModel;
                    }
                    else
                    {
                        const error = "Provide the find function.";
                        
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
                const error = "Provide a where param and its content.";
                
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
        const error = "Provide the model to be operated.";
        
        return {"Error": error};
    };
};

async function getModelByParams(Model, whereObject, find, modelsToInclude)
{
    if(Model)
    {
        const modelName = Model.name;
        
        if(models[modelName])
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
                        const foundModel = await Model.findOne({
                            where: whereObject,
                            include: includedModels,
                        }).catch(() => {
                            const error = "Provide a valid param.";
                            return {"Error": error};
                        });
                        
                        if(foundModel)
                        {
                            return foundModel;
                        }
                        else
                        {
                            const error = "Param not found.";
                            
                            return {"Error": error};
                        };
                    }
                    else if(find === "all")
                    {
                        const foundModel = await Model.findAll({
                            where: whereObject,
                            include: includedModels,
                        }).catch(() => {
                            const error = "Provide a valid param.";
                            return {"Error": error};
                        });
                        
                        return foundModel;
                    }
                    else
                    {
                        const error = "Provide the find function.";
                        
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
                const error = "Provide a where object.";
                
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
        const error = "Provide the model to be operated.";
        
        return {"Error": error};
    };
};

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
    getModel,
    getModelById,
    getModelByParam,
    getModelByParams,
    postModel,
    putModel,
    deleteModel,
};