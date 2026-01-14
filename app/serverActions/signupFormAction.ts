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

  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })

}