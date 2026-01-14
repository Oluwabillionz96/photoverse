import { ArrowRight, Mail } from "lucide-react";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

const EmailStep = () => {
  return (
    <>
      <div className="text-center mb-8">
        <div className="inline-block mb-4 p-3 rounded-lg bg-blue-500/10">
          <Mail className="w-6 h-6 text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">
          Forgot password?
        </h1>
        <p className="text-muted-foreground">
          Enter your email and to help us confirm you account exsists
        </p>
      </div>

      <Card className="border border-border/50 backdrop-blur-sm bg-card/95 p-8 space-y-6 shadow-lg">
        <form onSubmit={() => {}} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={""}
              onChange={() => {}}
              required
              className="h-11 bg-secondary/50 border-border placeholder-muted-foreground/50 focus:border-blue-500"
            />
          </div>

          <Button
            type="submit"
            disabled={false}
            className="w-full h-11 bg-blue-500 text-white hover:bg-blue-500/90  font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {false ? "Sending..." : "Send reset code"}
            {!false && <ArrowRight className="w-4 h-4" />}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link
            href="/auth/login"
            className="text-blue-500 hover:underline font-semibold"
          >
            Sign in
          </Link>
        </p>
      </Card>
    </>
  );
};

export default EmailStep;
