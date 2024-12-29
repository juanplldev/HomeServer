// Dependencies
import React from "react";
import {Container, Row} from "react-bootstrap";
// Files
import {useAppStore} from "../store/store.js";
import Dirent from "./Dirent.jsx";


export default function DirContent(props)
{
    const {directories, files, handleShowModal, handleCloseModal, showModal, modalType} = props;
    
    const {path} = useAppStore();
    
    return (
        <Container className="d-flex flex-row align-items-center justify-content-start" style={{width: "100%"}}>
            <Row xs={1} sm={1} md={2} lg={3} xl={4} xxl={4} className="mx-auto mb-3" style={{width: "100%"}}>
                {
                    path ?
                    <Dirent
                        name={""}
                        backDir={true}
                        isDir={true}
                        key={"backDir"}
                    />
                    :
                    null
                }
                {
                    directories && directories.map(dir => {
                        return (
                            <Dirent
                                name={dir}
                                backDir={false}
                                isDir={true}
                                key={dir}
                                handleShowModal={handleShowModal}
                                handleCloseModal={handleCloseModal}
                                showModal={showModal}
                                modalType={modalType}
                            />
                        );
                    })
                }
                {
                    files && files.map(file => {
                        return (
                            <Dirent
                                name={file}
                                isDir={false}
                                key={file}
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