type User = {
    phoneNumber: string
    name: string
  }
  
  const dummyUser: User = {
    phoneNumber: "123-456-7890",
    name: "John Doe",
  }
  
  export function signIn(phoneNumber: string, password: string): boolean {
    // Updated to use the dummy user's phone number
    return phoneNumber === dummyUser.phoneNumber && password === "password123"
  }
  
  export function verifyTFA(code: string): boolean {
    return code === "123456"
  }
  
  export function getUser(): User {
    return dummyUser
  }
  
  export function sendTFACode(phoneNumber: string): string {
    // In a real application, this would send an SMS with a code
    // For this example, we'll just generate a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    console.log(`Sending TFA code ${code} to ${phoneNumber}`)
    return code
  }
  
  export { dummyUser }
  
  