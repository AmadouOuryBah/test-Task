import React , {useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectedEntity, edit, modifie_entityName, modifie_entityCoordX,modifie_entityCoordY} from "../redux/entitySlice";


const EntityDetails = () => {
    
    const { entityId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {entity} = useSelector((state) => state.entities) 
    


    console.log(entity); 

    
   const  fetchEntityDetail = async () => {
        const response =  await fetch(`/api/entities/${entityId}`)
        .then( response => response.json())
        .then( data => {
            console.log(data)
            dispatch(selectedEntity(data.entities));
        })
        .catch((err) => {
            console.log("err", err)
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        UpdateEntity();    
        navigate("/")
       
    };

    const UpdateEntity = async () => {

        const response = await fetch(`/api/entities/${entityId}`, {

            method: "PUT",
            body: JSON.stringify(entity),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data.entities)
            dispatch(edit(data.entities));
        })
        .catch((err) => {
            console.log("err", err)
        });
    }

   const HandleChangeName = (e) =>{
    dispatch(modifie_entityName(e.target.value))
   }
   const HandleChangeCoordinateX = (e) =>{
    dispatch(modifie_entityCoordX(e.target.value))
   }

   const HandleChangeCoordinateY = (e) =>{
    dispatch(modifie_entityCoordY(e.target.value))
   }
   

    useEffect(() => {
        
        fetchEntityDetail();
    }, []);

    return (
        <div class="container">
            <h1 class="my-3">Entity Detail</h1>
            <form  onSubmit={handleSubmit} method="post">  
                <div class="row">
                    <div class="mb-3 col-4">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control"  value={entity.name}  onChange={HandleChangeName}/>
                    
                    </div>
                </div>

               <div class="row">
                    <div class="mb-3 col-4">
                        <label for="coordinate" class="form-label">Coordinate </label>
                        <input type="number" class="form-control" value={entity.coordinate.x} onChange={HandleChangeCoordinateX} />
                    </div>
               </div>
               
               <div class="row">
                    <div class="mb-3 col-4">
                        <input type="number" class="form-control"  value={entity.coordinate.y} onChange={HandleChangeCoordinateY}/>
                    </div>
               </div>
               
                <div class="row">
                    <div class="mb-3 col-4">
                        <label for="labels" class="form-label">Labels</label>
                        <input type="text" class="form-control"  value={entity.labels.join(" ")  }/>
                    </div>
                </div>
               
                <button type="submit" class="btn btn-secondary" >Update</button>
            </form>
           
        </div>
    )
}

export default EntityDetails;