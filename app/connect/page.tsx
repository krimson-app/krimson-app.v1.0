import ConnectDetails from "@/components/ConnectDetails"

export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black via-[#DC1C3C] to-[#DC1C3C] bg-fixed flex flex-col items-center justify-center">
      <Suspense><ConnectDetails /></Suspense>
    </div>
  )
}

