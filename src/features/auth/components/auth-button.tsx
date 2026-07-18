import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { Button, buttonVariants } from "@/components/ui/button";
import { type VariantProps } from "class-variance-authority";
import { Spinner } from "@/components/ui/spinner";

type AuthButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    isPending: boolean;
    content: string;
  };

export default function AuthButton({
  content,
  isPending = false,

  ...props
}: AuthButtonProps) {
  return (
    <Button {...props} disabled={isPending}>
      {isPending ? (
        <>
          <Spinner /> {content}
        </>
      ) : (
        content
      )}
    </Button>
  );
}
