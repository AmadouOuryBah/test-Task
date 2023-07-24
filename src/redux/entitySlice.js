import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  entities: [],
  entity: {name : "", coordinate: {x: 0, y:0}, labels: [] },

}

export const entitiesSlice = createSlice({
  name: 'entity',
  initialState,

  reducers: {

    set_entities: (state, action ) => {
        state.entities = [...action.payload]
    },

    selectedEntity: (state , action) => {

        state.entity = {...action.payload}
    },

    remove: (state, action) => {
      state.entities = state.entities.filter(entity => entity.id !== action.payload)
    },

    modifie_entityName: (state, action) => {
        state.entity = {...state.entity, name: action.payload}
    },

    modifie_entityCoordX: (state, action) => {
      state.entity.coordinate.x =  action.payload;
  },

  modifie_entityCoordY: (state, action) => {
    state.entity.coordinate.y =  action.payload;
},



    edit: (state, action) => {
        state.entity = {...state, ...action.payload}
    },

  },
})



// Action creators are generated for each case reducer function
export const { remove, edit, set_entities, selectedEntity, modifie_entityName, modifie_entityCoordX, modifie_entityCoordY} = entitiesSlice.actions

export default entitiesSlice.reducer
