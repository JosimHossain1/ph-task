// app/access-denied/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconLock } from "@tabler/icons-react"; // optional icon

export default function AccessDenied() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="flex flex-col items-center gap-2">
          <IconLock className="w-12 h-12 text-red-500" />
          <CardTitle className="text-2xl text-red-500">Access Denied</CardTitle>
          <CardDescription>
            You do not have permission to access this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center mt-4">
          <Button asChild>
            <a href="/" className="w-full text-center">
              Go to Home
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
