// Dependencies
import React from "react";
import {useNavigate} from "react-router-dom";
import {Container, Breadcrumb} from "react-bootstrap";
// Files


function PathBreadcrumb(props)
{
    const navigate = useNavigate();
    const {path} = props;
    const subPaths = path ? path.split("/") : [];
    
    subPaths.unshift("Root");
    
    return (
        <Container className="px-1" style={{width: "100%", minHeight: 30}}>
            <Breadcrumb>
                {
                    subPaths.map((item, index) => {
                        const subPathLink =  item === "Root" ? "/" : `/${subPaths.slice(1, index + 1).join("/")}`;
                        const lastItem = index === subPaths.length - 1;
                        
                        return(
                            <Breadcrumb.Item active={lastItem} onClick={() => navigate(subPathLink)} key={index}>
                                {item}
                            </Breadcrumb.Item>
                        );
                    })
                }
            </Breadcrumb>
        </Container>
    );
};


export default PathBreadcrumb;