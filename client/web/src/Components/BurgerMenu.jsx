// Dependencies
import {useState} from "react";
import {Col, Dropdown} from "react-bootstrap";
import {ArrowRepeat, BoxArrowRight} from "react-bootstrap-icons";
// Files
import {useAuthStore, useAppStore} from "../store/store";
import styles from "./BurgerMenu.module.css";


export default function BurgerMenu()
{
    const isAdmin = useAuthStore(state => state.isAdmin);
    const logout = useAuthStore(state => state.logout);
    const {getPath, reloadContentState, restart} = useAppStore();
    const path = getPath();
    
    const [showDropdown, setShowDropdown] = useState(false);
    
    async function handleShowDropdown()
    {
        setShowDropdown(showDropdown => !showDropdown);
    };
    
    async function handleRestart()
    {
        const payload = await restart();
        console.log(payload);
        
        await reloadContentState(path);
    };
    
    
    return (
        <Col style={{width: "auto", position: "absolute", top: "2%", right: "2%"}} className="d-flex flex-column align-items-center jusify-content-center">
            <label className={styles.burger} htmlFor="burger">
                <input type="checkbox" id="burger" onClick={handleShowDropdown}/>
                <span></span>
                <span></span>
                <span></span>
            </label>
            
            {/* <div hidden={!showDropdown} style={{background: "red"}}>
                <span className="d-flex align-items-center jusify-content-around">
                    <BoxArrowRight style={{scale: "2", opacity: 0.8}} cursor="pointer"/> Logout
                </span>
                
                    {
                        isAdmin && <ArrowRepeat style={{scale: "2", opacity: 0.9}} cursor="pointer" />
                    }
            </div> */}
        </Col>
    );
};