export default function Button({ btnText }: { btnText: string }) {
  return (
    <button
      className="rounded-lg border border-foreground/30 bg-background px-3 py-1.5 
    transition-all duration-200 hover:bg-linear-to-r hover:from-foreground/20 hover:to-foreground/5"
    >
      {btnText}
    </button>
  );
}
