// Dependencies
import React from "react";
import {Container, Row} from "react-bootstrap";
// Files
import Dirent from "./Dirent.jsx";
import Loader from "./Loader.jsx";


function DirContent(props)
{
    const {directories, files, path, reload, handleShowModal, handleCloseModal, showModal, modalType} = props;
    
    
    if(!directories && !files)
    {
        return <Loader/>;
    }
    else
    {
        return (
            <Container className="d-flex flex-row align-items-center justify-content-start" style={{width: "100%"}}>
                <Row xs={1} sm={1} md={2} lg={3} xl={4} xxl={4} className="mx-auto mb-3" style={{width: "100%"}}>
                    {
                        path ?
                        <Dirent
                            name={".."}
                            path={path}
                            backDir={true}
                            isDir={true}
                            key={"backDir"}
                            reload={reload}
                        />
                        :
                        null
                    }
                    {
                        directories.map(dir => {
                            return (
                                <Dirent
                                    name={dir}
                                    path={path}
                                    backDir={false}
                                    isDir={true}
                                    key={dir}
                                    reload={reload}
                                    handleShowModal={handleShowModal}
                                    handleCloseModal={handleCloseModal}
                                    showModal={showModal}
                                    modalType={modalType}
                                />
                            );
                        })
                    }
                    {
                        files.map(file => {
                            return (
                                <Dirent
                                    name={file}
                                    path={path}
                                    isDir={false}
                                    key={file}
                                    reload={reload}
                                    handleShowModal={handleShowModal}
                                    handleCloseModal={handleCloseModal}
                                    showModal={showModal}
                                    modalType={modalType}
                                />
                            );
                        })
                    }
                </Row>
            </Container>
        );
    };
};


export default DirContent;