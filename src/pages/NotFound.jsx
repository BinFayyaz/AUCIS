import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-5 text-4xl sm:text-5xl">This page has flown off.</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/50">
        The page you were looking for does not exist — or has not been built yet.
      </p>
      <Link to="/" className="btn-primary mt-8 text-[13px]">
        Back to home
      </Link>
    </section>
  )
}
