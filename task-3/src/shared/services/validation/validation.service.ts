//** Provides error maping for validation (only required fields filtered out). */
//eslint-disable-next-line
export const errorResponse = (schemaErrors: any[]) => {
    //eslint-disable-next-line
    const errors = schemaErrors.map((error: any) => {
        const {path, message} = error;
        return {path, message};
    });
    return {
        status: 'failed',
        errors,
    }
}