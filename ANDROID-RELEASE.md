# Android release

Version: 1.0.0 (versionCode 1). Variant: release.
compileSdk = 36; targetSdk = 36; minSdk = 23.
JDK 21; Android Gradle Plugin 8.13.0; Gradle Wrapper 8.14.3.

Install dependencies with `npm ci` using Node.js 22.12 or newer.
Build the packaged website with `npm run build:android`. The separate Vite configuration produces a local SPA in `dist/client`, without changing the website build.

Run `npx cap sync android` after changing the web assets.
Signing is configured in `android/app/build.gradle` and reads the existing project's
`KEYSTORE/*-keystore-info.txt` locally. Alias: `upload`. Never commit the key or passwords.

Before each release, check the effective SDK and signing settings, then create a
separate temporary Android emulator and test a debug build. Stop on any crash.
Only after those checks pass, run from `android`:

```sh
./gradlew :app:verifyReleaseConfiguration :app:assembleRelease :app:bundleRelease
```

Verify the final APK and AAB signatures against the project's upload certificate.
Release outputs: `app/build/outputs/apk/release/app-release.apk` and
`app/build/outputs/bundle/release/app-release.aab`.

The initial release was tested on an isolated API 36 emulator. Navigation, detail
screens, form validation, local confirmation, and background/resume passed.
The forms in the supplied sources do not send registrations to an organiser/backend.
