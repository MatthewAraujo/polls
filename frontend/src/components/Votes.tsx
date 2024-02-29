import { Button } from "./ui/button"

interface Votes {
  id: string 
  votes: number
}

export function Votes({ id, votes }: Votes) {
  
  return (
    <Button className="absolute right-0 text-black bg-transparent hover:bg-transparent">{votes}</Button>
  )
}