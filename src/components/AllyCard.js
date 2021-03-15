import React from 'react'
import { Link } from 'react-router-dom'

const AllyCard = ({ ally }) => {
    return (
        <article className="w-1/5">
            <h2 className="text-xl"><Link to={`/ally/${ally.slug}`}> {ally.name} </Link></h2>
            <p>{ ally.inductionCount }</p>
        </article>
    )
}

export default AllyCard
