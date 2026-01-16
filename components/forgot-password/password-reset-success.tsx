import React from 'react'
import { Card } from '../ui/card';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const PasswordResetSuccess = () => {
  return (
    <Card className="border border-border/50 backdrop-blur-sm bg-card/95 p-8 space-y-6 shadow-lg text-center">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-blue-500" />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Password reset
        </h2>
        <p className="text-muted-foreground">
          Your password has been successfully reset. You can now sign in with
          your new password.
        </p>
      </div>
      <Button className="w-full h-11 bg-blue-500 hover:bg-blue-500/90 text-blue-500-foreground font-semibold rounded-lg">
        <Link
          href="/auth/login"
          className="flex items-center justify-center gap-2 w-full"
        >
          Back to login
          <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    </Card>
  );
}

export default PasswordResetSuccess