import amplitudeServiceForNode from "@/lib/amplitude"

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userProperties: any = {
    user_id: "test@amplitude.com",
    name: "Hai Tran",
  }
  amplitudeServiceForNode.setUser(userProperties)
  amplitudeServiceForNode.trackEvent(
    "test@amplitude.com",
    "Test Amplitude Node",
    { test: "hello" }
  )

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h2>Hivello</h2>
        <button>Click me</button>
      </main>
    </div>
  )
}
