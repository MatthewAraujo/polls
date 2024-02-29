import { Poll } from "@/components/Poll"

export default async function Page({ params }: { params: { id: string } }) {
  const response = await fetch(`http://localhost:3333/polls/${params.id}`,
    {
      next: { revalidate: 1 },
    })
  const { poll } = await response.json()
  return (
    <div className='mt-52 mx-auto max-w-56'>
      {
        poll && <Poll pollId={params.id} title={poll.title} options={poll.options} />
      }
    </div>
  )
}

