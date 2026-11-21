/** Soft moving colour fields behind the page content. 
export default function Aurora({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute -left-24 top-[-10%] h-[420px] w-[420px] animate-drift rounded-full bg-sage/20 blur-[120px]" />
      <div
        className="absolute right-[-8%] top-[6%] h-[480px] w-[480px] animate-drift rounded-full bg-steel/30 blur-[130px]"
        style={{ animationDelay: '-7s' }}
      />
      <div
        className="absolute bottom-[-18%] left-1/3 h-[380px] w-[520px] animate-drift rounded-full bg-sand/10 blur-[120px]"
        style={{ animationDelay: '-14s' }}
      />
    </div>
  )
}*/
