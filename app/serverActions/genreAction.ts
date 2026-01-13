"use server"

export async function GetGenres() {
  const res = await fetch(" /api/genre")

  const genres = await res.json()

  return genres

}

export async function AddGenreAction(formData: FormData) {

  const genreName = formData.get("genreName") as string;
  const slug = formData.get("slug") as string;
  const genre = {
    genreName, slug
  }


  await fetch(" /api/genre", {
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


  await fetch(` /api/genre/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(genre)
  })
}

export async function DeletegenreAction(formData: FormData) {
  const id = formData.get("id") as string

  await fetch(` /api/genre/${id}`, { method: "DELETE" })
}