const API_DOMAIN = `http://localhost:8000`

const urls = {
    login: `${API_DOMAIN}/v1/auth/login/`,
    logout: `${API_DOMAIN}/v1/api/logout/`,
    register: `${API_DOMAIN}/v1/auth/registration/`,
    passwordReset: `${API_DOMAIN}/v1/password_reset/`,
    passwordResetConfirm: `${API_DOMAIN}/v1/password_reset/confirm/`,

    homepageDirections: `${API_DOMAIN}/v1/directions/homepage_directions/`,
    directions: `${API_DOMAIN}/v1/directions`,
    homepageDoctorsSpecialties: `${API_DOMAIN}/v1/doctors/specialties/`,
    services: `${API_DOMAIN}/v1/services`,
    doctors: `${API_DOMAIN}/v1/doctors`,
}
export default urls;