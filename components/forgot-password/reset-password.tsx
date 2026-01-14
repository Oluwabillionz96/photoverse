import { ArrowRight, Mail } from 'lucide-react';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const ResetPassword = () => {
  return (
    <>
      <div className="text-center mb-8">
        <div className="inline-block mb-4 p-3 rounded-lg bg-blue-500/10">
          <Mail className="w-6 h-6 text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">
          Create new password
        </h1>
        <p className="text-muted-foreground">
          Enter a strong password for your account
        </p>
      </div>

      <Card className="border border-border/50 backdrop-blur-sm bg-card/95 p-8 space-y-6 shadow-lg">
        <form onSubmit={()=>{}} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="new-password"
              className="text-sm font-medium text-foreground"
            >
              New password
            </Label>
            <Input
              id="new-password"
              type="password"
              placeholder="Create a strong password"
              value={""}
              onChange={()=>{}}
              required
              className="h-11 bg-secondary/50 border-border placeholder-muted-foreground/50 focus:border-blue-500"
            />
            <p className="text-xs text-muted-foreground">
              At least 8 characters with a mix of letters and numbers
            </p>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="confirm-password"
              className="text-sm font-medium text-foreground"
            >
              Confirm password
            </Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              value={""}
              onChange={()=>{}}
              required
              className="h-11 bg-secondary/50 border-border placeholder-muted-foreground/50 focus:border-blue-500"
            />
          </div>

          <Button
            type="submit"
            disabled={false}
            className="w-full h-11 bg-blue-500 hover:bg-blue-500/90 text-blue-500-foreground font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {false ? "Resetting..." : "Reset password"}
            {!false && <ArrowRight className="w-4 h-4" />}
          </Button>
        </form>
      </Card>
    </>
  );
}

export default ResetPassword
