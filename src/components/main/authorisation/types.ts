export type LoginData = {
    email: string,
    password: string,
}

export type RegisterData = {
    name: string,
    surname: string,
    patronymic?: string,
    phone: string,
    birthday?: Date,
    email: string,
    password: string,
    patient: {
        role: string,
    },
}

export type FieldError = {
    response: {
        data: {
            error: {
                password?: [string],
                email?: [string],
                name?: [string],
                surname?: [string],
                patronymic?: [string],
                phone?: [string],
            }
        }
    }
}

export type PasswordError = {
    password: string
}

export type PasswordResetData = {
    token: string,
    password: string
}
