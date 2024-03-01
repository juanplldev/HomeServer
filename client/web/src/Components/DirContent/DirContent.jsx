// Dependencies
import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Container, Row} from "react-bootstrap";
// Files
import {getDir} from "../../redux/actions/actions";
import Dirent from "../Dirent/Dirent";
import Loader from "../Loader/Loader";
import styles from "./DirContent.module.css";


function DirContent(props)
{
    const {directories, files, path} = props;
    
    if(!directories && !files)
    {
        return <Loader/>;
    }
    else
    {
        return (
            <Container>
                <Row className="mx-auto-mb3">
                    {
                        path ?
                        <Dirent
                            name={".."}
                            path={path}
                            backDir={true}
                            isDir={true}
                            key={"parent"}
                        />
                        :
                        null
                    }
                    {
                        directories.map(name => {
                            return (
                                <Dirent
                                    name={name}
                                    path={path}
                                    backDir={false}
                                    isDir={true}
                                    key={name}
                                />
                            );
                        })
                    }
                    {
                        files.map(name => {
                            return (
                                <Dirent
                                    name={name}
                                    path={path}
                                    isDir={false}
                                    key={name}
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