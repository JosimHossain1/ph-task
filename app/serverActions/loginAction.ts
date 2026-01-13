"use server"
export async function loginAction(formData: FormData) {

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const user = {
    email,
    password,

  }


  const res = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })


}