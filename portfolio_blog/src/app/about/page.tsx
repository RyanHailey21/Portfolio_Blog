import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center animate-fade-in-up">
        <Avatar className="h-40 w-40 border-2 border-border shadow-soft">
          <AvatarImage src="/avatar.jpg" alt="Profile picture" />
          <AvatarFallback className="bg-copper-gradient text-primary-foreground text-4xl">RH</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">About</h1>
          <p className="text-lg text-muted-foreground">
            Designer, developer, and maker of thoughtful products.
          </p>
        </div>
      </div>

      <div className="max-w-2xl space-y-4 text-base leading-7 animate-fade-in-up animate-delay-100">
        <p className="text-muted-foreground">
          Bio, principles, and contact links will live here.
        </p>
        <p className="text-muted-foreground">
          Add your personal story, what you do, your design philosophy, and how people can reach you.
        </p>
      </div>
    </div>
  );
}
