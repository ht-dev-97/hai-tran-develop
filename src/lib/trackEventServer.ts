/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import * as amplitude from "@amplitude/analytics-node"

export async function trackEventServer(
  eventType: string,
  data?: Record<string, any>
) {
  // Initialize Amplitude
  const AMPLITUDE_API_KEY = "8ba592c88a86b320747c2645b7289366"
  const defaultInstance = amplitude.createInstance()
  defaultInstance.init(AMPLITUDE_API_KEY)

  // Set user properties
  const identifyObj = new amplitude.Identify()
    .set("User ID", "test@amplitude.com")
    .set("Name", "Hai Tran")

  defaultInstance.identify(identifyObj, { user_id: "test1@amplitude.com" })

  // Track events with optional properties
  const eventProperties = {
    app_source: "dashboard",
    ...data,
  }

  defaultInstance.track(eventType, eventProperties, {
    user_id: "test1@amplitude.com",
  })
}
