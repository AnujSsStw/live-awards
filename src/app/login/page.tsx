import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SignIn from "@/components/sign-in";

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn />
    </div>
  );
}
