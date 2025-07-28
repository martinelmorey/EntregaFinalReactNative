import { createSlice, current } from "@reduxjs/toolkit";

const listSlice = createSlice({
    name: 'list',
    initialState: {
        user: "",
        updatedAt: new Date().toLocaleString(),
        listItems: [],
    },
    reducers: {
        addListItems : (state,action)=>{          
            const {product,quantity} = action.payload
            console.log("Añadiendo producto a la lista...", product, quantity)
            const productInList = state.listItems.find(item=>item.id===product.id)
            if(!productInList){
                state.listItems.push({...product,quantity})
            }else{
                productInList.quantity += quantity;
            }
            state.updatedAt = new Date().toLocaleString();
        },
        removeListItems : (state,action)=>{
             state.listItems= state.listItems.filter(item=>item.id!==action.payload)
             state.updatedAt = new Date().toLocaleString();
        },
        clearList : (state,action)=>{
            state.listItems = []
            state.updatedAt = new Date().toLocaleString();
        },
        
    }   
})

export const {addListItems,removeListItems,clearList } = listSlice.actions

export default listSlice.reducer