import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EntityForm = () => {

    const [id, setId] = useState(0);

    const fetchId = async () => {

        const response = await fetch("/api/entities/get-id")
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            setId(() => data.id)
        })
        .catch((err) => {
            console.log("err", err)
        });
        
    };

    useEffect(() =>{
        fetchId()
    }, [])

    
    

    const [name , setName] = useState("");
    const [coordinate , setCoordinate] = useState({ x:0, y:0});
    const [labels, setLabels] = useState([])
    const [label, setLabel] = useState("")

    const navigate = useNavigate()
 

    const handleChangeName = (e) => {
        setName(()=> e.target.value)
    }

    const handleChangeCoord = (e) => {
        const {name, value} = e.target

        setCoordinate( coordinate => {
            return {
                ...coordinate, [name]: value
            }
        })
    }

    const handleChangelabel = (e) => {
        console.log(e.target.value)
        setLabel(() => e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        PostEntity();
        navigate('/')
    }
    const HandleOnClick = (e)=>{
        e.preventDefault()
        setLabels(labels => [...labels, label])
        setLabel("")
    }
    const PostEntity = async () => {

        const response = await fetch(`/api/entities`, {

            method: "POST",
            body: JSON.stringify({id: id ,name: name ,coordinate: coordinate,labels:labels}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data.entities)
           // dispatch(edit(data.entities));
        })
        .catch((err) => {
            console.log("err", err)
        });
        
    };

    return (
        <div class="container">
        <h1 class="my-3">adding new entity</h1>

        <form onSubmit={handleSubmit}>  
            <div class="row">
                <div class="mb-3 col-4">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" value={name}  onChange={handleChangeName}/>
                
                </div>
            </div>

           <div class="row">
                <div class="mb-3 col-4">
                    <label for="coordinate" class="form-label">Coordinate </label>
                    <input type="number" class="form-control" name="x" onChange={handleChangeCoord} />
                </div>
           </div>
           
           <div class="row">
                <div class="mb-3 col-4">
                    <input type="number" class="form-control" name="y"  value={coordinate.y} onChange={handleChangeCoord} />
                </div>
           </div>
           
            <div class="row ">
                <div class="mb-3 col-4">
                    <label for="labels" class="form-label">Labels</label>
                    <div class="row">
                    <div class="col"><input type="text" class="form-control"  value={label}  onChange={handleChangelabel}/></div>
                       <div class="col"> <button class="btn btn-warning" onClick={HandleOnClick}>+</button></div>
                    </div>
                   
                </div>
               
            </div>
           
            <button type="submit" class="btn btn-secondary" >Create</button>
        </form>
       
    </div>
    )
}

export default EntityForm;