// Dependencies
import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Container, Row} from "react-bootstrap";
// Files
import {getDir} from "../../redux/actions/actions";
import PathBar from "../PathBar/PathBar";
import UploadFile from "../UploadFile/UploadFile";
import CreateDir from "../CreateDir/CreateDir";
import DirContent from "../DirContent/DirContent";
import styles from "./Home.module.css";


function Home()
{
    const dispatch = useDispatch();
    const dirContent = useSelector(state => state.content);
    const params = useParams();
    const path = params.path && params["*"].length ? `${params.path}/${params["*"]}` : params.path || "";
    const directories = dirContent && dirContent.directories;
    const files = dirContent && dirContent.files;
    
    useEffect(() => {
        dispatch(getDir(path));
    }, [dispatch, path]);
    
    
    return (
        <div className={styles.Container}>
            <div className={styles.SubContainer}>
                {/* <PathBar/> */}
                {/* <UploadFile/> */}
                {/* <CreateDir/> */}
                <DirContent
                    directories={directories}
                    files={files}
                    path={path}
                />
            </div>
        </div>
    );
};


export default Home;