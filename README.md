# Clerk Expo Issue - `__experimental_resourceCache` Breaks `ClerkLoaded`

## Description

This repository demonstrates an issue where adding the `__experimental_resourceCache` prop to the `ClerkProvider` component in an Expo project causes the `ClerkLoaded` component to fail on Android and iOS. As a result, a blank white screen is rendered.

## Steps to Reproduce

1. Set up an Expo project with `@clerk/clerk-expo`.

2. Add the `__experimental_resourceCache` prop to `ClerkProvider` as shown below:

   ```tsx
   <ClerkProvider 
      tokenCache={tokenCache} 
      publishableKey={publishableKey} 
      __experimental_resourceCache={secureStore}
   >
      <ClerkLoaded>
         <Slot />
      </ClerkLoaded>
   </ClerkProvider>
   ```

3. Run the project on an **iOS simulator, real iOS device, or Android device**.

4. Observe that the app **renders a blank white screen**, indicating `ClerkLoaded` is not working.

## Expected Behavior

- The sign-in page should display correctly.
- The Google sign-in button should be clickable.
- The issue does not occur when `__experimental_resourceCache` is removed.

## Actual Behavior

- On **iOS (Simulator & Real Device)**: A **blank white screen** is displayed.
- On **Android**: A **blank white screen** is displayed.

## Other Noticable Error Logs

```bash
Error: Unable to resolve module ./npm/@clerk/clerk-js@5/dist/clerk.browser
from /Users/mac/Documents/workspace/business-copilot/business-copilot-webapp/.
```

## Additional Notes

- Removing `__experimental_resourceCache` allows the app to function normally.
- Since this feature is experimental, issues are expected, but offline support is critical for this application.
- Any updates or fixes regarding this issue would be greatly appreciated.

