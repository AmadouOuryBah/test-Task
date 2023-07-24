import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { set_entities} from "../redux/entitySlice";
import EntityComponent from "./EntityComponent"

const EntityListing = () => {

    const entities = useSelector((state=>state.entities));
    const dispatch = useDispatch()

    const fetchEntities = async () => {

        const response = await fetch("/api/entities")
        .then(response=>response.json())
        .then(data=>{
            console.log(data.entities)
            dispatch(set_entities(data.entities));
        })
        .catch((err) => {
            console.log("err", err)
        });
        
    };

    useEffect(() => {
        fetchEntities();
    }, []);

    return (
        <div>
            <h1 class="my-3 d-flex justify-content-center align-items-center">EntityListing</h1>
            <EntityComponent/>
        </div>
    )
}

export default EntityListing;