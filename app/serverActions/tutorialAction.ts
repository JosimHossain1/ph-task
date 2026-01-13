"use server"

// Add the tutorial in the database.
export async function AddTutorialAction(formData: FormData) {
  const tutorialName = await formData.get("tutorialName") as string
  const genreName = await formData.get("genreName") as string
  const description = await formData.get("description") as string
  const videoUrl = await formData.get("videoUrl") as string

  const tutorialData = {
    tutorialName,
    genreName,
    description,
    videoUrl
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tutorial`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tutorialData)

  })

  const createdTutorialReturn = await res.json()

  return createdTutorialReturn;
}

// Get the tuturial from the database
export async function GetTutorialAction() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tutorial`)
  const allTutorial = await res.json()
  return allTutorial
}