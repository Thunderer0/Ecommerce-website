import React, { Fragment, useState } from 'react'
import "./Header.css"
import { SpeedDial,SpeedDialAction } from '@material-ui/lab'
import DashBoardIcon from "@material-ui/icons/Dashboard"
import PersonIcon from "@material-ui/icons/Person"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import ListAltIcon from "@material-ui/icons/ListAlt"
import {useHistory} from "react-router-dom"
import { useAlert } from 'react-alert'
import { logout } from '../../../actions/userAction'
import { useDispatch } from 'react-redux'
import Backdrop from "@material-ui/core/Backdrop"
const UserOptions = ({user}) => {
    const dispatch = useDispatch()
    const [ open,setOpen] = useState(false)
    const history = useHistory()
    const alert = useAlert()
    const options =[
        {icon:<PersonIcon/>, name:"Profile",func:account},
        {icon:<ListAltIcon/>, name:"Orders",func:orders},
        {icon:<ExitToAppIcon/>, name:"LogOut",func:logoutuser},
    ]
    if (user.role==="admin") {
        options.unshift({icon:<DashBoardIcon/>, name:"DashBoard",func:dashboard})
    }
    function dashboard() {
        history.push("/admin/dashboard")
    }
    function account() {
        history.push("/account")
    }
    function orders() {
        history.push('/orders')
    }
    function logoutuser() {
        history.push("/")
        dispatch(logout());
        alert.success("Logged out successfully")
    }
    return (
        <Fragment>
            <Backdrop open={open} style={{zIndex:"10"}}/>
            <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            onClose={()=>setOpen(false)}
            onOpen={()=>setOpen(true)}
            style={{ zIndex: "11" }}
            open={open} 
            direction='down'
            className="speedDial"
            icon={
                <img
                className='speedDialIcon'
                src={user.avatar.url?user.avatar.url:"./Profile.png"}
                alt='Profile'
                />}
            >
                {options.map((item)=>(
                    <SpeedDialAction 
                    key={item.name} 
                    icon={item.icon} 
                    tooltipTitle={item.name} 
                    onClick={item.func} />
                ))}
            </SpeedDial>
        </Fragment>
    )
}

export default UserOptions
