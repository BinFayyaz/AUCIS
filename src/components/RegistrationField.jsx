export default function RegistrationField({ name, label, errors, children }) {
  const error = errors[name]
  return (
    <div className="registration-field" data-invalid={error ? 'true' : undefined}>
      <label className="label" htmlFor={`overlay-${name}`}>{label}</label>
      {children}
      {error && <p id={`error-${name}`} className="registration-error" role="alert">{error}</p>}
    </div>
  )
}
