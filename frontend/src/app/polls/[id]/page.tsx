"use client"
import { Poll } from "@/components/Poll"
import { api } from "@/lib/axios"
import { useState } from "react"

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState('')
  async function getData(pollId: string) {
    const response = await api.get(`polls/${pollId}`)
    const data = response.data.poll
    setData(data)
  }

  getData(params.id)



  return (
    <div className='mt-52 mx-auto max-w-20'>
      {
        data && <Poll title={data.title} options={data.options} />
      }
    </div>
  )
}

