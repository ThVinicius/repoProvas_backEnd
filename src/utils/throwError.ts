export function badRequest(message: string) {
  throw { code: 'Bad request', message }
}

export function unauthorized(message: string) {
  throw { code: 'Unauthorized', message }
}

export function notFound(message: string) {
  throw { code: 'Not Found', message }
}

export function conflit(message: string) {
  throw { code: 'Conflit', message }
}

export function upgradeRequired(message: string) {
  throw { name: 'Upgrade Required', message }
}
