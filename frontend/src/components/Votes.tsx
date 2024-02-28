"use client"
import { useState } from "react"

export function Votes({options}: {options: {id: string, votes: number}[]}){
  const [selectedOption, setSelectedOption] = useState(0)

  function handleVote(optionId: string){
    const option = options.find((option) => option.id === optionId)
    if(option){
      setSelectedOption(option.votes)
    }
  }
  return (
    <span className="absolute right-0 text-black">{selectedOption}</span>
  )
}