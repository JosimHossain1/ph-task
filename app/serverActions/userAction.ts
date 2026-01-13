"use server"


export async function getUsers(){
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`)
  const users = await res.json()
  return users
}

export async function UpdateUserAction(formData: FormData) {
  const id = formData.get("id") as string
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;


  const User = {
    name,
    email,
    role
  }


  await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(User)
  })
}

export async function DeleteUserAction(formData: FormData) {
  const id = formData.get("id") as string

  await fetch(`/api/users/${id}`, { method: "DELETE" })
}