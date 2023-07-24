import React from "react";
import { useSelector } from "react-redux";
import { remove } from "../redux/entitySlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";


const EntityComponent = () => {
    
   const {entities} = useSelector((state) => state.entities);

   const myStyle = {

    fontWeight: "bold",

   }
   const dispatch = useDispatch()

   const handleDelete = (id) => {

        DeleteEntity(id);
    };

    const DeleteEntity = async (id) => {

        const response = await fetch(`/api/entities/${id}`, {

            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response=>response.json())
        .then(data => {
            dispatch(remove(id))
        })
        .catch((err) => {
            console.log("err", err)
        });


   }

    const renderList = entities.map( entity => 

        <div key={entity.id}  class="mt-3">
          
                <div class="row">
                    <div class="col">
                        {entity.name}
                    </div>
                    <div class="col">
                        {entity.coordinate.x}, <span>{entity.coordinate.y}</span> 
                    </div>
                    <div class="col">
                       <span>{entity.labels.join(" ")}</span>
                    </div>
                    <div class="col">
                    <a href={`/entity/${entity.id}`} class="btn btn-secondary mx-3">Edit</a> <button  class="btn btn-warning" onClick={()=>handleDelete(entity.id)}>Delete</button>
                    </div>
                </div>
          
      </div>
    );

    return (
        <div class="container">
            <div class="row " style={myStyle}>
                <div class="col">
                    <span class="font-weight-bold" >Name</span>
                </div>
                <div class="col">
                    <span class="font-weight-bold">Coordinate</span>
                </div>
                <div class="col">
                    <span class="font-weight-bold">Labels</span>
                </div>
                <div class="col">

                </div>
            </div>
           {renderList}
        </div>
    )
}

export default EntityComponent