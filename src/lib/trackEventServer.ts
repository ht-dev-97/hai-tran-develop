/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import * as amplitude from "@amplitude/analytics-node"

export async function trackEventServer(
  eventType: string,
  data?: Record<string, any>
) {
  // Initialize Amplitude
  const AMPLITUDE_API_KEY = "8ba592c88a86b320747c2645b7289366"
  amplitude.init(AMPLITUDE_API_KEY)

  // Set user properties
  const identifyObj = new amplitude.Identify()
    .set("User ID", "test@amplitude.com")
    .set("Name", "Hai Tran")

  amplitude.identify(identifyObj, { user_id: "test@amplitude.com" })

  // Track events with optional properties
  const eventProperties = {
    app_source: "dashboard",
    ...data,
  }

  console.log("đã vào", eventProperties)

  amplitude.track(eventType, eventProperties, { user_id: "test@amplitude.com" })
}
