1. export GOOGLE_APPLICATION_CREDENTIALS='./functions/testnft-61e9d-e234107d15f0.json'
2. firebase emulators:start --inspect-functions --only functions,hosting
3. headers:
   Content-Type: application/json

body:

{
"tokenAddress": "8JWyCQzB3FBXMiZBdLd1L6nYneNaowwffC4DQWd4YEGk"
}
