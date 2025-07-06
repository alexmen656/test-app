// Simple JWT token test script

const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzbGFja191c2VyX2lkIjoiVTAxVEFTS01BU1RFUjEyMyIsInVzZXJuYW1lIjoidGFza21hc3Rlcl9kZXYiLCJkaXNwbGF5X25hbWUiOiJUYXNrTWFzdGVyIERldmVsb3BlciIsInByb2ZpbGVfaW1hZ2UiOiJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ3MjA5OTY0NTc4NS01NjU4YWJmNGZmNGU_dz0xNTAmaD0xNTAmZml0PWNyb3AmY3JvcD1mYWNlIiwiZW1haWwiOiJ0YXNrbWFzdGVyX2RldkBzbGFjay5sb2NhbCIsImlhdCI6MTc1MTY2MzM1NiwiZXhwIjoxNzUyMjY4MTU2fQ.Gq68tajlO95EsUVkbxN7Ei7qM7D7qJdA_wWQk1dSo9Q";

console.log("🔐 Test JWT Token für Frontend-Testing:");
console.log("Token:", testToken);
console.log("\n📋 Zu kopieren in Browser localStorage:");
console.log(`localStorage.setItem('authToken', '${testToken}');`);
console.log(`localStorage.setItem('betabay_token', '${testToken}');`);

console.log("\n🧪 API Test Commands:");
console.log("1. Test User Info:");
console.log(`curl -H "Authorization: Bearer ${testToken}" http://localhost:3001/api/user`);

console.log("\n2. Test User's Apps:");
console.log(`curl -H "Authorization: Bearer ${testToken}" http://localhost:3001/api/test-posts/user/mine`);

console.log("\n3. Test All Apps:");
console.log(`curl -H "Authorization: Bearer ${testToken}" http://localhost:3001/api/test-posts`);

console.log("\n✅ Use this token in browser dev console to test authentication!");
