import { LoginForm } from "@/components/forms/login-form";
import { FingerprintPatternIcon } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="fixed mx-auto inset-0 w-full grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <FingerprintPatternIcon className="size-4" />
            </div>
            <p className="text-lg font-semibold tracking-tight">
              Next<span className="font-bold text-blue-500">Pro</span>
            </p>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          width={800}
          height={1200}
          src="/placeholder.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5]"
        />
      </div>
    </div>
  );
}
