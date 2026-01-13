"use server"
export async function signupFormAction(formData: FormData) {

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const user = {
    name,
    email,
    password,
    role: "User",
  }

  console.log(user)
  await fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })

}