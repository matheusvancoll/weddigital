import React from 'react'

export default function option(props){

    let classificação = props.title

    if(classificação === 1){ classificação = "⭐✩✩✩✩ e acima" }
    if(classificação === 2){ classificação = "⭐⭐✩✩✩ e acima" }
    if(classificação === 3){ classificação = "⭐⭐⭐✩✩ e acima" }
    if(classificação === 4){ classificação = "⭐⭐⭐⭐☆ e acima" }
    if(classificação === 5){ classificação = "⭐⭐⭐⭐⭐ apenas" }

    return(
        <div className='sidebar-categorias-list'>
            <input type='checkbox' />
            <p>{classificação} </p>
        </div>
    )
}