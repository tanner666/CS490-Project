// api/src/Routes.js
import { defineRoute } from '@redwoodjs/router'

export const routes = () => {
  defineRoute('userRegistration', 'api/src/functions/userRegistration', ['POST'])
}
