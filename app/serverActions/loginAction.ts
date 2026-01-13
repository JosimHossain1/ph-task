"use server"
export async function loginAction(formData: FormData) {

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = {
    email,
    password,
  }


  const res = await fetch(" /api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })


}