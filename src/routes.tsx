const routes = {
    MAIN: () => `/`,
    PROFILE: (prefix: string = `/`) => `/profile`,
    REGISTRATION: (prefix: string = `/`) => `${prefix}registration/`,
    LOGIN: (prefix: string = `/`) => `${prefix}login/`,
    LOGOUT: () => `logout`,
    RESET_PASSWORD: (prefix: string = `/`) => `${prefix}reset_password/`,
    RESET_PASSWORD_CONFIRM: (prefix: string = `/`) => `${prefix}reset_password/confirm/:token`,

    DIRECTION_DETAIL: (slug: string = ':slug', prefix: string = `/`) => `${prefix}direction/${slug}`,
    SERVICE_DETAIL: (slug: string = ':slug', prefix: string = `/`) => `${prefix}service/${slug}`,
    DOCTOR_DETAIL: (slug: string = ':slug', prefix: string = `/`) => `${prefix}doctor/${slug}`,

    DOCTOR_LIST: (prefix: string = `/`) => `${prefix}doctors`,
    SERVICE_LIST: (prefix: string = `/`) => `${prefix}services`,

};

export default routes;