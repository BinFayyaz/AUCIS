export function validateRegistration(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Please enter your full name.'
  if (!form.email.trim()) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'That email address looks invalid.'
  }
  if (!form.semester) errors.semester = 'Please select your semester.'
  if (!form.group) errors.group = 'Please select a group you want to join.'
  if (!form.agreed) errors.agreed = 'Please agree to the code of conduct first.'
  return errors
}
