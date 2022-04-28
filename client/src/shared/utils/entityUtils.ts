import pick from 'lodash/pick'
/**
 * Removes fields with an 'id' field that equals ''.
 * This function was created to prevent entities to be sent to
 * the server with an empty id and thus resulting in a 500.
 *
 * @param entity Object to clean.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cleanEntity = (entity: any) => {
	const keysToKeep = Object.keys(entity).filter(
		k =>
			!(entity[k] instanceof Object) ||
      (entity[k]['id'] !== '' && entity[k]['id'] !== -1)
	)

	return pick(entity, keysToKeep)
}
