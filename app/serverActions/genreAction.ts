"use server"
export async function AddGenreAction(formData: FormData) {

  const genreName = formData.get("genreName") as string;
  const slug = formData.get("slug") as string;
  const genre = {
    genreName, slug
  }


  await fetch("http://localhost:3000/api/genre", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(genre)
  })
}

export async function UpdategenreAction(formData: FormData) {
  const id = formData.get("id") as string
  const genreName = formData.get("genreName") as string;
  const slug = formData.get("slug") as string;


  const genre = {
    genreName, slug
  }


  await fetch(`http://localhost:3000/api/genre/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(genre)
  })
}

export async function DeletegenreAction(formData: FormData) {
  const id = formData.get("id") as string

  await fetch(`http://localhost:3000/api/genre/${id}`, { method: "DELETE" })
}