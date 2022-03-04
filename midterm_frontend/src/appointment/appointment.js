import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll, addApp, deleteApp } from "../redux/app-redux";
import { Table, Button, Spinner,Form } from "react-bootstrap"
import{useNavigate} from 'react-router-dom'

const AppList = () => {
    const { appointments, loading } = useSelector((state) => state.appointment);
    const [appState, setAppState] = useState({
        card_number: "",
        vaccne_site: "",
        priority_area: "80+",
        date_time: "",
        cancelled: false
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getAll())
    },[])

    function addMoreApp() {
        dispatch(addApp(appState))
        dispatch(getAll())
    }

    function deleteAppointment(id) {
        dispatch(deleteApp(id))
        dispatch(getAll())
    }

    function setCardNum(value) {
        setAppState({ ...appState, card_number: value })
    }

    function setVS(value) {
        setAppState({ ...appState, vaccne_site: value })
    }

    function setPA(value) {
        console.log(value)

        setAppState({ ...appState, priority_area: value })
            
    }

    function setDate(value) {
        setAppState({ ...appState, date_time: value })
    }
    function setCancel(value) {
        if(value==='1'){
            setAppState({ ...appState, cancelled: false })
        }else{
            setAppState({ ...appState, cancelled: true })
        }
        
    }

    if (loading || !appointments) {
        return <Spinner animation="border" role="status" />
    }

    return (
        <>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Card Number</th>
                        <th>Vaccine Site</th>
                        <th>Priority Area</th>
                        <th>Date/Time</th>
                        <th>Cancelled</th>
                        <th>Delete Column</th>
                        <th>Add column</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        appointments.map((a, index) => (
                            <tr>
                                <td>{a.card_number}</td>
                                <td>{a.vaccne_site}</td>
                                <td>{a.priority_area}</td>
                                <td>{a.date_time.split("T")[0]}</td>
                                <td>{a.cancelled?"true":"false"}</td>
                                <td><Button className="btn btn-danger" onClick={() => deleteAppointment(a._id)} >Delete</Button></td>
                                <td></td>
                            </tr>
                        ))
                    }
                        <tr>
                            <td><input type="text" name="card_number" onChange={e => setCardNum(e.target.value)}/></td>
                            <td><input type="text" name="vac_site" onChange={e => setVS(e.target.value)} /></td>
                            <td>
                            <Form.Select aria-label="" name="pri_area" onChange={e => setPA(e.target.value)}>
                                    <option value="80+">80+</option>
                                    <option value="healthcare">healthcare</option>
                                    <option value="essential">essential</option>
                                </Form.Select>
                            
                            </td>
                            <td><input type="date" name="date" onChange={e => setDate(e.target.value)} /></td>
                            <td>
                                <Form.Select aria-label="" onChange={e => setCancel(e.target.value)}>
                                    <option value="0">False</option>
                                    <option value="1">True</option>
                                </Form.Select>
                            </td>
                            <td></td>
                            <td> <Button className="btn btn-primary" onClick={addMoreApp }>Add more Appointment</Button></td>
                            
                        </tr>
  
                </tbody>
            </Table>
           
        </>
    )
}

export default AppList