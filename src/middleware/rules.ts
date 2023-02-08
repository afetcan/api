// Rules
export const isAuthenticated = () => (next: any) => (root: any, args: any, context: any, info: any) => {
  if (!context.currentUser)
    throw new Error('You are not authenticated!')

  return next(root, args, context, info)
}

export const hasRole = (role: string) => (next: any) => (root: any, args: any, context: any, info: any) => {
  console.log('hasRole', role, context.currentUser)
  if (!context.currentUser.roles?.includes(role))
    throw new Error('You are not authorized!')

  return next(root, args, context, info)
}

const resolversComposition = {
  'Query.libraries': [],
}

export { resolversComposition }
